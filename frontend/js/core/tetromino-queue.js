"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.TetrominoQueue = function () {
  this.queue = [];
  this.randomizer = new Tetris.Core.TetrominoRandomizer();
  this.heldTetronimo = null;

  for (var i =0; i < 5; i = i + 1) {
    this.queue.push(this.randomizer.getRandom());
  }
};

Tetris.Core.TetrominoQueue.prototype.getNext = function () {
  this.queue.push(this.randomizer.getRandom());

  return this.queue.shift();
};

Tetris.Core.TetrominoQueue.prototype.view = function (index) {
  var index = index || 0;

  return this.queue[index];
};

Tetris.Core.TetrominoQueue.prototype.viewHeld = function () {
  return this.heldTetronimo;
};

Tetris.Core.TetrominoQueue.prototype.hold = function (tetronimo) {
  if (this.heldTetronimo) {
    var releasedTetronimo = new Tetris.Core.Tetromino(this.heldTetronimo);

    this.heldTetronimo = new Tetris.Core.Tetromino(tetronimo);
    this.heldTetronimo.moveToOrigin();

    return releasedTetronimo;
  } else {

    this.heldTetronimo = new Tetris.Core.Tetromino(tetronimo);
    this.heldTetronimo.moveToOrigin();

    return this.getNext();
  }
};