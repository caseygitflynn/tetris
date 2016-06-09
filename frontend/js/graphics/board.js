"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.Board = function (ctx, spaceSize) {
  this.ctx = ctx;
  this.rows = Tetris.Config.GRID_ROWS;
  this.cols = Tetris.Config.GRID_COLS;
  this.spaceSize = spaceSize;
  this.colors = ["black", "#CC66CC", "#66CCCC", "#DDAA00", "#66CC66", "#CC6666", "#6666CC", "#CCCC66"];
};

Tetris.Graphics.Board.prototype.drawBoard = function (board) {
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
  var centerX = (ctx.canvas.width / 2);
  var centerY = (ctx.canvas.height / 2);
  
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = this.spaceSize + "px Monaco";
  ctx.textAlign = "center"; 
  ctx.fillText("PAUSED", centerX, centerY);
  ctx.restore();
};

Tetris.Graphics.Board.prototype._clear = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * this.spaceSize, this.rows * this.spaceSize);
  ctx.restore();
};

Tetris.Graphics.Board.prototype._drawGridSquare = function (row, col, color) {
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

Tetris.Graphics.Board.prototype._drawGhostSquare = function (row, col) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(col * this.spaceSize, row * this.spaceSize);
  ctx.strokeStyle="#FFFFFF";
  ctx.strokeRect(0, 0, this.spaceSize, this.spaceSize);
  ctx.restore();
};