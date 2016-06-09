"use strict";

var Tetris = Tetris || {};

Tetris.Scene = Tetris.Scene || {};

Tetris.Scene.Game = function (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.graphics = new Tetris.Graphics.Board(this.ctx, 50);
  this.input = new Tetris.Input.Keypad();
  this.game = new Tetris.Core.Game(0);
  this.paused = false;

  this._sizeCanvas();
  this._initListeners();
  this.update(0);
};

Tetris.Scene.Game.prototype._initListeners = function () {
  var self = this;

  this.canvas.addEventListener('click', this.togglePause.bind(this));
  window.addEventListener('resize', this._sizeCanvas.bind(this));

  this.input.keyDown = function (key) {
    if (self.paused) {
      return;
    }

    switch (key) {
      case Tetris.Config.KEYS.LEFT :
        self.game.moveTetromino(0, -1);
        break;
      case Tetris.Config.KEYS.RIGHT :
        self.game.moveTetromino(0, 1);
        break;
      case Tetris.Config.KEYS.ROTATE :
        self.game.rotateTetromino();
        break;
      case Tetris.Config.KEYS.DOWN :
        self.game.downPressed = true;
        break;
      case Tetris.Config.KEYS.DROP :
        self.game.dropTetromino();
        break;
    }
  };

  this.input.keyUp = function (key) {
    if (self.paused) {
      return;
    }

    switch (key) {
      case Tetris.Config.KEYS.DOWN :
        self.game.downPressed = false;
    }
  };
};

Tetris.Scene.Game.prototype.togglePause = function () {
  this.paused = !this.paused;
};

Tetris.Scene.Game.prototype.update = function (timestamp) {
  window.requestAnimationFrame(this.update.bind(this));

  if (!this.paused) {
    this.game.update();
  }

  this.draw();
};

Tetris.Scene.Game.prototype.draw = function () {
  this.graphics.drawBoard(this.game.board);
  this.graphics.drawGhostTetromino(this.game.getGhostTetromino());
  this.graphics.drawTetromino(this.game.currentTetromino);
};

Tetris.Scene.Game.prototype._sizeCanvas = function () {
  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;
  var ratio = Tetris.Config.GRID_COLS / Tetris.Config.GRID_ROWS;
  var spaceSize = 50;

  if (winWidth / winHeight < ratio) {
    spaceSize = winWidth / Tetris.Config.GRID_COLS;
  } else {
    spaceSize = winHeight / Tetris.Config.GRID_ROWS;
  }

  this.canvas.width = Tetris.Config.GRID_COLS * spaceSize;
  this.canvas.height = Tetris.Config.GRID_ROWS * spaceSize;
  this.graphics.spaceSize = spaceSize;
};