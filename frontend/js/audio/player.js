"use strict";

var Tetris = Tetris || {};

Tetris.Audio = Tetris.Audio || {};

Tetris.Audio.Player = function () {
  this.audioElements = [];
  this.backgroundMusic = null;
};

Tetris.Audio.Player.prototype.addAudioElements = function (audioElements) {
  var audioElements = audioElements || []
  for (var i = 0; i < audioElements.length; i = i + 1) {
    this.audioElements.push(audioElements[i]);
  }
};

Tetris.Audio.Player.prototype.play = function (name) {
  var audioElement = this._find(name);
  if (audioElement) {
    var audio = new Audio();
    audio.src = audioElement.fileName;
    audio.preload = "auto";
    audio.volume = 1;
    audio.play();
  }
};

Tetris.Audio.Player.prototype.playBackgroundMusic = function (name) {
  var audioElement = this._find(name);
  if (audioElement) {
    var audio = new Audio();
    audio.src = audioElement.fileName;
    audio.preload = "auto";
    audio.volume = 1;
    audio.loop = true;
    audio.play();
    this.backgroundMusic = audio;
  }
};

Tetris.Audio.Player.prototype.toggleBackgroundMusic = function () {
  if (this.backgroundMusic) {
    if (this.backgroundMusic.paused) {
      this.backgroundMusic.play();
    } else {
      this.backgroundMusic.pause();
    }
  }
};

Tetris.Audio.Player.prototype._find = function (name) {
  console.log(this.audioElements);
  for (var i = 0; i < this.audioElements.length; i = i + 1) {
    var audioElement = this.audioElements[i];
    if (audioElement.name === name) {
      return audioElement;
    }
  }

  return null;
};