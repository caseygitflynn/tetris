"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.Board = function (ctx, spaceSize) {
  this.ctx = ctx;
  this.ROW_OFFSET = -1;
  this.COL_OFFSET = 7;
  this.rows = Tetris.Config.GRID_ROWS;
  this.cols = Tetris.Config.GRID_COLS;
};

Tetris.Graphics.Board.prototype.drawBackground = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.fillStyle = "#CCCCCC";
  ctx.fillRect(0, 0, Tetris.Config.GAME_WIDTH, Tetris.Config.GAME_HEIGHT);
  ctx.restore();
};

Tetris.Graphics.Board.prototype.drawLanded = function (board) {
  var self = this;
  this._moveToOffset(function () {
    self._clear();

    for (var row = 0; row < self.rows; row = row + 1) {
      for (var col = 0; col < self.cols; col = col + 1) {
        var color = board.grid[row][col];
        self._drawGridSquare(row, col, board.grid[row][col]);
      }
    }
  });
};

Tetris.Graphics.Board.prototype.drawTetromino = function (tetromino) {
  var grid = tetromino.shape;

  var self = this;
  this._moveToOffset(function () {
    for (var row = 0; row < tetromino.shape.length; row++) {
      for (var col = 0; col < tetromino.shape[row].length; col++) {
        if (tetromino.shape[row][col] !== 0) {
          self._drawGridSquare(row + tetromino.position.row, col + tetromino.position.col, tetromino.shape[row][col]);
        }
      }
    }
  });
};

Tetris.Graphics.Board.prototype.drawGhostTetromino = function (tetromino) {
  var grid = tetromino.shape;
  
  var self = this;
  this._moveToOffset(function () {
    for (var row = 0; row < tetromino.shape.length; row++) {
      for (var col = 0; col < tetromino.shape[row].length; col++) {
        if (tetromino.shape[row][col] !== 0) {
          self._drawGhostSquare(row + tetromino.position.row, col + tetromino.position.col, tetromino.shape[row][col]);
        }
      }
    }
  });
};

Tetris.Graphics.Board.prototype.drawPausedOverlay = function () {

  var self = this;
  this._moveToOffset(function () {
    self._clear();
    var ctx = self.ctx;
    var centerX = ((self.cols * Tetris.Config.GRID_SIZE) / 2);
    var centerY = (((self.rows + 2) * Tetris.Config.GRID_SIZE) / 2);
    
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "50px Monaco";
    ctx.textAlign = "center"; 
    ctx.fillText("PAUSED", centerX, centerY);
    ctx.restore();
  });

  
};

Tetris.Graphics.Board.prototype.drawGameOverOverlay = function () {

  var self = this;
  this._moveToOffset(function () {
    self._clear();
    var ctx = self.ctx;
    var centerX = ((self.cols * Tetris.Config.GRID_SIZE) / 2);
    var centerY = (((self.rows + 2) * Tetris.Config.GRID_SIZE) / 2);
    
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "50px Monaco";
    ctx.textAlign = "center"; 
    ctx.fillText("GAME OVER", centerX, centerY);
    ctx.font = "25px Monaco";
    ctx.fillText("Press Enter...", centerX, centerY + 50);
    ctx.restore();
  });

  
};

Tetris.Graphics.Board.prototype._clear = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, Tetris.Config.GRID_SIZE * 2, this.cols * Tetris.Config.GRID_SIZE, (this.rows - 2) * Tetris.Config.GRID_SIZE);
  ctx.restore();
};

Tetris.Graphics.Board.prototype._drawGridSquare = function (row, col, color) {
  if (row < 2) {
    return;
  }

  Tetris.Graphics.drawGridSquare(this.ctx, row, col, color);
};

Tetris.Graphics.Board.prototype._drawGhostSquare = function (row, col) {
  var ctx = this.ctx;

  if (row < 2) {
    return;
  }

  ctx.save();
  ctx.translate(col * Tetris.Config.GRID_SIZE, row * Tetris.Config.GRID_SIZE);
  ctx.strokeStyle="#FFFFFF";
  ctx.lineWidth = 3;
  ctx.strokeRect(3, 3, Tetris.Config.GRID_SIZE - 6, Tetris.Config.GRID_SIZE - 6);
  ctx.restore();
};

Tetris.Graphics.Board.prototype._moveToOffset = function (callback) {
  var ctx = this.ctx;
  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  callback();
  ctx.restore();
};