import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import LawyerList from '../components/LawyerList';
import LawyerProfile from '../components/LawyerProfile';
import Chat from '../components/Chat';
import { MOCK_LAWYERS } from '../data/mockData';
import './ClientDashboard.css';

function ClientDashboard() {
  // Restore view state from localStorage
  const [activeView, setActiveView] = useState(() => {
    return localStorage.getItem('client_active_view') || 'lawyers';
  });
  
  const [selectedLawyerId, setSelectedLawyerId] = useState(() => {
    const saved = localStorage.getItem('client_selected_lawyer');
    return saved ? parseInt(saved) : null;
  });

  // Save view state to localStorage
  useEffect(() => {
    localStorage.setItem('client_active_view', activeView);
  }, [activeView]);

  useEffect(() => {
    if (selectedLawyerId) {
      localStorage.setItem('client_selected_lawyer', selectedLawyerId.toString());
    }
  }, [selectedLawyerId]);

  const selectedLawyer = MOCK_LAWYERS.find(l => l.id === selectedLawyerId);

  return (
    <div className="dashboard">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="dashboard-content">
        {activeView === 'lawyers' && (
          <div className="lawyers-view">
            <div className="lawyers-list-panel">
              <LawyerList
                lawyers={MOCK_LAWYERS}
                onSelectLawyer={setSelectedLawyerId}
                selectedLawyerId={selectedLawyerId}
              />
            </div>
            <div className="lawyers-profile-panel">
              <LawyerProfile lawyer={selectedLawyer} />
            </div>
          </div>
        )}
        {activeView === 'chats' && <Chat />}
      </div>
    </div>
  );
}

export default ClientDashboard;
