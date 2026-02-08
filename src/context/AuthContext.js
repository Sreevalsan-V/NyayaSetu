import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Hardcoded users for MVP
const MOCK_USERS = [
  {
    username: 'client1',
    password: 'client123',
    role: 'CLIENT',
    name: 'John Doe'
  },
  {
    username: 'lawyer1',
    password: 'lawyer123',
    role: 'ADVOCATE',
    name: 'Adv. Sarah Johnson'
  }
];

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on init
    const savedUser = localStorage.getItem('lawtune_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password, role) => {
    // Find matching user
    const foundUser = MOCK_USERS.find(
      u => u.username === username && u.password === password && u.role === role
    );

    if (!foundUser) {
      return false;
    }

    const userData = {
      username: foundUser.username,
      name: foundUser.name,
      role: foundUser.role
    };

    setUser(userData);
    // Save to localStorage
    localStorage.setItem('lawtune_user', JSON.stringify(userData));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    // Clear from localStorage
    localStorage.removeItem('lawtune_user');
  };

  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
