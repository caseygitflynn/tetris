"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.Board = function (ctx, spaceSize) {
  this.ctx = ctx;
  this.ROW_OFFSET = 1;
  this.COL_OFFSET = 1;
  this.rows = Tetris.Config.GRID_ROWS;
  this.cols = Tetris.Config.GRID_COLS;
  this.colors = ["black", "#CC66CC", "#66CCCC", "#DDAA00", "#66CC66", "#CC6666", "#6666CC", "#CCCC66"];
};

Tetris.Graphics.Board.prototype.drawLanded = function (board) {
  this._clear();

  for (var row = 0; row < this.rows; row = row + 1) {
    for (var col = 0; col < this.cols; col = col + 1) {
      this._drawGridSquare(row, col, board.grid[row][col]);
    }
  }
};

Tetris.Graphics.Board.prototype.drawTetromino = function (tetromino) {
  var grid = tetromino.shape;

  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] !== 0) {
        this._drawGridSquare(row + tetromino.position.row, col + tetromino.position.col, tetromino.shape[row][col]);
      }
    }
  }
};

Tetris.Graphics.Board.prototype.drawGhostTetromino = function (tetromino) {
  var grid = tetromino.shape;

  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] !== 0) {
        this._drawGhostSquare(row + tetromino.position.row, col + tetromino.position.col, tetromino.shape[row][col]);
      }
    }
  }
};

Tetris.Graphics.Board.prototype.drawPausedOverlay = function () {
  this._clear();

  var ctx = this.ctx;
  var centerX = (((this.cols + this.COL_OFFSET) * Tetris.Config.GRID_SIZE) / 2);
  var centerY = (((this.rows + this.ROW_OFFSET) * Tetris.Config.GRID_SIZE) / 2);
  
  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = Tetris.Config.GRID_SIZE + "px Monaco";
  ctx.textAlign = "center"; 
  ctx.fillText("PAUSED", centerX, centerY);
  ctx.restore();
};

Tetris.Graphics.Board.prototype._clear = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * Tetris.Config.GRID_SIZE, this.rows * Tetris.Config.GRID_SIZE);
  ctx.restore();
};

Tetris.Graphics.Board.prototype._drawGridSquare = function (row, col, color) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate((col + this.COL_OFFSET) * Tetris.Config.GRID_SIZE, (row + this.ROW_OFFSET) * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = this.colors[color];
  ctx.fillRect(0, 0, Tetris.Config.GRID_SIZE, Tetris.Config.GRID_SIZE);
  if (color == 0) {
    ctx.strokeStyle="#444444";
  } else {
    ctx.strokeStyle="#000000";
  }
  ctx.strokeRect(0, 0, Tetris.Config.GRID_SIZE, Tetris.Config.GRID_SIZE);
  ctx.restore();
};

Tetris.Graphics.Board.prototype._drawGhostSquare = function (row, col) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate((col + this.COL_OFFSET) * Tetris.Config.GRID_SIZE, (row + this.ROW_OFFSET) * Tetris.Config.GRID_SIZE);
  ctx.strokeStyle="#FFFFFF";
  ctx.strokeRect(0, 0, Tetris.Config.GRID_SIZE, Tetris.Config.GRID_SIZE);
  ctx.restore();
};