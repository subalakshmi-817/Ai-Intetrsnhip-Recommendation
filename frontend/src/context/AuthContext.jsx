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

  // Helper to fetch user profile and skills from Supabase
  const fetchProfileAndSkills = async (currentUser) => {
    if (!currentUser?.id || currentUser.id.startsWith('demo') || currentUser.id.startsWith('mock')) return;
    try {
      // 1. Fetch from profiles table
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile does not exist yet (trigger might not have run or database trigger wasn't created)
        // Let's create it manually
        const newProfile = {
          id: currentUser.id,
          full_name: currentUser.user_metadata?.full_name || 'Student User',
          email: currentUser.email,
          role: 'student'
        };
        const { data: inserted, error: insertError } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();
        if (!insertError) {
          profileData = inserted;
        }
      }

      // 2. Fetch skills
      const { data: skillsData } = await supabase
        .from('student_skills')
        .select('skill_name')
        .eq('student_id', currentUser.id);

      if (profileData) {
        const eduParts = (profileData.education || '').split(' | ');
        setProfile({
          name: profileData.full_name || '',
          email: profileData.email || '',
          college: eduParts[0] || '',
          degree: eduParts[1] || '',
          gradYear: eduParts[2] || '',
          bio: profileData.bio || '',
          targetRole: 'Software Engineering', // default target role
          skills: skillsData ? skillsData.map(s => s.skill_name) : [],
          locations: ["Bengaluru", "Remote", "San Francisco"],
          experience: '',
          resumeUrl: profileData.resume_url || null,
          resumeName: profileData.resume_url ? 'Uploaded Resume' : null
        });
      }
    } catch (err) {
      console.error("Error fetching profile and skills:", err);
    }
  };

  // Load user session from Supabase on mount
  useEffect(() => {
    async function getSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await fetchProfileAndSkills(session.user);
        }
      } catch (err) {
        console.warn("Supabase auth check failed. Using fallback authentication mode.");
      } finally {
        setLoading(false);
      }
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfileAndSkills(session.user);
      } else {
        setUser(null);
        // Reset to default
        setProfile({
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
    setProfile({
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

  const updateProfile = async (updatedFields) => {
    setProfile(prev => ({
      ...prev,
      ...updatedFields
    }));

    if (user?.id && !user.id.startsWith('demo') && !user.id.startsWith('mock')) {
      try {
        const payload = {};
        if (updatedFields.name !== undefined) payload.full_name = updatedFields.name;
        if (updatedFields.bio !== undefined) payload.bio = updatedFields.bio;
        if (updatedFields.college !== undefined || updatedFields.degree !== undefined || updatedFields.gradYear !== undefined) {
          const col = updatedFields.college !== undefined ? updatedFields.college : profile.college;
          const deg = updatedFields.degree !== undefined ? updatedFields.degree : profile.degree;
          const yr = updatedFields.gradYear !== undefined ? updatedFields.gradYear : profile.gradYear;
          payload.education = `${col} | ${deg} | ${yr}`;
        }
        if (updatedFields.resumeUrl !== undefined) payload.resume_url = updatedFields.resumeUrl;

        if (Object.keys(payload).length > 0) {
          const { error } = await supabase
            .from('profiles')
            .update(payload)
            .eq('id', user.id);
          if (error) throw error;
        }
      } catch (err) {
        console.error("Error updating profile in Supabase:", err.message);
      }
    }
  };

  const addSkill = async (skill) => {
    if (!skill) return;
    const cleanSkill = skill.trim();
    if (profile.skills.some(s => s.toLowerCase() === cleanSkill.toLowerCase())) return;
    
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, cleanSkill]
    }));

    if (user?.id && !user.id.startsWith('demo') && !user.id.startsWith('mock')) {
      try {
        const { error } = await supabase
          .from('student_skills')
          .insert([{
            student_id: user.id,
            skill_name: cleanSkill,
            proficiency_level: 'Intermediate'
          }]);
        if (error) throw error;
      } catch (err) {
        console.error("Error adding skill to Supabase:", err.message);
      }
    }
  };

  const removeSkill = async (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));

    if (user?.id && !user.id.startsWith('demo') && !user.id.startsWith('mock')) {
      try {
        const { error } = await supabase
          .from('student_skills')
          .delete()
          .eq('student_id', user.id)
          .eq('skill_name', skillToRemove);
        if (error) throw error;
      } catch (err) {
        console.error("Error removing skill from Supabase:", err.message);
      }
    }
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
