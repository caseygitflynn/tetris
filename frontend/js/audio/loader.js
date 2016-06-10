"use strict";

var Tetris = Tetris || {};

Tetris.Audio = Tetris.Audio || {};

Tetris.Audio.Loader = function (files) {
  this.files = files || [];
  this.loadedFiles = [];
  this.totalFiles = this.files.length;

  this._loadFiles();
};

Tetris.Audio.Loader.prototype._loadFiles = function () {
  for (var i = 0; i < this.totalFiles; i = i + 1) {
    this._loadFile(this.files[i]);
  }
};

Tetris.Audio.Loader.prototype._loadFile = function (file) {
  var audio = new Audio();
  audio.src = file.src;
  audio.preload = "auto";
  audio.volume = 1;

  var audioElement = {
    fileName : file.src,
    name : file.name,
  };

  audio.addEventListener('canplaythrough', this._onFileLoaded.bind(this, audioElement));
  return audio;
};

Tetris.Audio.Loader.prototype._onFileLoaded = function (audio) {
  this.loadedFiles.push(audio);
  if (this.loadedFiles.length === this.totalFiles) {
    this.onLoad(this.loadedFiles);
  }
};

Tetris.Audio.Loader.prototype.onLoad = function (audioElements) {
  for (var i = 0; i < audioElements.length; i = i + 1) {
    audioElements[i].audio.play();
  }
};