class DoubleStripeController{
  constructor(position) {

    this.partLeft = new StripeController({x : position.x - CSW.configs.GAME_WIDTH/4, y : position.y});
    this.partRight = new StripeMirrowController({x : position.x + CSW.configs.GAME_WIDTH/4 , y : position.y});

    this.partLeft.update();
    this.partRight.update();
    this.position = position;
    this.used = true;
    this.reUseMySelf = true;
    this.killMySelf = true;
  }

  update(){
    this.partLeft.update();
    this.partRight.update();
    this.changeAngularVelocity(2.5);
  }

  update2(){
    this.partLeft.update2();
    this.partRight.update2();
  }

  changeAngularVelocity(angularVelocity){
    this.partLeft.parts.forEach(function(sprite){
      sprite.body.angularVelocity = angularVelocity;
    });
    this.partRight.parts.forEach(function(sprite){
      sprite.body.angularVelocity = -angularVelocity;
    });
  }

  reUseMySelfFunc() {
    this.partLeft.parts.forEach(function(part){
      part.reset(part.position.x, -CSW.player.yChange);
      part.body.angularVelocity = 2.5;
    });
    this.partRight.parts.forEach(function(part){
      part.reset(part.position.x, -CSW.player.yChange);
      part.body.angularVelocity = -2.5;
    });
    this.used = true;
  }

  killMySelfFunc(){
    this.partLeft.parts.forEach( function(part, index) {
      part.kill();
    });
    this.partRight.parts.forEach( function(part, index) {
      part.kill();
    });
    this.used = false;
  }


}
