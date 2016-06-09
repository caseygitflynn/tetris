"use strict";

var Tetris = Tetris || {};

Tetris.Game = function (canvas) {
  this.level = 0;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.spaceSize = 50;
  this.ui = null;
  this.board = new Tetris.Board();
  this.timer = new Tetris.Timer(this.level);
  this.tetrominoFactory = new Tetris.TetrominoFactory();
  this.currentTetromino = null;
  this.keypad = new Tetris.Keypad();
  this.score = new Tetris.Score(this.level);
  this.downPressed = false;
};

Tetris.Game.prototype.init = function() {
  this.ui = new Tetris.Grid(this.ctx, Tetris.Config.GRID_ROWS, Tetris.Config.GRID_COLS, this.spaceSize);
  this._sizeCanvas();
  this.currentTetromino = this.tetrominoFactory.getRandom();
  this.update(0);
  this._initListeners();
};

Tetris.Game.prototype._initListeners = function () {
  var self = this;

  this.canvas.addEventListener('click', this._onClick.bind(this));
  window.addEventListener('resize', this._sizeCanvas.bind(this));

  this.keypad.keyDown = function (key) {
    if (self.timer.paused) {
      return;
    }

    switch (key) {
      case Tetris.Config.KEYS.LEFT :
        self.moveTetromino(0, -1);
        break;
      case Tetris.Config.KEYS.RIGHT :
        self.moveTetromino(0, 1);
        break;
      case Tetris.Config.KEYS.ROTATE :
        self.rotateTetromino();
        break;
      case Tetris.Config.KEYS.DOWN :
        self.downPressed = true;
        break;
      case Tetris.Config.KEYS.DROP :
        self.dropTetromino();
        break;
    }
  };

  this.keypad.keyUp = function (key) {
    if (self.timer.paused) {
      return;
    }

    switch (key) {
      case Tetris.Config.KEYS.DOWN :
        self.downPressed = false;
    }
  };
};

Tetris.Game.prototype.update = function (timestamp) {
  window.requestAnimationFrame(this.update.bind(this));

  if (this.timer.shouldDrop() || this.downPressed) {
    if (!this.moveTetromino(1, 0)) {
      this.lockTetromino();
    }
  }

  this.ui.drawBoard(this.board);
  this.ui.drawGhostTetromino(this.getGhostTetromino());
  this.ui.drawTetromino(this.currentTetromino);

  this.previousTimestamp = timestamp;
};

Tetris.Game.prototype.moveTetromino = function (row_delta, col_delta) {
  if (this.board.willCollide(this.currentTetromino, row_delta, col_delta)) {
    return false;
  }

  this.currentTetromino.position.row += row_delta;
  this.currentTetromino.position.col += col_delta;

  return true;
};

Tetris.Game.prototype.rotateTetromino = function () {
  var rotatedTetromino = this.currentTetromino.copy();
  rotatedTetromino.rotate();

  if (!this.board.willCollide(rotatedTetromino, 0, 0)) {
    this.currentTetromino = rotatedTetromino;
  }
};

Tetris.Game.prototype.dropTetromino = function () {
  while(!this.board.willCollide(this.currentTetromino, 1, 0)) {
    this.currentTetromino.position.row += 1;
  }

  this.lockTetromino();
};

Tetris.Game.prototype.lockTetromino = function () {
  this.board.mergeTetromino(this.currentTetromino);
  this.currentTetromino = this.tetrominoFactory.getRandom();
  var clearedRows = this.board.clearRows();
  if (clearedRows > 0) {
    this.score.addLines(clearedRows);
  }

  this.timer.setLevel(this.score.level);
};

Tetris.Game.prototype.getGhostTetromino = function () {
  var ghostTetromino = this.currentTetromino.copy();

  while(!this.board.willCollide(ghostTetromino, 1, 0)) {
    ghostTetromino.position.row += 1;
  }

  return ghostTetromino;
};

Tetris.Game.prototype._onClick = function (e) {
  this.timer.paused = !this.timer.paused;
};

Tetris.Game.prototype._sizeCanvas = function () {
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