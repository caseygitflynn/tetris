"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.LineClearAnimation = function () {
  this.frames = 0;
  this.isClearing = false;
  this.currentColumnOffset = 0;
  this.rows = [];
  this.board = null;
};

Tetris.Core.LineClearAnimation.prototype.onFrameUpdate = function (frames) {
  if (this.isClearing) {
    this.frames += frames || 1;
  }
};

Tetris.Core.LineClearAnimation.prototype.update = function () {
  if (this.frames % 4 !== 0) {
    return;
  }

  for (var i = 0; i < this.rows.length; i++) {
    var row = this.rows[i];
    this.board[row][4 - this.currentColumnOffset] = 0;
    this.board[row][5 + this.currentColumnOffset] = 0;
  }

  this.currentColumnOffset++;

  if (this.currentColumnOffset > 5) {
    this.onFinish();
    this._reset();
  }
};

Tetris.Core.LineClearAnimation.prototype.clearRows = function (board, rows) {
  this.isClearing = true;
  this.board = board;
  this.rows = rows;
};

Tetris.Core.LineClearAnimation.prototype.isAnimating = function () {
  return this.isClearing;
};

Tetris.Core.LineClearAnimation.prototype._reset = function () {
  this.isClearing = false;
  this.frames = 0;
  this.currentColumnOffset = 0;
};