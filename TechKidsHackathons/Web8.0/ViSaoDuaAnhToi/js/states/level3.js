var level3State={
  preload: function(){
      Gamefefe.game.load.tilemap('gamemap', 'Assets/Maps/mapLevel3.json', null, Phaser.Tilemap.TILED_JSON);
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
      Gamefefe.game.load.audio('theme', ['Assets/Audio/main_theme2.mp3', 'Assets/Audio/main_theme2.ogg']);
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

      //Gamefefe.enemies.push(new LionController(9264,-150,'lion'));
      Gamefefe.enemies.push(new RockController(300, -70,'weight'));
      Gamefefe.enemies.push(new RockController(6830, -70,'weight'));
      Gamefefe.enemies.push(new RockController(10920, -70,'weight'));
      Gamefefe.enemies.push(new RockController(16190, -70,'weight'));
      Gamefefe.enemies.push(new RockController(15410,-70,'weight' ));

      Gamefefe.enemies.push(new FlyController(600,250,'fly'));
      Gamefefe.enemies.push(new FlyController(1800,150,'fly'));
      Gamefefe.enemies.push(new FlyController(9470,180,'fly'));
      Gamefefe.enemies.push(new FlyController(8660, 170,'fly'));
      Gamefefe.enemies.push(new FlyController(7430, 150,'fly'));
      Gamefefe.enemies.push(new FlyController(11350, 150,'fly'));

    
      Gamefefe.enemies.push(new RockController(300, -70,'weight'));
      Gamefefe.enemies.push(new RockController(6830, -70,'weight'));
      Gamefefe.enemies.push(new RockController(10920, -70,'weight'));
      Gamefefe.enemies.push(new RockController(16190, -70,'weight'));
      Gamefefe.enemies.push(new RockController(15410,-70,'weight' ));
      Gamefefe.enemies.push(new RockController(16410,-70,'weight' ));
      Gamefefe.enemies.push(new RockController(6568,-70,'weight' ));
      Gamefefe.enemies.push(new RockController(15186,-70,'weight' ));
      Gamefefe.enemies.push(new RockController(6568,-70,'weight' ));
      Gamefefe.enemies.push(new RockController(20392,-70,'weight' ));
      Gamefefe.enemies.push(new RockController(20472,-70,'weight' ));
      Gamefefe.enemies.push(new RockController(20584,-70,'weight' ));

      //Gamefefe.enemies.push(new SlimeController(2500,200,'walk'));
      Gamefefe.enemies.push(new SlimeController(4170, 350,'walk'));
      Gamefefe.enemies.push( new SlimeController(7230, 350,'walk'));
      Gamefefe.enemies.push(new SlimeController(16350, 560,'walk'));
      Gamefefe.enemies.push(new SlimeController(7970, 630,'walk'));
      Gamefefe.enemies.push(new SnailController(3000,400,'crawl'));
      Gamefefe.enemies.push( new SnailController(11190,560,'crawl'));
      Gamefefe.enemies.push(new SnailController(4170, 350,'crawl'));
      Gamefefe.enemies.push(new SnailController(8670, 210,'crawl'));
      Gamefefe.enemies.push(new SnailController(11350, 210,'crawl'));
      Gamefefe.enemies.push(new SnailController(17100, 420,'crawl'));


      Gamefefe.items.traps.push(new TrapController(2350, 533,'spikes'));
      Gamefefe.items.traps.push(new TrapController(5660, 560,'spikes'));
      Gamefefe.items.traps.push(new TrapController(9200, 560,'spikes'));
      Gamefefe.items.traps.push(new TrapController(9560, 463,'spikes'));
      Gamefefe.items.traps.push(new TrapController(10600, 420,'spikes'));
      Gamefefe.items.traps.push(new TrapController(13272, 393,'spikes'));
      Gamefefe.items.traps.push(new TrapController(13744, 393,'spikes'));
      Gamefefe.items.doors.push(new DoorController(20927, 181,'door'));

      Gamefefe.items.traps.push(new TileController(14420, 440,'soil1'));
      Gamefefe.items.traps.push(new TileController(3500, 500,'soil1'));
      Gamefefe.items.traps.push(new TileController(6370,280,'soil1'));

    Gamefefe.items.traps.push(new TileController(9980, 490,'soil1'));
    for (let o=0;o<6;o++){
      Gamefefe.items.traps.push(new TileController(11690+o*70, 210,'soil1'));
    }
    Gamefefe.items.traps.push(new TileController(13700, 630,'soil1'));


      for (let i=0;i<4;i++){
          Gamefefe.items.coins.push(new CoinController(648+i*80, 183 ,'bronze'));
      }
    for (let i=0;i<6;i++){
          Gamefefe.items.coins.push(new CoinController(1664+i*80, 295 ,'silver'));
      }
    for (let i=0;i<6;i++){
          Gamefefe.items.coins.push(new CoinController(17240+i*80, 533 ,'silver'));
      }      
    for (let i=0;i<9;i++){
          Gamefefe.items.coins.push(new CoinController(2664+i*80, 462 ,'gold'));
      }
    for (let i=0;i<4;i++){
          Gamefefe.items.coins.push(new CoinController(1224+i*80, 183 ,'gold'));
      }
    for (let i=0;i<4;i++){
          Gamefefe.items.coins.push(new CoinController(3681+i*80, 323 ,'silver'));
      } 
    for (let i=0;i<4;i++){
          Gamefefe.items.coins.push(new CoinController(15104+i*80, 393 ,'silver'));
      }         
      Gamefefe.items.coins.push(new CoinController(3114,183, 'gold'));
      Gamefefe.items.coins.push(new CoinController(4545,462, 'gold'));
      Gamefefe.items.coins.push(new CoinController(4768,462, 'gold'));
      Gamefefe.items.coins.push(new CoinController(4984,462, 'silver'));
      Gamefefe.items.coins.push(new CoinController(5160,462, 'gold'));
      Gamefefe.items.coins.push(new CoinController(7352,462, 'gold'));
      Gamefefe.items.coins.push(new CoinController(7560,462, 'gold'));
      Gamefefe.items.coins.push(new CoinController(7760,462, 'gold'));
      for(let i=0; i<3; i++){
        Gamefefe.items.coins.push(new CoinController(8563 + i*80, 183, 'gold'));
      }
      for(let i=0; i<4; i++){
        Gamefefe.items.coins.push(new CoinController(12208 + i*80, 463, 'gold'));
      }
      for(let i=0; i<6; i++){
        Gamefefe.items.coins.push(new CoinController(5472 + i*80, 463, 'silver'));
      }
      for(let i=0; i<6; i++){
        Gamefefe.items.coins.push(new CoinController(9488 + i*80, 463, 'silver'));
      }
      for(let i=0; i<6; i++){
        Gamefefe.items.coins.push(new CoinController(19328 + i*80, 533, 'silver'));
      }
      for(let i=0; i<6; i++){
        Gamefefe.items.coins.push(new CoinController(20368 + i*80, 393, 'silver'));
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