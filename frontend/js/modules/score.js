"use strict";

var Tetris = Tetris || {};

Tetris.Score = function (level) {
  this.level = level;
  this.score = 0;
  this.totalLines = 0;
};

Tetris.Score.prototype.addLines = function (lines) {
  var lineScoring = Tetris.Config.LINE_SCORING[lines];

  if (lineScoring) {
    this.score += (lineScoring * (this.level + 1));
    this.totalLines += lines;
    if (this.totalLines % Tetris.Config.LINE_LEVEL_INCREASE == 0) {
      this.level++;
    }
  }
};