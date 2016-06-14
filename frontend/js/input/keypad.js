"use strict";

var Tetris = Tetris || {};

Tetris.Input = Tetris.Input || {}; 

Tetris.Input.Keypad = function () {
  this.pressedKeys = [];
  this.allowedKeys = [];
  this._dasReset();
  
  window.addEventListener('keydown', this._onKeyDown.bind(this));
  window.addEventListener('keyup', this._onKeyUp.bind(this));
};

Tetris.Input.Keypad.prototype.frameUpdate = function (frames) {
  this.dasFrames -= frames || 1;

  if (this.dasFrames <= 0 && this.dasCallback) {
    this.dasCallback();
    this.dasFrames = Tetris.Config.DAS_REPEAT_FRAMES;
  }
};

Tetris.Input.Keypad.prototype._onKeyDown = function (e) {
  var keyCode = e.keyCode;

  if (this._isAssigned(keyCode)) {
    e.preventDefault();
    if (this.allowedKeys[keyCode] === false) {
      return;
    }

    this.allowedKeys[keyCode] = false;
    this.keyDown(keyCode);
    this._dasReset();

    if (keyCode == Tetris.Config.KEYS.LEFT || keyCode == Tetris.Config.KEYS.RIGHT) {
      this.dasCallback = this.keyDown.bind(this, keyCode);
    }
  }
};

Tetris.Input.Keypad.prototype._dasReset = function () {
  this.dasCallback = null;
  this.dasFrames = Tetris.Config.DAS_INITAL_FRAMES;
};

Tetris.Input.Keypad.prototype._onKeyUp = function (e) {
  var keyCode = e.keyCode;
  this._dasReset();

  if (this._isAssigned(keyCode)) {
    e.preventDefault();
    this.allowedKeys[keyCode] = true;
    this.pressedKeys[keyCode] = false;

    this.keyUp(keyCode);
  }
};

Tetris.Input.Keypad.prototype._isAssigned = function (keyCode) {
  for (var key in Tetris.Config.KEYS) {
      if (Tetris.Config.KEYS.hasOwnProperty(key)) {
        if (keyCode == Tetris.Config.KEYS[key]) {
          return true;
        }
      }
  }

  return false;
};

Tetris.Input.Keypad.prototype.keyDown = function (key) {
  console.log("Key down ", key);
};

Tetris.Input.Keypad.prototype.keyUp = function (key) {
  console.log("Key up ", key);
};