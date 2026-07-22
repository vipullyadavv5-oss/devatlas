from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserProfileResponse
from app.services.github_service import fetch_github_stats
from app.services.leetcode_service import fetch_leetcode_stats
from app.services.codeforces_service import fetch_codeforces_stats
from app.services.scoring_engine import calculate_dev_score
from app.services.ai_service import generate_ai_insights

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("/{username}", response_model=UserProfileResponse)
async def get_user_profile(
    username: str,
    leetcode_user: str | None = None,
    codeforces_user: str | None = None,
    db: Session = Depends(get_db)
):
    """Fetches combined developer stats across GitHub, LeetCode, and Codeforces, calculates DevScore, and returns AI insights."""
    lc_name = leetcode_user or username
    cf_name = codeforces_user or username

    # Fetch stats asynchronously across platforms with 24h caching
    gh_stats = await fetch_github_stats(username=username, db=db)
    lc_stats = await fetch_leetcode_stats(username=lc_name, db=db)
    cf_stats = await fetch_codeforces_stats(username=cf_name, db=db)

    # Compute deterministic DevScore
    score_breakdown = calculate_dev_score(gh_stats, lc_stats, cf_stats)
    total_dev_score = score_breakdown["total_score"]

    # Generate Gemini AI insights
    aggregated_stats = {
        "github": gh_stats,
        "leetcode": lc_stats,
        "codeforces": cf_stats,
        "dev_score": total_dev_score
    }
    ai_insights = await generate_ai_insights(aggregated_stats)

    # Calculate streak, xp, level
    commit_streak = gh_stats.get("contribution_streak", 1)
    total_xp = int(total_dev_score * 50 + lc_stats.get("total_solved", 0) * 10)
    user_level = max(1, total_xp // 300)

    # Upsert user record in Database
    db_user = db.query(User).filter(User.github_username == username).first()
    if not db_user:
        db_user = User(
            github_username=username,
            leetcode_username=lc_name,
            codeforces_username=cf_name,
            avatar_url=gh_stats.get("avatar_url"),
            dev_score=total_dev_score,
            streak=commit_streak,
            xp=total_xp,
            level=user_level
        )
        db.add(db_user)
    else:
        db_user.leetcode_username = lc_name
        db_user.codeforces_username = cf_name
        db_user.avatar_url = gh_stats.get("avatar_url") or db_user.avatar_url
        db_user.dev_score = total_dev_score
        db_user.streak = commit_streak
        db_user.xp = total_xp
        db_user.level = user_level

    db.commit()

    return {
        "github_username": username,
        "leetcode_username": lc_name,
        "codeforces_username": cf_name,
        "avatar_url": gh_stats.get("avatar_url"),
        "dev_score": total_dev_score,
        "streak": commit_streak,
        "xp": total_xp,
        "level": user_level,
        "github_stats": gh_stats,
        "leetcode_stats": lc_stats,
        "codeforces_stats": cf_stats,
        "score_breakdown": score_breakdown,
        "ai_insights": ai_insights
    }
