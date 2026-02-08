import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('CLIENT');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    // Attempt login with credentials
    const success = login(username, password, selectedRole);
    
    if (!success) {
      alert('Invalid credentials. Try:\nClient: client1/client123\nLawyer: lawyer1/lawyer123');
      return;
    }

    // Navigate based on role
    if (selectedRole === 'CLIENT') {
      navigate('/client');
    } else {
      navigate('/advocate');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>LawTune</h1>
        <p className="subtitle">Legal Platform MVP</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>Login as</label>
            <div className="role-selector">
              <label className="role-option">
                <input
                  type="radio"
                  value="CLIENT"
                  checked={selectedRole === 'CLIENT'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span>Client</span>
              </label>
              <label className="role-option">
                <input
                  type="radio"
                  value="ADVOCATE"
                  checked={selectedRole === 'ADVOCATE'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <span>Advocate</span>
              </label>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="disclaimer">
          * This is a demo MVP. No real authentication is implemented.
        </p>
      </div>
    </div>
  );
}

export default Login;
