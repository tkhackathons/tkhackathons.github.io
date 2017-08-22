class PlayerController{
  constructor(x, y, spriteName,configs){
    //this.sprite = Gamefefe.game.add.sprite(x, y,spriteName);
    this.sprite = Gamefefe.playerGroup.create(x, y, spriteName);
    this.configs = configs;
    Gamefefe.game.physics.arcade.enable(this.sprite);
    this.sprite.animations.add('walk');
    //this.sprite.animations.add('hurt');
    this.sprite.animations.play('walk',25,true);
    Gamefefe.game.camera.follow(this.sprite);
    this.sprite.body.bounce.y = 0;
    this.sprite.body.gravity.y = 1200;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor.x=0.5;
    this.sprite.anchor.y=0.5;
    this.timeSinceLastJump=0;
    this.timeSinceLastMove=0;
    Gamefefe.game.load.audio('jump', ['Assets/Audio/jump.mp3']);
    Gamefefe.jumpSound = Gamefefe.game.add.audio('jump');
  }

  setPosition(x,y){
      this.sprite.body.x=x;
      this.sprite.body.y=y;
  }

  update(){
      Gamefefe.properties.xPosition = this.sprite.body.x;
      Gamefefe.properties.yPosition = this.sprite.body.y;
      Gamefefe.game.physics.arcade.collide(this.sprite, Gamefefe.groundLayer);
      this.timeSinceLastJump += Gamefefe.game.time.physicsElapsed;
      this.timeSinceLastMove+=Gamefefe.game.time.physicsElapsed;

      if(Gamefefe.keyboard.isDown(Phaser.Keyboard.F)){
          console.log(this.sprite.body.x,this.sprite.body.y);
      }
      if(Gamefefe.keyboard.isDown(this.configs.jump)
          && this.sprite.body.onFloor() && Gamefefe.game.time.now > this.timeSinceLastJump
        ){
          Gamefefe.jumpSound.volume=0.1;
          Gamefefe.jumpSound.play();
          this.sprite.body.velocity.y=-700;
          this.timeSinceLastJump = 250 + Gamefefe.game.time.now;
      }
      if(Gamefefe.keyboard.isDown(this.configs.right)
          && this.timeSinceLastMove > 0.005
        ){
          this.sprite.scale.setTo(1,1);
          this.sprite.x+=10;
          this.timeSinceLastMove = 0;
      }
    else if(Gamefefe.keyboard.isDown(this.configs.left)
         && this.timeSinceLastMove > 0.005
      ){
        this.sprite.scale.setTo(-1,1);
        this.sprite.x-=10;
        this.timeSinceLastMove = 0;
    }
    else{
         this.sprite.body.velocity.x = 0;
    }

    if (this.sprite.body.y>600){

        Gamefefe.isDead=true;
        /*for (var life of Gamefefe.lives){
          life.update();
        }*/
        

    }
  }
}