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
  // Restore view state from localStorage
  const [activeView, setActiveView] = useState(() => {
    return localStorage.getItem('advocate_active_view') || 'cases';
  });
  
  const [selectedCaseId, setSelectedCaseId] = useState(() => {
    const saved = localStorage.getItem('advocate_selected_case');
    return saved ? parseInt(saved) : null;
  });
  
  // Load cases from localStorage or use mock data
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('lawtune_cases');
    return saved ? JSON.parse(saved) : MOCK_CASES;
  });
  
  const [showCreateCase, setShowCreateCase] = useState(false);

  // Save view state to localStorage
  useEffect(() => {
    localStorage.setItem('advocate_active_view', activeView);
  }, [activeView]);

  useEffect(() => {
    if (selectedCaseId) {
      localStorage.setItem('advocate_selected_case', selectedCaseId.toString());
    }
  }, [selectedCaseId]);

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
