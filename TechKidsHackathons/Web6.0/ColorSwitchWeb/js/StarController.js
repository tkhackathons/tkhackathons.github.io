class StarController extends ObstacleController{
	constructor(position) {
		super('star',null,StarController.configs,StarController.configs.offsetAngle,position);
		this.sprite.body.angularVelocity = 0;
	}
}

StarController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}