from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    github_username = Column(String, unique=True, index=True, nullable=False)
    leetcode_username = Column(String, index=True, nullable=True)
    codeforces_username = Column(String, index=True, nullable=True)
    
    avatar_url = Column(String, nullable=True)
    dev_score = Column(Float, default=0.0)
    streak = Column(Integer, default=1)
    xp = Column(Integer, default=100)
    level = Column(Integer, default=1)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    tokens = relationship("OAuthToken", back_populates="user", cascade="all, delete-orphan")

class OAuthToken(Base):
    __tablename__ = "oauth_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    provider = Column(String, nullable=False) # e.g. "github"
    access_token = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="tokens")

class PlatformCache(Base):
    __tablename__ = "platform_caches"

    id = Column(Integer, primary_key=True, index=True)
    cache_key = Column(String, unique=True, index=True, nullable=False) # platform:username
    platform = Column(String, nullable=False) # "github", "leetcode", "codeforces"
    data = Column(Text, nullable=False) # JSON serialized string
    fetched_at = Column(DateTime, default=datetime.utcnow)
