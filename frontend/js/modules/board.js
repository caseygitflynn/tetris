"use strict";

var Tetris = Tetris || {};

Tetris.Board = function () {
  this.ROWS = Tetris.Config.GRID_ROWS;
  this.COLS = Tetris.Config.GRID_COLS;
  this.landedGrid = [];
  this.currentGrid = [];

  this._init();
};

Tetris.Board.prototype._init = function () {
  this.landedGrid = this._makeEmptyGrid();
  this.currentGrid = this._makeEmptyGrid();
};

Tetris.Board.prototype._makeEmptyGrid = function () {
  var grid = [];

  for (var row = 0; row < this.ROWS; row = row + 1) {
    grid[row] = [];
    for (var col = 0; col < this.COLS; col = col + 1) {
      grid[row][col] = 0;
    }
  }

  return grid;
};

Tetris.Board.prototype.willLand = function (tetromino) {

  for (var row = 0; row < tetromino.potentialShape.length; row++) {
    for (var col = 0; col < tetromino.potentialShape[row].length; col++) {
      if (tetromino.potentialShape[row][col] != 0) {
        if (row + tetromino.potentialTopLeft.row >= this.landedGrid.length) {
          //this block would be below the playing field
          return true;
        }
        else if (this.landedGrid[row + tetromino.potentialTopLeft.row][col + tetromino.potentialTopLeft.col] != 0) {
          //the space is taken
          return true;
        }
      }
    }
  }

  return false;
};

Tetris.Board.prototype.hasCollisions = function (tetromino) {

  for (var row = 0; row < tetromino.potentialShape.length; row++) {
    for (var col = 0; col < tetromino.potentialShape[row].length; col++) {
      if (tetromino.potentialShape[row][col] != 0) {
        if (col + tetromino.potentialTopLeft.col < 0) {
          //this block would be to the left of the playing field
          return true;
        }
        if (col + tetromino.potentialTopLeft.col >= this.landedGrid[0].length) {
          //this block would be to the right of the playing field
          return true;
        }
        else if (this.landedGrid[row + tetromino.potentialTopLeft.row][col + tetromino.potentialTopLeft.col] != 0) {
          //the space is taken
          return true;
        }
      }
    }
  }

  return false;
};

Tetris.Board.prototype.landTetrominio = function (tetromino) {
  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] != 0) {
        this.landedGrid[row + tetromino.topLeft.row][col + tetromino.topLeft.col] = tetromino.shape[row][col];
      }
    }
  }

  this.clearRows();
};

Tetris.Board.prototype.mergeTetromino = function (tetromino) {
  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] != 0) {
        this.currentGrid[row + tetromino.topLeft.row][col + tetromino.topLeft.col] = tetromino.shape[row][col];
      }
    }
  }
};

Tetris.Board.prototype.clearRows = function () {
  var landed = this.landedGrid;

  for (var row = 0; row < this.landedGrid.length; row++) {
    var filled = 0;
    for (var col = 0; col < this.landedGrid[row].length; col++) {
      if (this.landedGrid[row][col] != 0) {
        filled++;
      }
    }

    if (filled == this.landedGrid[0].length) {
      this.landedGrid.splice(row, 1);
      this._prependEmptyRow();
    }
  }
};

Tetris.Board.prototype.drawLandedGrid = function () {
  this.currentGrid = this._makeEmptyGrid();
  var landed = this.landedGrid;

  for (var row = 0; row < landed.length; row++) {
    for (var col = 0; col < landed[row].length; col++) {
      this.currentGrid[row][col] = landed[row][col];
    }
  }
};

Tetris.Board.prototype._prependEmptyRow = function () {
  var emptyRow = [];

  for (var col = 0; col < this.landedGrid[0].length; col++) {
    emptyRow.push(0);
  }

  this.landedGrid.unshift(emptyRow);
};