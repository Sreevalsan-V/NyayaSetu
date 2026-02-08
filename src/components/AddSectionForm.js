import React, { useState } from 'react';
import './AddSectionForm.css';

function AddSectionForm({ onSubmit, onCancel }) {
  const [sectionName, setSectionName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!sectionName.trim()) {
      alert('Please enter a section name');
      return;
    }

    onSubmit(sectionName.trim());
    setSectionName('');
  };

  return (
    <div className="add-section-overlay">
      <div className="add-section-form">
        <h3>Add New Document Section</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Section Name</label>
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder="e.g., Medical Records, Witness Photos"
              autoFocus
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSectionForm;
