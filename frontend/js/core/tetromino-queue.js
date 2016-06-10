"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.TetrominoQueue = function () {
  this.queue = [];
  this.randomizer = new Tetris.Core.TetrominoRandomizer();

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