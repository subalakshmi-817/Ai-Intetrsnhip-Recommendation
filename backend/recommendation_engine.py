from typing import List, Dict, Any

PROFICIENCY_WEIGHTS = {
    "Beginner": 0.7,
    "Intermediate": 1.0,
    "Advanced": 1.25,
    "Expert": 1.5
}

def calculate_recommendations(
    student_skills: List[Dict[str, Any]],
    internships: List[Dict[str, Any]],
    preferred_domain: str = None,
    top_k: int = 20
) -> List[Dict[str, Any]]:
    """
    Computes AI recommendation match score (0-100%) for student skills against internships.
    """
    if not student_skills or not internships:
        return []
        
    # Map student skills to lower case & proficiency weight
    student_skill_map = {}
    for sk in student_skills:
        name = (sk.get("skill_name") or "").strip().lower()
        if name:
            level = sk.get("proficiency_level", "Intermediate")
            weight = PROFICIENCY_WEIGHTS.get(level, 1.0)
            student_skill_map[name] = {
                "original_name": sk.get("skill_name"),
                "level": level,
                "weight": weight
            }
            
    recommendations = []

    for item in internships:
        # Extract skills required
        raw_req = item.get("required_skills") or item.get("skills") or []
        if isinstance(raw_req, str):
            req_skills = [s.strip() for s in raw_req.replace("{", "").replace("}", "").split(",") if s.strip()]
        else:
            req_skills = [str(s).strip() for s in raw_req if str(s).strip()]
            
        req_skills_lower = [s.lower() for s in req_skills]
        
        if not req_skills_lower:
            continue
            
        matched_skills = []
        missing_skills = []
        earned_points = 0.0

        for idx, skill_lower in enumerate(req_skills_lower):
            original_skill_name = req_skills[idx]
            
            # Check direct or partial match
            match_found = False
            for st_skill, st_info in student_skill_map.items():
                if st_skill == skill_lower or st_skill in skill_lower or skill_lower in st_skill:
                    earned_points += st_info["weight"]
                    matched_skills.append(st_info["original_name"])
                    match_found = True
                    break
                    
            if not match_found:
                missing_skills.append(original_skill_name)
                
        # Base score ratio
        total_possible = len(req_skills_lower)
        raw_ratio = earned_points / total_possible if total_possible > 0 else 0
        base_score = min(raw_ratio * 100.0, 100.0)
        
        # Domain bonus (+15% boost if domain aligns)
        domain_match = False
        item_domain = (item.get("domain") or "").strip().lower()
        if preferred_domain and preferred_domain.lower() != "all":
            if item_domain == preferred_domain.lower():
                base_score = min(base_score + 15.0, 100.0)
                domain_match = True
                
        # Round to 1 decimal
        final_score = round(base_score, 1)
        
        # Generate match explanation reasons
        match_reasons = []
        if matched_skills:
            match_reasons.append(f"Matched {len(matched_skills)} skills: {', '.join(matched_skills[:4])}")
        if missing_skills:
            match_reasons.append(f"Skills to learn: {', '.join(missing_skills[:3])}")
        if domain_match:
            match_reasons.append(f"Matches your target domain '{item.get('domain')}'")

        recommendations.append({
            "internship_id": item.get("id"),
            "internship": item,
            "match_score": final_score,
            "matched_skills": list(set(matched_skills)),
            "missing_skills": missing_skills,
            "match_reasons": match_reasons,
            "status": "pending"
        })

    # Sort in descending order of match score
    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    
    return recommendations[:top_k]
