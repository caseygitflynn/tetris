"use strict";

var Tetris = Tetris || {};

Tetris.Game = function (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.spaceSize = 50;
  this.ui = null;
  this.board = new Tetris.Board();
  this.timer = new Tetris.Timer(2);
  this.tetrominoFactory = new Tetris.TetrominoFactory();
  this.currentTetromino = null;
  this.keypad = new Tetris.Keypad();
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
};

Tetris.Game.prototype.update = function (timestamp) {
  window.requestAnimationFrame(this.update.bind(this));

  
  if (this.timer.shouldTakeInput()) {
    this.handleInput(this.keypad.getState());
  }

  if (this.timer.shouldDrop()) {
    if (!this.moveTetromino(1, 0)) {
      this.lockTetromino();
    }
  }

  this.ui.drawBoard(this.board);
  this.ui.drawGhostTetromino(this.getGhostTetromino());
  this.ui.drawTetromino(this.currentTetromino);

  this.previousTimestamp = timestamp;
};

Tetris.Game.prototype.handleInput = function (inputState) {
  if (inputState.DOWN) {
    if (!this.moveTetromino(1, 0)) {
      this.lockTetromino();
    }
  }
  if (inputState.LEFT) {
    this.moveTetromino(0, -1);
  }
  if (inputState.RIGHT) {
    this.moveTetromino(0, 1);
  }
  if (inputState.ROTATE) {
    this.rotateTetromino();
  }
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

Tetris.Game.prototype.lockTetromino = function () {
  this.board.mergeTetromino(this.currentTetromino);
  this.currentTetromino = this.tetrominoFactory.getRandom();
  var clearedRows = this.board.clearRows();
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