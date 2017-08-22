var level1State={
  preload: function(){
      Gamefefe.game.load.tilemap('gamemap', 'Assets/Maps/mapLevel1.json', null, Phaser.Tilemap.TILED_JSON);
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
      Gamefefe.game.load.audio('theme', ['Assets/Audio/main_theme.mp3', 'Assets/Audio/main_theme.ogg']);
      Gamefefe.game.load.audio('coin', ['Assets/Audio/coins.mp3', 'Assets/Audio/coins.ogg']);
      Gamefefe.game.load.audio('jump', ['Assets/Audio/jump.mp3', 'Assets/Audio/jump.ogg']);

      Gamefefe.game.load.image('play', 'Assets/play_button.png');
      Gamefefe.game.load.image('arrow','Assets/Enemies/arrow.png');
      Gamefefe.game.load.spritesheet('lion','Assets/Enemies/LionBounce.png',245,130);
      Gamefefe.game.load.image('lives','Assets/HUD/hud_heartFull3.png');
      Gamefefe.game.load.atlasJSONHash('numbers','Assets/HUD/numbers.png','Assets/HUD/numbers.json');
      Gamefefe.game.load.image('soil','Assets/Tiles/grassHalfMid.png');
      Gamefefe.game.load.image('soil1','Assets/Tiles/boxCoinAlt_disabled.png');
  },
  create: function(){
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

      Gamefefe.music = Gamefefe.game.add.audio('theme');
      Gamefefe.music.loopFull();
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

      Gamefefe.scoreText=Gamefefe.game.add.text(16,16, 'score: 0', {
        fontSize:'32px',
        fill: '#000'
      });
      Gamefefe.players =[];
      var playerConstructor = Gamefefe.playerConstructor;
      Gamefefe.players.push(
          new playerConstructor(0,0,Gamefefe.configs.PLAYER_CONTROL)
      );
    Gamefefe.cursors = Gamefefe.game.input.keyboard.createCursorKeys();
    Gamefefe.enemies =[];
    Gamefefe.enemies.push(new FlyController(600,250,'fly'));
    Gamefefe.enemies.push(new FlyController(1800,150,'fly'));
    Gamefefe.enemies.push(new FlyController(9470,180,'fly'));
    Gamefefe.enemies.push(new FlyController(8660, 170,'fly'));
    Gamefefe.enemies.push(new FlyController(7430, 150,'fly'));
    Gamefefe.enemies.push(new FlyController(11350, 150,'fly'));


    Gamefefe.enemies.push(new FishController(200,600,'swim'));
    Gamefefe.enemies.push(new FishController(1370, 650,'swim'));
    Gamefefe.enemies.push(new FishController(17070, 640,'swim'));
    Gamefefe.enemies.push(new SlimeController(2500,200,'walk'));
    Gamefefe.enemies.push(new SlimeController(4170, 350,'walk'));
    Gamefefe.enemies.push( new SlimeController(7230, 350,'walk'));
    Gamefefe.enemies.push(new SlimeController(16350, 560,'walk'));
    Gamefefe.enemies.push(new SlimeController(19528, 395,'walk'));
    Gamefefe.enemies.push(new SlimeController(7970, 630,'walk'));
    Gamefefe.enemies.push(new SnailController(3000,400,'crawl'));
    Gamefefe.enemies.push( new SnailController(11190,560,'crawl'));
    Gamefefe.enemies.push(new SnailController(4170, 350,'crawl'));
    Gamefefe.enemies.push(new SnailController(8670, 210,'crawl'));
    Gamefefe.enemies.push(new SnailController(11350, 210,'crawl'));
    Gamefefe.enemies.push(new SnailController(17100, 420,'crawl'));


    Gamefefe.enemies.push(new LionController(12760,-150,'lion'));
    //Gamefefe.enemies.push(new ArrowController(820, -150,'arrow'));
    //Gamefefe.enemies.push(new ArrowController(11940,-150,'arrow'));
    //Gamefefe.enemies.push(new ArrowController(12800, -150,'arrow'));

    Gamefefe.items.traps.push(new TrapController(2350, 533,'spikes'));
    Gamefefe.items.traps.push(new TrapController(18128, 463,'spikes'));
    Gamefefe.items.traps.push(new TrapController(5660, 560,'spikes'));
    Gamefefe.items.traps.push(new TrapController(9200, 560,'spikes'));
    Gamefefe.items.traps.push(new TrapController(10600, 420,'spikes'));
    Gamefefe.items.doors.push(new DoorController(20927, 181,'door'));
    Gamefefe.enemies.push(new RockController(300, -70,'weight'));
    Gamefefe.enemies.push(new RockController(6830, -70,'weight'));
    Gamefefe.enemies.push(new RockController(10920, -70,'weight'));
    Gamefefe.enemies.push(new RockController(16190, -70,'weight'));
    Gamefefe.enemies.push(new RockController(15410,-70,'weight' ));

    Gamefefe.enemies.push(new RockController(16410,-70,'weight' ));


    Gamefefe.items.traps.push(new TileController(14420, 440,'soil'));
    Gamefefe.items.traps.push(new TileController(3500, 500,'soil'));
    Gamefefe.items.traps.push(new TileController(6370,280,'soil'));

    Gamefefe.items.traps.push(new TileController(9980, 490,'soil'));
    for (let o=0;o<6;o++){
      Gamefefe.items.traps.push(new TileController(11690+o*70, 210,'soil1'));
    }
    Gamefefe.items.traps.push(new TileController(13700, 630,'soil1'));


      for (let i=0;i<20;i++){
          Gamefefe.items.coins.push(new CoinController(630+i*80, 323 ,'bronze'));
      }
      for (let i=0;i<20;i++){
          Gamefefe.items.coins.push(new CoinController(12648+i*80, 323 ,'bronze'));
      }      
      Gamefefe.items.coins.push(new CoinController(6384, 187 ,'gold'));
      Gamefefe.items.coins.push(new CoinController(14784, 463 ,'gold'));
      Gamefefe.items.coins.push(new CoinController(14984, 463 ,'gold'));
      Gamefefe.items.coins.push(new CoinController(15184, 463 ,'gold'));
      Gamefefe.items.coins.push(new CoinController(15400, 463 ,'gold'));

      for (let i=0;i<6;i++){
          Gamefefe.items.coins.push(new CoinController(2048+i*80, 533 ,'bronze'));
      }
      for (let i=0;i<6;i++){
          Gamefefe.items.coins.push(new CoinController(2032+i*80, 183 ,'bronze'));
      }
      for (let i=0;i<8;i++){
          Gamefefe.items.coins.push(new CoinController(2984+i*80, 253 ,'gold'));
      } 
          Gamefefe.items.coins.push(new CoinController(5448, 323 ,'gold')); 
          Gamefefe.items.coins.push(new CoinController(5856, 183 ,'gold'));                
    for (let i=0;i<10;i++){
          Gamefefe.items.coins.push(new CoinController(1800+i*80, 323 ,'silver'));
      }
    for (let i=0;i<16;i++){
          Gamefefe.items.coins.push(new CoinController(4000+i*80, 400 ,'gold'));
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