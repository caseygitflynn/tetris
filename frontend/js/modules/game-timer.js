"use strict";

var Tetris = Tetris || {};

Tetris.Timer = function (fps) {
  this.fps = fps;
  this.now;
  this.then = Date.now();
  this.interval = 1000/this.fps;
  this.delta;
  this.paused = false;
}

Tetris.Timer.prototype.shouldUpdate = function () {

  if (this.paused) {
    return false;
  }

  this.now = Date.now();
  this.delta = this.now - this.then;
     
  if (this.delta > this.interval) {
    this.then = this.now - (this.delta % this.interval);
    return true;
  }

  return false;
};