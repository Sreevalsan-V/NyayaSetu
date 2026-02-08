import React from 'react';
import './CaseList.css';

function CaseList({ cases, onSelectCase, selectedCaseId, onCreateCase }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#27ae60';
      case 'Pending':
        return '#f39c12';
      case 'Closed':
        return '#95a5a6';
      default:
        return '#7f8c8d';
    }
  };

  const getCaseTypeColor = (type) => {
    switch (type) {
      case 'Criminal':
        return '#e74c3c';
      case 'Civil':
        return '#3498db';
      case 'Family':
        return '#9b59b6';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="case-list">
      <div className="case-list-header">
        <h2>My Cases</h2>
        <button className="create-case-btn" onClick={onCreateCase}>
          + New Case
        </button>
      </div>
      <div className="case-cards">
        {cases.map(caseItem => (
          <div
            key={caseItem.id}
            className={selectedCaseId === caseItem.id ? 'case-card selected' : 'case-card'}
            onClick={() => onSelectCase(caseItem.id)}
          >
            <div className="case-card-header">
              <h3>{caseItem.caseNumber}</h3>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(caseItem.status) }}
              >
                {caseItem.status}
              </span>
            </div>
            <h4 className="case-title">{caseItem.title}</h4>
            <div className="case-meta">
              <span 
                className="case-type"
                style={{ color: getCaseTypeColor(caseItem.type) }}
              >
                {caseItem.type}
              </span>
              <span className="case-court">{caseItem.court}</span>
            </div>
            <div className="case-info">
              <div className="info-row">
                <strong>Client:</strong> {caseItem.client}
              </div>
              <div className="info-row">
                <strong>Next Hearing:</strong> {caseItem.nextHearing}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseList;
