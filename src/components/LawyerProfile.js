import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import ContactRequestForm from './ContactRequestForm';
import './LawyerProfile.css';

function LawyerProfile({ lawyer }) {
  const [showContactForm, setShowContactForm] = useState(false);
  const { user } = useAuth();
  const { sendContactRequest } = useChatContext();

  const handleContactLawyer = () => {
    setShowContactForm(true);
  };

  const handleSubmitRequest = (caseDetails) => {
    sendContactRequest(lawyer.id, lawyer.name, user.name, caseDetails);
    setShowContactForm(false);
    alert('Request sent successfully! The lawyer will be notified.');
  };

  const handleCancelRequest = () => {
    setShowContactForm(false);
  };
  if (!lawyer) {
    return (
      <div className="lawyer-profile-empty">
        <p>Select a lawyer to view their profile</p>
      </div>
    );
  }

  return (
    <div className="lawyer-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {lawyer.name.split(' ')[1]?.[0] || lawyer.name[0]}
        </div>
        <div className="profile-title">
          <h2>{lawyer.name}</h2>
          <p className="profile-specialization">{lawyer.specialization}</p>
          <div className="profile-rating">
            <span className="stars">★ {lawyer.rating}</span>
            <span className="cases-won">{lawyer.casesWon} cases won</span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>About</h3>
        <p>{lawyer.about}</p>
      </div>

      <div className="profile-section">
        <h3>Experience</h3>
        <p>{lawyer.experience} of practice</p>
      </div>

      <div className="profile-section">
        <h3>Location</h3>
        <p>{lawyer.location}</p>
      </div>

      <div className="profile-section">
        <h3>Education</h3>
        <p>{lawyer.education}</p>
      </div>

      <div className="profile-section">
        <h3>Languages</h3>
        <div className="languages">
          {lawyer.languages.map((lang, index) => (
            <span key={index} className="language-tag">{lang}</span>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h3>Contact</h3>
        <p><strong>Phone:</strong> {lawyer.phone}</p>
        <p><strong>Email:</strong> {lawyer.email}</p>
      </div>

      <div className="profile-actions">
        <button className="action-button primary" onClick={handleContactLawyer}>
          Contact Lawyer
        </button>
        <button className="action-button secondary">Schedule Consultation</button>
      </div>

      {showContactForm && (
        <ContactRequestForm
          lawyer={lawyer}
          onSubmit={handleSubmitRequest}
          onCancel={handleCancelRequest}
        />
      )}
    </div>
  );
}

export default LawyerProfile;
