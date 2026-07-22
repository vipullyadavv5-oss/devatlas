from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class GitHubStats(BaseModel):
    repos_count: int = 0
    commit_count: int = 0
    languages: List[str] = []
    contribution_streak: int = 0
    stars_received: int = 0

class LeetCodeStats(BaseModel):
    total_solved: int = 0
    easy_solved: int = 0
    medium_solved: int = 0
    hard_solved: int = 0
    contest_rating: Optional[float] = None
    topics_breakdown: Dict[str, int] = {}

class CodeforcesStats(BaseModel):
    rating: int = 0
    rank: str = "Unrated"
    max_rating: int = 0
    contests_count: int = 0
    verdict_counts: Dict[str, int] = {}

class DevScoreBreakdown(BaseModel):
    github_score: float = 0.0
    leetcode_score: float = 0.0
    codeforces_score: float = 0.0
    total_score: float = 0.0
    weights_used: Dict[str, float] = {}

class UserProfileResponse(BaseModel):
    github_username: str
    leetcode_username: Optional[str] = None
    codeforces_username: Optional[str] = None
    avatar_url: Optional[str] = None
    dev_score: float = 0.0
    streak: int = 1
    xp: int = 100
    level: int = 1
    github_stats: GitHubStats
    leetcode_stats: LeetCodeStats
    codeforces_stats: CodeforcesStats
    score_breakdown: DevScoreBreakdown
    ai_insights: Optional[str] = None

class AiChatRequest(BaseModel):
    prompt: str
    user_context: Optional[Dict[str, Any]] = None

class AiChatResponse(BaseModel):
    reply: str
