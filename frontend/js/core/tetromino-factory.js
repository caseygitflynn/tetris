"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.TetrominoFactory = function () {
  this.tetrominos = [
    Tetris.Config.TETRONIMOS.O,
    Tetris.Config.TETRONIMOS.J,
    Tetris.Config.TETRONIMOS.L,
    Tetris.Config.TETRONIMOS.S,
    Tetris.Config.TETRONIMOS.Z,
    Tetris.Config.TETRONIMOS.I,
    Tetris.Config.TETRONIMOS.T,
  ];

  this.bag = [];
};

Tetris.Core.TetrominoFactory.prototype.getRandom = function () {
  if (this.isEmpty()) {
    this.fillBag();
  }
  var tetromino = new Tetris.Core.Tetromino(this.bag.pop());

  return tetromino;
};

Tetris.Core.TetrominoFactory.prototype.isEmpty = function () {
  return this.bag.length === 0;
};

Tetris.Core.TetrominoFactory.prototype.fillBag = function () {
  this.bag = this.tetrominos.slice(0);
  this.shuffle(this.bag);
};

Tetris.Core.TetrominoFactory.prototype.shuffle = function (array) {
  var j, x, i;
  for (i = array.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = array[i - 1];
      array[i - 1] = array[j];
      array[j] = x;
  }
};