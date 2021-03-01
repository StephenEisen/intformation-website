import React from 'react';
import './loading-indicator.css';

/**
 * Shows a loading indicator. If you want the indicator inside another
 * container, make sure the container has "position: relative" on it.
 *
 * @param {object} props visible (true, false), size (default, small)
 */
const LoadingIndicator = (props) => {
  if (!props.visible) {
    return null;
  }

  const cirlceSize = !props.size ? 'default' : props.size;
  const loadingType = !props.type ? 'full' : props.type;

  return (
    <div className={`loading-indicator ${loadingType}`}>
      <div className="loading-contents">
        <div className={`loading-circle ${cirlceSize}`}></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
