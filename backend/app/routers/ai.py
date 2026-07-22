from fastapi import APIRouter
from app.schemas import AiChatRequest, AiChatResponse
from app.services.ai_service import answer_ai_chat

router = APIRouter(prefix="/api/ai", tags=["AI"])

@router.post("/chat", response_model=AiChatResponse)
async def chat_with_ai(payload: AiChatRequest):
    """Processes user coding questions or roadmap queries and returns AI-generated advice."""
    reply = await answer_ai_chat(prompt=payload.prompt, user_context=payload.user_context)
    return {"reply": reply}
