"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Game = function () {
  this.board = new Tetris.Core.Board();
  this.score = new Tetris.Core.Score();
  this.gravity = new Tetris.Core.Gravity(this.score.level);
  this.lockDelay = new Tetris.Core.LockDelay();
  this.tetrominoQueue = new Tetris.Core.TetrominoQueue();
  this.currentTetromino = this.tetrominoQueue.getNext();
  this.downPressed = false;
  this.isGameOver = false;
  this.audioPlayer = null;
  this.holdLocked = false;

  this._initListeners();
};

Tetris.Core.Game.prototype._initListeners = function () {
  var self = this;

  this.score.onLevelIncrease = function (level) {
    self.gravity.setLevel(level);
    self.audioPlayer.play('level-up');
  };
};

Tetris.Core.Game.prototype.update = function (timestamp) {
  this.gravity.frameUpdate();
  this.lockDelay.frameUpdate();

  if (this.gravity.shouldDrop() || this.downPressed) {
    if (!this.moveTetromino(1, 0)) {
      var self = this;
      this.lockDelay.startLock(function () {
        self.lockTetromino();
      });
    } else if (this.downPressed) {
      this.score.softDrop();
    }
  }
};

Tetris.Core.Game.prototype.moveLeft = function () {
  if (this.moveTetromino(0, -1)) {
    this.audioPlayer.play('move');
  }
};

Tetris.Core.Game.prototype.moveRight = function () {
  if (this.moveTetromino(0, 1)) {
    this.audioPlayer.play('move');
  }
};

Tetris.Core.Game.prototype.moveTetromino = function (row_delta, col_delta) {
  if (this.board.willCollide(this.currentTetromino, row_delta, col_delta)) {
    return false;
  }

  this.currentTetromino.position.row += row_delta;
  this.currentTetromino.position.col += col_delta;

  this.lockDelay.onMove();

  if (row_delta > 0 || !(this.board.willCollide(this.currentTetromino, col_delta, 1))) {
    this.lockDelay.onShift();
  }

  return true;
};

Tetris.Core.Game.prototype.rotateTetromino = function () {
  var rotatedTetromino = this.currentTetromino.copy();
  rotatedTetromino.rotate();

  if (this.lockDelay.isPreloacking && !(this.board.willCollide(rotatedTetromino, 0, 1))) {
    this.lockDelay.onShift();
  }

  if (this.board.willCollide(rotatedTetromino, 0, 0)) {
    for (var i = 1; i < 3; i = i + 1) {
      if (!this.board.willCollide(rotatedTetromino, 0, i)) {
        rotatedTetromino.position.col += i;
        break;
      } else if (!this.board.willCollide(rotatedTetromino, 0, -i)) {
        rotatedTetromino.position.col -= i;
        break;
      } else if (!this.board.willCollide(rotatedTetromino, -i, 0)) {
        rotatedTetromino.position.row -= i;
        this.lockDelay.onShift();
        break;
      }
    }
  }

  if (!this.board.willCollide(rotatedTetromino, 0, 0)) {
    this.currentTetromino = rotatedTetromino;
    this.audioPlayer.play('rotate');
    this.lockDelay.onRotate();
  }
};

Tetris.Core.Game.prototype.dropTetromino = function () {
  var start_row = this.currentTetromino.position.row;
  while(!this.board.willCollide(this.currentTetromino, 1, 0)) {
    this.currentTetromino.position.row += 1;
  }

  var row_delta = this.currentTetromino.position.row - start_row;
  this.score.hardDrop(row_delta);

  this.lockTetromino();
};

Tetris.Core.Game.prototype.holdTetronimo = function () {
  if (this.holdLocked) {
    return;
  }

  this.currentTetromino = this.tetrominoQueue.hold(this.currentTetromino);
  this.holdLocked = true;
};

Tetris.Core.Game.prototype.lockTetromino = function () {
  this.board.mergeTetromino(this.currentTetromino);
  this.audioPlayer.play('lock');
  this.currentTetromino = this.tetrominoQueue.getNext();
  this.holdLocked = false;

  var clearedRows = this.board.clearRows();
  if (clearedRows > 0) {
    this.score.addLines(clearedRows);
    this.audioPlayer.play('clear-line');
  }

  if (this.board.isObstructed()) {
    this.isGameOver = true;
    this.audioPlayer.play('game-over');
  }
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