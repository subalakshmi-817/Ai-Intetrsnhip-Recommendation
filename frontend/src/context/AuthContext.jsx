import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "Alex Dev",
    email: "alex.dev@college.edu",
    college: "State Tech University",
    degree: "B.Tech in Computer Science",
    gradYear: "2027",
    bio: "Passionate about full-stack web applications and machine learning architectures.",
    targetRole: "Software Engineering",
    skills: ["React", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],
    locations: ["Bengaluru", "Remote", "San Francisco"],
    experience: "1 personal portfolio project, 1 hackathon entry",
    resumeUrl: null,
    resumeName: null,
  });

  const [applications, setApplications] = useState([
    { id: 1, internshipId: 2, status: "Under Review", appliedAt: "2026-08-20" },
    { id: 2, internshipId: 4, status: "Interview Scheduled", appliedAt: "2026-08-22" }
  ]);

  // Load user session from Supabase on mount
  useEffect(() => {
    async function getSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Sync profile email
          setProfile(prev => ({
            ...prev,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || prev.name
          }));
        }
      } catch (err) {
        console.warn("Supabase auth check failed. Using fallback authentication mode.");
      } finally {
        setLoading(false);
      }
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setProfile(prev => ({
          ...prev,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || prev.name
        }));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Demo account login helper
  const loginDemoUser = () => {
    const demoUser = {
      id: "demo-user-123",
      email: "alex.dev@college.edu",
      user_metadata: { full_name: "Alex Dev" }
    };
    setUser(demoUser);
    setProfile(prev => ({
      ...prev,
      name: "Alex Dev",
      email: "alex.dev@college.edu"
    }));
    return true;
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Supabase login error:", error.message);
      // Fallback for easy demo login
      if (email === "demo@demo.com" || email === "alex.dev@college.edu") {
        loginDemoUser();
        return { success: true, fallback: true };
      }
      throw error;
    }
  };

  const signup = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Supabase signup error:", error.message);
      // Auto-fallback mock user
      const mockUser = {
        id: "mock-" + Math.random().toString(36).substr(2, 9),
        email,
        user_metadata: { full_name: fullName }
      };
      setUser(mockUser);
      setProfile(prev => ({
        ...prev,
        name: fullName,
        email: email,
        skills: ["React", "JavaScript", "HTML5"] // empty starter skills
      }));
      return { success: true, fallback: true };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase logout warning");
    } finally {
      setUser(null);
    }
  };

  const updateProfile = (updatedFields) => {
    setProfile(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const addSkill = (skill) => {
    if (!skill) return;
    const cleanSkill = skill.trim();
    if (profile.skills.some(s => s.toLowerCase() === cleanSkill.toLowerCase())) return;
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, cleanSkill]
    }));
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const applyAppliedJob = (internshipId) => {
    if (applications.some(a => a.internshipId === internshipId)) return;
    setApplications(prev => [
      ...prev,
      {
        id: Date.now(),
        internshipId,
        status: "Applied",
        appliedAt: new Date().toISOString().split('T')[0]
      }
    ]);
  };

  // Simulator for resume parser
  const simulateResumeParse = (fileName, fileContent = "") => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Detect skills based on file name or simulated content
        let parsedSkills = ["Python", "SQL", "Docker", "Kubernetes", "AWS", "FastAPI"];
        let detectedDegree = "B.Tech in Computer Science";
        let detectedCollege = "State Tech University";
        let detectedBio = "Developer with experience in cloud technologies, automated workflows, and backend system designs.";
        
        if (fileName.toLowerCase().includes("designer") || fileName.toLowerCase().includes("ux") || fileName.toLowerCase().includes("ui")) {
          parsedSkills = ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research", "React"];
          detectedDegree = "Bachelor of Design";
          detectedBio = "Creative UX specialist focused on user research, UI prototyping, and front-end developer handoff optimization.";
        } else if (fileName.toLowerCase().includes("ml") || fileName.toLowerCase().includes("ai") || fileName.toLowerCase().includes("data")) {
          parsedSkills = ["Python", "PyTorch", "Pandas", "Scikit-Learn", "SQL", "TensorFlow", "MLOps"];
          detectedDegree = "M.Tech in Artificial Intelligence";
          detectedBio = "Data researcher focusing on neural networks, convolutional vision layers, and automated training systems.";
        }

        setProfile(prev => {
          // Combine previous skills with new parsed ones
          const combinedSkills = Array.from(new Set([...prev.skills, ...parsedSkills]));
          return {
            ...prev,
            skills: combinedSkills,
            degree: detectedDegree,
            bio: detectedBio,
            resumeName: fileName,
            resumeUrl: "#" // indicator
          };
        });

        resolve({
          skills: parsedSkills,
          degree: detectedDegree,
          college: detectedCollege,
          bio: detectedBio
        });
      }, 1500); // 1.5s simulated network delay
    });
  };

  // Dynamic matching score algorithm
  const calculateMatch = (internshipSkills = []) => {
    if (!profile.skills || profile.skills.length === 0 || !internshipSkills || internshipSkills.length === 0) {
      return { score: 0, matching: [], missing: [], reasons: ["Add skills to start matching"] };
    }

    const mySkillsLower = profile.skills.map(s => s.toLowerCase());
    const matching = [];
    const missing = [];

    internshipSkills.forEach(skill => {
      if (mySkillsLower.includes(skill.toLowerCase())) {
        matching.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const totalReq = internshipSkills.length;
    const matchCount = matching.length;
    const score = totalReq > 0 ? Math.round((matchCount / totalReq) * 100) : 0;

    // Generate explanations
    const reasons = [];
    if (score >= 75) {
      reasons.push("Strong match: You have almost all the required technologies.");
      reasons.push(`Matches: ${matching.slice(0, 3).join(', ')}`);
    } else if (score >= 40) {
      reasons.push("Moderate match: Add missing skills to improve application standing.");
      reasons.push(`Key skill match: ${matching[0] || 'Domain alignment'}`);
    } else {
      reasons.push("Low skill overlap. See Skill Gap for recommendations.");
    }

    return {
      score,
      matching,
      missing,
      reasons
    };
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      applications,
      loading,
      login,
      signup,
      logout,
      loginDemoUser,
      updateProfile,
      addSkill,
      removeSkill,
      applyAppliedJob,
      simulateResumeParse,
      calculateMatch
    }}>
      {children}
    </AuthContext.Provider>
  );
}
