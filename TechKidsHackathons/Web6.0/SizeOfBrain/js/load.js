var loadState = {
  preload: function() {
    Nakama.game.load.atlasJSONHash('Dino', 'Assets/assets.png', 'Assets/Dino.json');
    Nakama.game.load.atlasJSONHash('Foundation','Assets/assets.png', 'Assets/Foundation.json');
    Nakama.game.load.atlasJSONHash('Foundation2','Assets/assets2.png', 'Assets/Foundation2.json');
    Nakama.game.load.image('background', 'Assets/background.png');
    Nakama.game.load.image('playButton' , 'Assets/playButton.png');
    Nakama.game.load.image('replayButton' , 'Assets/replayButton.png');
    Nakama.game.load.image('gameOver' , 'Assets/gameOver.png');
    Nakama.game.load.image('gameTiles' , 'Assets/gameTiles.png');
    Nakama.game.load.image('boardButton' , 'Assets/leaderBoard.png');
    Nakama.game.load.audio('gameplay', ['Assets/audio/gameplaymusic.mp3', 'Assets/audio/gameplaymusic.ogg']);
    Nakama.game.load.audio('die', ['Assets/audio/Chet.wav', 'Assets/audio/Chet.ogg']);
    Nakama.game.load.audio('jump', ['Assets/audio/Nhayv2.ogg', 'Assets/audio/Nhayv2.ogg']);
    Nakama.game.load.audio('checkpoint', ['Assets/audio/Quaman.wav', 'Assets/audio/Quaman.ogg']);
    Nakama.game.load.image('homeButton' , 'Assets/homeButton.png');

    console.log("create");
    Nakama.player = [];
    Nakama.trap = [];
    Nakama.found = [];


  },
  create: function() {
    console.log("create2");


    Nakama.game.state.start("menu");
  }
}
