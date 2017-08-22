class SwitchController{
	constructor(position) {
		var color = SwitchController.random(CSW.player.sprite.color);
    this.sprite = new ObstacleController("switch",color,SwitchController.configs,SwitchController.configs.offsetAngle,position);
		this.sprite.sprite.body.angularVelocity = 0;
		this.sprite.sprite.body.damping = 0;
		this.sprite.sprite.color = SwitchController.random(CSW.player.sprite.color);
	}

	update() {
		this.sprite.sprite.body.mass = 0.001;
	}
}

SwitchController.random = function(current) {
	var usable = [];
	SwitchController.colors.forEach(function(color) {
		if (color!==current) {
			usable.push(color);
		}
	});
	return usable[Math.round(Math.random()*100)%(usable.length-1)];
}

SwitchController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}

SwitchController.colors= ["cyan","pink","purple","yellow"];
