import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, AlertCircle, Compass, GraduationCap } from 'lucide-react';

export default function AuthPage() {
  const { login, signup, loginDemoUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, fullName);
        setSuccessMsg('Account created successfully! Logging you in...');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginDemoUser();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: '#090d16',
      color: '#f8fafc',
      fontFamily: 'var(--font-body)'
    }} className="auth-grid-container">
      
      {/* Left side: Premium Branding & Features */}
      <div style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.18) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.18) 0%, transparent 60%), #0c1322',
        padding: '64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }} className="auth-banner">
        
        {/* Glow Sphere */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'rgba(99, 102, 241, 0.15)',
          filter: 'blur(80px)',
          borderRadius: '50%'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 2 }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
          }}>
            <GraduationCap size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.5px' }}>
              InternAI
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI Internship Recommendation System</p>
          </div>
        </div>

        <div style={{ zIndex: 2, margin: '60px 0' }}>
          <span className="badge-glow" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} /> Powered by Semantic Matching Algorithms
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>
            Elevate Your Career with Precision Matching
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Upload your resume, analyze skill gaps, and immediately discover internships that align with your background.
          </p>

          {/* Core App Highlights */}
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { title: "Smart Resume Extractor", desc: "Upload your CV to automatically map skills to your developer profile." },
              { title: "Dynamic Skill Gap Analysis", desc: "Identify missing tools required for roles and get tailored learning paths." },
              { title: "AI Compatibility Rationale", desc: "Understand exactly why each position matches your career trajectory." }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  marginTop: '2px'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', zIndex: 2 }}>
          © {new Date().getFullYear()} InternAI. Built for College Innovation Project.
        </div>
      </div>

      {/* Right side: Login / Signup Forms */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative'
      }} className="auth-form-wrapper">
        
        <div className="glass-card" style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          background: 'rgba(18, 26, 43, 0.85)'
        }}>
          {/* Form Tabs Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <button
              onClick={() => { setIsLogin(true); setError(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: isLogin ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent',
                color: isLogin ? '#ffffff' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: !isLogin ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent',
                color: !isLogin ? '#ffffff' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem'
              }}
            >
              Sign Up
            </button>
          </div>

          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '28px' }}>
            {isLogin ? "Access your personal recommendation dashboard." : "Set up your profile to find matching internships."}
          </p>

          {/* Feedback Messages */}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#f87171',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#34d399',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <Sparkles size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Alex Dev"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 40px',
                      borderRadius: '10px',
                      border: '1px solid var(--glass-border)',
                      background: 'rgba(15, 23, 42, 0.6)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  placeholder="alex.dev@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '10px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '10px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          {/* Quick Demo Bypass Access */}
          <div style={{
            marginTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '20px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
              Want to skip signup and test all dashboards immediately?
            </p>
            <button
              onClick={handleDemoLogin}
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                color: 'var(--text-main)',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              className="btn-demo-quick"
            >
              <Compass size={14} color="var(--accent-cyan)" />
              1-Click Demo Login
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
