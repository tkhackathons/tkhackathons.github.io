var playerOverview={
  preload: function(){
        Gamefefe.game.load.image('menu', 'Assets/testMenu3.jpg');
        Gamefefe.game.load.atlasJSONHash('player1Walk', 'Assets/Player/p1_walk/p1_walk.png', 'Assets/Player/p1_walk/p1_walk.json');
        Gamefefe.game.load.atlasJSONHash('player2Walk', 'Assets/Player/p2_walk/p2_walk.png', 'Assets/Player/p2_walk/p2_walk.json');
        Gamefefe.game.load.atlasJSONHash('player3Walk', 'Assets/Player/p3_walk/p3_walk.png', 'Assets/Player/p3_walk/p3_walk.json');
  },
  create: function(){
      Gamefefe.playerOverview=Gamefefe.game.add.sprite(0,0, 'menu');

      var text1 = "Choose a player:"
      Gamefefe.note = Gamefefe.game.add.text(800, 100, '', {
          font: 'bold 40pt Arial',
          fill : 'white',
          stroke : 'black',
          strokeThickness : 3
        });
        Gamefefe.note.setText(text1);
      Gamefefe.note.fixedToCamera = true;

      Gamefefe.player1 = this.game.add.button(900,300,'player1Walk',this.player1,this);
      Gamefefe.player1.fixedToCamera = true;
      Gamefefe.player1.anchor.setTo(0.5);
      Gamefefe.player2 = this.game.add.button(1000,300,'player2Walk',this.player2,this);
      Gamefefe.player2.fixedToCamera = true;
      Gamefefe.player2.anchor.setTo(0.5);
      Gamefefe.player3 = this.game.add.button(1100,300,'player3Walk',this.player3,this);
      Gamefefe.player3.fixedToCamera = true;
      Gamefefe.player3.anchor.setTo(0.5);
  },

  player1: function(){
    Gamefefe.playerConstructor = Player1Controller;
    Gamefefe.game.state.start('overview');
  },
  player2: function(){
      Gamefefe.playerConstructor = Player2Controller;
      Gamefefe.game.state.start('overview');
  },
  player3: function(){
      Gamefefe.playerConstructor = Player3Controller;
      Gamefefe.game.state.start('overview');
  }
}