var playState = {
    create: function () {
        Nakama.audio.destroy();
        Nakama.audio = Nakama.game.add.audio('back');
        Nakama.audio.loopFull(0.6);
        Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
        Nakama.keyboard = Nakama.game.input.keyboard

        //Group
        Nakama.mapGroup = Nakama.game.add.group();
        Nakama.playerGroup = Nakama.game.add.physicsGroup();
        Nakama.itemsGroup = Nakama.game.add.physicsGroup();
        Nakama.enemyGroup = Nakama.game.add.physicsGroup();
        Nakama.bulletEnemy = Nakama.game.add.physicsGroup();
        Nakama.ropeGroup = Nakama.game.add.physicsGroup();
        Nakama.bulletPlayer = Nakama.game.add.physicsGroup();
        Nakama.collectionGroup = Nakama.game.add.physicsGroup();

        Nakama.enemyController = [];
        Nakama.bossController = [];
        //MAP
        this.loadMap(2);
        //Menu

        //Choice Name
        var player1Name = this.choiceName();
        Nakama.pokemonName = player1Name;
        var spirteplayer1 = this.choicePokemon();
        Nakama.spritePokemon = spirteplayer1;

        //Player
        var hitBoxOffset = new Phaser.Point(10, 8);
        Nakama.player = new PlayerController(Nakama.game.world.centerX, Nakama.game.world.centerY, {
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT,
            attackKey: Phaser.Keyboard.SHIFT,
            fireKey: Phaser.Keyboard.SPACEBAR,
            cooldownfire: 1,
            attackRange: 25,
            cooldown: 0.2,
            character: Nakama.spritePokemon,
            sleeping: 2,
            attack: 2,
            hurt: 1,
            move: 3,
            health: 50,
            damage: 10,
            hitBoxRadius: 10,
            hitBoxOffset: hitBoxOffset,
            playerName: player1Name
        });

        //ITEMS
        this.initItems();

        //ROPE
        var rope1 = new RopeController(100, 259, 'Rope');
        var rope2 = new RopeController(1000, 800, 'Rope');
        var rope3 = new RopeController(700, 700, 'Rope');

        //CAMERA FOLLOW PLAYER
        Nakama.game.camera.follow(Nakama.player.sprite);

        //TEXT INFO
        Nakama.text_score = Nakama.game.add.text(Nakama.game.world.left + 10, 60, 'SCORE : ' + Nakama.score + '\nCOINS   : ' + Nakama.coins + '\nKEYS: ' + Nakama.numkey + '/' + Nakama.key, {
            font: "65px Arial",
            fill: "#ff0044",
            align: 'left',
            fontSize: 20,
        });
        Nakama.text_score.anchor = new Phaser.Point(0, 0.5);
        Nakama.text_score.fixedToCamera = true;
        Nakama.text_score.cameraOffset.setTo(Nakama.game.world.left + 10, 60);

        Nakama.stateText = Nakama.game.add.text(Nakama.game.world.centerX, Nakama.game.world.centerY, ' ', {
            font: '84px Arial',
            fill: '#ff0044'
        });
        Nakama.stateText.fixedToCamera = true;
        Nakama.stateText.cameraOffset.setTo(Nakama.game.world.left + 440, 240);
        Nakama.stateText.anchor.setTo(0.5, 0.5);
        Nakama.stateText.visible = false;
    },

    loadMap: function (number) {
        for (var i = 0; i < Nakama.items.length; i++) {
            Nakama.items[i].item.kill();
        }
        for(var i=0;i< Nakama.enemyController.length;i++){
            Nakama.enemyController[i].enemy.kill();
        }
        for(var i=0;i< Nakama.bossController.length;i++){
            Nakama.bossController[i].enemy.kill();
        }
        if(Nakama.map) {
            Nakama.map.destroy();
        }
        switch (number) {
            case 2: {
                Nakama.map = Nakama.game.add.tilemap('map' + number);
                Nakama.map.addTilesetImage('22');
                Nakama.map.addTilesetImage('24');
                Nakama.map.addTilesetImage('25');
                Nakama.map.addTilesetImage('26');
                Nakama.map.addTilesetImage('27');
                break;
            }
            case 3:{
                Nakama.map = Nakama.game.add.tilemap('map' + number);
                Nakama.map.addTilesetImage('28');
                Nakama.player.sprite.position = new Phaser.Point(1000,1000);
                break;
            }
            default:
                Nakama.map = Nakama.game.add.tilemap('map' + number);
                Nakama.map.addTilesetImage('28');

        }

        // //FIX POSITON PLAYER CHANGE MAP
        // player.sprite.position = new Phaser.Point(100, 200);

        Nakama.layer2 = Nakama.map.createLayer('Background');
        Nakama.layer2.resizeWorld();
        Nakama.layer = Nakama.map.createLayer('Wall');
        // layer.debug = true;
        Nakama.layer.resizeWorld();
        Nakama.map.setCollisionBetween(1, 8000, true, 'Wall');

        //ADD MAP TO GROUP
        Nakama.mapGroup.add(Nakama.layer);
        Nakama.mapGroup.add(Nakama.layer2);
    },

    choiceName: function () {
        var playerName = prompt('Please choice Pokemon name: ');
        return playerName;
    },

    choicePokemon: function () {
        var playertype = prompt('Please choice Pokemon type (1 or 2): ');
        playertype = parseInt(playertype);
        switch (playertype){
            case 1:{
                var playersprite = 'Aerodactyls';
                break;
            }

            case 2:{
                var playersprite = 'Kabutop';
                break;
            }
            default:
                var playersprite = 'Aerodactyls';

        }

        return playersprite;
    },

    initItems: function () {
        //items
        for (var i = 0; i < 20; i++) {
            var itemsType1 = new ItemController(
                Math.random() * 1000 + 300,
                Math.random() * 1000 + 300,
                'Money-14x16',
                {type: 1});
            Nakama.items.push(itemsType1);
        }
        for (var i = 0; i < 20; i++) {
            var itemsType2 = new ItemController(
                Math.random() * 1000 + 300,
                Math.random() * 1000 + 300,
                'Banana',
                {type: 2});
            Nakama.items.push(itemsType2);
        }

        for (var i = 0; i < 20; i++) {
            var itemsType3 = new ItemController(
                Math.random() * 1000 + 300,
                Math.random() * 1000 + 300,
                'Tonic',
                {type: 3});
            Nakama.items.push(itemsType3);
        }

        for (var i = 0; i < 3; i++) {
            var itemsType5 = new ItemController(
                Math.random() * 1000 + 300,
                Math.random() * 1000 + 300,
                'Diamond',
                {type: 5});
            Nakama.items.push(itemsType5);
        }
        for (var i = 0; i < 10; i++) {
            var itemsType6 = new ItemController(
                Math.random() * 1000 + 300,
                Math.random() * 1000 + 300,
                'Pea',
                {type: 6});
            Nakama.items.push(itemsType6);
        }

    },

    update: function () {
        Nakama.raycastLines = [];
        Nakama.curTime += Nakama.game.time.physicsElapsed;

        //Collide
        Nakama.game.physics.arcade.collide(Nakama.playerGroup, Nakama.layer);
        Nakama.game.physics.arcade.collide(Nakama.enemyGroup, Nakama.layer);

        //ENEMY
        this.initEnemy();

        Nakama.player.update();

        for (var i = 0; i < Nakama.enemyController.length; i++) {
            Nakama.enemyController[i].checkPlayer();
        }
        for (var i = 0; i < Nakama.bossController.length; i++) {
            Nakama.bossController[i].checkPlayer();
        }

        this.gameOver();
        this.checkVictory();

        Nakama.game.physics.arcade.overlap(Nakama.itemsGroup, Nakama.playerGroup, this.playerHitItems);
        Nakama.game.physics.arcade.overlap(Nakama.ropeGroup, Nakama.playerGroup, this.playerHitRope);
        Nakama.game.physics.arcade.overlap(Nakama.enemyGroup, Nakama.playerGroup, this.playerHitEnemy);
        Nakama.game.physics.arcade.overlap(Nakama.bulletEnemy, Nakama.playerGroup, this.bulletHitPlayer);
        Nakama.game.physics.arcade.overlap(Nakama.bulletPlayer, Nakama.enemyGroup, this.bulletHitEnemy);
        Nakama.text_score.setText('SCORE : ' + Nakama.score + '\nCOINS   : ' + Nakama.coins + '\nKEYS: ' + Nakama.numkey + '/' + Nakama.key);

        //SHOW Collection
        this.showCollection();
    },

    //Bullet hit enemyGroup
    bulletHitEnemy: function (bulletsprite, enemysprite) {
        if (enemysprite.maxhealth) {
            if (enemysprite.health > bulletsprite.damage) {
                enemysprite.health -= bulletsprite.damage;
            } else {
                enemysprite.health -= bulletsprite.damage;
                if (enemysprite.type == -1) {
                    Nakama.collection.push(enemysprite.type);
                }
                enemysprite.kill();
                Nakama.enemyController.splice(Nakama.enemyController.indexOf(enemysprite), 1);
            }
            bulletsprite.kill();
        }

    },

    //bulletHitPlayer
    bulletHitPlayer: function (bulletsprite, playersprite) {
        playersprite.health -= bulletsprite.damage;
        bulletsprite.kill();
    },
    //KILL ENEMY
    playerHitEnemy: function (enemysprite, playersprite) {
        if (enemysprite.health == 0) {
            if (enemysprite.type == -1) {
                Nakama.collection.push(enemysprite.type);
            }
            enemysprite.kill();
        }
    },

    //BREAK ROPES
    playerHitRope: function (ropesprite, playersprite) {
        ropesprite.kill();
        if ((ropesprite.position.x == 700 && ropesprite.position.y == 700) || (ropesprite.position.x == 100 && ropesprite.position.y == 259)) {
            var keyNew = new ItemController(ropesprite.position.x, ropesprite.position.y, 'Key', {type: 4});
        }

    },

    playerHitItems: function (itemsprite, playersprite) {
        switch (itemsprite.type) {
            case 1:
                Nakama.coins += 1;
                Nakama.score += 5;
                break;
            case 2:
                playersprite.health += 10;
                break;
            case 3:
                playersprite.damage += 1;
                break;
            case 4:
                Nakama.numkey++;
                Nakama.audio = Nakama.game.add.audio('pickkey');
                Nakama.audio.play();
                break;
            case 5:
                Nakama.configs.MOVE_SPEED = Nakama.configs.MOVE_SPEED * 2;
            case 6:
                Nakama.player.sprite.canfire = true;
            default:

        }

        itemsprite.kill();
        Nakama.items.splice(Nakama.items.indexOf(itemsprite), 1);

    },

    showCollection: function () {
        if (Nakama.keyboard.isDown(Phaser.Keyboard.C)) {
            var cb = Nakama.player.sprite.addChild(Nakama.collectionGroup.create(0, 0, 'collectionBackgroud'));
            cb.anchor = new Phaser.Point(0.5, 0.5);
            Nakama.collectionBackgroud.push(cb);
            for (var i = 0; i < Nakama.collection.length; i++) {
                var spritePokemon;
                switch (Nakama.collection[i]) {
                    case 1:
                        spritePokemon = 'Pinser-37x30';
                        break;
                    case 2:
                        spritePokemon = 'Kabutop';
                        break;
                    case 3:
                        spritePokemon = 'Hooh';
                        break;
                    case 4:
                        spritePokemon = 'Mangmar';
                        break;
                    case 5:
                        spritePokemon = 'Mantina';
                        break;
                    case 6:
                        spritePokemon = 'Nomal';
                        break;
                    case 7:
                        spritePokemon = 'Snorlar';
                        break;
                    case 8:
                        spritePokemon = 'Tauros';
                        break;
                    case 9:
                        spritePokemon = 'Cat';
                        break;
                    default:
                        spritePokemon = 'Kabutop';
                }
                var showPokemon = Nakama.player.sprite.addChild(Nakama.collectionGroup.create((i % 3) * 50 - 50, -50 + 50 * (Math.floor(i / 4)), spritePokemon));
                showPokemon.anchor = new Phaser.Point(0.5, 0.5);
                Nakama.collectionsprite.push(showPokemon);
            }
        } else {
            for (var i = 0; i < Nakama.collectionBackgroud.length; i++) {
                Nakama.collectionBackgroud[i].kill();
                Nakama.collectionBackgroud.splice(i, 1);
            }
            for (var i = 0; i < Nakama.collectionsprite.length; i++) {
                Nakama.collectionsprite[i].kill();
                Nakama.collectionsprite.splice(i, 1);
            }
        }
    },

    initEnemy: function () {
        var hitBoxOffset = new Phaser.Point(10, 8);

        if (Nakama.enemyController.length < Nakama.numEnemy) {
            var spritetype = this.getRandomInt(1, 10);
            var spriteName = 'Moltres-67x61';
            switch (spritetype) {
                case 1:
                    spriteName = 'Pinser-37x30';
                    var attackSprite = 2;
                    var hurtSprite = 1;
                    break;
                case 2:
                    spriteName = 'Kabutop';
                    var attackSprite = 2;
                    var hurtSprite = 1;
                    break;
                case 3:
                    spriteName = 'Hooh';
                    var attackSprite = 2;
                    var hurtSprite = 1;
                    break;
                case 4:
                    spriteName = 'Mangmar';
                    var attackSprite = 3;
                    var hurtSprite = 1;
                    break;
                case 5:
                    spriteName = 'Mantina';
                    var attackSprite = 4;
                    var hurtSprite = 2;
                    break;
                case 6:
                    spriteName = 'Nomal';
                    var attackSprite = 2;
                    var hurtSprite = 1;
                    break;
                case 7:
                    spriteName = 'Snorlar';
                    var attackSprite = 3;
                    var hurtSprite = 1;
                    break;
                case 8:
                    spriteName = 'Tauros';
                    var attackSprite = 2;
                    var hurtSprite = 1;
                    break;
                case 9:
                    spriteName = 'Cat';
                    var attackSprite = 2;
                    var hurtSprite = 1;
                    break;
                default:
                    spritetype = 2;
                    spriteName = 'Kabutop';
                    var attackSprite = 2;
                    var hurtSprite = 1;
            }

            var positonX = Math.random() * 1000 + 100;
            var positonY = Math.random() * 1000 + 100;
            var rangeX = this.getRandomInt(-200, 200);
            var rangeY = this.getRandomInt(-200, 200);

            var Newenemy = new EnemyController({
                enemySprite: spriteName,
                type: spritetype,
                sleeping: 2,
                attack: attackSprite,
                hurt: hurtSprite,
                move: 3,
                health: 100,
                maxhealth: 100,
                damage: 10,
                distanceAttack: 100,
                x: positonX,
                y: positonY,
                x2: positonX + rangeX,
                y2: positonY + rangeY,
                speed: 50,
                cooldown: 1,
                hitBoxRadius: 5,
                hitBoxOffset: hitBoxOffset,
            });
            Nakama.enemyController.push(Newenemy);
        }


        if (Nakama.bossController.length < Nakama.numBoss && Nakama.curTime > Nakama.bossTime) {
            Nakama.curTime = 0;
            var spriteName = 'Moltres-67x61';

            var positonX = Math.random() * 1000 + 100;
            var positonY = Math.random() * 1000 + 100;
            var rangeX = this.getRandomInt(-200, 200);
            var rangeY = this.getRandomInt(-200, 200);

            var Newenemy = new BossController({
                enemySprite: spriteName,
                sleeping: 2,
                attack: 2,
                hurt: 1,
                move: 3,
                health: 200,
                maxhealth: 200,
                damage: 10,
                distanceAttack: 150,
                x: positonX,
                y: positonY,
                x2: positonX + rangeX,
                y2: positonY + rangeY,
                speed: 50,
                cooldown: 1,
                hitBoxRadius: 20,
                hitBoxOffset: hitBoxOffset,
            });
            Nakama.bossController.push(Newenemy);
        }

    },
    gamePaused: function () {
        Nakama.game.paused = true;
    },
    gameUnPaused: function () {
        Nakama.game.paused = false;
    },

    restartGame(){
        Nakama.game.state.start('menu');
    },

    gameOver: function () {

        if (Nakama.player.sprite.health <= 0) {
            Nakama.player.sprite.kill();
            Nakama.stateText.text = "GAME OVER";
            Nakama.stateText.visible = true;
            Nakama.timeToRestart += Nakama.game.time.physicsElapsed;
            console.log(Nakama.timeToRestart);
            Nakama.audio.destroy();
            Nakama.audio = Nakama.game.add.audio('dead2');
            Nakama.audio.loopFull(0.6);
        }
        if (Nakama.timeToRestart > 5) {
            Nakama.game.paused = false;
            Nakama.timeToRestart = 0;
            this.restartGame();

            //Nakama.stateText.visible = false;
        }
    },

    checkVictory: function () {
        if (Nakama.numkey >= Nakama.key) {

            //this.loadMap(3);
            Nakama.stateText.text = "VICTORY";
            Nakama.stateText.visible = true;
            Nakama.audio = Nakama.game.add.audio('win');
            Nakama.audio.play();
            Nakama.audio.onStop.add(this.gamePaused,this);

            //Nakama.game.state.start('win');
        }
    },


    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },


}