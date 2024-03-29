import React from 'react';
import './InfoCard.css';

const InfoCard = ({ info }) => {
  return (
    <div className="info-card">
      <div className="info-body">
        <h3>{info.title}</h3>
        <p>{info.description}</p>
        <p>{info.extract}</p>
      </div>
      <div className="info-footer">
        <a
          href={`${info.content_urls.desktop.page}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          More Information
        </a>
      </div>
    </div>
  );
};

export default InfoCard;
