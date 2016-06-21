"use strict";

var Tetris = Tetris || {};

Tetris.Core = Tetris.Core || {};

Tetris.Core.Score = function () {
  this.level = Tetris.Config.START_LEVEL;
  this.score = 0;
  this.queuedPoints = 0;
  this.totalLines = 0;
  this.lineGoal = this.level * Tetris.Config.LINE_LEVEL_INCREASE || Tetris.Config.LINE_LEVEL_INCREASE;
};

Tetris.Core.Score.prototype.addLines = function (lines) {
  var lineScoring = Tetris.Config.LINE_SCORING[lines - 1];

  if (lineScoring) {
    this.queuedPoints += (lineScoring * (this.level + 1));
    this.totalLines += lines;
    this.lineGoal -= lines;

    if (this.lineGoal < 0) {
      this.lineGoal = 0;
    }
  }
};

Tetris.Core.Score.prototype.softDrop = function () {
  this.queuedPoints += Tetris.Config.SOFT_DROP;
};

Tetris.Core.Score.prototype.hardDrop = function (row_delta) {
  this.queuedPoints += (row_delta * Tetris.Config.HARD_DROP_MULTIPLIER);
};

Tetris.Core.Score.prototype.tallyPoints = function () {
  this.score += this.queuedPoints;
  this.queuedPoints = 0;

  if (this.lineGoal <= 0) {
    this.level++;
    this.onLevelIncrease(this.level);
    this.lineGoal = this.level * Tetris.Config.LINE_LEVEL_INCREASE;
  }
};

Tetris.Core.Score.prototype.onLevelIncrease = function (level) {
  console.log("Level increase to ", level);
};