"use strict";

var Tetris = Tetris || {}; 

Tetris.Keypad = function () {
  this.pressedKeys = [];
  this.allowedKeys = [];
  
  window.addEventListener('keydown', this._onKeyDown.bind(this));
  window.addEventListener('keyup', this._onKeyUp.bind(this));
};

Tetris.Keypad.prototype._onKeyDown = function (e) {
  var keyCode = e.keyCode;

  if (this._isAssigned(keyCode)) {
    e.preventDefault();
    if (this.allowedKeys[keyCode] === false) {
      return;
    }
    this.allowedKeys[keyCode] = false;

    this.keyDown(keyCode);
  }
};

Tetris.Keypad.prototype._onKeyUp = function (e) {
  var keyCode = e.keyCode;

  if (this._isAssigned(keyCode)) {
    e.preventDefault();
    this.allowedKeys[keyCode] = true;
    this.pressedKeys[keyCode] = false;

    this.keyUp(keyCode);
  }
};

Tetris.Keypad.prototype._isAssigned = function (keyCode) {
  for (var key in Tetris.Config.KEYS) {
      if (Tetris.Config.KEYS.hasOwnProperty(key)) {
        if (keyCode == Tetris.Config.KEYS[key]) {
          return true;
        }
      }
  }

  return false;
};

Tetris.Keypad.prototype.keyDown = function (key) {
  console.log("Key down ", key);
};

Tetris.Keypad.prototype.keyUp = function (key) {
  console.log("Key up ", key);
};