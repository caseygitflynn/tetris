"use strict";

var Tetris = Tetris || {};

Tetris.Config = Tetris.Config || {};

Tetris.Config.TETRONIMOS = {};

Tetris.Config.TETRONIMOS.O = {
  rotations : [
    [[0, 1, 1, 0],
     [0, 1, 1, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
  origin : {row : 0, col :3 },
  queueOffset : {row : 1, col : 0}
};

Tetris.Config.TETRONIMOS.J = {
  rotations : [
    [[2, 0, 0, 0],
     [2, 2, 2, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    [[0, 2, 2, 0],
     [0, 2, 0, 0],
     [0, 2, 0, 0],
     [0, 0, 0, 0]],
    [[0, 0, 0, 0],
     [2, 2, 2, 0],
     [0, 0, 2, 0],
     [0, 0, 0, 0]],
    [[0, 2, 0, 0],
     [0, 2, 0, 0],
     [2, 2, 0, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
  origin : {row : 0, col :3 },
  queueOffset : {row : 1, col : 0.5}
};

Tetris.Config.TETRONIMOS.L = {
  rotations : [
    [[0, 0, 0, 0],
     [3, 3, 3, 0],
     [3, 0, 0, 0],
     [0, 0, 0, 0]],
    [[3, 3, 0, 0],
     [0, 3, 0, 0],
     [0, 3, 0, 0],
     [0, 0, 0, 0]],
    [[0, 0, 3, 0],
     [3, 3, 3, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    [[0, 3, 0, 0],
     [0, 3, 0, 0],
     [0, 3, 3, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
  origin : {row : 0, col :3 },
  queueOffset : {row : 0, col : 0.5}
};

Tetris.Config.TETRONIMOS.S = {
  rotations : [
    [[0, 0, 0, 0],
     [0, 4, 4, 0],
     [4, 4, 0, 0],
     [0, 0, 0, 0]],
    [[0, 4, 0, 0],
     [0, 4, 4, 0],
     [0, 0, 4, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
  origin : {row : 0, col :3 },
  queueOffset : {row : 0, col : 0.5}
};

Tetris.Config.TETRONIMOS.Z = {
  rotations : [
    [[0, 0, 0, 0],
     [5, 5, 0, 0],
     [0, 5, 5, 0],
     [0, 0, 0, 0]],
    [[0, 0, 5, 0],
     [0, 5, 5, 0],
     [0, 5, 0, 0],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
  origin : {row : 0, col :3 },
  queueOffset : {row : 0, col : 0.5}
};

Tetris.Config.TETRONIMOS.I = {
  rotations : [
    [[0, 6, 0, 0],
     [0, 6, 0, 0],
     [0, 6, 0, 0],
     [0, 6, 0, 0]],
    [[0, 0, 0, 0],
     [0, 0, 0, 0],
     [6, 6, 6, 6],
     [0, 0, 0, 0]],
  ],
  position : {row : 0, col :3 },
  origin : {row : 0, col :3 },
  queueOffset : {row : 0, col : 0.5}
};

Tetris.Config.TETRONIMOS.T = {
  rotations : [
    [[0, 7, 0, 0],
     [7, 7, 7, 0],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    [[0, 7, 0, 0],
     [0, 7, 7, 0],
     [0, 7, 0, 0],
     [0, 0, 0, 0]],
    [[0, 0, 0, 0],
     [7, 7, 7, 0],
     [0, 7, 0, 0],
     [0, 0, 0, 0]],
    [[0, 7, 0, 0],
     [7, 7, 0, 0],
     [0, 7, 0, 0],
     [0, 0, 0, 0]],

  ],
  position : {row : 0, col :3 },
  origin : {row : 0, col :3 },
  queueOffset : {row : 1, col : 0.5}
};