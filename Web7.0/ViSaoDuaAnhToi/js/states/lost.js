 var lostState={
	preload: function(){
		Gamefefe.game.load.image('loser', 'Assets/Player/p1_hurt.png');
		Gamefefe.game.load.image('back', 'Assets/back_button.png');
		Gamefefe.game.load.audio('lost', ['Assets/Audio/loser.wav']);

	},
	create: function(){
		Gamefefe.game.stage.backgroundColor = '	#1e1e1d';
		Gamefefe.game.add.sprite(950,320, 'loser');
		Gamefefe.music.destroy();
		Gamefefe.losecore = Gamefefe.game.add.audio('lost');
      	Gamefefe.losecore.play();

		var text='You failed me, hooman';
		Gamefefe.note = Gamefefe.game.add.text(700, 400, '', {
        	font: 'bold 40pt Arial',
        	fill : 'white',
        	stroke : 'black',
        	strokeThickness : 3
      	});
      	Gamefefe.note.setText(text);
    	Gamefefe.note.fixedToCamera = true;

    	Gamefefe.backButton = this.game.add.button(50,100,'back',this.backToMenu,this);
   		Gamefefe.backButton.fixedToCamera = true;
    	Gamefefe.backButton.anchor.setTo(0.5);
    	Gamefefe.backButton.scale.setTo(0.3);
	},
	backToMenu: function(){
		Gamefefe.game.state.start('menu');
	}
}