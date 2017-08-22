var winState={
	preload: function(){
		Gamefefe.game.load.image('windude', 'Assets/Player/p1_front.png');
		Gamefefe.game.load.image('back', 'Assets/back_button.png');
		Gamefefe.game.load.audio('winner', ['Assets/Audio/winner.wav']);

	},
	create: function(){
		Gamefefe.game.stage.backgroundColor = '#bfe3f9';
		Gamefefe.game.add.sprite(950,320, 'windude');
		Gamefefe.music.destroy();
		Gamefefe.winscore = Gamefefe.game.add.audio('winner');
      	Gamefefe.winscore.play();

		var text='Thank you, hooman';
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
		Gamefefe.winscore.destroy();
	}	
}