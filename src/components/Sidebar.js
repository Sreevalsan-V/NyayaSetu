import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

function Sidebar({ activeView, onViewChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>LawTune</h2>
        <p className="user-name">{user?.name}</p>
        <p className="user-role">{user?.role}</p>
      </div>

      <nav className="sidebar-nav">
        <button
          className={activeView === 'lawyers' ? 'nav-item active' : 'nav-item'}
          onClick={() => onViewChange('lawyers')}
        >
          Find Lawyers
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

export default Sidebar;
