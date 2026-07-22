import json
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models import PlatformCache
from app.config import settings

def get_cached_data(db: Session, cache_key: str) -> dict | None:
    entry = db.query(PlatformCache).filter(PlatformCache.cache_key == cache_key).first()
    if not entry:
        return None

    # Check if cache has expired (older than 24 hours)
    expiration_cutoff = datetime.utcnow() - timedelta(seconds=settings.CACHE_EXPIRATION_SECONDS)
    if entry.fetched_at < expiration_cutoff:
        return None

    try:
        return json.loads(entry.data)
    except Exception:
        return None

def set_cached_data(db: Session, cache_key: str, platform: str, data: dict):
    serialized = json.dumps(data)
    entry = db.query(PlatformCache).filter(PlatformCache.cache_key == cache_key).first()

    if entry:
        entry.data = serialized
        entry.fetched_at = datetime.utcnow()
    else:
        entry = PlatformCache(
            cache_key=cache_key,
            platform=platform,
            data=serialized,
            fetched_at=datetime.utcnow()
        )
        db.add(entry)

    db.commit()
