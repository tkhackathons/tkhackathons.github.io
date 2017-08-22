var gameOver={

  preload : function(){
    CSW.world.setBounds(0,0, CSW.configs.GAME_WIDTH, CSW.configs.GAME_HEIGHT);

    CSW.load.spritesheet('button_replay','Assets/Textures/replay.png' , 0,0);
    CSW.load.spritesheet('button_home','Assets/Textures/home.png' , 0,0);
    CSW.load.spritesheet('button_like','Assets/Textures/like.png' , 0,0);

    CSW.load.image('title','Assets/Textures/maxresdefault.png');


    CSW.load.atlasJSONHash('assets', 'Assets/Textures/buttons.png', 'Assets/Textures/buttons.json');

    var textStyleScore = { font: "50px Arial", fill: "#ffffff", align: "center" };
    var textScore = CSW.add.text(300, 370, CSW.currScore, textStyleScore);
    var textStyleHighScore = { font: "50px Arial", fill: "#ffffff", align: "center" };
    var textHighScore = CSW.add.text(300, 480, localStorage.getItem('highScore'), textStyleHighScore);
  },

  create : function(){

    CSW.add.sprite(100,60,'title');

    var style = { font: "42px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 250, align: "center", backgroundColor: "#000000" };
    text = CSW.add.text(CSW.configs.GAME_WIDTH/2- 80, 320, "SCORE", style);

    var style = { font: "42px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 500, align: "center", backgroundColor: "#000000" };
    text = CSW.add.text(CSW.configs.GAME_WIDTH/2- 130, 430, "BEST SCORE", style);


    //CSW.add.sprite(50, 50, 'assets','home.png');
    button_home = CSW.add.button(20, 20, 'button_home',this.actionOnClick_home, 1, 0, 2);
    button_replay = CSW.add.button(CSW.configs.GAME_WIDTH/2, 700, 'button_replay', this.actionOnClick_replay, this, 1, 0, 2);
    button_replay.anchor.setTo(0.5, 0.5);
    new SpinShapeController({x: button_replay.x, y: button_replay.y},1,0.85);
    new SpinShapeController({x: button_replay.x, y: button_replay.y},-1,1.08);
    // new SpinShapeController({x: button_replay.x, y: button_replay.y},1,1.39);
    button_like = CSW.add.button(CSW.configs.GAME_WIDTH/2, 900, 'button_like', this.actionOnClick_like, this, 1, 0, 2);
    button_like.anchor.setTo(0.5, 0.5);

    // CSW.add.sprite(100, CSW.configs.GAME_HEIGHT- 80, 'assets','top.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-420, CSW.configs.GAME_HEIGHT- 80, 'assets','scoreboard1.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-300, CSW.configs.GAME_HEIGHT- 80, 'assets','star.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-185, CSW.configs.GAME_HEIGHT- 80, 'assets','shop.png');



  },

  actionOnClick_replay : function(){
    CSW.click = CSW.add.audio('click');
    CSW.click.volume = 1;
    CSW.click.play();
    CSW.state.start('play');
  },

  actionOnClick_home : function(){
    CSW.state.start('menu');
  },

  actionOnClick_like : function(){
    window.location="http://techkids.vn/";

  }


};
