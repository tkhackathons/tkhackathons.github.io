class SpinShapeController{
  constructor(position,direction,scale) {
    var parts = [];
    var velocity = direction*Math.random();
    SpinShapeController.colors.forEach(function(color) {
      let sprite = new ObstacleController("circle_"+color,color,SpinShapeController.configs,SpinShapeController.configs.offsetAngle,position);
      sprite.sprite.body.clearShapes();
      sprite.sprite.scale.setTo(scale,scale);
      sprite.sprite.body.angularVelocity*=velocity*1.5;
      parts.push(sprite.sprite);
    });

    this.parts = parts;
    this.position = position;
  }
}

SpinShapeController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}

SpinShapeController.colors= ["cyan","pink","purple","yellow"];
