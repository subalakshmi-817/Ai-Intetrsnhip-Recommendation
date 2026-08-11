import React from 'react';
import { Sparkles, Briefcase, UserCheck, Search } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, searchTerm, setSearchTerm }) {
  return (
    <header className="glass-card" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, background: 'linear-gradient(135deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              InternAI
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Internship Recommendation System</p>
          </div>
        </div>

        {/* Global Search */}
        <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search internships, companies, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('recommendations')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              border: activeTab === 'recommendations' ? '1px solid var(--primary)' : '1px solid transparent',
              background: activeTab === 'recommendations' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))' : 'transparent',
              color: activeTab === 'recommendations' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={18} color={activeTab === 'recommendations' ? '#c084fc' : 'currentColor'} />
            AI Matches
          </button>

          <button
            onClick={() => setActiveTab('browse')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              border: activeTab === 'browse' ? '1px solid var(--primary)' : '1px solid transparent',
              background: activeTab === 'browse' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))' : 'transparent',
              color: activeTab === 'browse' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            <Briefcase size={18} color={activeTab === 'browse' ? '#6366f1' : 'currentColor'} />
            Browse All
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              border: activeTab === 'profile' ? '1px solid var(--primary)' : '1px solid transparent',
              background: activeTab === 'profile' ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))' : 'transparent',
              color: activeTab === 'profile' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            <UserCheck size={18} color={activeTab === 'profile' ? '#10b981' : 'currentColor'} />
            My Skills
          </button>
        </nav>

      </div>
    </header>
  );
}
