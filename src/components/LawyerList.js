import React from 'react';
import './LawyerList.css';

function LawyerList({ lawyers, onSelectLawyer, selectedLawyerId }) {
  return (
    <div className="lawyer-list">
      <h2>Available Lawyers</h2>
      <div className="lawyer-cards">
        {lawyers.map(lawyer => (
          <div
            key={lawyer.id}
            className={selectedLawyerId === lawyer.id ? 'lawyer-card selected' : 'lawyer-card'}
            onClick={() => onSelectLawyer(lawyer.id)}
          >
            <div className="lawyer-card-header">
              <h3>{lawyer.name}</h3>
              <span className="rating">★ {lawyer.rating}</span>
            </div>
            <p className="specialization">{lawyer.specialization}</p>
            <div className="lawyer-card-details">
              <span>Experience: {lawyer.experience}</span>
              <span>Cases Won: {lawyer.casesWon}</span>
            </div>
            <p className="location">{lawyer.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LawyerList;
