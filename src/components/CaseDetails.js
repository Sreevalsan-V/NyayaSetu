import React, { useState } from 'react';
import AddSectionForm from './AddSectionForm';
import './CaseDetails.css';

function CaseDetails({ caseData, onUpdateCase }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showAddSection, setShowAddSection] = useState(false);

  if (!caseData) {
    return (
      <div className="case-details-empty">
        <p>Select a case to view details</p>
      </div>
    );
  }

  const handleFileUpload = (sectionId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // In MVP, we just store file metadata in local state
    const newFile = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    // Update case data with new file
    const updatedSections = caseData.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          files: [...section.files, newFile]
        };
      }
      return section;
    });

    onUpdateCase({
      ...caseData,
      sections: updatedSections
    });
  };

  const handleRemoveFile = (sectionId, fileId) => {
    const updatedSections = caseData.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          files: section.files.filter(f => f.id !== fileId)
        };
      }
      return section;
    });

    onUpdateCase({
      ...caseData,
      sections: updatedSections
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleAddSection = (sectionName) => {
    const newSection = {
      id: Date.now(),
      name: sectionName,
      files: []
    };

    const updatedSections = [...caseData.sections, newSection];
    onUpdateCase({
      ...caseData,
      sections: updatedSections
    });

    setShowAddSection(false);
    setExpandedSection(newSection.id); // Auto-expand the new section
  };

  return (
    <div className="case-details">
      <div className="case-header">
        <div>
          <h2>{caseData.caseNumber}</h2>
          <h3>{caseData.title}</h3>
        </div>
        <span className={`status-indicator ${caseData.status.toLowerCase()}`}>
          {caseData.status}
        </span>
      </div>

      <div className="case-info-grid">
        <div className="info-item">
          <label>Case Type</label>
          <p>{caseData.type}</p>
        </div>
        <div className="info-item">
          <label>Client</label>
          <p>{caseData.client}</p>
        </div>
        <div className="info-item">
          <label>Court</label>
          <p>{caseData.court}</p>
        </div>
        <div className="info-item">
          <label>Next Hearing</label>
          <p>{caseData.nextHearing}</p>
        </div>
      </div>

      <div className="case-sections">
        <div className="sections-header">
          <h3>Document Sections</h3>
          <button className="add-section-btn" onClick={() => setShowAddSection(true)}>
            + Add Section
          </button>
        </div>
        {caseData.sections.map(section => (
          <div key={section.id} className="section-card">
            <div 
              className="section-header"
              onClick={() => toggleSection(section.id)}
            >
              <div className="section-title">
                <h4>{section.name}</h4>
                <span className="file-count">
                  {section.files.length} file{section.files.length !== 1 ? 's' : ''}
                </span>
              </div>
              <span className="expand-icon">
                {expandedSection === section.id ? '−' : '+'}
              </span>
            </div>

            {expandedSection === section.id && (
              <div className="section-content">
                <div className="file-upload-area">
                  <input
                    type="file"
                    id={`file-${section.id}`}
                    onChange={(e) => handleFileUpload(section.id, e)}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`file-${section.id}`} className="upload-button">
                    + Upload File
                  </label>
                </div>

                {section.files.length > 0 && (
                  <div className="files-list">
                    {section.files.map(file => (
                      <div key={file.id} className="file-item">
                        <div className="file-info">
                          <span className="file-name">{file.name}</span>
                          <span className="file-meta">
                            {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          className="remove-file-button"
                          onClick={() => handleRemoveFile(section.id, file.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddSection && (
        <AddSectionForm
          onSubmit={handleAddSection}
          onCancel={() => setShowAddSection(false)}
        />
      )}
    </div>
  );
}

export default CaseDetails;
