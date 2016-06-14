"use strict";

var Tetris = Tetris || {};

Tetris.Graphics = Tetris.Graphics || {};

Tetris.Graphics.drawGridSquare = function(ctx, row, col, color) {
  ctx.save();
  ctx.translate(col * Tetris.Config.GRID_SIZE, row * Tetris.Config.GRID_SIZE);
  if (color == 0) {
    if (((row % 2 == 0) && (col % 2 == 0)) || ((row % 2 != 0) && (col % 2 != 0))) {
      ctx.fillStyle = "#000000";
    } else {
      ctx.fillStyle = "#222222";
    }
    ctx.fillRect(0, 0, Tetris.Config.GRID_SIZE, Tetris.Config.GRID_SIZE);
  } else {
    ctx.fillStyle = Tetris.Config.COLORS[color];
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, Tetris.Config.GRID_SIZE - 6, Tetris.Config.GRID_SIZE - 6);
    ctx.fillRect(3, 3, Tetris.Config.GRID_SIZE - 6, Tetris.Config.GRID_SIZE - 6);
  }
  ctx.restore();
};

Tetris.Graphics.drawTetronimo = function (ctx, tetromino) {
  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] !== 0) {
        Tetris.Graphics.drawGridSquare(ctx, row + tetromino.position.row, col + tetromino.position.col, tetromino.shape[row][col]);
      }
    }
  }
};