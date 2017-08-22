var menuState={
  create : function(){
    var button_play={
      x: CSW.configs.GAME_WIDTH/2,
      y: CSW.configs.GAME_HEIGHT/2+150
    }

    CSW.add.sprite(100, 100, 'maxresdefault');
    
    // var style = { font: "70px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 250, align: "center", backgroundColor: "#000000" };
    // text = CSW.add.text(CSW.configs.GAME_WIDTH/2- 80, 10, "COLOR SWITCH", style);

    button = CSW.add.button(button_play.x, button_play.y, 'playbutton', this.actionOnClick, this, 1, 0, 2);
    button.anchor.setTo(0.5, 0.5);
    // CSW.add.sprite(100, CSW.configs.GAME_HEIGHT- 80, 'assets','top.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-420, CSW.configs.GAME_HEIGHT- 80, 'assets','scoreboard1.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-300, CSW.configs.GAME_HEIGHT- 80, 'assets','star.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-185, CSW.configs.GAME_HEIGHT- 80, 'assets','shop.png');


    new SpinShapeController({x: button_play.x, y: button_play.y},1,0.85);
    new SpinShapeController({x: button_play.x, y: button_play.y},-1,1.08);
    new SpinShapeController({x: button_play.x, y: button_play.y},1,1.39);
    button_like = CSW.add.button(CSW.configs.GAME_WIDTH/2- 30, 875, 'button_like', this.actionOnClick_like, this, 1, 0, 2);


  },

  actionOnClick : function(){
    CSW.click = CSW.add.audio('click');
    CSW.click.volume = 1;
    CSW.click.play();
    CSW.state.start('play');
  },
  // update : function () {
  //
  //   button.angle += 1;
  //
  // }

  actionOnClick_like : function(){
    window.location="http://techkids.vn/";

  }

  // create: function(){
  //
  //   // CSW.state.start('play');
  //
  // }



}
