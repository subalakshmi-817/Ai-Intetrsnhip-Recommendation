import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Database, CheckCircle, Bell } from 'lucide-react';

export default function Navbar({ activeTab }) {
  const { user } = useAuth();

  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Student Portal Dashboard';
      case 'recommendations': return 'AI Recommendation Engine';
      case 'browse': return 'Explore All Internships';
      case 'resume': return 'Resume Parsing Engine';
      case 'skillgap': return 'AI Skill Gap Analyzer';
      case 'profile': return 'Profile Settings';
      default: return 'AI Internship Recommendation';
    }
  };

  const getSubtitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Overview of recommendations, resume mappings, and active applications';
      case 'recommendations': return 'Top matched listings ranked by semantic skill alignment';
      case 'browse': return 'Explore all general positions in the university database';
      case 'resume': return 'Extract skills and update recommendations from your CV';
      case 'skillgap': return 'Identify deficiencies, check learning resource tags and boost compatibility';
      case 'profile': return 'Customize target role domain, skills list, and educational program';
      default: return 'University portal';
    }
  };

  return (
    <header style={{
      padding: '20px 32px',
      borderBottom: '1px solid var(--glass-border)',
      background: 'rgba(9, 13, 22, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 5
    }}>
      
      {/* Title block */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
          {getTitle()}
        </h2>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          {getSubtitle()}
        </p>
      </div>

      {/* Operations Indicator Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Supabase Status indicator */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          background: 'rgba(16, 185, 129, 0.05)', 
          border: '1px solid rgba(16, 185, 129, 0.2)',
          padding: '6px 12px',
          borderRadius: '8px'
        }}>
          <Database size={13} color="#10b981" />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34d399' }}>
            {user ? "Cloud Sync (Supabase)" : "Local Simulation Mode"}
          </span>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }}></div>
        </div>

        {/* Notifications pill */}
        <button style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--glass-border)',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <Bell size={16} />
          <div style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--primary)'
          }}></div>
        </button>

      </div>

    </header>
  );
}
