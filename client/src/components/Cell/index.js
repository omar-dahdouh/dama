/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Cell({ position, selected, color, click, count }) {
  return (
    <div
      className={`cell ${color} ${selected && 'selected'}`}
      style={{
        left: `${((position % 10) - 1) * 64}px`,
        top: `${Math.floor(position / 10 - 1) * 64}px`,
      }}
      onClick={() => click(position)}
    >
      {count > 1 && count}
    </div>
  );
}

Cell.propTypes = {
  position: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default Cell;
