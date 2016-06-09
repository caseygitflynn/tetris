"use strict";

var Tetris = Tetris || {};

Tetris.Timer = function (level) {
  this.paused = false;
  this.setLevel(level);
  this.dropFrameCounter = 0;
  this.inputFrameCounter = 0;
};

Tetris.Timer.prototype.shouldDrop = function () {
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

Tetris.Timer.prototype.shouldTakeInput = function () {
  if (this.paused) {
    return false;
  }

  this.inputFrameCounter++;
  
  if (this.inputFrameCounter >= 6) {
    this.inputFrameCounter = 0;
    return true;
  }

  return false;
};

Tetris.Timer.prototype.setLevel = function (level) {
  this.level = level;
};