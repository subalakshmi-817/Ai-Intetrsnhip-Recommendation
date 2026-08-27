import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, MapPin, DollarSign, Calendar, Building2, CheckCircle2, AlertTriangle, Sparkles, Award } from 'lucide-react';

export default function InternshipModal({ item, onClose }) {
  const { calculateMatch, applyAppliedJob, applications } = useAuth();
  const [successMsg, setSuccessMsg] = useState('');

  if (!item) return null;

  const title = item.title || item.role || 'Internship Position';
  const company = item.company || item.company_name || 'Company';
  const domain = item.domain || 'Software Engineering';
  const location = item.location || 'Remote';
  const stipend = item.stipend || 'Competitive';
  const duration = item.duration || '3 Months';
  const eligibility = item.eligibility || 'Open to CS/AI students';
  const description = item.description || 'No description provided.';
  
  // Calculate dynamic match values
  const match = calculateMatch(item.skills);
  const matchPercent = match.score;
  const matchingSkills = match.matching;
  const missingSkills = match.missing;
  const matchReasons = match.reasons;

  // Check if already applied
  const isApplied = applications.some(app => app.internshipId === item.id);

  const handleApply = () => {
    applyAppliedJob(item.id);
    setSuccessMsg('Your application has been compiled with AI matches and sent successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 2000);
  };

  let matchClass = 'match-low';
  if (matchPercent >= 75) matchClass = 'match-high';
  else if (matchPercent >= 45) matchClass = 'match-mid';

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '700px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        background: 'rgba(18, 26, 43, 0.95)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px', right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', paddingRight: '40px' }}>
          <div>
            <span className="badge-glow">{domain}</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '10px', color: '#ffffff' }}>{title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontSize: '1.05rem', marginTop: '6px', fontWeight: 600 }}>
              <Building2 size={18} />
              <span>{company}</span>
            </div>
          </div>

          <div className={`match-badge ${matchClass}`} style={{ transform: 'scale(1.05)', alignSelf: 'flex-start' }}>
            <Sparkles size={16} />
            <span>{matchPercent}% AI Match</span>
          </div>
        </div>

        {/* Quick details bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '12px', 
          margin: '24px 0', 
          padding: '16px', 
          background: 'rgba(15, 23, 42, 0.6)', 
          borderRadius: '12px', 
          border: '1px solid var(--glass-border)' 
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Location</span>
            <span style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <MapPin size={14} color="var(--accent-cyan)" /> {location}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Stipend</span>
            <span style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <DollarSign size={14} color="var(--accent-emerald)" /> {stipend}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Duration</span>
            <span style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <Calendar size={14} color="#c084fc" /> {duration}
            </span>
          </div>
        </div>

        {/* Success Alert toast inside modal */}
        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            color: '#34d399',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* AI Recommendation Explanation Section */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          borderLeft: '4px solid var(--primary)',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '24px'
        }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Sparkles size={16} color="#c084fc" /> Why this internship is recommended
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {matchReasons.map((reason, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#e0e7ff', lineHeight: 1.4 }}>
                <CheckCircle2 size={14} color="#a5b4fc" style={{ marginTop: '2px', minWidth: '14px' }} />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap Comparison Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px'
        }} className="modal-skills-split">
          
          {/* Matches */}
          <div className="glass-card" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.15)' }}>
            <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <CheckCircle2 size={14} /> Matching Skills ({matchingSkills.length})
            </h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {matchingSkills.length > 0 ? matchingSkills.map((sk, i) => (
                <span key={i} style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#a7f3d0', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                  {sk}
                </span>
              )) : (
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>No overlapping skills found.</span>
              )}
            </div>
          </div>

          {/* Missing (Skill Gaps) */}
          <div className="glass-card" style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.03)', borderColor: 'rgba(239, 68, 68, 0.15)' }}>
            <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <AlertTriangle size={14} /> Skill Gaps ({missingSkills.length})
            </h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {missingSkills.length > 0 ? missingSkills.map((sk, i) => (
                <span key={i} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                  {sk}
                </span>
              )) : (
                <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>100% matched! Zero gaps.</span>
              )}
            </div>
          </div>

        </div>

        {/* Eligibility Details */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} color="var(--accent-cyan)" /> Eligibility
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5' }}>{eligibility}</p>
        </div>

        {/* Description Text */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Role Description</h4>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{description}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleApply}
          disabled={isApplied || successMsg}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: isApplied ? 'var(--text-dim)' : 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: isApplied ? 'not-allowed' : 'pointer',
            boxShadow: isApplied ? 'none' : '0 4px 20px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {isApplied ? "Already Submitted Application" : "Apply Instantly with AI Resume Mappings"}
        </button>

      </div>
    </div>
  );
}
