//Player Sprite
//Configs:
//  - keyboad: up - down - left - right - attack
//  - character = [Aerodactyl, Dragonite]
//  - animation: sleeping - attack - move - hurt (number of frame)
//  - setup player: health
//  - hitBoxRadius -> bán kính
//  - hitBoxOffset -> vị trí tâm

class PlayerController {
    constructor(x, y, configs) {
        this.configs = configs;
        this.sprite = Nakama.playerGroup.create(x, y, this.configs.character);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.damage = this.configs.damage;
        this.sprite.body.setCircle(this.configs.hitBoxRadius, this.configs.hitBoxOffset.x, this.configs.hitBoxOffset.y);
        this.sprite.canfire = false;
        this.sprite.maxhealth = 50;
        this.sprite.firevel = new Phaser.Point(1, 0);

        //Player Name
        var pokemonName = Nakama.game.add.text(0, -20, this.configs.playerName, {
            font: "65px Arial",
            fill: "#ff0044",
            align: 'left',
            fontSize: 10,
        });
        pokemonName.anchor = new Phaser.Point(0.5, 0.5);

        this.sprite.addChild(pokemonName);

        //Health Bar
        this.sprite.healthbar = Nakama.enemyGroup.create(-20, +20, 'Health');
        this.sprite.healthbar.cropEnabled = true;
        this.sprite.maxwidth = this.sprite.healthbar.width;
        this.sprite.healthbar.width = (this.sprite.health / this.sprite.maxhealth) * this.sprite.healthbar.width;

        this.sprite.addChild(this.sprite.healthbar);


        //Animations
        //  Sleeping
        var sleeping = [];
        for (var i = 0; i < this.configs.sleeping; i++) {
            sleeping.push(i);
        }
        this.sprite.animations.add('sleeping', sleeping, true);
        //  Attack
        var attack = [];
        for (var i = 0; i < (this.configs.attack); i++) {
            attack.push(i + this.configs.sleeping);
        }
        this.sprite.animations.add('attack', attack, this.configs.attack * 3, true);
        //  Hurt
        var hurt = [];
        for (var i = 0; i < this.configs.hurt; i++) {
            hurt.push(i + this.configs.sleeping + this.configs.attack);
        }
        this.sprite.animations.add('hurt', hurt, this.configs.hurt, false);
        //  Move
        var moveUp = [];
        var moveDown = [];
        var moveLeft = [];
        var moveRight = [];
        var moveUpLeft = [];
        var moveUpRight = [];
        var moveDownLeft = [];
        var moveDownRight = [];
        for (var i = 0; i < this.configs.move; i++) {
            moveUp.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt);
        }
        this.sprite.animations.add('moveUp', moveUp, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveDown.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move);
        }
        this.sprite.animations.add('moveDown', moveDown, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveLeft.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 2);
        }
        this.sprite.animations.add('moveLeft', moveLeft, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveRight.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 3);
        }
        this.sprite.animations.add('moveRight', moveRight, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveUpLeft.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 4);
        }
        this.sprite.animations.add('moveUpLeft', moveUpLeft, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveUpRight.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 5);
        }
        this.sprite.animations.add('moveUpRight', moveUpRight, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveDownLeft.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 6);
        }
        this.sprite.animations.add('moveDownLeft', moveDownLeft, this.configs.move * 2, true);

        for (var i = 0; i < this.configs.move; i++) {
            moveDownRight.push(i + this.configs.sleeping + this.configs.attack + this.configs.hurt + this.configs.move * 7);
        }
        this.sprite.animations.add('moveDownRight', moveDownRight, this.configs.move * 2, true);

        //Setup Player
        this.sprite.health = this.configs.health;
        this.sprite.level = 1;
        this.attackcooldown = 0;
    }

    nearEnemy() {
        var mindistance = 1000000000000;
        var k = -1;

        for (var i = 0; i < Nakama.enemyController.length; i++) {
            if (Nakama.game.math.distance(Nakama.enemyController[i].enemy.position.x, Nakama.enemyController[i].enemy.position.y, Nakama.player.sprite.position.x, Nakama.player.sprite.position.y) < mindistance) {
                mindistance = Nakama.game.math.distance(Nakama.enemyController[i].enemy.position.x, Nakama.enemyController[i].enemy.position.y, Nakama.player.sprite.position.x, Nakama.player.sprite.position.y);
                k = i;
            }
        }

        if (mindistance > this.configs.attackRange) {
            k = -1;
        }
        return k;

    }

    playerAttack() {
        var target = this.nearEnemy();
        //console.log(target);
        if (target == -1) return;

        Nakama.audio = Nakama.game.add.audio('attack');
        Nakama.audio.play();

        if (Nakama.enemyController[target].enemy.health >= this.configs.damage) {
            Nakama.enemyController[target].enemy.health -= this.configs.damage;
        }
        else {
            Nakama.enemyController[target].enemy.kill();
            Nakama.enemyController[target].enemy.health -= this.configs.damage;
            if (Nakama.collection.indexOf(Nakama.enemyController[target].enemy.type) == -1) {
                Nakama.collection.push(Nakama.enemyController[target].enemy.type);
            }
            Nakama.enemyController.splice(target, 1);
        }
        //console.log(enemy.sprite.health);
    }

    updateHealth(){
        this.sprite.healthbar.width = (this.sprite.health / this.sprite.maxhealth) * this.sprite.maxwidth;

    }

    //Update Player
    update() {
        this.updateHealth();

        //Move Player---------------------------------------------------------------------------------------------------
        if (Nakama.keyboard.isDown(this.configs.up) && !Nakama.keyboard.isDown(this.configs.attackKey)) {
            if (Nakama.keyboard.isDown(this.configs.left)) {
                this.sprite.animations.play('moveUpLeft');
                this.sprite.body.velocity = new Phaser.Point(-1, -1).setMagnitude(Nakama.configs.MOVE_SPEED);
                this.sprite.firevel = new Phaser.Point(-1, -1);
                //TODO
                //UP LEFT
            } else {
                if (Nakama.keyboard.isDown(this.configs.right)) {
                    this.sprite.animations.play('moveUpRight');
                    this.sprite.body.velocity = new Phaser.Point(1, -1).setMagnitude(Nakama.configs.MOVE_SPEED);
                    this.sprite.firevel = new Phaser.Point(1, -1);
                    //TODO
                    //UP RIGHT
                } else {
                    this.sprite.animations.play('moveUp');
                    this.sprite.body.velocity = new Phaser.Point(0, -1).setMagnitude(Nakama.configs.MOVE_SPEED);
                    this.sprite.firevel = new Phaser.Point(0, -1);
                    //TODO
                    //UP
                }
            }
        }

        if (Nakama.keyboard.isDown(this.configs.down) && !Nakama.keyboard.isDown(this.configs.attackKey)) {
            if (Nakama.keyboard.isDown(this.configs.left)) {
                this.sprite.animations.play('moveDownLeft');
                this.sprite.body.velocity = new Phaser.Point(-1, 1).setMagnitude(Nakama.configs.MOVE_SPEED);
                this.sprite.firevel = new Phaser.Point(-1, 1);
                //TODO
                //DOWN LEFT
            } else {
                if (Nakama.keyboard.isDown(this.configs.right)) {
                    this.sprite.animations.play('moveDownRight');
                    this.sprite.body.velocity = new Phaser.Point(1, 1).setMagnitude(Nakama.configs.MOVE_SPEED);
                    this.sprite.firevel = new Phaser.Point(1, 1);
                    //TODO
                    //DOWN RIGHT
                } else {
                    this.sprite.animations.play('moveDown');
                    this.sprite.body.velocity = new Phaser.Point(0, 1).setMagnitude(Nakama.configs.MOVE_SPEED);
                    this.sprite.firevel = new Phaser.Point(0, 1);
                    //TODO
                    //DOWN
                }
            }
        }

        if (Nakama.keyboard.isDown(this.configs.left) && !Nakama.keyboard.isDown(this.configs.up) && !Nakama.keyboard.isDown(this.configs.down) && !Nakama.keyboard.isDown(this.configs.attackKey)) {
            this.sprite.animations.play('moveLeft');
            this.sprite.body.velocity = new Phaser.Point(-1, 0).setMagnitude(Nakama.configs.MOVE_SPEED);
            this.sprite.firevel = new Phaser.Point(-1, 0);
            //TODO
            //LEFT
        }

        if (Nakama.keyboard.isDown(this.configs.right) && !Nakama.keyboard.isDown(this.configs.up) && !Nakama.keyboard.isDown(this.configs.down) && !Nakama.keyboard.isDown(this.configs.attackKey)) {
            this.sprite.animations.play('moveRight');
            this.sprite.body.velocity = new Phaser.Point(1, 0).setMagnitude(Nakama.configs.MOVE_SPEED);
            this.sprite.firevel = new Phaser.Point(1, 0);
            //TODO
            //RIGHT
        }

        if (!Nakama.keyboard.isDown(this.configs.left) && !Nakama.keyboard.isDown(this.configs.right) && !Nakama.keyboard.isDown(this.configs.up) && !Nakama.keyboard.isDown(this.configs.down) && !Nakama.keyboard.isDown(this.configs.attackKey)) {
            this.sprite.animations.play('sleeping');
            this.sprite.body.velocity = new Phaser.Point(0, 0).setMagnitude(Nakama.configs.MOVE_SPEED);
        }
        //End Move Player-----------------------------------------------------------------------------------------------

        //
        this.attackcooldown += Nakama.game.time.physicsElapsed;
        if (Nakama.keyboard.isDown(this.configs.attackKey) && this.attackcooldown >= this.configs.cooldown) {
            this.sprite.animations.play('attack');
            this.sprite.body.velocity = new Phaser.Point(0, 0).setMagnitude(Nakama.configs.MOVE_SPEED);
            this.playerAttack();
            this.attackcooldown = 0;
        }

        if (Nakama.keyboard.isDown(this.configs.fireKey) && this.sprite.canfire && this.attackcooldown >= this.configs.cooldownfire) {

            Nakama.audio = Nakama.game.add.audio('fire');
            Nakama.audio.play();

            var playerBullet = new PlayerBullet(this.sprite.position.x, this.sprite.position.y, 'BulletType2', this.sprite.firevel.x, this.sprite.firevel.y, {
                damage: this.sprite.damage,
                BULLET_SPEED: 150,
            });
            this.attackcooldown = 0;
        }

    }
}
