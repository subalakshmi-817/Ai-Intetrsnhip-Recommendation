import React from 'react';
import { X, MapPin, DollarSign, Calendar, Building2, CheckCircle, Award } from 'lucide-react';

export default function InternshipModal({ item, onClose }) {
  if (!item) return null;

  const title = item.title || item.role || 'Internship Position';
  const company = item.company || item.company_name || 'Company';
  const domain = item.domain || 'Software Engineering';
  const location = item.location || 'Remote';
  const stipend = item.stipend || 'Competitive';
  const duration = item.duration || '3 Months';
  const eligibility = item.eligibility || 'Open to CS/AI students';
  const description = item.description || 'No description provided.';
  
  const rawSkills = item.required_skills || item.skills || [];
  const skillsList = Array.isArray(rawSkills) 
    ? rawSkills 
    : String(rawSkills).replace(/[{}]/g, '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative',
        border: '1px solid rgba(168, 85, 247, 0.3)'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px', right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Header info */}
        <span className="badge-glow">{domain}</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '10px', color: '#ffffff' }}>{title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontSize: '1rem', marginTop: '4px', fontWeight: 600 }}>
          <Building2 size={18} />
          <span>{company}</span>
        </div>

        {/* Quick Facts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', margin: '24px 0', padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Location</span>
            <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <MapPin size={14} color="var(--accent-cyan)" /> {location}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Stipend</span>
            <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <DollarSign size={14} color="var(--accent-emerald)" /> {stipend}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Duration</span>
            <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <Calendar size={14} color="#c084fc" /> {duration}
            </span>
          </div>
        </div>

        {/* Required Skills */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Required Skills & Expertise</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skillsList.map((skill, idx) => (
              <span key={idx} style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#ffffff', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500 }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} color="var(--accent-emerald)" /> Eligibility
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>{eligibility}</p>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Role Description</h4>
          <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{description}</p>
        </div>

        {/* Apply Button */}
        <button
          onClick={() => {
            alert(`Application for '${title}' at ${company} submitted successfully!`);
            onClose();
          }}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.2s'
          }}
        >
          Submit Internship Application
        </button>

      </div>
    </div>
  );
}
