import React from 'react';
import PropTypes from 'prop-types';

function ProgressCircle({ percentage }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="55" height="55" viewBox="-2 2 55 45">
      <circle
        cx="25"
        cy="25"
        r={radius}
        stroke="#e8e8e8"
        strokeWidth="5"
        fill="transparent"
        strokeLinecap="round"
      />
      <circle
        cx="25"
        cy="25"
        r={radius}
        stroke="#379cf6"
        strokeWidth="4"
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-85, 25, 25)"
      />
    </svg>
  );
}

ProgressCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressCircle;
