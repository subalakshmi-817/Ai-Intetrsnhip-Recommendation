import React, { useState } from 'react';
import { Plus, X, Sparkles, Check, BookOpen, Target } from 'lucide-react';

const SUGGESTED_SKILLS = [
  "Python", "PyTorch", "TensorFlow", "NLP", "Machine Learning",
  "Deep Learning", "React", "Node.js", "SQL", "FastAPI",
  "Docker", "PostgreSQL", "Pandas", "Scikit-Learn", "PowerBI",
  "OpenCV", "Kubernetes", "AWS", "Figma", "TypeScript", "LangChain"
];

export default function SkillManager({ skills, setSkills, preferredDomain, setPreferredDomain, onGenerateRecommendations }) {
  const [newSkillName, setNewSkillName] = useState('');
  const [proficiency, setProficiency] = useState('Intermediate');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = (skillToAdd) => {
    const sName = (skillToAdd || newSkillName).trim();
    if (!sName) return;

    if (skills.some(s => s.skill_name.toLowerCase() === sName.toLowerCase())) {
      return;
    }

    setSkills([...skills, { skill_name: sName, proficiency_level: proficiency }]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillName) => {
    setSkills(skills.filter(s => s.skill_name !== skillName));
  };

  const handleTriggerAI = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
    onGenerateRecommendations();
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Sparkles color="#c084fc" size={24} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Your AI Skill Profile</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Add your technical skills, programming languages, and tools. Our AI matching engine compares your skill matrix against 150+ active internship postings.
        </p>
      </div>

      {/* Target Domain Selector */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} color="var(--accent-cyan)" /> Preferred Domain / Career Path
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {["All", "Artificial Intelligence", "Data Science", "Software Engineering", "Design & Product"].map((domain) => (
            <button
              key={domain}
              onClick={() => setPreferredDomain(domain)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: preferredDomain === domain ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                background: preferredDomain === domain ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))' : 'rgba(15, 23, 42, 0.4)',
                color: preferredDomain === domain ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem'
              }}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Add Custom Skill Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>Add Technical Skills</h3>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter skill (e.g. PyTorch, React, SQL)..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <select
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          <button
            onClick={() => handleAddSkill()}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Plus size={18} /> Add Skill
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} /> Quick Add Popular Skills:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {SUGGESTED_SKILLS.map((sk) => {
              const isAdded = skills.some(s => s.skill_name.toLowerCase() === sk.toLowerCase());
              return (
                <button
                  key={sk}
                  onClick={() => !isAdded && handleAddSkill(sk)}
                  disabled={isAdded}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: isAdded ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    color: isAdded ? '#818cf8' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    cursor: isAdded ? 'default' : 'pointer'
                  }}
                >
                  {isAdded ? `✓ ${sk}` : `+ ${sk}`}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Selected Skills List */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
            Your Skill Inventory ({skills.length})
          </h3>
        </div>

        {skills.length === 0 ? (
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>
            No skills added yet. Add your skills above to get personalized AI internship recommendations!
          </p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skills.map((sk, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.88rem'
                }}
              >
                <span style={{ fontWeight: 600 }}>{sk.skill_name}</span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(0, 0, 0, 0.3)', padding: '2px 8px', borderRadius: '10px', color: '#c7d2fe' }}>
                  {sk.proficiency_level}
                </span>
                <button
                  onClick={() => handleRemoveSkill(sk.skill_name)}
                  style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Generate AI Recommendations CTA */}
        <div style={{ marginTop: '28px', pt: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleTriggerAI}
            style={{
              padding: '14px 28px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
            }}
          >
            {savedSuccess ? (
              <>
                <Check size={20} /> Recommendations Updated!
              </>
            ) : (
              <>
                <Sparkles size={20} /> Generate AI Match Rankings
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
