import React, { useState } from 'react';
import './ContactRequestForm.css';

function ContactRequestForm({ lawyer, onSubmit, onCancel }) {
  const [caseType, setCaseType] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!caseType || !description) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      caseType,
      description,
      urgency
    });
  };

  return (
    <div className="contact-request-overlay">
      <div className="contact-request-form">
        <h2>Contact {lawyer.name}</h2>
        <p className="form-subtitle">Please provide details about your legal matter</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Case Type *</label>
            <select 
              value={caseType} 
              onChange={(e) => setCaseType(e.target.value)}
              required
            >
              <option value="">Select case type</option>
              <option value="Criminal">Criminal</option>
              <option value="Civil">Civil</option>
              <option value="Family">Family</option>
              <option value="Corporate">Corporate</option>
              <option value="Property">Property</option>
              <option value="Cyber">Cyber</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Case Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe your legal matter..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Urgency Level</label>
            <div className="urgency-options">
              <label className="urgency-option">
                <input
                  type="radio"
                  value="low"
                  checked={urgency === 'low'}
                  onChange={(e) => setUrgency(e.target.value)}
                />
                <span>Low</span>
              </label>
              <label className="urgency-option">
                <input
                  type="radio"
                  value="medium"
                  checked={urgency === 'medium'}
                  onChange={(e) => setUrgency(e.target.value)}
                />
                <span>Medium</span>
              </label>
              <label className="urgency-option">
                <input
                  type="radio"
                  value="high"
                  checked={urgency === 'high'}
                  onChange={(e) => setUrgency(e.target.value)}
                />
                <span>High</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactRequestForm;
