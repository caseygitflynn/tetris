"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.HeldTetronimo = function (ctx) {
  this.ctx = ctx;
  this.ROW_OFFSET = 1;
  this.COL_OFFSET = 1;
  this.rows = 6;
  this.cols = 5;
};

Tetris.Graphics.HeldTetronimo.prototype.draw = function (tetrominoQueue) {
  var ctx = this.ctx;

  this._clear();

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.font = Tetris.Config.GRID_SIZE * 0.8 + "px Monaco";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("HOLD", (this.cols * Tetris.Config.GRID_SIZE) / 2, Tetris.Config.GRID_SIZE);
  ctx.restore();

  this._drawHeld(tetrominoQueue);
};

Tetris.Graphics.HeldTetronimo.prototype._drawHeld = function (tetrominoQueue) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  var heldTetronimo = tetrominoQueue.viewHeld();
  if (heldTetronimo) {
    this._drawTetromino(heldTetronimo, 1.5, -2.5);
  }
  ctx.restore();
};

Tetris.Graphics.HeldTetronimo.prototype._clear = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * Tetris.Config.GRID_SIZE, this.rows * Tetris.Config.GRID_SIZE);
  ctx.restore();
};

Tetris.Graphics.HeldTetronimo.prototype._drawTetromino = function (tetromino, row_offset, col_offset) {
  var ctx = this.ctx;

  ctx.save();

  ctx.translate((col_offset + tetromino.centeringOffset.col) * Tetris.Config.GRID_SIZE, (row_offset + tetromino.centeringOffset.row) * Tetris.Config.GRID_SIZE);
  Tetris.Graphics.drawTetronimo(ctx, tetromino);
  ctx.restore();
};