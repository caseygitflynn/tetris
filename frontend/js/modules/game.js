"use strict";

var Tetris = Tetris || {};

Tetris.Game = function (canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.spaceSize = 50;
  this.ui = null;
  this.landedGrid = [];
  this.timer = new Tetris.Timer(2);
  this.tetrominoFactory = new Tetris.TetrominoFactory();
  this.currentTetromino = null;
  this.keypad = new Tetris.Keypad();
};

Tetris.Game.prototype.init = function() {
  this._sizeCanvas();
  this.ui = new Tetris.Grid(this.ctx, Tetris.Config.GRID_ROWS, Tetris.Config.GRID_COLS, this.spaceSize);
  this.canvas.addEventListener('click', this._onClick.bind(this));

  this.currentGrid = this._buildEmptyGrid();
  this.landedGrid = this._buildEmptyGrid();

  this.currentTetromino = this.tetrominoFactory.getRandom();

  this.update();
  this._initListeners();
};

Tetris.Game.prototype._initListeners = function () {
  var self = this;

  this.keypad.onLeft = function () {
    self.currentTetromino.moveLeft();
  };
  this.keypad.onRight = function () {
    self.currentTetromino.moveRight();
  };
  this.keypad.onUp = function () {
    self.currentTetromino.rotate();
  };
  this.keypad.onDown = function () {
    self.currentTetromino.moveDown();
  };
};

Tetris.Game.prototype.update = function (timestamp) {
  window.requestAnimationFrame(this.update.bind(this));

  if (this.timer.shouldUpdate()) {
    this.currentTetromino.moveDown();

    if (this._willLand(this.currentTetromino)) {
      this._landTetrominio(this.currentTetromino);
      this.currentTetromino = this.tetrominoFactory.getRandom();
    } else {
      this.currentTetromino.commitMove();
    }
  }

  this.currentGrid = this._buildEmptyGrid();
  this._drawLandedGrid();

  if (!this._hasCollisions(this.currentTetromino)) {
    this.currentTetromino.commitMove();
  } else {
    this.currentTetromino.revertMove();
  }

  this._drawTetromino(this.currentTetromino);
  this.ui.draw(this.currentGrid);

};

Tetris.Game.prototype._willLand = function (tetromino) {
  var landed = this.landedGrid;

  for (var row = 0; row < tetromino.potentialShape.length; row++) {
    for (var col = 0; col < tetromino.potentialShape[row].length; col++) {
      if (tetromino.potentialShape[row][col] != 0) {
        if (row + tetromino.potentialTopLeft.row >= landed.length) {
          //this block would be below the playing field
          return true;
        }
        else if (landed[row + tetromino.potentialTopLeft.row][col + tetromino.potentialTopLeft.col] != 0) {
          //the space is taken
          return true;
        }
      }
    }
  }

  return false;
};

Tetris.Game.prototype._hasCollisions = function (tetromino) {
  var landed = this.landedGrid;

  for (var row = 0; row < tetromino.potentialShape.length; row++) {
    for (var col = 0; col < tetromino.potentialShape[row].length; col++) {
      if (tetromino.potentialShape[row][col] != 0) {
        if (col + tetromino.potentialTopLeft.col < 0) {
          //this block would be to the left of the playing field
          return true;
        }
        if (col + tetromino.potentialTopLeft.col >= landed[0].length) {
          //this block would be to the right of the playing field
          return true;
        }
        else if (landed[row + tetromino.potentialTopLeft.row][col + tetromino.potentialTopLeft.col] != 0) {
          //the space is taken
          return true;
        }
      }
    }
  }

  return false;
};

Tetris.Game.prototype._landTetrominio = function (tetromino) {
  var landed = this.landedGrid;

  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] != 0) {
        landed[row + tetromino.topLeft.row][col + tetromino.topLeft.col] = tetromino.shape[row][col];
      }
    }
  }

  this._clearRows();
  this._drawLandedGrid();
};

Tetris.Game.prototype._clearRows = function () {
  var landed = this.landedGrid;

  for (var row = 0; row < landed.length; row++) {
    var filled = 0;
    for (var col = 0; col < landed[row].length; col++) {
      if (landed[row][col] != 0) {
        filled++;
      }
    }

    if (filled == landed[0].length) {
      landed.splice(row, 1);
      this._prependEmptyRow();
    }
  }
};

Tetris.Game.prototype._drawLandedGrid = function () {
  var landed = this.landedGrid;

  for (var row = 0; row < landed.length; row++) {
    for (var col = 0; col < landed[row].length; col++) {
      this.currentGrid[row][col] = landed[row][col];
    }
  }
};

Tetris.Game.prototype._prependEmptyRow = function () {
  var landed = this.landedGrid;
  var emptyRow = [];

  for (var col = 0; col < landed[0].length; col++) {
    emptyRow.push(0);
  }

  landed.unshift(emptyRow);
};

Tetris.Game.prototype._drawTetromino = function (tetromino) {
  for (var row = 0; row < tetromino.shape.length; row++) {
    for (var col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] != 0) {
        this.currentGrid[row + tetromino.topLeft.row][col + tetromino.topLeft.col] = tetromino.shape[row][col];
      }
    }
  }

};

Tetris.Game.prototype._onClick = function (e) {
  this.timer.paused = !this.timer.paused;
};

Tetris.Game.prototype._sizeCanvas = function (width, height) {
  this.canvas.width = Tetris.Config.GRID_COLS * this.spaceSize;
  this.canvas.height = Tetris.Config.GRID_ROWS * this.spaceSize;
};

Tetris.Game.prototype._buildEmptyGrid = function () {
  var grid = [];

  for (var row = 0; row < Tetris.Config.GRID_ROWS; row = row + 1) {
    grid[row] = [];
    for (var col = 0; col < Tetris.Config.GRID_COLS; col = col + 1) {
      grid[row][col] = 0;
    }
  }

  return grid;
};