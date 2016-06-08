"use strict";

var Tetris = Tetris || {};

Tetris.Grid = function (ctx, rows, cols, spaceSize) {
  this.ctx = ctx;
  this.rows = rows;
  this.cols = cols;
  this.spaceSize = spaceSize;
  this.colors = ["black", "#CC66CC", "#66CCCC", "#DDAA00", "#66CC66", "#CC6666", "#6666CC", "#CCCC66"];
};

Tetris.Grid.prototype.drawBoard = function (board) {
  this._clear();

  for (var row = 0; row < this.rows; row = row + 1) {
    for (var col = 0; col < this.cols; col = col + 1) {
      this._drawGridSquare(row, col, board.grid[row][col]);
    }
  }
};

Tetris.Grid.prototype.drawTetromino = function (tetromino) {
  var grid = tetromino.shape;

  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] !== 0) {
        this._drawGridSquare(row + tetromino.position.row, col + tetromino.position.col, tetromino.shape[row][col]);
      }
    }
  }
};

Tetris.Grid.prototype._clear = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * this.spaceSize, this.rows * this.spaceSize);
  ctx.restore();
};

Tetris.Grid.prototype._drawGridSquare = function (row, col, color) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(col * this.spaceSize, row * this.spaceSize);
  ctx.fillStyle = this.colors[color];
  ctx.fillRect(0, 0, this.spaceSize, this.spaceSize);
  if (color == 0) {
    ctx.strokeStyle="#444444";
  } else {
    ctx.strokeStyle="#000000";
  }
  ctx.strokeRect(0, 0, this.spaceSize, this.spaceSize);
  ctx.restore();
};