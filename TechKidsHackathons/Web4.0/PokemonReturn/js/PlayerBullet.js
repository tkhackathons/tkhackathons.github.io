//CLASS Enemy Bullet
class PlayerBullet{
    constructor(x,y,spriteName,velx,vely,configs) {
        this.configs = configs;
        this.pbullet = Nakama.bulletPlayer.create(x, y, spriteName);
        this.pbullet.anchor = new Phaser.Point(0.5, 0.5);
        this.pbullet.damage = this.configs.damage;
        this.pbullet.body.velocity = new Phaser.Point(velx, vely).setMagnitude(this.configs.BULLET_SPEED);
        this.pbullet.angle = Math.atan2(velx, -vely) * (180 / Math.PI);
        this.pbullet.checkWorldBounds = true;
        this.pbullet.outOfBoundKill = true;
    }
}
