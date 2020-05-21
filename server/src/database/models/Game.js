const { Schema, model } = require('mongoose');

module.exports = model(
  'Games',
  new Schema({
    owner: 'string',
    player1: {
      type: 'string',
      default: '',
    },
    player2: {
      type: 'string',
      default: '',
    },
    cells: ['Number'],
    cellColor: ['string'],
    cellCount: ['Number'],
    king: ['Boolean'],
    manPosition: ['Number'],
    manLabel: ['Number'],
    manDisable: ['Boolean'],
    moveList: [Schema.Types.Mixed],
    captureList: [Schema.Types.Mixed],
    maxCapture: 'Number',
    turn: 'string',
  })
);
