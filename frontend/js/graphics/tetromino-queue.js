"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.TetrominoQueue = function (ctx) {
  this.ctx = ctx;
  this.ROW_OFFSET = 1;
  this.COL_OFFSET = 18;
  this.rows = 20;
  this.cols = 5;
};

Tetris.Graphics.TetrominoQueue.prototype.draw = function (tetrominoQueue) {
  var ctx = this.ctx;

  this._clear();

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.font = Tetris.Config.GRID_SIZE * 0.8 + "px Monaco";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("NEXT", (this.cols * Tetris.Config.GRID_SIZE) / 2, Tetris.Config.GRID_SIZE);
  ctx.restore();

  this._drawQueue(tetrominoQueue);
};

Tetris.Graphics.TetrominoQueue.prototype._drawQueue = function (tetrominoQueue) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  for (var i = 0; i < 4; i = i + 1) {
    this._drawTetromino(tetrominoQueue.view(i), 1.5 + (i * 4.25), -2.5);
  }
  ctx.restore();
};

Tetris.Graphics.TetrominoQueue.prototype._clear = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * Tetris.Config.GRID_SIZE, this.rows * Tetris.Config.GRID_SIZE);
  ctx.restore();
};

Tetris.Graphics.TetrominoQueue.prototype._drawTetromino = function (tetromino, row_offset, col_offset) {
  var ctx = this.ctx;

  ctx.save();

  ctx.translate((col_offset + tetromino.centeringOffset.col) * Tetris.Config.GRID_SIZE, (row_offset + tetromino.centeringOffset.row) * Tetris.Config.GRID_SIZE);
  Tetris.Graphics.drawTetronimo(ctx, tetromino);
  ctx.restore();
};