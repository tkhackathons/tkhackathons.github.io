var CSW = new Phaser.Game(640,960,Phaser.CANVAS,'');

CSW.state.add('boot',bootState);
CSW.state.add('load',loadState);
CSW.state.add('menu',menuState);
CSW.state.add('play',playState);
CSW.state.add('over',gameOver);
//game.state.add('win',winState);

CSW.configs = {
  GAME_WIDTH:640,
  GAME_HEIGHT:  960,
  COLORS: {
    pink: "0xfe0180",
    cyan: "0x36e1f3",
    purple: "0x8d13fe",
    yellow: "0xf5df10",
  }
};

CSW.currScore = 0;
CSW.hightScore = 0;

CSW.state.start('boot');
