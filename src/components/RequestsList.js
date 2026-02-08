import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import './RequestsList.css';

function RequestsList() {
  const { user } = useAuth();
  const { getPendingRequestsForLawyer, acceptContactRequest, rejectContactRequest } = useChatContext();
  
  const pendingRequests = getPendingRequestsForLawyer(user?.name || '');

  const handleAccept = (requestId) => {
    acceptContactRequest(requestId);
  };

  const handleReject = (requestId) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      rejectContactRequest(requestId);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#7f8c8d';
    }
  };

  return (
    <div className="requests-list">
      <h2>Contact Requests</h2>
      
      {pendingRequests.length === 0 ? (
        <div className="no-requests">
          <p>No pending requests</p>
        </div>
      ) : (
        <div className="requests-cards">
          {pendingRequests.map(request => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <h3>{request.clientName}</h3>
                <span 
                  className="urgency-badge"
                  style={{ backgroundColor: getUrgencyColor(request.urgency) }}
                >
                  {request.urgency.toUpperCase()}
                </span>
              </div>
              
              <div className="request-info">
                <div className="info-item">
                  <strong>Case Type:</strong> {request.caseType}
                </div>
                <div className="info-item">
                  <strong>Received:</strong> {new Date(request.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="request-description">
                <strong>Description:</strong>
                <p>{request.description}</p>
              </div>

              <div className="request-actions">
                <button 
                  className="reject-btn"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </button>
                <button 
                  className="accept-btn"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept & Start Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestsList;
