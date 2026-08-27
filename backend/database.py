import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY") or os.environ.get("SUPABASE_ANON_KEY", "")

supabase_client: Optional[Client] = None

def get_supabase() -> Client:
    global supabase_client
    if supabase_client is None:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("SUPABASE_URL and SUPABASE_KEY environment variables must be set.")
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase_client

def get_all_internships(domain: Optional[str] = None, search: Optional[str] = None, limit: int = 150) -> List[Dict[str, Any]]:
    client = get_supabase()
    query = client.table("internships").select("*")
    
    if domain and domain.lower() != "all":
        query = query.eq("domain", domain)
        
    res = query.order("created_at", desc=True).limit(limit).execute()
    data = res.data or []
    
    if search:
        s = search.lower()
        filtered = []
        for item in data:
            title = (item.get("title") or item.get("role") or "").lower()
            company = (item.get("company") or item.get("company_name") or "").lower()
            desc = (item.get("description") or "").lower()
            skills = " ".join(item.get("required_skills") or item.get("skills") or []).lower()
            
            if s in title or s in company or s in desc or s in skills:
                filtered.append(item)
        return filtered
        
    return data

def get_internship_by_id(internship_id: str) -> Optional[Dict[str, Any]]:
    client = get_supabase()
    res = client.table("internships").select("*").eq("id", internship_id).execute()
    data = res.data or []
    return data[0] if data else None

def get_or_create_profile(user_id: str, email: str, full_name: str, role: str = "student") -> Dict[str, Any]:
    client = get_supabase()
    res = client.table("profiles").select("*").eq("id", user_id).execute()
    if res.data:
        return res.data[0]
        
    new_profile = {
        "id": user_id,
        "email": email,
        "full_name": full_name,
        "role": role
    }
    insert_res = client.table("profiles").insert(new_profile).execute()
    return insert_res.data[0] if insert_res.data else new_profile

def get_student_skills(student_id: str) -> List[Dict[str, Any]]:
    client = get_supabase()
    res = client.table("student_skills").select("*").eq("student_id", student_id).execute()
    return res.data or []

def save_student_skills(student_id: str, skills: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    client = get_supabase()
    # Remove existing skills for clean update
    client.table("student_skills").delete().eq("student_id", student_id).execute()
    
    if not skills:
        return []
        
    records = []
    for skill in skills:
        records.append({
            "student_id": student_id,
            "skill_name": skill.get("skill_name"),
            "proficiency_level": skill.get("proficiency_level", "Intermediate"),
            "years_of_experience": skill.get("years_of_experience", 0.0)
        })
        
    res = client.table("student_skills").insert(records).execute()
    return res.data or []

def save_recommendations(student_id: str, recommendations: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    client = get_supabase()
    client.table("recommendations").delete().eq("student_id", student_id).execute()
    
    if not recommendations:
        return []
        
    records = []
    for rec in recommendations:
        records.append({
            "student_id": student_id,
            "internship_id": rec.get("internship_id"),
            "match_score": rec.get("match_score"),
            "match_reasons": rec.get("match_reasons", []),
            "status": rec.get("status", "pending")
        })
        
    res = client.table("recommendations").insert(records).execute()
    return res.data or []
