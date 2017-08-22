class StripeMirrowController{
  constructor(position) {
    var parts = [];
    StripeMirrowController.colors.forEach(function(color) {
      let sprite = new ObstacleController("stripe_"+color.color,color.color,StripeMirrowController.configs,color.offsetAngle,position);
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
    });
  }

  update2(){

  }
}

StripeMirrowController.configs= {
  anchor:{x: -0.1,y:0.5},
  ratio:0.9
}

StripeMirrowController.colors= [
  {color: "cyan", offsetAngle: 180},
  {color: "pink", offsetAngle: 90},
  {color: "purple", offsetAngle: 0},
  {color: "yellow", offsetAngle: 270}
];
