"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.LineClearer = function (grid) {
  this.frames = 0;
  this.isClearing = false;
  this.currentColumnOffset = 0;
  this.clearedRows = [];
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

  for (var i = 0; i < this.clearedRows.length; i++) {
    var row = this.clearedRows[i];
    this.grid[row][4 - this.currentColumnOffset] = 0;
    this.grid[row][5 + this.currentColumnOffset] = 0;
  }

  this.currentColumnOffset++;

  if (this.currentColumnOffset > 5) {
    this._reset();
    this.onFinish();
  }
};

Tetris.Core.LineClearer.prototype.clearRows = function () {
  this.clearedRows = [];
  for (var row = 0; row < this.grid.length; row++) {
    if (this._isFilled(row)) {
      this.clearedRows.push(row);
    }
  }

  if (this.clearedRows.length > 0) {
    this.isClearing = true;
  }

  return this.clearedRows.length;
};

Tetris.Core.LineClearer.prototype.isAnimating = function () {
  return this.isClearing;
};

Tetris.Core.LineClearer.prototype._isFilled = function (row) {
  var filled = 0;

  for (var col = 0; col < this.grid[row].length; col++) {
    if (this.grid[row][col] != 0) {
      filled++;
    }
  }

  return (filled == this.grid[row].length);
};

Tetris.Core.LineClearer.prototype._prependEmptyRow = function () {
  var emptyRow = [];

  for (var col = 0; col < this.grid[0].length; col++) {
    emptyRow.push(0);
  }

  this.grid.unshift(emptyRow);
};

Tetris.Core.LineClearer.prototype._reset = function () {
  for (var i = 0; i < this.clearedRows.length; i++) {
    var row = this.clearedRows[i];
    this.grid.splice(row, 1);
    this._prependEmptyRow();
  }

  this.clearedRows = [];
  this.isClearing = false;
  this.frames = 0;
  this.currentColumnOffset = 0;
};