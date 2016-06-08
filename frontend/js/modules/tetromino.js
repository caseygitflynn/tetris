"use strict";

var Tetris = Tetris || {};

Tetris.Tetrominos = Tetris.Tetrominos || {};

Tetris.Tetrominos.O = {
  rotations : [
    [[0, 1, 1, 0],
     [0, 1, 1, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
};

Tetris.Tetrominos.J = {
  rotations : [
    [[2, 0, 0, 0],
     [2, 2, 2, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    [[0, 2, 2, 0],
     [0, 2, 0, 0],
     [0, 2, 0, 0],
     [0, 0, 0, 0]],
    [[0, 0, 0, 0],
     [2, 2, 2, 0],
     [0, 0, 2, 0],
     [0, 0, 0, 0]],
    [[0, 2, 0, 0],
     [0, 2, 0, 0],
     [2, 2, 0, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
};

Tetris.Tetrominos.L = {
  rotations : [
    [[0, 0, 0, 0],
     [3, 3, 3, 0],
     [3, 0, 0, 0],
     [0, 0, 0, 0]],
    [[3, 3, 0, 0],
     [0, 3, 0, 0],
     [0, 3, 0, 0],
     [0, 0, 0, 0]],
    [[0, 0, 3, 0],
     [3, 3, 3, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    [[0, 3, 0, 0],
     [0, 3, 0, 0],
     [0, 3, 3, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
};

Tetris.Tetrominos.S = {
  rotations : [
    [[0, 0, 0, 0],
     [0, 4, 4, 0],
     [4, 4, 0, 0],
     [0, 0, 0, 0]],
    [[0, 4, 0, 0],
     [0, 4, 4, 0],
     [0, 0, 4, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
};

Tetris.Tetrominos.Z = {
  rotations : [
    [[0, 0, 0, 0],
     [5, 5, 0, 0],
     [0, 5, 5, 0],
     [0, 0, 0, 0]],
    [[0, 0, 5, 0],
     [0, 5, 5, 0],
     [0, 5, 0, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
};

Tetris.Tetrominos.I = {
  rotations : [
    [[0, 6, 0, 0],
     [0, 6, 0, 0],
     [0, 6, 0, 0],
     [0, 6, 0, 0]],
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [6, 6, 6, 6],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
};

Tetris.Tetrominos.T = {
  rotations : [
    [[0, 7, 0, 0],
     [7, 7, 7, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    [[0, 7, 0, 0],
     [0, 7, 7, 0],
     [0, 7, 0, 0],
     [0, 0, 0, 0]],
    [[0, 0, 0, 0],
     [7, 7, 7, 0],
     [0, 7, 0, 0],
     [0, 0, 0, 0]],
    [[0, 7, 0, 0],
     [7, 7, 0, 0],
     [0, 7, 0, 0],
     [0, 0, 0, 0]],

  ],
  position : {row : 0, col :3 },
};

Tetris.Tetromino = function (config) {
  this.currentRotation = config.currentRotation || 0;
  this.rotations = config.rotations;
  this.shape = config.rotations[this.currentRotation];
  this.position = config.position;
};

Tetris.Tetromino.prototype.rotate = function () {
  if (this.rotations[this.currentRotation +1]) {
    this.currentRotation++;
  } else {
    this.currentRotation = 0;
  }

  this.shape = this.rotations[this.currentRotation];
};

Tetris.Tetromino.prototype.copy = function () {
  return new Tetris.Tetromino({
    currentRotation : this.currentRotation,
    rotations : this.rotations,
    shape : this.shape.slice(0),
    position : {
      row : this.position.row,
      col : this.position.col
    }
  });
};