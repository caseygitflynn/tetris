"use strict";

var Tetris = Tetris || {};

Tetris.Scene = Tetris.Scene || {};

Tetris.Scene.Game = function (controller, ctx) {
  this.controller = controller;
  this.ctx = ctx;
  this.boardUI = new Tetris.Graphics.Board(this.ctx, 50);
  this.scoreUI = new Tetris.Graphics.Score(this.ctx);
  this.tetrominoQueueUI = new Tetris.Graphics.TetrominoQueue(this.ctx);
  this.heldTetronimoUI = new Tetris.Graphics.HeldTetronimo(this.ctx);
  this.game = new Tetris.Core.Game(0);
  this.paused = false;
  this.audioPlayer = new Tetris.Audio.Player();
  this.game.audioPlayer = this.audioPlayer;
  Tetris.Config.DAS_ENABLED = true;
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
  if (!this.paused && !this.game.isGameOver) {
    this.game.update();
  }

  if (this.game.isGameOver) {
    this.audioPlayer.stopBackgroundMusic();
  }

  this.draw();
};

Tetris.Scene.Game.prototype.draw = function () {
  this.boardUI.drawBackground();

  if (this.paused) {
    this.boardUI.drawPausedOverlay();
  } else if (this.game.isGameOver) {
    this.boardUI.drawGameOverOverlay();
  } else {
    this.boardUI.drawLanded(this.game.board);
    this.boardUI.drawGhostTetromino(this.game.getGhostTetromino());
    this.boardUI.drawTetromino(this.game.currentTetromino);
  }

  this.scoreUI.drawScore(this.game.score);
  this.tetrominoQueueUI.draw(this.game.tetrominoQueue);
  this.heldTetronimoUI.draw(this.game.tetrominoQueue);
};

Tetris.Scene.Game.prototype.load = function () {
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
    self.onLoad();
  };
};

Tetris.Scene.Game.prototype.onKeyDown = function (key) {

  if (key == Tetris.Config.KEYS.EXIT) {
    this.audioPlayer.stopBackgroundMusic();
    this.controller.setScene(new Tetris.Scene.Title(this.controller, this.ctx));
  }

  if (key == Tetris.Config.KEYS.ENTER) {
    if (this.game.isGameOver) {
      this.game = new Tetris.Core.Game(0);
      this.game.audioPlayer = this.audioPlayer;
      this.paused = false;
      this.audioPlayer.playBackgroundMusic();
    } else {
      this.togglePause();
    }
  }

  if (this.paused) {
    return;
  }

  switch (key) {
    case Tetris.Config.KEYS.LEFT :
      this.game.moveLeft();
      break;
    case Tetris.Config.KEYS.RIGHT :
      this.game.moveRight();
      break;
    case Tetris.Config.KEYS.ROTATE :
      this.game.rotateTetromino();
      break;
    case Tetris.Config.KEYS.DOWN :
      this.game.downPressed = true;
      break;
    case Tetris.Config.KEYS.DROP :
      this.game.dropTetromino();
      break;
    case Tetris.Config.KEYS.HOLD :
      this.game.holdTetronimo();
      break;
  }

};

Tetris.Scene.Game.prototype.onKeyUp = function (key) {
  if (this.paused) {
    return;
  }

  switch (key) {
    case Tetris.Config.KEYS.DOWN :
      this.game.downPressed = false;
  }
};