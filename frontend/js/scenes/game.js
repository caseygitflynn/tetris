"use strict";

var Tetris = Tetris || {};

Tetris.Scene = Tetris.Scene || {};

Tetris.Scene.Game = function (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.boardUI = new Tetris.Graphics.Board(this.ctx, 50);
  this.scoreUI = new Tetris.Graphics.Score(this.ctx);
  this.tetrominoQueueUI = new Tetris.Graphics.TetrominoQueue(this.ctx);
  this.heldTetronimoUI = new Tetris.Graphics.HeldTetronimo(this.ctx);
  this.input = new Tetris.Input.Keypad();
  this.game = new Tetris.Core.Game(0);
  this.paused = false;
  this.audioPlayer = new Tetris.Audio.Player();
  this.game.audioPlayer = this.audioPlayer;

  this._sizeCanvas();
  this._initListeners();
  this._loadAudio();
};

Tetris.Scene.Game.prototype.togglePause = function () {
  if (!this.game.isGameOver) {
    this.paused = !this.paused;
  }

  if (this.paused) {
    this.audioPlayer.pauseBackgroundMusic();
  } else {
    this.audioPlayer.playBackgroundMusic();
  }
};

Tetris.Scene.Game.prototype.update = function (timestamp) {
  window.requestAnimationFrame(this.update.bind(this));

  if (!this.paused && !this.game.isGameOver) {
    this.input.frameUpdate();
    this.game.update();
  }

  if (this.game.isGameOver) {
    this.audioPlayer.stopBackgroundMusic();
  }

  this.draw();
};

Tetris.Scene.Game.prototype.draw = function () {
  if (this.paused) {
    this.boardUI.drawPausedOverlay();
    this.scoreUI.drawScore(this.game.score);
    this.tetrominoQueueUI.draw(this.game.tetrominoQueue);
    this.heldTetronimoUI.draw(this.game.tetrominoQueue);
  } else if (this.game.isGameOver) {
    this.boardUI.drawGameOverOverlay();
  } else {
    this.boardUI.drawLanded(this.game.board);
    this.boardUI.drawGhostTetromino(this.game.getGhostTetromino());
    this.boardUI.drawTetromino(this.game.currentTetromino);
    this.scoreUI.drawScore(this.game.score);
    this.tetrominoQueueUI.draw(this.game.tetrominoQueue);
    this.heldTetronimoUI.draw(this.game.tetrominoQueue);
  }
};

Tetris.Scene.Game.prototype._loadAudio = function () {
  var audioLoader = new Tetris.Audio.Loader([
    { src : '/audio/music.mp3', name : 'tetris'},
    { src : '/audio/game-over.mp3', name : 'game-over'},
    { src : '/audio/move.mp3', name : 'move'},
    { src : '/audio/rotate.mp3', name : 'rotate'},
    { src : '/audio/lock.mp3', name : 'lock'},
    { src : '/audio/clear-line.mp3', name : 'clear-line'},
    { src : '/audio/clear-tetris.mp3', name : 'clear-tetris'},
    { src : '/audio/level-up.mp3', name : 'level-up'},
    { src : '/audio/hold.mp3', name : 'hold'},
  ]);

  var self = this;
  audioLoader.onLoad = function(audioElements) {
    self.audioPlayer.addAudioElements(audioElements);
    self.audioPlayer.playBackgroundMusic('tetris');
    self.update(0);
  };
};

Tetris.Scene.Game.prototype._initListeners = function () {
  var self = this;

  window.addEventListener('resize', this._sizeCanvas.bind(this));

  this.input.keyDown = function (key) {
    if (key == Tetris.Config.KEYS.ENTER) {
      if (self.game.isGameOver) {
        self.game = new Tetris.Core.Game(0);
        self.game.audioPlayer = self.audioPlayer;
        self.paused = false;
        self.audioPlayer.playBackgroundMusic();
      } else {
        self.togglePause();
      }
    }

    if (self.paused) {
      return;
    }

    switch (key) {
      case Tetris.Config.KEYS.LEFT :
        self.game.moveLeft();
        break;
      case Tetris.Config.KEYS.RIGHT :
        self.game.moveRight();
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
      case Tetris.Config.KEYS.HOLD :
        self.game.holdTetronimo();
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