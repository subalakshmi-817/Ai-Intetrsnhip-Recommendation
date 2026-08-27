from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from backend.database import (
    get_all_internships,
    get_internship_by_id,
    get_or_create_profile,
    get_student_skills,
    save_student_skills,
    save_recommendations
)
from backend.recommendation_engine import calculate_recommendations

app = FastAPI(
    title="AI Internship Recommendation API",
    description="Backend API for AI Internship Recommendation System with Supabase integration",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SkillItem(BaseModel):
    skill_name: str
    proficiency_level: Optional[str] = "Intermediate"
    years_of_experience: Optional[float] = 0.0

class RecommendationRequest(BaseModel):
    student_id: Optional[str] = "demo-student-id"
    skills: List[SkillItem]
    preferred_domain: Optional[str] = None
    top_k: Optional[int] = 20

@app.get("/")
def read_root():
    return {
        "message": "Welcome to AI Internship Recommendation System API",
        "status": "online",
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/internships")
def list_internships(
    domain: Optional[str] = Query(None, description="Filter by domain"),
    search: Optional[str] = Query(None, description="Search query"),
    limit: int = Query(150, ge=1, le=200)
):
    try:
        data = get_all_internships(domain=domain, search=search, limit=limit)
        return {"count": len(data), "internships": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/internships/{internship_id}")
def get_internship_details(internship_id: str):
    item = get_internship_by_id(internship_id)
    if not item:
        raise HTTPException(status_code=404, detail="Internship not found")
    return item

@app.get("/api/domains")
def get_domains():
    return {
        "domains": [
            "All",
            "Artificial Intelligence",
            "Data Science",
            "Software Engineering",
            "Design & Product"
        ]
    }

@app.post("/api/recommend")
def get_ai_recommendations(req: RecommendationRequest):
    try:
        # Fetch all available internships
        internships = get_all_internships(limit=200)
        
        skills_dicts = [s.model_dump() for s in req.skills]
        
        # Calculate AI match scores
        recommendations = calculate_recommendations(
            student_skills=skills_dicts,
            internships=internships,
            preferred_domain=req.preferred_domain,
            top_k=req.top_k or 20
        )
        
        return {
            "total_matches": len(recommendations),
            "recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
