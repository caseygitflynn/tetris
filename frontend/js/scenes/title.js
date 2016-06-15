"use strict";

var Tetris = Tetris || {};

Tetris.Scene = Tetris.Scene || {};

Tetris.Scene.Title = function (controller, ctx) {
  this.ctx = ctx;
  this.controller = controller;
  this.graphics = new Tetris.Graphics.Title(this.ctx);
  this.audioPlayer = new Tetris.Audio.Player();
  this.frameCounter = 0;
  this.settings = {
    startLevel : Tetris.Config.START_LEVEL,
    garbageGridStart : Tetris.Config.GARBAGE_GRID_START,
  };
};

Tetris.Scene.Title.prototype.update = function (timestamp) {
  this.frameCounter++;

  this.graphics.drawTitle();
  this.graphics.drawSettings(this.settings);

  if (this.frameCounter > 15) {
    this.graphics.drawMesage();

    if (this.frameCounter > 75) {
      this.frameCounter = 0;
    }
  }
};

Tetris.Scene.Title.prototype.load = function () {
  var audioLoader = new Tetris.Audio.Loader([
    { src : '/audio/title.mp3', name : 'title'},
    { src : '/audio/move.mp3', name : 'move'},
  ]);

  var self = this;
  audioLoader.onLoad = function(audioElements) {
    self.audioPlayer.addAudioElements(audioElements);
    self.audioPlayer.playBackgroundMusic('title');
    self.onLoad();
  };
};

Tetris.Scene.Title.prototype.onKeyDown = function (key) {

  if (key == Tetris.Config.KEYS.ENTER) {
    this.audioPlayer.stopBackgroundMusic();
    Tetris.Config.START_LEVEL = this.settings.startLevel;
    Tetris.Config.GARBAGE_GRID_START = this.settings.garbageGridStart;
    this.controller.setScene(new Tetris.Scene.Game(this.controller, this.ctx));
  }

  if (key == Tetris.Config.KEYS.ROTATE) {
    if (this.settings.startLevel < 10) {
      this.audioPlayer.play('move');
      this.settings.startLevel++;
    }
  }

  if (key == Tetris.Config.KEYS.DOWN) {
    if (this.settings.startLevel > 0) {
      this.audioPlayer.play('move');
      this.settings.startLevel--;
    }
  }

  if (key == Tetris.Config.KEYS.LEFT || key == Tetris.Config.KEYS.RIGHT) {
    this.audioPlayer.play('move');
    this.settings.garbageGridStart = !this.settings.garbageGridStart;
  }

};

Tetris.Scene.Title.prototype.onKeyUp = function (key) {
};