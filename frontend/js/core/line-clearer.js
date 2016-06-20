"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.LineClearer = function (grid) {
  this.frames = 0;
  this.isClearing = false;
  this.currentColumnOffset = 0;
  this.rows = [];
  this.grid = grid;
};

Tetris.Core.LineClearer.prototype.onFrameUpdate = function (frames) {
  if (this.isClearing) {
    this.frames += frames || 1;
  }
};

Tetris.Core.LineClearer.prototype.update = function () {
  if (this.frames % 4 !== 0) {
    return;
  }

  for (var i = 0; i < this.rows.length; i++) {
    var row = this.rows[i];
    this.grid[row][4 - this.currentColumnOffset] = 0;
    this.grid[row][5 + this.currentColumnOffset] = 0;
  }

  this.currentColumnOffset++;

  if (this.currentColumnOffset > 5) {
    this.onFinish();
    this._reset();
  }
};

Tetris.Core.LineClearer.prototype.clearRows = function (rows) {
  this.isClearing = true;
  this.rows = rows;
};

Tetris.Core.LineClearer.prototype.isAnimating = function () {
  return this.isClearing;
};

Tetris.Core.LineClearer.prototype._reset = function () {
  this.isClearing = false;
  this.frames = 0;
  this.currentColumnOffset = 0;
};