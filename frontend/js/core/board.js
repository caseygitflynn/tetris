"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Board = function () {
  this.ROWS = Tetris.Config.GRID_ROWS;
  this.COLS = Tetris.Config.GRID_COLS;
  this.grid = [];

  if (Tetris.Config.GARBAGE_GRID_START) {
    this._makeGarbageGrid();
  } else {
    this._makeEmptyGrid();
  }
};

Tetris.Core.Board.prototype.willCollide = function (tetromino, row_delta, col_delta) {

  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] != 0) {

        var newRow = row + tetromino.position.row + row_delta;
        var newCol = col + tetromino.position.col + col_delta;
        if (!this._isOpen(newRow, newCol)) {
          return true;
        }
      }
    }
  }

  return false;
};

Tetris.Core.Board.prototype.isObstructed = function () {
  for (var row = 0; row < 2; row = row + 1) {
    for (var col = 0; col < this.grid[row].length; col++) {
      if (this.grid[row][col] !== 0) {
        return true;
      }
    }
  }

  return false;
};

Tetris.Core.Board.prototype.mergeTetromino = function (tetromino) {
  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] != 0) {
        this.grid[row + tetromino.position.row][col + tetromino.position.col] = tetromino.shape[row][col];
      }
    }
  }
};

Tetris.Core.Board.prototype._makeEmptyGrid = function () {
  this.grid = [];

  for (var row = 0; row < this.ROWS; row = row + 1) {
    this.grid[row] = [];
    for (var col = 0; col < this.COLS; col = col + 1) {
      this.grid[row][col] = 0;
    }
  }

};

Tetris.Core.Board.prototype._makeGarbageGrid = function () {
  this.grid = [];

  for (var row = 0; row < this.ROWS; row = row + 1) {
    this.grid[row] = [];
    for (var col = 0; col < this.COLS; col = col + 1) {
      this.grid[row][col] = this._weightedRandomSquare(row, col);
    }
  }

};

Tetris.Core.Board.prototype._weightedRandomSquare = function (row, col) {
  var rand = Math.random();

  if (row > Tetris.Config.GARBAGE_GRID_START_ROW && rand <= Tetris.Config.GARBAGE_GRID_WEIGHT && !this._isFilled(row)) {
    return Math.floor(Math.random() * (Tetris.Config.COLORS.length -1)) + 1;
  }

  return 0;
};

Tetris.Core.Board.prototype._isOpen = function (row, col) {
  if (col < 0 || col >= this.COLS) {
    return false;
  }
  if (row < 0 || row >= this.ROWS) {
    return false;
  }

  return this.grid[row][col] === 0;
};