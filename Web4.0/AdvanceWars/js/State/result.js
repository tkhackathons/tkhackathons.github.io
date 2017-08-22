var resultState = {
  create : function(){
    var spriteB = Advwar.game.add.sprite(0,-300, 'ending');
    spriteB.anchor = new Phaser.Point(0, 0);
    var tweenB = Advwar.game.add.tween(spriteB).to( { y: '+300' }, 10000, Phaser.Easing.Linear.None, true);
    var keyA = Advwar.game.input.keyboard.addKey(Phaser.Keyboard.A);

    var Ending = Advwar.game.add.text(320, 450, "END.", {
        font: "50px Arial",
        fill: "#000000",
        align: "center"
    });
    Advwar.text.anchor.setTo(0.5, 0.5);
    var tweenE = Advwar.game.add.tween(Ending).to( { y: '+300' }, 10000, Phaser.Easing.Linear.None, true);

    tweenE.start();
    keyA.onDown.addOnce(this.start, this);
  },

  start : function(){
    Advwar.game.state.start('menuState');
  },
};
