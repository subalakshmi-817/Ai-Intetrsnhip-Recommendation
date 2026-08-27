import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sampleInternships } from '../data/sampleData';
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  ExternalLink,
  BookOpen,
  CheckCircle,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

export default function SkillGapView() {
  const { profile, addSkill } = useAuth();
  const [selectedDomain, setSelectedDomain] = useState(profile.targetRole || "Software Engineering");

  // Define market expectations for each major domain
  const domainExpectations = {
    "Artificial Intelligence": ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "MLOps", "LangChain", "OpenCV", "NLP"],
    "Software Engineering": ["React", "JavaScript", "TypeScript", "Node.js", "Express", "MongoDB", "FastAPI", "Docker", "Kubernetes", "AWS", "SQL", "PostgreSQL"],
    "Data Science": ["Python", "SQL", "Pandas", "R", "Apache Spark", "PostgreSQL", "Tableau", "PowerBI", "Excel"],
    "Design & Product": ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research", "Agile", "Jira", "Analytics"]
  };

  const expectedSkills = domainExpectations[selectedDomain] || domainExpectations["Software Engineering"];
  
  const mySkillsLower = (profile.skills || []).map(s => s.toLowerCase());
  
  const matchingSkills = expectedSkills.filter(s => mySkillsLower.includes(s.toLowerCase()));
  const missingSkills = expectedSkills.filter(s => !mySkillsLower.includes(s.toLowerCase()));
  
  const totalSkillsCount = expectedSkills.length;
  const matchPercentage = totalSkillsCount > 0 
    ? Math.round((matchingSkills.length / totalSkillsCount) * 100) 
    : 0;

  // Mock study resources
  const studyResources = {
    "Docker": { source: "Docker Docs & Getting Started Guide", type: "Official Docs", time: "3 hours" },
    "Kubernetes": { source: "Kubernetes Up and Running Course", type: "Interactive", time: "6 hours" },
    "PyTorch": { source: "Deep Learning with PyTorch Tutorial", type: "Video Series", time: "8 hours" },
    "MLOps": { source: "Introduction to Machine Learning Pipelines", type: "Guide", time: "4 hours" },
    "TypeScript": { source: "TypeScript Deep Dive Handbook", type: "Reference Book", time: "5 hours" },
    "FastAPI": { source: "FastAPI Complete Web Development Crash Course", type: "Video Tutorial", time: "3 hours" },
    "SQL": { source: "SQL Zoo Interactive Exercises", type: "Practice Lab", time: "4 hours" },
    "PostgreSQL": { source: "Relational Database Design Basics", type: "Lecture Notes", time: "2 hours" },
    "Figma": { source: "Figma UI/UX Design System Course", type: "Interactive", time: "7 hours" },
    "LangChain": { source: "Building Apps with LLMs using LangChain", type: "Guided Code", time: "4 hours" },
    "MongoDB": { source: "NoSQL Architectures & MongoDB Schema Guide", type: "Course", time: "5 hours" },
    "Node.js": { source: "Server-side Javascript Node.js Masterclass", type: "Video Tutorial", time: "10 hours" }
  };

  const handleAcquireSkill = (skill) => {
    addSkill(skill);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Info */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(236, 72, 153, 0.15))', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <span className="badge-glow" style={{ color: '#fdba74', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <Target size={14} /> AI Skill Gap Analyzer
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: '8px' }}>
          Bridge Your Technical Skill Gaps
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '4px' }}>
          Compare your active profile skills against standard market expectations across tech fields. Get tailored courses and instantly boost your matching score by acquiring new tags.
        </p>
      </div>

      {/* Domain Selection Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {Object.keys(domainExpectations).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: selectedDomain === dom ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
              background: selectedDomain === dom ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))' : 'rgba(15, 23, 42, 0.5)',
              color: selectedDomain === dom ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Gap Analysis Statistics Indicator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }} className="gap-analyzer-split">
        
        {/* Match Percentage Display Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>Market Readiness</h4>
          
          <div style={{ position: 'relative', width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ transform: 'rotate(-90deg)', width: '110px', height: '110px' }}>
              <circle cx="55" cy="55" r="48" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
              <circle cx="55" cy="55" r="48" stroke={matchPercentage >= 75 ? "#10b981" : matchPercentage >= 40 ? "#f59e0b" : "#6366f1"} strokeWidth="8" fill="transparent" 
                strokeDasharray="301.6"
                strokeDashoffset={301.6 - (301.6 * matchPercentage) / 100}
                strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>{matchPercentage}%</span>
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
            You match <strong>{matchingSkills.length}</strong> out of <strong>{totalSkillsCount}</strong> recommended core technologies for <strong>{selectedDomain}</strong>.
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} color="var(--accent-emerald)" /> Mapped Technologies ({matchingSkills.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {matchingSkills.length > 0 ? matchingSkills.map((sk, idx) => (
                <span key={idx} style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}>
                  {sk}
                </span>
              )) : (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>None mapped yet. Add skills to matching selection.</span>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} color="var(--primary)" /> Unresolved Skill Gaps ({missingSkills.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {missingSkills.length > 0 ? missingSkills.map((sk, idx) => (
                <span key={idx} style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  color: '#a7f3d0',
                  color: '#c7d2fe',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  fontWeight: 500
                }}>
                  {sk}
                </span>
              )) : (
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>Zero skill gaps! You match all expected tools.</span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Suggested Coursework & Interactive Learning Cards */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} color="var(--primary)" /> Recommended Learning Paths
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="study-resources-grid">
          {missingSkills.map((skill, idx) => {
            const resource = studyResources[skill] || { source: `${skill} documentation & online guides`, type: "Documentation Guide", time: "3 hours" };
            return (
              <div key={idx} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>{skill} Deficit</h4>
                    <span style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)'
                    }}>
                      {resource.type}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BookOpen size={12} /> {resource.source}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Estimated Completion: {resource.time}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    onClick={() => handleAcquireSkill(skill)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Mark as Acquired
                  </button>
                  <button
                    onClick={() => alert(`Redirecting to: ${resource.source}`)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid var(--glass-border)',
                      background: 'rgba(15,23,42,0.4)',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Visit Course Site"
                  >
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            );
          })}

          {missingSkills.length === 0 && (
            <div className="glass-card" style={{ gridColumn: '1 / -1', padding: '36px', textAlign: 'center' }}>
              <CheckCircle size={36} color="var(--accent-emerald)" style={{ margin: '0 auto 8px auto' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Outstanding Standing!</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                You have added all expected tools for {selectedDomain} to your student profile. Explore AI Matches now.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
