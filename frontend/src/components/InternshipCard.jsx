import React from 'react';
import { MapPin, DollarSign, Calendar, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export default function InternshipCard({ item, matchScore, matchReasons, onViewDetails }) {
  const title = item.title || item.role || 'Internship Position';
  const company = item.company || item.company_name || 'Tech Company';
  const domain = item.domain || 'Software Engineering';
  const location = item.location || 'Remote';
  const stipend = item.stipend || 'Competitive';
  const duration = item.duration || '3 Months';
  
  // Format required skills
  const rawSkills = item.required_skills || item.skills || [];
  const skillsList = Array.isArray(rawSkills) 
    ? rawSkills 
    : String(rawSkills).replace(/[{}]/g, '').split(',').map(s => s.trim()).filter(Boolean);

  let matchClass = 'match-low';
  if (matchScore >= 75) matchClass = 'match-high';
  else if (matchScore >= 45) matchClass = 'match-mid';

  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Banner / Match Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div>
          <span className="badge-glow" style={{ marginBottom: '8px' }}>
            {domain}
          </span>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>{title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            <Building2 size={16} />
            <span>{company}</span>
          </div>
        </div>

        {matchScore !== undefined && (
          <div className={`match-badge ${matchClass}`}>
            <Sparkles size={16} />
            <span>{matchScore}% Match</span>
          </div>
        )}
      </div>

      {/* Details Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <MapPin size={14} color="var(--accent-cyan)" />
          <span>{location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <DollarSign size={14} color="var(--accent-emerald)" />
          <span>{stipend}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Calendar size={14} color="#c084fc" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Required Skills Tags */}
      <div>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Required Skills</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skillsList.slice(0, 5).map((skill, i) => (
            <span key={i} style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#e2e8f0', padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem' }}>
              {skill}
            </span>
          ))}
          {skillsList.length > 5 && (
            <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', alignSelf: 'center' }}>+{skillsList.length - 5} more</span>
          )}
        </div>
      </div>

      {/* AI Reasons Breakdown if provided */}
      {matchReasons && matchReasons.length > 0 && (
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', borderRadius: '10px', padding: '10px 12px', borderLeft: '3px solid var(--primary)' }}>
          {matchReasons.map((reason, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#c7d2fe' }}>
              <CheckCircle2 size={13} color="#818cf8" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={() => onViewDetails(item)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
          color: '#ffffff',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: '4px',
          transition: 'all 0.2s'
        }}
      >
        View Details & Apply
      </button>

    </div>
  );
}
