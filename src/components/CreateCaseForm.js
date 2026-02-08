import React, { useState } from 'react';
import './CreateCaseForm.css';

function CreateCaseForm({ onSubmit, onCancel, nextCaseNumber }) {
  const [formData, setFormData] = useState({
    caseNumber: nextCaseNumber,
    title: '',
    type: '',
    client: '',
    court: '',
    nextHearing: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.client || !formData.court) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="create-case-overlay">
      <div className="create-case-form">
        <h2>Create New Case</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Case Number *</label>
              <input
                type="text"
                value={formData.caseNumber}
                onChange={(e) => handleChange('caseNumber', e.target.value)}
                placeholder="e.g., CRL/2026/001"
                required
              />
            </div>

            <div className="form-group">
              <label>Case Type *</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                required
              >
                <option value="">Select type</option>
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
                <option value="Property">Property</option>
                <option value="Cyber">Cyber</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Case Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., State vs. Kumar"
              required
            />
          </div>

          <div className="form-group">
            <label>Client Name *</label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => handleChange('client', e.target.value)}
              placeholder="e.g., John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Court *</label>
            <input
              type="text"
              value={formData.court}
              onChange={(e) => handleChange('court', e.target.value)}
              placeholder="e.g., Delhi District Court"
              required
            />
          </div>

          <div className="form-group">
            <label>Next Hearing Date</label>
            <input
              type="date"
              value={formData.nextHearing}
              onChange={(e) => handleChange('nextHearing', e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCaseForm;
