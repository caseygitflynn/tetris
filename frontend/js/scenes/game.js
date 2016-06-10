"use strict";

var Tetris = Tetris || {};

Tetris.Scene = Tetris.Scene || {};

Tetris.Scene.Game = function (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.boardUI = new Tetris.Graphics.Board(this.ctx, 50);
  this.scoreUI = new Tetris.Graphics.Score(this.ctx);
  this.tetrominoQueueUI = new Tetris.Graphics.TetrominoQueue(this.ctx);
  this.input = new Tetris.Input.Keypad();
  this.game = new Tetris.Core.Game(0);
  this.paused = false;

  this._sizeCanvas();
  this._initListeners();
  this.update(0);
};

Tetris.Scene.Game.prototype.togglePause = function () {
  if (!this.game.isGameOver) {
    this.paused = !this.paused;
  }
};

Tetris.Scene.Game.prototype.update = function (timestamp) {
  window.requestAnimationFrame(this.update.bind(this));

  if (!this.paused) {
    this.game.update();
  }

  this.draw();
};

Tetris.Scene.Game.prototype.draw = function () {
  if (this.paused) {
    this.boardUI.drawPausedOverlay();
    this.scoreUI.drawScore(this.game.score);
  } else if (this.game.isGameOver) {
    this.boardUI.drawGameOverOverlay();
  } else {
    this.boardUI.drawLanded(this.game.board);
    this.boardUI.drawGhostTetromino(this.game.getGhostTetromino());
    this.boardUI.drawTetromino(this.game.currentTetromino);
    this.scoreUI.drawScore(this.game.score);
    this.tetrominoQueueUI.draw(this.game.tetrominoQueue);
  }
};

Tetris.Scene.Game.prototype._initListeners = function () {
  var self = this;

  window.addEventListener('resize', this._sizeCanvas.bind(this));

  this.input.keyDown = function (key) {
    if (key == Tetris.Config.KEYS.ENTER) {
      if (self.game.isGameOver) {
        self.game = new Tetris.Core.Game(0);
        self.paused = false;
      } else {
        self.togglePause();
      }
    }

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

Tetris.Scene.Game.prototype._sizeCanvas = function () {
  this.canvas.width = Tetris.Config.GAME_WIDTH;
  this.canvas.height = Tetris.Config.GAME_HEIGHT;

  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;
  var ratio = Tetris.Config.GAME_WIDTH / Tetris.Config.GAME_HEIGHT;

  if (winWidth / winHeight < ratio) {
    this.canvas.style.width = winWidth + "px";
    this.canvas.style.height = "auto";
  } else {
    this.canvas.style.width = "auto";
    this.canvas.style.height = winHeight + "px";
  }
};