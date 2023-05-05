import React from 'react';
import PropTypes from 'prop-types';

function ProgressCircle({ percentage }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r={radius}
        stroke="blue"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="10">
        {`${percentage}%`}
      </text>
    </svg>
  );
}

ProgressCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressCircle;
