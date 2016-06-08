"use strict";

var Tetris = Tetris || {}; 

Tetris.Keypad = function () {
  this.KEYS = {
    ROTATE : 38,
    DOWN   : 40,
    LEFT   : 37,
    RIGHT  : 39,
    DROP   : 32,
  };

  this.pressedKeys = [];
  
  window.addEventListener('keydown', this._onKeyDown.bind(this));
  window.addEventListener('keyup', this._onKeyUp.bind(this));
};

Tetris.Keypad.prototype._onKeyDown = function (e) {
  var keyCode = e.keyCode;

  if (this._isAssigned(keyCode)) {
    e.preventDefault();
    this.pressedKeys[keyCode] = true;
  }
};

Tetris.Keypad.prototype._onKeyUp = function (e) {
  var keyCode = e.keyCode;

  if (this._isAssigned(keyCode)) {
    e.preventDefault();
    this.pressedKeys[keyCode] = false;
  }
};

Tetris.Keypad.prototype.getState = function () {
  return {
    ROTATE : this.pressedKeys[this.KEYS.ROTATE] || false,
    DOWN   : this.pressedKeys[this.KEYS.DOWN]   || false,
    LEFT   : this.pressedKeys[this.KEYS.LEFT]   || false,
    RIGHT  : this.pressedKeys[this.KEYS.RIGHT]  || false,
    DROP   : this.pressedKeys[this.KEYS.DROP]   || false,
  };
};

Tetris.Keypad.prototype._isAssigned = function (keyCode) {
  for (var key in this.KEYS) {
      if (this.KEYS.hasOwnProperty(key)) {
        if (keyCode == this.KEYS[key]) {
          return true;
        }
      }
  }

  return false;
};