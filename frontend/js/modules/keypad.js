"use strict";

var Tetris = Tetris || {};

Tetris.Keypad = function () {
  window.addEventListener('keydown', this._onKeyDown.bind(this));
};

Tetris.Keypad.prototype._onKeyDown = function (e) {
  if (e.keyCode === 37) {
    e.preventDefault();
    this.onLeft();
  }
  if (e.keyCode === 38) {
    e.preventDefault();
    this.onUp();
  }
  if (e.keyCode === 39) {
    e.preventDefault();
    this.onRight();
  }
  if (e.keyCode === 40) {
    e.preventDefault();
    this.onDown();
  }
};

Tetris.Keypad.prototype.onLeft = function () {
  console.log('Keypad left');
};

Tetris.Keypad.prototype.onUp = function () {
  console.log('Keypad up');
};

Tetris.Keypad.prototype.onRight = function () {
  console.log('Keypad right');
};

Tetris.Keypad.prototype.onDown = function () {
  console.log('Keypad down');
};