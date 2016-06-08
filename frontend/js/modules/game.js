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
  this.update();
  this._initListeners();
};

Tetris.Game.prototype._initListeners = function () {
  var self = this;

  this.keypad.onLeft = function () {
    self.currentTetromino.moveLeft();
  };
  this.keypad.onRight = function () {
    self.currentTetromino.moveRight();
  };
  this.keypad.onUp = function () {
    self.currentTetromino.rotate();
  };
  this.keypad.onDown = function () {
    self.currentTetromino.moveDown();
  };

  this.canvas.addEventListener('click', this._onClick.bind(this));
  window.addEventListener('resize', this._sizeCanvas.bind(this));
};

Tetris.Game.prototype.update = function (timestamp) {
  window.requestAnimationFrame(this.update.bind(this));

  if (this.timer.shouldUpdate()) {
    this.currentTetromino.moveDown();

    if (this.board.willLand(this.currentTetromino)) {
      this.board.landTetrominio(this.currentTetromino);
      this.currentTetromino = this.tetrominoFactory.getRandom();
    } else {
      this.currentTetromino.commitMove();
    }
  }

  this.board.drawLandedGrid();

  if (!this.board.hasCollisions(this.currentTetromino)) {
    this.currentTetromino.commitMove();
  } else {
    this.currentTetromino.revertMove();
  }

  this.board.mergeTetromino(this.currentTetromino);
  this.ui.draw(this.board.currentGrid);

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