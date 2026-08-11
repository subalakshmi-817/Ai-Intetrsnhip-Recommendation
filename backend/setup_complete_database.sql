-- =========================================================
-- COMPLETE SUPABASE SETUP SCRIPT FOR AI INTERNSHIP RECOMMENDATION
-- Run this entire script in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/nqqzraeiegxetrzlrpjp/sql
-- =========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DROP EXISTING TABLES IF RE-INITIALIZING
DROP TABLE IF EXISTS public.recommendations CASCADE;
DROP TABLE IF EXISTS public.student_skills CASCADE;
DROP TABLE IF EXISTS public.internships CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- =========================================================
-- 2. PROFILES TABLE
-- =========================================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'recruiter', 'admin')),
    bio TEXT,
    education TEXT,
    resume_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 3. INTERNSHIPS TABLE (Supports all column naming variations)
-- =========================================================
CREATE TABLE public.internships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Role / Title columns
    title TEXT,
    role TEXT,
    
    -- Company columns
    company TEXT,
    company_name TEXT,
    
    -- Domain & Details
    domain TEXT DEFAULT 'Software Engineering',
    location TEXT,
    
    -- Mode / Type columns (e.g. Remote, On-site, Hybrid)
    mode TEXT DEFAULT 'Remote',
    type TEXT DEFAULT 'Remote',
    
    -- Skills columns (TEXT array)
    skills TEXT[] DEFAULT '{}',
    required_skills TEXT[] DEFAULT '{}',
    
    -- Compensation & Duration
    stipend TEXT,
    duration TEXT,
    eligibility TEXT,
    description TEXT,
    
    -- Meta
    posted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger to sync title/role and company/company_name and skills/required_skills
CREATE OR REPLACE FUNCTION sync_internship_columns()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.title IS NULL AND NEW.role IS NOT NULL THEN
        NEW.title := NEW.role;
    ELSIF NEW.role IS NULL AND NEW.title IS NOT NULL THEN
        NEW.role := NEW.title;
    END IF;

    IF NEW.company IS NULL AND NEW.company_name IS NOT NULL THEN
        NEW.company := NEW.company_name;
    ELSIF NEW.company_name IS NULL AND NEW.company IS NOT NULL THEN
        NEW.company_name := NEW.company;
    END IF;

    IF (NEW.skills IS NULL OR cardinality(NEW.skills) = 0) AND NEW.required_skills IS NOT NULL THEN
        NEW.skills := NEW.required_skills;
    ELSIF (NEW.required_skills IS NULL OR cardinality(NEW.required_skills) = 0) AND NEW.skills IS NOT NULL THEN
        NEW.required_skills := NEW.skills;
    END IF;

    IF NEW.mode IS NULL AND NEW.type IS NOT NULL THEN
        NEW.mode := NEW.type;
    ELSIF NEW.type IS NULL AND NEW.mode IS NOT NULL THEN
        NEW.type := NEW.mode;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_internship_columns
BEFORE INSERT OR UPDATE ON public.internships
FOR EACH ROW EXECUTE FUNCTION sync_internship_columns();

-- =========================================================
-- 4. STUDENT_SKILLS TABLE
-- =========================================================
CREATE TABLE public.student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    proficiency_level TEXT DEFAULT 'Intermediate' CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    years_of_experience NUMERIC(3,1) DEFAULT 0.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_student_skill UNIQUE (student_id, skill_name)
);

-- =========================================================
-- 5. RECOMMENDATIONS TABLE
-- =========================================================
CREATE TABLE public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    internship_id UUID NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
    match_score NUMERIC(5,2) NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
    match_reasons JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'saved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_student_internship_recommendation UNIQUE (student_id, internship_id)
);

-- =========================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Internships viewable by everyone" ON public.internships FOR SELECT USING (true);
CREATE POLICY "Recruiters can insert internships" ON public.internships FOR INSERT WITH CHECK (true);

CREATE POLICY "Student skills viewable by authenticated users" ON public.student_skills FOR SELECT USING (true);
CREATE POLICY "Students can manage own skills" ON public.student_skills FOR ALL USING (true);

CREATE POLICY "Recommendations viewable by everyone" ON public.recommendations FOR SELECT USING (true);
