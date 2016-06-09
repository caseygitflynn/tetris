"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.NextTetromino = function (ctx) {
  this.ctx = ctx;
  this.ROW_OFFSET = 7;
  this.COL_OFFSET = 12;
  this.rows = 14;
  this.cols = 5;
};

Tetris.Graphics.NextTetromino.prototype.drawNextTetromino = function (tetrominoFactory) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * Tetris.Config.GRID_SIZE, this.rows * Tetris.Config.GRID_SIZE);
  ctx.font = Tetris.Config.GRID_SIZE * 0.8 + "px Monaco";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("NEXT", (this.cols * Tetris.Config.GRID_SIZE) / 2, Tetris.Config.GRID_SIZE);
  ctx.restore();
};