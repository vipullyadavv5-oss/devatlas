import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PORT: int = 8000
    DATABASE_URL: str = "sqlite:///./devatlas.db"

    # GitHub OAuth Settings
    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    GITHUB_REDIRECT_URI: str = "http://localhost:8000/api/auth/github/callback"

    # Gemini AI Key
    GEMINI_API_KEY: str = ""

    # Configurable DevScore Weights (must sum to 1.0)
    WEIGHT_GITHUB: float = 0.35
    WEIGHT_LEETCODE: float = 0.40
    WEIGHT_CODEFORCES: float = 0.25

    # Cache expiration duration in seconds (24 hours)
    CACHE_EXPIRATION_SECONDS: int = 86400

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
