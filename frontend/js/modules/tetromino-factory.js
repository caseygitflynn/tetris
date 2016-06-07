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

  this.bag = [];
};

Tetris.TetrominoFactory.prototype.getRandom = function () {
  if (this.isEmpty()) {
    this.fillBag();
  }
  var tetromino = new Tetris.Tetromino(this.bag.pop());

  return tetromino;
};

Tetris.TetrominoFactory.prototype.isEmpty = function () {
  return this.bag.length === 0;
};

Tetris.TetrominoFactory.prototype.fillBag = function () {
  this.bag = this.tetrominos.slice(0);
  this.shuffle(this.bag);
};

Tetris.TetrominoFactory.prototype.shuffle = function (array) {
  var j, x, i;
  for (i = array.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = array[i - 1];
      array[i - 1] = array[j];
      array[j] = x;
  }
};