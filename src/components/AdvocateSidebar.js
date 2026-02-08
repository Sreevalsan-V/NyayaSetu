import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import './AdvocateSidebar.css';

function AdvocateSidebar({ activeView, onViewChange }) {
  const { user, logout } = useAuth();
  const { getPendingRequestsForLawyer } = useChatContext();
  const navigate = useNavigate();
  
  const pendingRequests = getPendingRequestsForLawyer(user?.name || '');
  const requestCount = pendingRequests.length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="LawTune Logo" className="sidebar-logo" />
        <h2>LawTune</h2>
        <p className="user-name">{user?.name}</p>
        <p className="user-role">{user?.role}</p>
      </div>

      <nav className="sidebar-nav">
        <button
          className={activeView === 'cases' ? 'nav-item active' : 'nav-item'}
          onClick={() => onViewChange('cases')}
        >
          My Cases
        </button>
        <button
          className={activeView === 'requests' ? 'nav-item active' : 'nav-item'}
          onClick={() => onViewChange('requests')}
        >
          Requests
          {requestCount > 0 && <span className="notification-badge">{requestCount}</span>}
        </button>
        <button
          className={activeView === 'chats' ? 'nav-item active' : 'nav-item'}
          onClick={() => onViewChange('chats')}
        >
          Chats
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdvocateSidebar;
