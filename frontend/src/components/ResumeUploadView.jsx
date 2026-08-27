import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FileUp, 
  Sparkles, 
  CheckCircle, 
  Loader2, 
  FileText, 
  AlertCircle,
  RefreshCw,
  Info
} from 'lucide-react';

export default function ResumeUploadView({ onSyncComplete }) {
  const { profile, simulateResumeParse } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsingProgress, setParsingProgress] = useState(0);
  const [parsedData, setParsedData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf") && !selectedFile.name.endsWith(".docx")) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }
    setFile(selectedFile);
    setParsedData(null);
  };

  const handleParse = async () => {
    if (!file) return;
    setLoading(true);
    setParsingProgress(10);
    
    // Animate progress bar steps
    const interval = setInterval(() => {
      setParsingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 300);

    try {
      const results = await simulateResumeParse(file.name);
      clearInterval(interval);
      setParsingProgress(100);
      setParsedData(results);
      setToastMessage("Resume parsed successfully!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleReset = () => {
    setFile(null);
    setParsedData(null);
    setParsingProgress(0);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Welcome Banner */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(99, 102, 241, 0.15))', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <span className="badge-glow" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
          <Sparkles size={14} /> AI Resume Parsing Engine
        </span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginTop: '8px' }}>
          Smart Resume Upload & Skill Mapping
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '4px' }}>
          Upload your latest resume. Our AI model will extract your technical competencies, project experiences, and degree background to automatically match you with relevant internship opportunities.
        </p>
      </div>

      {toastMessage && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '10px',
          padding: '12px 16px',
          color: '#34d399',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Upload Area */}
      {!parsedData && !loading && (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          style={{
            border: dragActive ? '2px dashed var(--primary)' : '2px dashed var(--glass-border)',
            background: dragActive ? 'rgba(99, 102, 241, 0.05)' : 'rgba(18, 26, 43, 0.4)',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={triggerFileSelect}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            style={{ display: 'none' }}
            accept=".pdf,.docx"
          />
          
          <FileUp size={48} color={dragActive ? 'var(--primary)' : 'var(--text-muted)'} style={{ margin: '0 auto 16px auto' }} />
          
          {file ? (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Selected File:</h4>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px', textDecoration: 'underline' }}>{file.name}</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '4px' }}>{(file.size / 1024).toFixed(1)} KB</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleParse(); }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: '#ffffff',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Start Parsing Profile
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Clear File
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Drag and drop your resume file here
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>
                Supports PDF or Word documents (.pdf, .docx) up to 5MB
              </p>
              <button
                type="button"
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                Browse Files
              </button>
            </div>
          )}
        </div>
      )}

      {/* Parsing Loader State */}
      {loading && (
        <div className="glass-card" style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Loader2 size={40} className="spin" color="var(--primary)" style={{ animation: 'spin 1.5s linear infinite' }} />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>AI Parsing in Progress...</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
              Extracting candidate profile, engineering skills and mapping to database.
            </p>
          </div>
          
          <div style={{ width: '100%', maxWidth: '300px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${parsingProgress}%`, background: 'linear-gradient(90deg, var(--primary), var(--secondary))', height: '100%', transition: 'width 0.3s' }}></div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>{parsingProgress}% Completed</span>
        </div>
      )}

      {/* Parsing Results Display */}
      {parsedData && (
        <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '8px' }}>
                <FileText size={20} color="#10b981" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>Parsing Results Summary</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Source file: {file.name}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} /> Upload Different File
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="upload-results-grid">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.5px' }}>Detected Education</span>
                <p style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, marginTop: '4px' }}>{parsedData.degree}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{parsedData.college}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.5px' }}>Simulated Bio Summary</span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {parsedData.bio}
                </p>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.5px' }}>Extracted Skills ({parsedData.skills.length})</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {parsedData.skills.map((skill, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    color: '#a7f3d0',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    fontWeight: 600
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div style={{
            background: 'rgba(99, 102, 241, 0.06)',
            border: '1px solid rgba(99, 102, 241, 0.15)',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <Info size={16} color="var(--primary)" style={{ marginTop: '2px', minWidth: '16px' }} />
            <p style={{ fontSize: '0.78rem', color: '#c7d2fe', lineHeight: 1.4 }}>
              <strong>Sync Auto-Complete Status:</strong> Skills were added directly to your profile inventory. Go to your <strong>AI Matches</strong> tab to view live score updates.
            </p>
          </div>

          <button
            onClick={onSyncComplete}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: '#ffffff',
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
            }}
          >
            Review Recommendations Now
          </button>

        </div>
      )}

    </div>
  );
}
