const API_BASE_URL = "http://127.0.0.1:8000/api";

export interface UserProfileData {
  github_username: string;
  leetcode_username?: string;
  codeforces_username?: string;
  avatar_url?: string;
  dev_score: number;
  streak: number;
  xp: number;
  level: number;
  github_stats: {
    repos_count: number;
    commit_count: number;
    languages: string[];
    contribution_streak: number;
    stars_received: number;
  };
  leetcode_stats: {
    total_solved: number;
    easy_solved: number;
    medium_solved: number;
    hard_solved: number;
    contest_rating?: number;
    topics_breakdown: Record<string, number>;
  };
  codeforces_stats: {
    rating: number;
    rank: string;
    max_rating: number;
    contests_count: number;
    verdict_counts: Record<string, number>;
  };
  score_breakdown: {
    github_score: number;
    leetcode_score: number;
    codeforces_score: number;
    total_score: number;
    weights_used: Record<string, number>;
  };
  ai_insights?: string;
}

export async function fetchUserProfile(username: string): Promise<UserProfileData> {
  const response = await fetch(`${API_BASE_URL}/profile/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }
  return response.json();
}

export async function sendAiChat(prompt: string, userContext?: any): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, user_context: userContext }),
  });
  if (!response.ok) {
    throw new Error(`AI Chat API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.reply;
}

export async function getGitHubAuthUrl(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/github/login`);
  if (!response.ok) {
    throw new Error("Failed to get GitHub Auth URL");
  }
  const data = await response.json();
  return data.url;
}
