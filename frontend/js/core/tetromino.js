"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Tetromino = function (config) {
  this.currentRotation = config.currentRotation || 0;
  this.rotations = config.rotations;
  this.shape = config.rotations[this.currentRotation];
  this.position = {
    row : config.position.row,
    col : config.position.col,
  };
  this.queueOffset = config.queueOffset;
  this.origin = config.origin;
};

Tetris.Core.Tetromino.prototype.rotate = function () {
  if (this.rotations[this.currentRotation +1]) {
    this.currentRotation++;
  } else {
    this.currentRotation = 0;
  }

  this.shape = this.rotations[this.currentRotation];
};

Tetris.Core.Tetromino.prototype.moveToOrigin = function () {
  this.currentRotation = 0;
  this.shape = this.rotations[this.currentRotation];
  this.position = {
    row : this.origin.row,
    col : this.origin.col,
  };
};

Tetris.Core.Tetromino.prototype.copy = function () {
  return new Tetris.Core.Tetromino({
    currentRotation : this.currentRotation,
    rotations : this.rotations,
    shape : this.shape.slice(0),
    position : {
      row : this.position.row,
      col : this.position.col
    },
    queueOffset : this.queueOffset,
    origin : this.origin,
  });
};