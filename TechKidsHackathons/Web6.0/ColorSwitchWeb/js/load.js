var loadState= {

  preload: function(){
  	CSW.stage.backgroundColor = "#000000";
    CSW.world.setBounds(0,0, CSW.configs.GAME_WIDTH, CSW.configs.GAME_HEIGHT);
    CSW.scale.pageAlignVertically = true;
    CSW.scale.pageAlignHorizontally= true;
    CSW.scale.scaleMode= Phaser.ScaleManager.SHOW_ALL;
    CSW.time.advancedTiming= true;
    CSW.physics.startSystem(Phaser.Physics.P2JS);
    CSW.load.atlasJSONHash('assets', './Assets/Textures/buttons.png', './Assets/Textures/buttons.json');
    CSW.load.image('player','./Assets/Textures/Player/Player.png');
    CSW.load.image('circle_cyan','./Assets/Textures/Obstacles/Circle/cyan.png');
    CSW.load.image('circle_pink','./Assets/Textures/Obstacles/Circle/pink.png');
    CSW.load.image('circle_purple','./Assets/Textures/Obstacles/Circle/purple.png');
    CSW.load.image('circle_yellow','./Assets/Textures/Obstacles/Circle/yellow.png');
    CSW.load.image('stripe_cyan','./Assets/Textures/Obstacles/Stripes/cyan.png');
    CSW.load.image('stripe_pink','./Assets/Textures/Obstacles/Stripes/pink.png');
    CSW.load.image('stripe_purple','./Assets/Textures/Obstacles/Stripes/purple.png');
    CSW.load.image('stripe_yellow','./Assets/Textures/Obstacles/Stripes/yellow.png');
    CSW.load.image('switch','./Assets/Textures/Obstacles/switch.png');
    CSW.load.image('star','./Assets/Textures/Obstacles/Star/Star.png');
    CSW.load.physics('circle_physics','./Assets/Textures/Obstacles/Circle/circle.json');
    CSW.load.physics('stripe_physics','./Assets/Textures/Obstacles/Stripes/stripe.json');

    CSW.load.atlasJSONHash('assets', './Assets/Textures/buttons.png', './Assets/Textures/buttons.json');
    CSW.load.image('playbutton','./Assets/Textures/play.png');
    CSW.load.image('maxresdefault','./Assets/Textures/maxresdefault.png');
    CSW.load.spritesheet('button_like','./Assets/Textures/like.png' , 0,0);
    // CSW.load.audio('menu','./Assets/sound/music.mp3');
    CSW.load.audio('click','./Assets/sound/Begin/button.wav');
    CSW.load.audio('dead','./Assets/sound/Dead/dead.wav');
    CSW.load.audio('jump','./Assets/sound/Gameplay/jump.wav');
    CSW.load.audio('star','./Assets/sound/Gameplay/star.wav');
    CSW.load.audio('switch','./Assets/sound/Gameplay/colorswitch.wav');
  	CSW.load.audio('menu','./Assets/sound/music.mp3');
  },

  create: function(){
  	CSW.backgroundMusic = CSW.add.audio('menu');
    CSW.backgroundMusic.volume = 1;
    CSW.backgroundMusic.loop = true;
    CSW.backgroundMusic.play();
    CSW.state.start('menu');
  }


};
