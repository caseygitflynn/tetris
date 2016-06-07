(function () {
  'use strict';

  var grid = [];

  for (var row = 0; row < Tetris.Config.GRID_ROWS; row = row + 1) {
    
    grid[row] = [];
    
    for (var col = 0; col < Tetris.Config.GRID_COLS; col = col + 1) {
      grid[row][col] = Math.floor(Math.random() * 2);
    }
  }

  var canvas = document.querySelector('.tetris');
  var spaceSize = 25;

  canvas.width = Tetris.Config.GRID_COLS * spaceSize;
  canvas.height = Tetris.Config.GRID_ROWS * spaceSize;
  var ctx = canvas.getContext('2d');
  var tetris = new Tetris.Grid(ctx, Tetris.Config.GRID_ROWS, Tetris.Config.GRID_COLS, spaceSize);

  tetris.draw(grid);
}());