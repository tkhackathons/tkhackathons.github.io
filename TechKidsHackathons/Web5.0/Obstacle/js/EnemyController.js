class EnemyController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Obstacle.enemyGroup.create(
            x,
            y,
            spriteName
        );
        this.configs = configs;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.timeSinceSpawn = 0;

    }

    update(){
        var a = Math.floor((Math.random() * 25) + 1);
        var b = Math.floor((Math.random() * 15) + 1);

        this.timeSinceSpawn += Obstacle.game.time.physicsElapsed;
        this.sprite.position.x = this.sprite.position.x + a* Math.cos(2*this.timeSinceSpawn);
        this.sprite.position.y = this.sprite.position.y + b* Math.sin(2* this.timeSinceSpawn);


      }
}
