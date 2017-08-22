var menuState = {
    create: function () {

        var backgroud = Nakama.game.add.image(Nakama.game.world.centerX, Nakama.game.world.centerY,'backgroud_menu');
        backgroud.anchor = new Phaser.Point(0.5,0.5);
        backgroud.width = Nakama.game.width;
        backgroud.height = Nakama.game.height;

        Nakama.audio = Nakama.game.add.audio('menu');
        Nakama.audio.loopFull(0.6);

        var nameLabel = Nakama.game.add.text(80, 80, 'POKEMON RETURN', {
            font: "65px Arial",
            fill: "#ff0044",
            align: 'left',
            fontSize: 20,
        });

        var startLable = Nakama.game.add.text(80, Nakama.game.world.height - 80, 'press the "W" key to start', {
            font: "65px Arial",
            fill: "#ff0044",
            align: 'left',
            fontSize: 20,
        });

        var help = Nakama.game.add.text(80, 140,
            'HOW TO PLAY???: \n'+
            '1. How to move: Moving with the navigation keys.\n'+
            '2. The method of attack: Use SHIFT to attack monsters\n'+
            '3. Collect the items:\n'+
              'Money:\n'+
              'Bananas: increase blood\n'+
              'Tonic: increased strength'+
              'Diamonds: Speed\n'+
              'PEA: Use SPACEBAR to shoot up', {
                  font: "65px Arial",
                  fill: "#ff0044",
                  align: 'left',
                  fontSize: 15,
        });
        //Nakama.help.anchor = new Phaser.Point(0, 0.5);

        var wkey = Nakama.game.input.keyboard.addKey(Phaser.Keyboard.W);

        wkey.onDown.addOnce(this.start, this);
    },

    start: function () {
        Nakama.game.state.start('play');
    }
}
