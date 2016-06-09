"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Game = function () {
  this.board = new Tetris.Core.Board();
  this.score = new Tetris.Core.Score();
  this.timer = new Tetris.Core.Timer(this.score.score);
  this.tetrominoFactory = new Tetris.Core.TetrominoFactory();
  this.currentTetromino = this.tetrominoFactory.getRandom();;
  this.downPressed = false;
};

Tetris.Core.Game.prototype.update = function (timestamp) {
  if (this.timer.shouldDrop() || this.downPressed) {
    if (!this.moveTetromino(1, 0)) {
      this.lockTetromino();
    }
  }
};

Tetris.Core.Game.prototype.moveTetromino = function (row_delta, col_delta) {
  if (this.board.willCollide(this.currentTetromino, row_delta, col_delta)) {
    return false;
  }

  this.currentTetromino.position.row += row_delta;
  this.currentTetromino.position.col += col_delta;

  return true;
};

Tetris.Core.Game.prototype.rotateTetromino = function () {
  var rotatedTetromino = this.currentTetromino.copy();
  rotatedTetromino.rotate();

  if (!this.board.willCollide(rotatedTetromino, 0, 0)) {
    this.currentTetromino = rotatedTetromino;
  }
};

Tetris.Core.Game.prototype.dropTetromino = function () {
  while(!this.board.willCollide(this.currentTetromino, 1, 0)) {
    this.currentTetromino.position.row += 1;
  }

  this.lockTetromino();
};

Tetris.Core.Game.prototype.lockTetromino = function () {
  this.board.mergeTetromino(this.currentTetromino);
  this.currentTetromino = this.tetrominoFactory.getRandom();
  var clearedRows = this.board.clearRows();
  if (clearedRows > 0) {
    this.score.addLines(clearedRows);
  }

  this.timer.setLevel(this.score.level);
};

Tetris.Core.Game.prototype.getGhostTetromino = function () {
  var ghostTetromino = this.currentTetromino.copy();

  while(!this.board.willCollide(ghostTetromino, 1, 0)) {
    ghostTetromino.position.row += 1;
  }

  return ghostTetromino;
};

Tetris.Core.Game.prototype._sizeCanvas = function () {
  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;
  var ratio = this.GRID_COLS / this.GRID_ROWS;

  if (winWidth / winHeight < ratio) {
    this.spaceSize = winWidth / Tetris.Config.GRID_COLS;
  } else {
    this.spaceSize = winHeight / Tetris.Config.GRID_ROWS;
  }

  this.canvas.width = Tetris.Config.GRID_COLS * this.spaceSize;
  this.canvas.height = Tetris.Config.GRID_ROWS * this.spaceSize;
  this.ui.spaceSize = this.spaceSize;
};