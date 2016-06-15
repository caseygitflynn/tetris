"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.Title = function (ctx) {
  this.ctx = ctx;
};

Tetris.Graphics.Title.prototype.drawTitle = function () {
  var ctx = this.ctx;
  this._clear();

  var centerX = (Tetris.Config.GAME_WIDTH / 2);
  var centerY = (Tetris.Config.GAME_HEIGHT / 2);
  
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "150px Monaco";
  ctx.textAlign = "center"; 
  ctx.fillText("TETRIS", centerX, centerY);
  ctx.restore();
};

Tetris.Graphics.Title.prototype.drawSettings = function (settings) {
  var ctx = this.ctx;

  var centerX = (Tetris.Config.GAME_WIDTH / 2);
  var centerY = (Tetris.Config.GAME_HEIGHT / 2);
  
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center"; 

  ctx.font = "50px Monaco";
  ctx.fillText("Start Level", centerX - 200, centerY + 350);
  ctx.fillText(settings.startLevel, centerX -200, centerY + 425);

  ctx.font = "25px Monaco";
  ctx.fillText("(up/down to select)", centerX -200, centerY + 475);
  
  ctx.font = "50px Monaco";
  ctx.fillText("Garbage Grid?", centerX + 200, centerY + 350);
  ctx.fillText(settings.garbageGridStart ? "Yes" : "No", centerX + 200, centerY + 425);

  ctx.font = "25px Monaco";
  ctx.fillText("(left/right to select)", centerX + 200, centerY + 475);

  ctx.restore();
};

Tetris.Graphics.Title.prototype.drawMesage = function () {
  var ctx = this.ctx;

  var centerX = (Tetris.Config.GAME_WIDTH / 2);
  var centerY = (Tetris.Config.GAME_HEIGHT / 2);
  
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "25px Monaco";
  ctx.textAlign = "center"; 
  ctx.fillText("Press Enter...", centerX, centerY + 100);
  ctx.restore();
};

Tetris.Graphics.Title.prototype._clear = function () {
  var ctx = this.ctx;

  ctx.save();
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, Tetris.Config.GAME_WIDTH, Tetris.Config.GAME_HEIGHT);
  ctx.restore();
};