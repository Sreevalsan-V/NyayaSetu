import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import LawyerList from '../components/LawyerList';
import LawyerProfile from '../components/LawyerProfile';
import Chat from '../components/Chat';
import { MOCK_LAWYERS } from '../data/mockData';
import './ClientDashboard.css';

function ClientDashboard() {
  const [activeView, setActiveView] = useState('lawyers');
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);

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
