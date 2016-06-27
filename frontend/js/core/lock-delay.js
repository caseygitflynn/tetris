"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.LockDelay = function () {
  this.frames = 0;
  this.callback = null;
  this.preLocking = false;
};

Tetris.Core.LockDelay.prototype.startLock = function (callback) {
  this.preLocking = true;
  this.callback = callback;
};

Tetris.Core.LockDelay.prototype.onShift = function () {
  this._restore();
};

Tetris.Core.LockDelay.prototype.onMove = function () {
  if (this.isPrelocked()) {
    this._reset();
  }
};

Tetris.Core.LockDelay.prototype.onRotate = function () {
  this.onMove();
};

Tetris.Core.LockDelay.prototype.frameUpdate = function (frames) {
  if (this.isPrelocked()) {
    this.frames += frames || 1;
  }
  if (this._shouldReleaseLock()) {
    this.callback();
    this._restore();
  }
};

Tetris.Core.LockDelay.prototype.isPrelocked = function () {
  return this.preLocking;
};

Tetris.Core.LockDelay.prototype._restore = function () {
  this.preLocking = false;
  this._reset();
};

Tetris.Core.LockDelay.prototype._reset = function () {
  this.frames = 0;
};

Tetris.Core.LockDelay.prototype._shouldReleaseLock = function () {
  return (this.isPrelocked() && this.frames >= Tetris.Config.LOCK_DELAY);
};