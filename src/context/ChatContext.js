import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  // Load from localStorage or use defaults
  const [contactRequests, setContactRequests] = useState(() => {
    const saved = localStorage.getItem('lawtune_contact_requests');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeChats, setActiveChats] = useState(() => {
    const saved = localStorage.getItem('lawtune_active_chats');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('lawtune_messages');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('lawtune_contact_requests', JSON.stringify(contactRequests));
  }, [contactRequests]);

  useEffect(() => {
    localStorage.setItem('lawtune_active_chats', JSON.stringify(activeChats));
  }, [activeChats]);

  useEffect(() => {
    localStorage.setItem('lawtune_messages', JSON.stringify(messages));
  }, [messages]);

  // Client sends a contact request to a lawyer
  const sendContactRequest = (lawyerId, lawyerName, clientName, caseDetails) => {
    const newRequest = {
      id: Date.now(),
      lawyerId,
      lawyerName,
      clientName,
      caseType: caseDetails.caseType,
      description: caseDetails.description,
      urgency: caseDetails.urgency,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    setContactRequests(prev => [...prev, newRequest]);
    return newRequest;
  };

  // Lawyer accepts a contact request
  const acceptContactRequest = (requestId) => {
    const request = contactRequests.find(r => r.id === requestId);
    if (!request) return;

    // Mark request as accepted
    setContactRequests(prev => 
      prev.map(r => r.id === requestId ? { ...r, status: 'accepted' } : r)
    );

    // Create a new chat
    const newChat = {
      id: Date.now(),
      lawyerId: request.lawyerId,
      lawyerName: request.lawyerName,
      clientName: request.clientName,
      lastMessage: 'Chat started',
      timestamp: new Date().toISOString()
    };

    setActiveChats(prev => [...prev, newChat]);
    setMessages(prev => ({ ...prev, [newChat.id]: [] }));
  };

  // Reject a contact request
  const rejectContactRequest = (requestId) => {
    setContactRequests(prev => 
      prev.map(r => r.id === requestId ? { ...r, status: 'rejected' } : r)
    );
  };

  // Send a message in a chat
  const sendMessage = (chatId, senderRole, senderName, messageText) => {
    const newMessage = {
      id: Date.now(),
      senderRole,
      senderName,
      text: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update last message in chat
    setActiveChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, lastMessage: messageText, timestamp: new Date().toISOString() }
          : chat
      )
    );
  };

  // Get pending requests for a specific lawyer
  const getPendingRequestsForLawyer = (lawyerName) => {
    return contactRequests.filter(r => r.lawyerName === lawyerName && r.status === 'pending');
  };

  // Get chats for a specific user
  const getChatsForUser = (userName, role) => {
    if (role === 'ADVOCATE') {
      return activeChats.filter(chat => chat.lawyerName === userName);
    } else {
      return activeChats.filter(chat => chat.clientName === userName);
    }
  };

  const value = {
    contactRequests,
    activeChats,
    messages,
    sendContactRequest,
    acceptContactRequest,
    rejectContactRequest,
    sendMessage,
    getPendingRequestsForLawyer,
    getChatsForUser
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}
