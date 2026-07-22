from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, profile, ai

# Initialize DB tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DevAtlas Backend API",
    description="Unified Developer Profile Platform API with GitHub OAuth, LeetCode, Codeforces, DevScore Engine, and Gemini AI Insights.",
    version="2.0.0"
)

# Enable CORS for frontend Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(ai.router)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "DevAtlas Backend API",
        "version": "2.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
