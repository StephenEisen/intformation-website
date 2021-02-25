import React from 'react';
import './loading-indicator.css';

const LoadingIndicator = (props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <div className="loading-indicator">
      <div className="loading-contents">
        <div className="loading-circle"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
