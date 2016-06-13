"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.Score = function (ctx) {
  this.ctx = ctx;
  this.ROW_OFFSET = 1;
  this.COL_OFFSET = 1;
  this.rows = 2.5;
  this.cols = 10;
};

Tetris.Graphics.Score.prototype.drawScore = function (score) {
  var ctx = this.ctx;

  ctx.save();
  ctx.translate(this.COL_OFFSET * Tetris.Config.GRID_SIZE, this.ROW_OFFSET * Tetris.Config.GRID_SIZE);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.cols * Tetris.Config.GRID_SIZE, this.rows * Tetris.Config.GRID_SIZE);
  ctx.font = "40px Monaco";
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("SCORE", 25, 50);
  ctx.fillText(this._zeroFill(score.score, 8), 25, 100);
  ctx.fillText("LEVEL", 300, 50);
  ctx.fillText(this._zeroFill(score.level, 2), 300, 100);
  ctx.restore();
};

Tetris.Graphics.Score.prototype._zeroFill = function (number, width) {
  width -= number.toString().length;
    if ( width > 0 )
    {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + "";
};