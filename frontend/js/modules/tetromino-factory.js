"use strict";

var Tetris = Tetris || {};

Tetris.TetrominoFactory = function () {
  this.tetrominos = [
    Tetris.Tetrominos.Square,
    Tetris.Tetrominos.J,
    Tetris.Tetrominos.L,
    Tetris.Tetrominos.S,
    Tetris.Tetrominos.Z,
    Tetris.Tetrominos.I,
  ];
};

Tetris.TetrominoFactory.prototype.getRandom = function () {
  var tetromino = new Tetris.Tetromino(this.tetrominos[Math.floor(Math.random() * this.tetrominos.length)]);

  return tetromino;
};