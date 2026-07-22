from typing import Dict, Any
from app.config import settings

def calculate_dev_score(github_stats: Dict[str, Any], leetcode_stats: Dict[str, Any], codeforces_stats: Dict[str, Any]) -> Dict[str, Any]:
    # 1. GitHub Score (0-100)
    commits = github_stats.get("commit_count", 0)
    repos = github_stats.get("repos_count", 0)
    stars = github_stats.get("stars_received", 0)
    langs_count = len(github_stats.get("languages", []))

    gh_commit_pts = min(40.0, commits * 0.8)
    gh_repo_pts = min(30.0, (repos * 2.5) + (stars * 3.0))
    gh_lang_pts = min(30.0, langs_count * 6.0)
    github_score = round(min(100.0, gh_commit_pts + gh_repo_pts + gh_lang_pts), 1)

    # 2. LeetCode Score (0-100)
    easy = leetcode_stats.get("easy_solved", 0)
    medium = leetcode_stats.get("medium_solved", 0)
    hard = leetcode_stats.get("hard_solved", 0)
    lc_rating = leetcode_stats.get("contest_rating")

    weighted_solved = (easy * 1.0) + (medium * 2.5) + (hard * 5.0)
    lc_solved_pts = min(80.0, (weighted_solved / 300.0) * 80.0)
    
    lc_rating_pts = 0.0
    if lc_rating:
        lc_rating_pts = min(20.0, max(0.0, (lc_rating - 1400.0) / 30.0))

    leetcode_score = round(min(100.0, lc_solved_pts + lc_rating_pts), 1)

    # 3. Codeforces Score (0-100)
    cf_rating = codeforces_stats.get("rating", 0)
    contests = codeforces_stats.get("contests_count", 0)

    if cf_rating <= 0:
        cf_rating_pts = 0.0
    elif cf_rating < 1200:
        cf_rating_pts = (cf_rating / 1200.0) * 40.0
    elif cf_rating < 1600:
        cf_rating_pts = 40.0 + ((cf_rating - 1200.0) / 400.0) * 30.0
    elif cf_rating < 2000:
        cf_rating_pts = 70.0 + ((cf_rating - 1600.0) / 400.0) * 20.0
    else:
        cf_rating_pts = 90.0 + min(10.0, (cf_rating - 2000.0) / 100.0)

    cf_contest_pts = min(10.0, contests * 0.5)
    codeforces_score = round(min(100.0, cf_rating_pts + cf_contest_pts), 1)

    # 4. Total Weighted DevScore
    w_gh = settings.WEIGHT_GITHUB
    w_lc = settings.WEIGHT_LEETCODE
    w_cf = settings.WEIGHT_CODEFORCES

    total_score = round(
        (github_score * w_gh) + (leetcode_score * w_lc) + (codeforces_score * w_cf),
        1
    )

    return {
        "github_score": github_score,
        "leetcode_score": leetcode_score,
        "codeforces_score": codeforces_score,
        "total_score": min(100.0, total_score),
        "weights_used": {
            "github": w_gh,
            "leetcode": w_lc,
            "codeforces": w_cf
        }
    }
