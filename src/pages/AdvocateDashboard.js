import React, { useState, useEffect } from 'react';
import AdvocateSidebar from '../components/AdvocateSidebar';
import CaseList from '../components/CaseList';
import CaseDetails from '../components/CaseDetails';
import RequestsList from '../components/RequestsList';
import CreateCaseForm from '../components/CreateCaseForm';
import Chat from '../components/Chat';
import { MOCK_CASES } from '../data/mockCases';
import './AdvocateDashboard.css';

function AdvocateDashboard() {
  const [activeView, setActiveView] = useState('cases');
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  
  // Load cases from localStorage or use mock data
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('lawtune_cases');
    return saved ? JSON.parse(saved) : MOCK_CASES;
  });
  
  const [showCreateCase, setShowCreateCase] = useState(false);

  // Save cases to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lawtune_cases', JSON.stringify(cases));
  }, [cases]);

  const selectedCase = cases.find(c => c.id === selectedCaseId);

  const handleUpdateCase = (updatedCase) => {
    setCases(cases.map(c => c.id === updatedCase.id ? updatedCase : c));
  };

  const generateNextCaseNumber = () => {
    const year = new Date().getFullYear();
    const count = cases.length + 1;
    return `CASE/${year}/${String(count).padStart(3, '0')}`;
  };

  const handleCreateCase = (formData) => {
    const newCase = {
      id: Date.now(),
      caseNumber: formData.caseNumber,
      title: formData.title,
      type: formData.type,
      status: 'Active',
      nextHearing: formData.nextHearing || 'TBD',
      client: formData.client,
      court: formData.court,
      sections: [
        { id: 1, name: 'Case Documents', files: [] },
        { id: 2, name: 'Evidence', files: [] }
      ]
    };

    setCases([...cases, newCase]);
    setShowCreateCase(false);
    setSelectedCaseId(newCase.id); // Auto-select the new case
  };

  return (
    <div className="dashboard">
      <AdvocateSidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="dashboard-content">
        {activeView === 'cases' && (
          <div className="cases-view">
            <div className="cases-list-panel">
              <CaseList
                cases={cases}
                onSelectCase={setSelectedCaseId}
                selectedCaseId={selectedCaseId}
                onCreateCase={() => setShowCreateCase(true)}
              />
            </div>
            <div className="cases-details-panel">
              <CaseDetails 
                caseData={selectedCase}
                onUpdateCase={handleUpdateCase}
              />
            </div>
          </div>
        )}
        {activeView === 'requests' && <RequestsList />}
        {activeView === 'chats' && <Chat />}
      </div>

      {showCreateCase && (
        <CreateCaseForm
          nextCaseNumber={generateNextCaseNumber()}
          onSubmit={handleCreateCase}
          onCancel={() => setShowCreateCase(false)}
        />
      )}
    </div>
  );
}

export default AdvocateDashboard;
