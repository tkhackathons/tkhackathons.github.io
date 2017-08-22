var level2State={
  preload: function(){
      Gamefefe.game.load.tilemap('gamemap', 'Assets/Maps/mapLevel2.json', null, Phaser.Tilemap.TILED_JSON);
      Gamefefe.game.load.image('tiles', 'Assets/Tiles/tiles_spritesheet.png');
      Gamefefe.game.load.atlasJSONHash('player1Walk', 'Assets/Player/p1_walk/p1_walk.png', 'Assets/Player/p1_walk/p1_walk.json');
      Gamefefe.game.load.spritesheet('fly', 'Assets/Enemies/flyFly0.png', 74, 33);
      Gamefefe.game.load.spritesheet('swim','Assets/Enemies/fishSwim.png',66,43);
      Gamefefe.game.load.spritesheet('walk','Assets/Enemies/slimeWalk.png',51,28);
      Gamefefe.game.load.spritesheet('crawl','Assets/Enemies/snailCrawl.png',57,31);
      Gamefefe.game.load.image('bronze','Assets/Items/coinBronze.png');
      Gamefefe.game.load.image('silver','Assets/Items/coinSilver.png');
      Gamefefe.game.load.image('gold','Assets/Items/coinGold.png');
      Gamefefe.game.load.image('hurt','Assets/Player/p1_hurt.png');
      Gamefefe.game.load.image('spikes','Assets/Items/spike.png');
      Gamefefe.game.load.spritesheet('door','Assets/Items/door.png',70,140);
      Gamefefe.game.load.image('weight','Assets/Items/weight.png');
      Gamefefe.game.load.audio('theme2', ['Assets/Audio/main_theme2.mp3', 'Assets/Audio/main_theme2.ogg']);
      Gamefefe.game.load.audio('coin', ['Assets/Audio/coins.mp3', 'Assets/Audio/coins.ogg']);
      Gamefefe.game.load.audio('jump', ['Assets/Audio/jump.mp3', 'Assets/Audio/jump.ogg']);

      Gamefefe.game.load.image('play', 'Assets/play_button.png');
      Gamefefe.game.load.image('arrow','Assets/Enemies/arrow.png');
      Gamefefe.game.load.spritesheet('lion','Assets/Enemies/LionBounce.png',245,130);
      Gamefefe.game.load.image('lives','Assets/HUD/hud_heartFull3.png');
      Gamefefe.game.load.atlasJSONHash('numbers','Assets/HUD/numbers.png','Assets/HUD/numbers.json');
      Gamefefe.game.load.image('soil','Assets/Tiles/stoneCenter_rounded.png');
      Gamefefe.game.load.image('soil1','Assets/Tiles/boxCoinAlt_disabled.png');
  },
  create: function(){
      Gamefefe.music = Gamefefe.game.add.audio('theme2');
      Gamefefe.music.loopFull();
      Gamefefe.keyboard = Gamefefe.game.input.keyboard;
      Gamefefe.moveRight={
        fly: true,
        swim: false,
        walk: true,
        crawl:false
    };
    Gamefefe.items={
        traps: [],
        coins: [],
        doors:[],
        weights: []
    };
    Gamefefe.isDead = false;
    Gamefefe.lives=[];
    Gamefefe.timeDead=0;
    Gamefefe.score=0;
    
    Gamefefe.xPosition =0;

    Gamefefe.scoreText=Gamefefe.game.add.text(16,16, 'score: 0', {
        fontSize:'32px',
        fill: '#000'
      });

      //Create Map
      Gamefefe.game.stage.backgroundColor = '#c6e2ff';
      Gamefefe.map = Gamefefe.game.add.tilemap('gamemap');
      Gamefefe.map.addTilesetImage('tiles_spritesheet','tiles');
      Gamefefe.backgroundLayer = Gamefefe.map.createLayer('backgroundLayer');
      Gamefefe.groundLayer = Gamefefe.map.createLayer('groundLayer');
      Gamefefe.map.setCollisionBetween(1, 1000, true, 'groundLayer');
      Gamefefe.groundLayer.resizeWorld();
      Gamefefe.enemyGroup = Gamefefe.game.add.physicsGroup();
      Gamefefe.playerGroup = Gamefefe.game.add.physicsGroup();
      Gamefefe.doorGroup = Gamefefe.game.add.physicsGroup();
      Gamefefe.coinGroup = Gamefefe.game.add.physicsGroup();

      Gamefefe.players =[];
      var playerConstructor = Gamefefe.playerConstructor;
      Gamefefe.players.push(
          new playerConstructor(0,0,Gamefefe.configs.PLAYER_CONTROL)
      );
      Gamefefe.cursors = Gamefefe.game.input.keyboard.createCursorKeys();
      Gamefefe.enemies =[];
      Gamefefe.enemies.push(new LionController(4840,-150,'lion'));
      Gamefefe.enemies.push(new RockController(300, -70,'weight'));
      Gamefefe.enemies.push(new RockController(6830, -70,'weight'));
      Gamefefe.enemies.push(new RockController(10920, -70,'weight'));
      Gamefefe.enemies.push(new RockController(16190, -70,'weight'));

      Gamefefe.enemies.push(new RockController(8320, -70,'weight'));
      Gamefefe.enemies.push(new RockController(8500, -70,'weight'));
      Gamefefe.enemies.push(new RockController(8600, -70,'weight'));
      Gamefefe.enemies.push(new RockController(13575, -70,'weight'));
      Gamefefe.enemies.push(new RockController(15410,-70,'weight' ));


      Gamefefe.enemies.push(new FlyController(500,250,'fly'));
      Gamefefe.enemies.push(new FlyController(4440,150,'fly'));
      Gamefefe.enemies.push(new FlyController(10328,240,'fly'));
      Gamefefe.enemies.push(new FlyController(7430, 150,'fly'));
      Gamefefe.enemies.push(new FlyController(11350, 150,'fly'));

      Gamefefe.enemies.push(new FishController(200,610,'swim'));
      Gamefefe.enemies.push(new FishController(5800, 640,'swim'));
      Gamefefe.enemies.push(new SlimeController(4170, 350,'walk'));
      Gamefefe.enemies.push( new SlimeController(7230, 350,'walk'));
      Gamefefe.enemies.push(new SlimeController(16350, 560,'walk'));
      Gamefefe.enemies.push(new SlimeController(7970, 630,'walk'));
      //Gamefefe.enemies.push(new SnailController(11190,560,'crawl'));
      Gamefefe.enemies.push(new SnailController(4170, 350,'crawl'));
      Gamefefe.enemies.push(new SnailController(8670, 210,'crawl'));
      Gamefefe.enemies.push(new SnailController(11350, 210,'crawl'));
      Gamefefe.enemies.push(new SnailController(17100, 420,'crawl'));

      Gamefefe.items.traps.push(new TrapController(4880, 395,'spikes'));
      Gamefefe.items.traps.push(new TrapController(5776, 325,'spikes'));
      Gamefefe.items.traps.push(new TrapController(10416, 535,'spikes'));
      Gamefefe.items.traps.push(new TrapController(7528, 466,'spikes'));
      Gamefefe.items.traps.push(new TrapController(13300, 566,'spikes'));
      Gamefefe.items.traps.push(new TrapController(17544, 535,'spikes'));
      Gamefefe.items.doors.push(new DoorController(20927, 181,'door'));

      Gamefefe.items.traps.push(new TileController(14440, 440,'soil'));
      Gamefefe.items.traps.push(new TileController(3470, 500,'soil'));
      Gamefefe.items.traps.push(new TileController(6490,480,'soil'));

//
      Gamefefe.items.traps.push(new TileController(10120, 520,'soil'));
    for (let o=0;o<6;o++){
      Gamefefe.items.traps.push(new TileController(11690+o*70, 210,'soil'));
    }
    Gamefefe.items.traps.push(new TileController(13700, 500,'soil'));


      for (let i=0;i<10;i++){
          Gamefefe.items.coins.push(new CoinController(700+i*80, 325 ,'bronze'));
      }
      for (let i=0;i<5;i++){
          Gamefefe.items.coins.push(new CoinController(3808+i*80, 325 ,'bronze'));
      }      
    for (let i=0;i<10;i++){
          Gamefefe.items.coins.push(new CoinController(1600+i*80, 323 ,'silver'));
      }
    for (let i=0;i<4;i++){
            Gamefefe.items.coins.push(new CoinController(3820+i*80, 535 ,'gold'));
      }
    for (let i=0;i<4;i++){
          Gamefefe.items.coins.push(new CoinController(4392+i*80, 405 ,'gold'));
      }
    for (let i=0;i<3;i++){
          Gamefefe.items.coins.push(new CoinController(4904+i*80, 205 ,'gold'));
      }
    for (let i=0;i<4;i++){
          Gamefefe.items.coins.push(new CoinController(6410+i*80, 350 ,'gold'));
      }
    for (let i=0;i<5;i++){
          Gamefefe.items.coins.push(new CoinController(7568+i*80, 380 ,'silver'));
      }
    for (let i=0;i<5;i++){
            Gamefefe.items.coins.push(new CoinController(8184+i*80, 120 ,'gold'));
      }
    for (let i=0;i<5;i++){
            Gamefefe.items.coins.push(new CoinController(9632+i*80, 400 ,'bronze'));
      }
    for (let i=0;i<3;i++){
            Gamefefe.items.coins.push(new CoinController(10624+i*80, 400 ,'gold'));
      }
    for (let i=0;i<5;i++){
            Gamefefe.items.coins.push(new CoinController(11700+i*80, 405 ,'gold'));
      }
    for (let i=0;i<5;i++){
            Gamefefe.items.coins.push(new CoinController(12160+i*80, 300 ,'gold'));
      }
    for (let i=0;i<6;i++){
            Gamefefe.items.coins.push(new CoinController(13888+i*80, 410 ,'silver'));
      }
    for (let i=0;i<8;i++){
            Gamefefe.items.coins.push(new CoinController(15384+i*80, 480 ,'gold'));
      }
    for (let i=0;i<4;i++){
            Gamefefe.items.coins.push(new CoinController(16944+i*80, 430 ,'gold'));
      }
    for (let i=0;i<6;i++){
            Gamefefe.items.coins.push(new CoinController(18244+i*80, 290 ,'silver'));
      }
      for (let i=0;i<6;i++){
              Gamefefe.items.coins.push(new CoinController(19728+i*80, 365 ,'bronze'));
        }

    for (let m=0;m<3;m++){
      Gamefefe.lives.push(new LifeController(1700+55*m,0,'lives'));
    }


  },

  update: function(){
      for(var player of Gamefefe.players){
        player.update();
      }
      for (var enemy of Gamefefe.enemies){
          enemy.update();
      }
      for (var trap of Gamefefe.items.traps){
          trap.update();
      }
      for (var door of Gamefefe.items.doors){
          door.update();
      }
      for (var coin of Gamefefe.items.coins){
          coin.update();
      }
      for(var weight of Gamefefe.items.weights){
          weight.playerComing(Gamefefe.xPosition);
      }
    for (var life of Gamefefe.lives){
      life.update();
    }




      Gamefefe.game.physics.arcade.overlap(
        Gamefefe.playerGroup,
        Gamefefe.enemyGroup,
        function(playerSprite,enemySprite){

            Gamefefe.isDead=true;

      }
      );
      Gamefefe.game.physics.arcade.overlap(
        Gamefefe.playerGroup,
        Gamefefe.coinGroup,
        function(playerSprite, coinSprite){
            Gamefefe.score += 1;
            Gamefefe.scoreText.text = 'Score: ' + Gamefefe.score;
            Gamefefe.scoreText.fixedToCamera=true;
            Gamefefe.scoreText.cameraOffset.setTo(16, 16);
            coinSprite.kill();

        }
      );
      Gamefefe.game.physics.arcade.overlap(
        Gamefefe.playerGroup,
        Gamefefe.doorGroup,
        function(){
            door.open();
            Gamefefe.game.state.start('win');
      }
      );
  }
}