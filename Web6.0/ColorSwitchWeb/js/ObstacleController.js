class ObstacleController{
	constructor(spriteName,color,configs,angle,position) {
		this.sprite = CSW.add.sprite(position.x,position.y,spriteName);
		this.configs = configs;
		//this.sprite.scale.setTo(this.configs.ratio,this.configs.ratio);
		CSW.physics.p2.enable([this.sprite],false);
		this.sprite.body.angle = angle;
		this.sprite.color = color;
		this.sprite.anchor = new Phaser.Point(this.configs.anchor.x,this.configs.anchor.y);
		this.sprite.body.angularVelocity = 2.5;
		this.sprite.body.angularDamping = 0;
		this.sprite.body.data.gravityScale = 0;
		this.sprite.body.kinematic = true;
	}

	update(){
		// console.log(this.sprite.position.y);
		if(this.sprite.position.y > CSW.camera.y + CSW.configs.GAME_HEIGHT){
			this.sprite.kill;
			// console.log("kill");
		}
	}
}
