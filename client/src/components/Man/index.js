/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Man({ position, white, king, onClick, id, label, gray, disable }) {
  return (
    <div
      className={`man ${white && 'white'} ${king && 'king'} ${
        disable && 'disable'
      }`}
      style={{
        left: `${((position % 10) - 1) * 64}px`,
        top: `${Math.floor(position / 10 - 1) * 64}px`,
      }}
      onClick={() => onClick(id)}
    >
      <div className="ring" />
      {label > 0 && <div className={`label ${gray && 'gray'}`}>{label}</div>}
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
  gray: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default Man;
