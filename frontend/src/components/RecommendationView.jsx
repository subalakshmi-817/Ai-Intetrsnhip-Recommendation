import React, { useState } from 'react';
import InternshipCard from './InternshipCard';
import { Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';

export default function RecommendationView({ recommendations, onViewDetails, onGoToSkills, skillsCount }) {
  const [minMatch, setMinMatch] = useState(0);

  const filteredRecs = recommendations.filter(r => (r.match_score || 0) >= minMatch);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge-glow" style={{ marginBottom: '8px' }}>
              <Sparkles size={14} /> AI Recommendation Engine
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              Top Matched Internships for You
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginTop: '4px' }}>
              Ranked dynamically by matching your skill set ({skillsCount} skills active) against required internship qualifications.
            </p>
          </div>

          <button
            onClick={onGoToSkills}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.88rem'
            }}
          >
            Edit Skill Inventory
          </button>
        </div>
      </div>

      {/* Score Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <SlidersHorizontal size={18} />
          <span>Minimum Match Threshold:</span>
          <select
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#ffffff',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          >
            <option value={0}>All Matches (0%+)</option>
            <option value={40}>Above 40% Match</option>
            <option value={60}>Above 60% Match</option>
            <option value={75}>High Match Only (75%+)</option>
          </select>
        </div>

        <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Showing {filteredRecs.length} recommendations
        </span>
      </div>

      {/* Recommendation Grid */}
      {filteredRecs.length === 0 ? (
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
          <AlertCircle size={40} color="#f59e0b" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>No Recommendations Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px', maxWidth: '500px', margin: '6px auto 20px auto' }}>
            {skillsCount === 0 
              ? "You haven't added any skills to your profile yet! Add your skills to generate AI recommendation match rankings."
              : "Try lowering your minimum match threshold or adding more skills to your profile."}
          </p>
          <button
            onClick={onGoToSkills}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Add Skills to Profile
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredRecs.map((rec, idx) => (
            <InternshipCard
              key={idx}
              item={rec.internship}
              matchScore={rec.match_score}
              matchReasons={rec.match_reasons}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}

    </div>
  );
}
