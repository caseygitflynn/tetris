"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Timer = function (score) {
  this.score = score;
  this.frames = 0;
};

Tetris.Core.Timer.prototype.shouldDrop = function () {

  if (this.frames >= Tetris.Config.DROP_RATE[this.score.level]) {
    this.frames = 0;
    return true;
  }

  return false;
};

Tetris.Core.Timer.prototype.increaseFrame = function (frames) {
  this.frames += frames || 1;
};