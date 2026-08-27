import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import DashboardView from './components/DashboardView';
import RecommendationView from './components/RecommendationView';
import ResumeUploadView from './components/ResumeUploadView';
import SkillGapView from './components/SkillGapView';
import ProfileView from './components/ProfileView';
import InternshipModal from './components/InternshipModal';
import { Loader2 } from 'lucide-react';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Full screen loading spinner
  if (loading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        background: '#090d16',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: '#ffffff',
        fontFamily: 'var(--font-body)'
      }}>
        <Loader2 size={44} className="spin" color="var(--primary)" style={{ animation: 'spin 1.5s linear infinite' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.5px' }}>Loading Portal Session...</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Connecting securely to authentication servers</p>
      </div>
    );
  }

  // Not logged in routing
  if (!user) {
    return <AuthPage />;
  }

  // Handle opening details modal
  const handleViewDetails = (item) => {
    setSelectedInternship(item);
  };

  // Render view based on tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            setActiveTab={setActiveTab} 
            onViewDetails={handleViewDetails} 
          />
        );
      case 'recommendations':
      case 'browse':
        return (
          <RecommendationView 
            onViewDetails={handleViewDetails} 
          />
        );
      case 'resume':
        return (
          <ResumeUploadView 
            onSyncComplete={() => setActiveTab('recommendations')} 
          />
        );
      case 'skillgap':
        return <SkillGapView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView setActiveTab={setActiveTab} onViewDetails={handleViewDetails} />;
    }
  };

  return (
    <div className="app-container">
      
      {/* Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="main-content-pane">
        
        {/* Top Header Navbar */}
        <Navbar activeTab={activeTab} />

        {/* Dynamic Inner Tab View */}
        <main className="content-body">
          {renderTabContent()}
        </main>

      </div>

      {/* Detailed Internship Overlays (AI explanation, matching score, apply buttons) */}
      {selectedInternship && (
        <InternshipModal 
          item={selectedInternship} 
          onClose={() => setSelectedInternship(null)} 
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
