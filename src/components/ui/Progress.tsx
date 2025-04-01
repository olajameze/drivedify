import React from 'react';

interface ProgressProps {
  value: number;
  label: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, label }) => {
  return (
    <div className="progress-container">
      <div className="progress-header">
        <h3 className="progress-label">{label}</h3>
        <span className="progress-label">{value}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-bar-fill w-progress ${
            value < 50 ? 'progress-bar-fill-red' : 
            value < 75 ? 'progress-bar-fill-yellow' : 'progress-bar-fill-green'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};