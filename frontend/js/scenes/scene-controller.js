"use strict";

var Tetris = Tetris || {};

Tetris.Scene = Tetris.Scene || {};

Tetris.Scene.SceneController = function (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.currentScene = null;
  this.keypad = new Tetris.Input.Keypad();
  this.animationHandle = null;

  this._sizeCanvas();
  this._initListeners();

  this.setScene(new Tetris.Scene.Title(this, this.ctx));
};

Tetris.Scene.SceneController.prototype.setScene = function (scene) {
  window.cancelAnimationFrame(this.animationHandle);
  
  this.currentScene = scene;

  var self = this;
  this.currentScene.onLoad = function () {
    self.update();
  };

  this.currentScene.load();
};

Tetris.Scene.SceneController.prototype.update = function () {
  this.animationHandle = window.requestAnimationFrame(this.update.bind(this));

  this.keypad.frameUpdate();
  this.currentScene.update();
};

Tetris.Scene.SceneController.prototype._initListeners = function () {
  var self = this;

  window.addEventListener('resize', this._sizeCanvas.bind(this));

  this.keypad.keyDown = function (key) {
    self.currentScene.onKeyDown(key);
  };

  this.keypad.keyUp = function (key) {
    self.currentScene.onKeyUp(key);
  };

};

Tetris.Scene.SceneController.prototype._sizeCanvas = function () {
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