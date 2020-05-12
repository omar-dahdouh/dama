import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Man({ position, white, king, onClick, id, label }) {
  return (
    <div
      className={`man ${white && 'white'} ${king && 'king'}`}
      style={{
        left: `${((position % 10) - 1) * 64}px`,
        top: `${Math.floor(position / 10 - 1) * 64}px`,
      }}
      onClick={() => onClick(id)}
      role="button"
      tabIndex="0"
      onKeyPress={() => {}}
    >
      <div className="ring" />
      {label > 0 && <div className="label">{label}</div>}
    </div>
  );
}

Man.propTypes = {
  position: PropTypes.number.isRequired,
  white: PropTypes.bool.isRequired,
  king: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
};

export default Man;
