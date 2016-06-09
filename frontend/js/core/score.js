"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Score = function () {
  this.level = Tetris.Config.START_LEVEL;
  this.score = 0;
  this.totalLines = 0;
  this.lineGoal = this.level * Tetris.Config.LINE_LEVEL_INCREASE || Tetris.Config.LINE_LEVEL_INCREASE;
};

Tetris.Core.Score.prototype.addLines = function (lines) {
  var lineScoring = Tetris.Config.LINE_SCORING[lines - 1];

  if (lineScoring) {
    this.score += (lineScoring * (this.level + 1));
    this.totalLines += lines;
    this.lineGoal -= lines;

    if (this.lineGoal <= 0) {
      this.level++;
      this.lineGoal = this.level * Tetris.Config.LINE_LEVEL_INCREASE;
    }

    console.log("Score: ",this.score, "Level: ", this.level, "Line Goal: ", this.lineGoal);
  }
};

Tetris.Core.Score.prototype.softDrop = function () {
  console.log('soft drop');
  this.score += Tetris.Config.SOFT_DROP;
};

Tetris.Core.Score.prototype.hardDrop = function (row_delta) {
  this.score += (row_delta * Tetris.Config.HARD_DROP_MULTIPLIER);
};