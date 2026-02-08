import React, { useState } from 'react';

const FlipCard = ({ front, back, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`flip-card-container ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          {front}
        </div>
        <div className="flip-card-back">
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
