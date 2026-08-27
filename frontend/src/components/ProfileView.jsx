import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  GraduationCap, 
  MapPin, 
  Plus, 
  X, 
  FileText, 
  Save, 
  Sparkles,
  Info
} from 'lucide-react';

export default function ProfileView() {
  const { profile, updateProfile, addSkill, removeSkill } = useAuth();
  
  // State for form
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [degree, setDegree] = useState(profile.degree);
  const [gradYear, setGradYear] = useState(profile.gradYear);
  const [bio, setBio] = useState(profile.bio);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  
  // State for skills & locations adders
  const [newSkill, setNewSkill] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      college,
      degree,
      gradYear,
      bio,
      targetRole
    });
    setToast("Profile saved successfully!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    addSkill(newSkill.trim());
    setNewSkill('');
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    if (profile.locations.some(l => l.toLowerCase() === newLocation.trim().toLowerCase())) return;
    updateProfile({
      locations: [...profile.locations, newLocation.trim()]
    });
    setNewLocation('');
  };

  const handleRemoveLocation = (loc) => {
    updateProfile({
      locations: profile.locations.filter(l => l !== loc)
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(16, 185, 129, 0.95)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '10px',
          zIndex: 1000,
          fontWeight: 600,
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Grid split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="profile-grid-split">
        
        {/* Left Form card */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--primary)" /> Student Personal Profile
          </h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>College / University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Degree Program</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Graduation Year</label>
                <input
                  type="text"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Target Role Domain</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#ffffff',
                    outline: 'none',
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design & Product">Design & Product</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>Personal Bio Summary</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.88rem',
                  resize: 'none',
                  lineHeight: 1.4
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px'
              }}
            >
              <Save size={16} /> Save Profile Details
            </button>

          </form>
        </div>

        {/* Right side widgets: Skills & Locations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Skill Manager */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--secondary)" /> Skill Inventory Manager
            </h3>

            {/* Add skill input */}
            <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Add e.g. Docker, PyTorch..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.82rem'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--primary)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={16} />
              </button>
            </form>

            {/* Skill Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
              {profile.skills.map((skill, idx) => (
                <span key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                  >
                    <X size={12} className="hover-red" />
                  </button>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', marginTop: '16px' }}>
              <Info size={14} color="var(--text-dim)" style={{ minWidth: '14px', marginTop: '1px' }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', lineHeight: 1.3 }}>
                Match scores update instantly in the recommendations engine when you add or remove skills.
              </p>
            </div>
          </div>

          {/* Location Preferences */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="var(--accent-cyan)" /> Location Preferences
            </h3>

            {/* Add location */}
            <form onSubmit={handleAddLocation} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Add e.g. London, Remote..."
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '0.82rem'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--accent-cyan)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={16} />
              </button>
            </form>

            {/* Location tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {profile.locations.map((loc, idx) => (
                <span key={idx} style={{
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  color: '#8be9fd',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {loc}
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
