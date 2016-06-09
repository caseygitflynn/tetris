"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.LockDelay = function () {
  this.frames = 0;
  this.callback = null;
  this.preLocking = false;
};

Tetris.Core.LockDelay.prototype.requestLock = function (callback) {
  this.preLocking = true;
  this.callback = callback;
};

Tetris.Core.LockDelay.prototype.reset = function () {
  this.frames = 0;
  this.preLocking = false;
};

Tetris.Core.LockDelay.prototype.frameUpdate = function (frames) {
  if (this.preLocking) {
    this.frames += frames || 1;
  }
  if (this.shouldReleaseLock()) {
    this.callback();
    this.reset();
  }
};

Tetris.Core.LockDelay.prototype.shouldReleaseLock = function () {
  return (this.preLocking && this.frames >= Tetris.Config.LOCK_DELAY);
};