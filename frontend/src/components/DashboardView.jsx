import React from 'react';
import { useAuth } from '../context/AuthContext';
import { sampleInternships } from '../data/sampleData';
import { 
  Sparkles, 
  TrendingUp, 
  FileCheck, 
  Send,
  ArrowRight,
  BookOpen,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function DashboardView({ setActiveTab, onViewDetails }) {
  const { profile, applications, calculateMatch } = useAuth();

  // Process all internships for match scores
  const scoredInternships = sampleInternships.map(internship => {
    const match = calculateMatch(internship.skills);
    return {
      internship,
      match_score: match.score,
      match_reasons: match.reasons,
      matching_skills: match.matching,
      missing_skills: match.missing
    };
  }).sort((a, b) => b.match_score - a.match_score);

  // Compute stats
  const highCompatCount = scoredInternships.filter(item => item.match_score >= 75).length;
  const averageMatch = scoredInternships.length > 0 
    ? Math.round(scoredInternships.reduce((acc, curr) => acc + curr.match_score, 0) / scoredInternships.length)
    : 0;

  const topMatches = scoredInternships.slice(0, 3);
  const totalSkills = profile.skills?.length || 0;

  // Calculate profile completion percentage
  let profileScore = 20; // baseline
  if (profile.resumeName) profileScore += 30;
  if (totalSkills > 2) profileScore += 20;
  if (totalSkills > 5) profileScore += 10;
  if (profile.bio) profileScore += 10;
  if (profile.experience) profileScore += 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome & Profile Progress Header */}
      <div className="glass-card" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div>
          <span className="badge-glow" style={{ marginBottom: '10px' }}>
            <Sparkles size={13} /> Active Student Dashboard
          </span>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            Welcome back, {profile.name}!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', maxWidth: '600px' }}>
            Your custom AI recommendations are updated based on your skill inventory. Currently targeting roles in <strong style={{ color: '#ffffff' }}>{profile.targetRole}</strong>.
          </p>
        </div>

        {/* Profile Completion Circle Gauge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(15,23,42,0.4)', padding: '12px 20px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <div style={{ position: 'relative', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
            <svg style={{ transform: 'rotate(-90deg)', width: '56px', height: '56px' }}>
              <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.06)" strokeWidth="5" fill="transparent" />
              <circle cx="28" cy="28" r="24" stroke="url(#gradient)" strokeWidth="5" fill="transparent" 
                strokeDasharray="150.7"
                strokeDashoffset={150.7 - (150.7 * profileScore) / 100}
                strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#ffffff' }}>
              {profileScore}%
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Profile Completion</h4>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {profileScore === 100 ? "Fully optimized profile!" : "Upload resume to boost matching score"}
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Statistics Counters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {[
          { label: "Top Recommendation Match", val: topMatches[0] ? `${topMatches[0].match_score}%` : '0%', desc: "Highest compatibility found", icon: Sparkles, color: "#a855f7" },
          { label: "High Match Offers (75%+)", val: highCompatCount, desc: "Immediate matches available", icon: TrendingUp, color: "#10b981" },
          { label: "Profile Skill Assets", val: totalSkills, desc: "Actively mapped to resume", icon: FileCheck, color: "#06b6d4" },
          { label: "Applications Submitted", val: applications.length, desc: "Tracked in portal", icon: Send, color: "#3b82f6" }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                background: `rgba(${stat.color === '#a855f7' ? '168, 85, 247' : stat.color === '#10b981' ? '16, 185, 129' : stat.color === '#06b6d4' ? '6, 182, 212' : '59, 130, 246'}, 0.1)`,
                border: `1px solid rgba(${stat.color === '#a855f7' ? '168, 85, 247' : stat.color === '#10b981' ? '16, 185, 129' : stat.color === '#06b6d4' ? '6, 182, 212' : '59, 130, 246'}, 0.25)`,
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={22} color={stat.color} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.5px', fontWeight: 600 }}>{stat.label}</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: '2px 0' }}>{stat.val}</h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{stat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }} className="dashboard-grid-split">
        
        {/* Left Column: Top Match Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#a855f7" /> Top AI Recommendation Matches
            </h3>
            <button 
              onClick={() => setActiveTab('recommendations')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              See all recommendations <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topMatches.map((item, idx) => {
              const matchPercent = item.match_score;
              let matchClass = 'match-low';
              if (matchPercent >= 75) matchClass = 'match-high';
              else if (matchPercent >= 45) matchClass = 'match-mid';

              return (
                <div key={idx} className="glass-card" style={{
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  position: 'relative'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)'
                      }}>
                        {item.internship.domain}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        • {item.internship.company}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                      {item.internship.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', gap: '10px' }}>
                      <span>📍 {item.internship.location}</span>
                      <span>💰 {item.internship.stipend}</span>
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <div className={`match-badge ${matchClass}`} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                      {matchPercent}% Match
                    </div>
                    <button
                      onClick={() => onViewDetails(item.internship)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      Analyze Match
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Actions, Skill gaps snapshot & Resume Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Resume Upload Status Panel */}
          <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCheck size={16} color="#10b981" /> Resume Status
            </h4>
            
            {profile.resumeName ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={14} color="#10b981" />
                  <span style={{ fontSize: '0.78rem', color: '#a7f3d0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', flex: 1 }}>
                    {profile.resumeName}
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Your profile skills are synced with this resume.
                </p>
                <button
                  onClick={() => setActiveTab('resume')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    padding: 0
                  }}
                >
                  Upload new version →
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.06)',
                  border: '1px solid rgba(245, 158, 11, 0.15)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertTriangle size={14} color="#f59e0b" />
                  <span style={{ fontSize: '0.78rem', color: '#fef3c7' }}>
                    No Resume Uploaded
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Upload a PDF to parse your technical skill-set automatically.
                </p>
                <button
                  onClick={() => setActiveTab('resume')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '4px'
                  }}
                >
                  Upload & Parse Resume
                </button>
              </div>
            )}
          </div>

          {/* Quick Skill Gap Summary */}
          <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} color="#f59e0b" /> Skill Gap Action List
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Top missing skills from internships in your target domain:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '4px 0' }}>
              {["Docker", "Kubernetes", "PyTorch", "MLOps"].map((sk, i) => (
                <span key={i} style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  color: '#fdba74',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 600
                }}>
                  {sk}
                </span>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('skillgap')}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '8px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              Analyze Skill Gaps
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
