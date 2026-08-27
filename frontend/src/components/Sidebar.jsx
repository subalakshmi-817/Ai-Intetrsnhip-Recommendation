import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Sparkles, 
  Briefcase, 
  FileUp, 
  Target, 
  User, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { profile, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#3b82f6' },
    { id: 'recommendations', label: 'AI Matches', icon: Sparkles, color: '#a855f7' },
    { id: 'browse', label: 'Browse All', icon: Briefcase, color: '#06b6d4' },
    { id: 'resume', label: 'Resume Upload', icon: FileUp, color: '#10b981' },
    { id: 'skillgap', label: 'Skill Gap Analyzer', icon: Target, color: '#f59e0b' },
    { id: 'profile', label: 'Student Profile', icon: User, color: '#ec4899' },
  ];

  return (
    <aside style={{
      width: collapsed ? '80px' : '280px',
      background: 'rgba(11, 17, 32, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      padding: '24px 16px',
      overflowX: 'hidden'
    }}>
      
      {/* Brand Header */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          marginBottom: '32px',
          gap: '12px'
        }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
                padding: '8px', 
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
              }}>
                <GraduationCap size={20} color="#ffffff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px' }}>
                  AI Recommendation
                </h2>
                <span style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Student Portal
                </span>
              </div>
            </div>
          )}

          {collapsed && (
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
              padding: '10px', 
              borderRadius: '12px'
            }}>
              <GraduationCap size={22} color="#ffffff" />
            </div>
          )}

          <button 
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '4px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: collapsed ? 'center' : 'auto',
              marginTop: collapsed ? '12px' : '0'
            }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: collapsed ? '0' : '14px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))' 
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  width: '100%'
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} color={isActive ? item.color : '#94a3b8'} style={{ minWidth: '18px' }} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Pill & Logout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* User profile details info banner */}
        {!collapsed ? (
          <div style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '12px', 
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#ffffff',
              fontSize: '0.9rem'
            }}>
              {profile.name ? profile.name.split(' ').map(n=>n[0]).join('') : "SD"}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {profile.name}
              </h4>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {profile.targetRole}
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#ffffff',
            fontSize: '0.9rem',
            alignSelf: 'center'
          }} title={profile.name}>
            {profile.name ? profile.name.split(' ').map(n=>n[0]).join('') : "SD"}
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? '0' : '14px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(239, 68, 68, 0.15)',
            background: 'rgba(239, 68, 68, 0.05)',
            color: '#f87171',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            width: '100%'
          }}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={18} style={{ minWidth: '18px' }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

    </aside>
  );
}
