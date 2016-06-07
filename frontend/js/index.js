(function () {
  'use strict';

  var canvas = document.querySelector('.tetris');
  var game = new Tetris.Game(canvas);
  game.init();
  
}());