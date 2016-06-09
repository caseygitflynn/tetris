"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.Score = function (ctx) {
  this.ctx = ctx;
  this.ROW_OFFSET = 1;
  this.COL_OFFSET = 12;
  this.rows = 4.5;
  this.cols = 5;
};

Tetris.Graphics.Score.prototype.drawScore = function (score) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * Tetris.Config.GRID_SIZE, this.rows * Tetris.Config.GRID_SIZE);
  ctx.font = Tetris.Config.GRID_SIZE * 0.8 + "px Monaco";
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("SCORE", Tetris.Config.GRID_SIZE / 2, Tetris.Config.GRID_SIZE);
  ctx.fillText(score.score.toString(), Tetris.Config.GRID_SIZE / 2, Tetris.Config.GRID_SIZE * 2);
  ctx.fillText("LEVEL", Tetris.Config.GRID_SIZE / 2, Tetris.Config.GRID_SIZE * 3);
  ctx.fillText(score.level.toString(), Tetris.Config.GRID_SIZE / 2, Tetris.Config.GRID_SIZE * 4);
  ctx.restore();
};