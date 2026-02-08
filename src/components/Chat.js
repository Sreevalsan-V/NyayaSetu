import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import './Chat.css';

function Chat() {
  const { user } = useAuth();
  const { getChatsForUser, messages, sendMessage } = useChatContext();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const userChats = getChatsForUser(user?.name || '', user?.role);
  const selectedChat = userChats.find(c => c.id === selectedChatId);
  const chatMessages = selectedChatId ? messages[selectedChatId] || [] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChatId) return;

    sendMessage(selectedChatId, user.role, user.name, messageText);
    setMessageText('');
  };

  const getOtherPersonName = (chat) => {
    return user.role === 'ADVOCATE' ? chat.clientName : chat.lawyerName;
  };

  return (
    <div className="chat-container">
      <div className="chat-list-panel">
        <h3>Chats</h3>
        {userChats.length === 0 ? (
          <div className="no-chats">
            <p>No active chats</p>
          </div>
        ) : (
          <div className="chat-list">
            {userChats.map(chat => (
              <div
                key={chat.id}
                className={selectedChatId === chat.id ? 'chat-item active' : 'chat-item'}
                onClick={() => setSelectedChatId(chat.id)}
              >
                <div className="chat-item-avatar">
                  {getOtherPersonName(chat)[0]}
                </div>
                <div className="chat-item-info">
                  <h4>{getOtherPersonName(chat)}</h4>
                  <p className="last-message">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-window-panel">
        {!selectedChat ? (
          <div className="no-chat-selected">
            <p>Select a chat to start messaging</p>
          </div>
        ) : (
          <>
            <div className="chat-window-header">
              <div className="chat-header-avatar">
                {getOtherPersonName(selectedChat)[0]}
              </div>
              <h3>{getOtherPersonName(selectedChat)}</h3>
            </div>

            <div className="chat-messages">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={msg.senderName === user.name ? 'message message-sent' : 'message message-received'}
                >
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    <span className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
