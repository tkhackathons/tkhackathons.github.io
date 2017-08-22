class StripeMoveController{
  constructor(position) {
    var parts = [];

    StripeMoveController.colors.forEach(function(color) {
      let sprite = new ObstacleController("stripe_"+color.color,color.color,StripeMoveController.configs,color.offsetAngle,position);
      sprite.sprite.body.velocity.x = 200;
      parts.push(sprite.sprite);
    });

    this.parts = parts;
    this.position = position;
    this.used = true;
  }

  update() {
    this.parts.forEach(function(part) {
      part.body.clearShapes();
      if (part.color!=CSW.player.sprite.color) {
        part.body.loadPolygon('stripe_physics', part.color);
      }
      part.body.velocity.x = 200;
    });
  }

  update2(){
    if(this.parts[0].position.x > CSW.configs.GAME_WIDTH*7/8){
      this.parts.forEach(function(part) {
        part.body.velocity.x = -200;
        part.body.angularVelocity = 4;
      });
    }
    if(this.parts[0].position.x < CSW.configs.GAME_WIDTH/8){
      this.parts.forEach(function(part) {
        part.body.velocity.x = 200;
        part.body.angularVelocity = 4;
      });
    }
  }
}

StripeMoveController.configs= {
  anchor:{x: 0,y:0.5},
  ratio:0.9
}

StripeMoveController.colors= [
  {color: "cyan", offsetAngle: 0},
  {color: "pink", offsetAngle: 90},
  {color: "purple", offsetAngle: 180},
  {color: "yellow", offsetAngle: 270}
];
