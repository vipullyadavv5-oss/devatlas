import httpx
import json
from typing import Dict, Any
from app.config import settings

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

async def generate_ai_insights(user_stats: Dict[str, Any]) -> str:
    api_key = settings.GEMINI_API_KEY

    prompt_text = f"""
You are the DevAtlas AI Coach. Analyze the following developer's aggregated platform stats and produce a concise 2-3 sentence personalized career recommendation.

Developer Stats JSON:
{json.dumps(user_stats, indent=2)}

Guidelines:
- Be encouraging, Gen-Z friendly, and specific about strengths & growth areas.
- Mention one key strength (e.g., GitHub activity, LeetCode DSA, or Codeforces rating).
- Suggest one actionable improvement (e.g., system design, open-source contributions, or dynamic programming).
- End with a short motivational phrase (e.g. "Keep cooking! 🚀").
"""

    if api_key and api_key != "your_gemini_api_key_here":
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{GEMINI_API_URL}?key={api_key}",
                    json={
                        "contents": [{
                            "parts": [{"text": prompt_text}]
                        }]
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "").strip()
        except Exception:
            pass

    # Intelligent deterministic fallback when Gemini API key is placeholder
    gh_repos = user_stats.get("github", {}).get("repos_count", 0)
    lc_solved = user_stats.get("leetcode", {}).get("total_solved", 0)
    cf_rating = user_stats.get("codeforces", {}).get("rating", 0)

    insights = f"You show solid problem-solving prowess with {lc_solved} LeetCode challenges solved and {gh_repos} public repos on GitHub! "
    if cf_rating > 1400:
        insights += f"Your Codeforces rating ({cf_rating}) demonstrates high competitive programming caliber. "
    else:
        insights += "Consider boosting open-source contributions and participating in weekly Codeforces contests to elevate your DevScore. "

    insights += "Touch grass after this coding session! 🌿"
    return insights

async def answer_ai_chat(prompt: str, user_context: Dict[str, Any] | None = None) -> str:
    api_key = settings.GEMINI_API_KEY

    full_prompt = f"""
You are DevAtlas AI, a friendly, ultra-smart Gen-Z coding assistant and career co-pilot.
User Prompt: "{prompt}"
User Context: {json.dumps(user_context or {}, indent=2)}

Provide a clear, highly technical yet playful response with markdown formatting, code snippets (if requested), and encouraging emojis.
"""

    if api_key and api_key != "your_gemini_api_key_here":
        try:
            async with httpx.AsyncClient(timeout=12.0) as client:
                res = await client.post(
                    f"{GEMINI_API_URL}?key={api_key}",
                    json={
                        "contents": [{
                            "parts": [{"text": full_prompt}]
                        }]
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "").strip()
        except Exception:
            pass

    # Smart fallback responses if no API key is provided
    p_lower = prompt.lower()
    if "react" in p_lower:
        return "React 18 introduces Concurrent Rendering! Key features include `useTransition` for non-blocking state updates and `useDeferredValue` for smooth UI responsiveness under heavy render load. 🚀"
    elif "roadmap" in p_lower:
        return "Here is your 3-Step Full-Stack Action Plan:\n1. **Master Core Async JS & TypeScript**\n2. **Build REST & GraphQL Services with FastAPI / Node.js**\n3. **Containerize with Docker & Deploy on Vercel / Railway**! 💡"
    elif "debug" in p_lower or "code" in p_lower:
        return "When debugging async state in React, ensure you aren't mutating local state directly! Always pass a state updater function: `setCount(prev => prev + 1)`. Keep cooking! 🍳"
    else:
        return f"Boom! DevAtlas AI received your request: '{prompt}'. Focus on consistent daily DSA practice, clean modular architecture, and GitHub commits to keep your DevScore at the top! ⚡"
