"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Gravity = function (level) {
  this.level = level;
  this.frames = 0;
};

Tetris.Core.Gravity.prototype.shouldDrop = function () {

  if (this.frames >= Tetris.Config.DROP_RATE[this.level]) {
    this.frames = 0;
    return true;
  }

  return false;
};

Tetris.Core.Gravity.prototype.frameUpdate = function (frames) {
  this.frames += frames || 1;
};

Tetris.Core.Gravity.prototype.setLevel = function (level) {
  this.level = level;
};