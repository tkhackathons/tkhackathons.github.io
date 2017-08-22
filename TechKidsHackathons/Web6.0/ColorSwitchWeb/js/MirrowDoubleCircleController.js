class MirrowDoubleCircleController {
  constructor(position) {
    this.partLeft = new CircleController({x : position.x - CSW.configs.GAME_WIDTH/5.15, y : position.y});
    this.partRight = new CircleMirrowController({x : position.x + CSW.configs.GAME_WIDTH/5.15, y : position.y});

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
    this.changeAngularVelocity(0.7);
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
      part.body.angularVelocity = 0.7;
    });
    this.partRight.parts.forEach(function(part){
      part.reset(part.position.x, -CSW.player.yChange);
      part.body.angularVelocity = -0.7;
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
