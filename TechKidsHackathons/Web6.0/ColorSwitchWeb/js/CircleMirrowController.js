class CircleMirrowController{
  constructor(position) {
    var parts = [];
    CircleMirrowController.colors.forEach(function(color) {

      let sprite = new ObstacleController("circle_"+color,color,CircleMirrowController.configs,CircleMirrowController.configs.offsetAngle,position);
      if(color == "cyan" || color == "purple"){
        sprite.sprite.body.angle += 180;
      }
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
    });
  }

  update2(){

  }
}

CircleMirrowController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 90
}

CircleMirrowController.colors= ["cyan","pink","purple","yellow"];
