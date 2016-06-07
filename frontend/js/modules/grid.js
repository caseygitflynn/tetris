"use strict";

var Tetris = Tetris || {};

Tetris.Grid = function (ctx, rows, cols, spaceSize) {
  this.ctx = ctx;
  this.rows = rows;
  this.cols = cols;
  this.spaceSize = spaceSize;
  this.colors = ["black", "red", "blue", "yellow", "green", "purple", "orange"];
};

Tetris.Grid.prototype.draw = function (grid) {
  this._clear();

  for (var row = 0; row < this.rows; row = row + 1) {
    for (var col = 0; col < this.cols; col = col + 1) {
      var color = grid[row][col];
      this._drawGridSquare(row, col, color);
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
  ctx.strokeRect(0, 0, this.cols * this.spaceSize, this.rows * this.spaceSize);
  ctx.restore();
};