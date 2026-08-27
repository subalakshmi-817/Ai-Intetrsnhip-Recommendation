import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sampleInternships } from '../data/sampleData';
import InternshipCard from './InternshipCard';
import { Sparkles, SlidersHorizontal, AlertCircle, Search, Compass } from 'lucide-react';

export default function RecommendationView({ onViewDetails }) {
  const { profile, calculateMatch } = useAuth();
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [minMatch, setMinMatch] = useState(0);

  // Compute matches
  const processedRecommendations = sampleInternships.map(internship => {
    const match = calculateMatch(internship.skills);
    return {
      internship,
      match_score: match.score,
      match_reasons: match.reasons,
      matching_skills: match.matching,
      missing_skills: match.missing
    };
  }).sort((a, b) => b.match_score - a.match_score);

  // Filter recommendations
  const filteredRecommendations = processedRecommendations.filter(rec => {
    // 1. Text Search query filter
    const titleMatch = rec.internship.title.toLowerCase().includes(searchQuery.toLowerCase());
    const companyMatch = rec.internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const skillsMatch = rec.internship.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSearch = titleMatch || companyMatch || skillsMatch;

    // 2. Domain filter
    const matchesDomain = selectedDomain === 'All' || rec.internship.domain === selectedDomain;

    // 3. Remote/On-site filter
    const matchesMode = selectedMode === 'All' || rec.internship.type === selectedMode;

    // 4. Match score threshold slider filter
    const matchesThreshold = rec.match_score >= minMatch;

    return matchesSearch && matchesDomain && matchesMode && matchesThreshold;
  });

  const domains = ['All', 'Artificial Intelligence', 'Software Engineering', 'Data Science', 'Design & Product'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge-glow" style={{ marginBottom: '8px' }}>
              <Sparkles size={14} /> AI Recommendations
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              Your Tailored Internship Match Engine
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginTop: '4px' }}>
              Sorted in descending order of compatibility with your profile. Add more skills to increase match relevance.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Filters Panel */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          <SlidersHorizontal size={16} />
          <span>Search & Advanced Filters</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '12px'
        }} className="filters-grid">
          
          {/* Keyword Search */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by role, company or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(15, 23, 42, 0.6)',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Domain Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {domains.map((dom) => (
              <option key={dom} value={dom}>{dom === 'All' ? 'All Domains' : dom}</option>
            ))}
          </select>

          {/* Mode Dropdown */}
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Types</option>
            <option value="On-site">On-site Only</option>
            <option value="Remote">Remote Only</option>
          </select>

          {/* Threshold Filter Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>Min Match Score:</span>
              <span style={{ color: 'var(--primary)' }}>{minMatch}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={minMatch}
              onChange={(e) => setMinMatch(Number(e.target.value))}
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                outline: 'none',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            />
          </div>

        </div>
      </div>

      {/* Grid: Recommendation cards results */}
      {filteredRecommendations.length === 0 ? (
        <div className="glass-card" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <AlertCircle size={40} color="#f59e0b" />
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>No matching internships found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '6px', maxWidth: '460px' }}>
              Try lowering the minimum match threshold, clearing some filter rules, or adding more technical skills to your student profile.
            </p>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {filteredRecommendations.map((rec) => (
            <InternshipCard
              key={rec.internship.id}
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
