import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.config import settings
from app.models import User, OAuthToken
from app.services.github_service import fetch_github_stats

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.get("/github/login")
def github_login():
    """Returns the GitHub OAuth login redirect URL."""
    if not settings.GITHUB_CLIENT_ID:
        raise HTTPException(status_code=400, detail="GITHUB_CLIENT_ID is not configured in .env")

    url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={settings.GITHUB_CLIENT_ID}"
        f"&redirect_uri={settings.GITHUB_REDIRECT_URI}"
        f"&scope=user,repo"
    )
    return {"url": url}

@router.get("/github/callback")
async def github_callback(code: str = Query(...), db: Session = Depends(get_db)):
    """OAuth callback endpoint: Exchanges code for token & fetches profile."""
    if not settings.GITHUB_CLIENT_ID or not settings.GITHUB_CLIENT_SECRET:
        raise HTTPException(status_code=400, detail="GitHub OAuth credentials not configured")

    async with httpx.AsyncClient() as client:
        res = await client.post(
            "https://github.com/login/oauth/access_token",
            headers={"Accept": "application/json"},
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": settings.GITHUB_REDIRECT_URI,
            }
        )

        if res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to exchange GitHub OAuth code")

        token_data = res.json()
        access_token = token_data.get("access_token")
        if not access_token:
            raise HTTPException(status_code=400, detail="No access token returned from GitHub")

        # Fetch GitHub User details
        gh_user_res = await client.get(
            "https://api.github.com/user",
            headers={"Authorization": f"token {access_token}", "User-Agent": "DevAtlas-App"}
        )
        if gh_user_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch GitHub user details")

        gh_user = gh_user_res.json()
        github_username = gh_user.get("login")
        avatar_url = gh_user.get("avatar_url")

        # Upsert User in DB
        db_user = db.query(User).filter(User.github_username == github_username).first()
        if not db_user:
            db_user = User(
                github_username=github_username,
                avatar_url=avatar_url,
                leetcode_username=github_username,
                codeforces_username=github_username
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

        # Store OAuth token
        token_entry = db.query(OAuthToken).filter(OAuthToken.user_id == db_user.id, OAuthToken.provider == "github").first()
        if token_entry:
            token_entry.access_token = access_token
        else:
            token_entry = OAuthToken(user_id=db_user.id, provider="github", access_token=access_token)
            db.add(token_entry)
        db.commit()

        # Redirect to frontend application with username param
        return RedirectResponse(url=f"http://localhost:5174/?username={github_username}")
