"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Timer = function (level) {
  this.paused = false;
  this.setLevel(level);
  this.dropFrameCounter = 0;
};

Tetris.Core.Timer.prototype.shouldDrop = function () {
  if (this.paused) {
    return false;
  }

  this.dropFrameCounter++;
  if (this.dropFrameCounter >= Tetris.Config.DROP_RATE[this.level]) {
    this.dropFrameCounter = 0;
    return true;
  }

  return false;
};

Tetris.Core.Timer.prototype.setLevel = function (level) {
  this.level = level;
};