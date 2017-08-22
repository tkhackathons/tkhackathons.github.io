class RockController extends EnemyController{
    constructor(x,y,spriteName){
        super(x,y,spriteName);
    }
    update(){
        Gamefefe.game.physics.arcade.collide(this.sprite, Gamefefe.groundLayer);
        if (Gamefefe.properties.xPosition>=this.sprite.body.x-80){
            this.sprite.body.gravity.y = 1400;
            this.sprite.body.bounce.y = 0.6;
        }
    }
}