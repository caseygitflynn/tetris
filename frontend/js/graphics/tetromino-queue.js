"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.TetrominoQueue = function (ctx) {
  this.ctx = ctx;
  this.ROW_OFFSET = 4;
  this.COL_OFFSET = 12;
  this.rows = 20;
  this.cols = 5;
  this.colors = ["#000000", "#CC66CC", "#66CCCC", "#DDAA00", "#66CC66", "#CC6666", "#6666CC", "#CCCC66"];
};

Tetris.Graphics.TetrominoQueue.prototype.draw = function (tetrominoQueue) {
  var ctx = this.ctx;

  this._clear();

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.font = Tetris.Config.GRID_SIZE * 0.8 + "px Monaco";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("HELD", (this.cols * Tetris.Config.GRID_SIZE) / 2, Tetris.Config.GRID_SIZE);
  ctx.translate(0, Tetris.Config.GRID_SIZE * 6);
  ctx.fillText("NEXT", (this.cols * Tetris.Config.GRID_SIZE) / 2, Tetris.Config.GRID_SIZE);
  ctx.restore();

  this._drawQueue(tetrominoQueue);
  this._drawHeld(tetrominoQueue);
};

Tetris.Graphics.TetrominoQueue.prototype._drawQueue = function (tetrominoQueue) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  for (var i = 0; i < 3; i = i + 1) {
    this._drawTetromino(tetrominoQueue.view(i), 7.5 + (i * 4), -2.5);
  }
  ctx.restore();
};

Tetris.Graphics.TetrominoQueue.prototype._drawHeld = function (tetrominoQueue) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  var heldTetronimo = tetrominoQueue.viewHeld();
  if (heldTetronimo) {
    this._drawTetromino(heldTetronimo, 1.5, -2.5);
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

  ctx.translate((col_offset + tetromino.queueOffset.col) * Tetris.Config.GRID_SIZE, (row_offset + tetromino.queueOffset.row) * Tetris.Config.GRID_SIZE);
  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] !== 0) {
        this._drawGridSquare(row + tetromino.position.row, col + tetromino.position.col, tetromino.shape[row][col]);
      }
    }
  }
  ctx.restore();
};

Tetris.Graphics.TetrominoQueue.prototype._drawGridSquare = function (row, col, color) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(col * Tetris.Config.GRID_SIZE, row * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = this.colors[color];
  ctx.strokeStyle="#000000";
  ctx.lineWidth = 3;
  ctx.strokeRect(3, 3, Tetris.Config.GRID_SIZE - 6, Tetris.Config.GRID_SIZE - 6);
  ctx.fillRect(3, 3, Tetris.Config.GRID_SIZE - 6, Tetris.Config.GRID_SIZE - 6);
  ctx.restore();
};