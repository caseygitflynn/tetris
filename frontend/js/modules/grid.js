"use strict";

var Tetris = Tetris || {};

Tetris.Grid = function (ctx, rows, cols, spaceSize) {
  this.ctx = ctx;
  this.rows = rows;
  this.cols = cols;
  this.spaceSize = spaceSize;
};

Tetris.Grid.prototype.draw = function (grid) {
  this._clear();

  for (var row = 0; row < this.rows; row = row + 1) {
    for (var col = 0; col < this.cols; col = col + 1) {
      var gridSpace = grid[row][col];
      this._drawGridSquare(row, col, (gridSpace !== 0));
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

Tetris.Grid.prototype._drawGridSquare = function (row, col, filled) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(col * this.spaceSize, row * this.spaceSize);
  if (filled) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "black";
  }
  ctx.fillRect(0, 0, this.spaceSize, this.spaceSize);
  ctx.restore();
};