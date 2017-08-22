class CircleMoveController{
  constructor(position) {
    var parts = [];

    CircleMoveController.colors.forEach(function(color) {
      let sprite = new ObstacleController("circle_"+color,color,CircleMoveController.configs,CircleMoveController.configs.offsetAngle,position);
      // console.log(sprite);
      parts.push(sprite.sprite);
    });

    this.parts = parts;
    this.position = position;
    this.used = true;
  }

  update() {
    this.parts.forEach(function(part) {
      part.body.clearShapes();
      if (part.color!=CSW.player.sprite.color) part.body.loadPolygon('circle_physics', part.color);
      part.body.velocity.x = 200;
    });
  }

  update2(){
    if(this.parts[0].position.x > CSW.configs.GAME_WIDTH*9/16){
      this.parts.forEach(function(part) {
        part.body.velocity.x = -200;
      });
    }
    if(this.parts[0].position.x < CSW.configs.GAME_WIDTH*7/16){
      this.parts.forEach(function(part) {
        part.body.velocity.x = 200;
      });
    }
  }
}

CircleMoveController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}

CircleMoveController.colors= ["cyan","pink","purple","yellow"];
