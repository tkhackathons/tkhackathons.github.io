var Obstacle = {};
window.onload = function() {
    Obstacle.game = new Phaser.Game(640, 960, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }, false, false);
}

// preparations before Obstacle.game starts
var preload = function() {
    Obstacle.game.scale.minWidth = 320;
    Obstacle.game.scale.minHeight = 480;
    Obstacle.game.scale.maxWidth = 640;
    Obstacle.game.scale.maxHeight = 960;
    Obstacle.game.scale.pageAlignHorizontally = true;
    Obstacle.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Obstacle.game.time.advancedTiming = true;
    Obstacle.game.load.image('player', 'Assets/player.png');
    Obstacle.game.load.image('background', 'Assets/background.jpg');
    Obstacle.game.load.image('enemy1', 'Assets/enemy1.png');
    Obstacle.game.load.image('enemy2', 'Assets/enemy2.png');
    Obstacle.game.load.image('enemy3', 'Assets/enemy3.png');
    Obstacle.game.load.image('enemy4', 'Assets/enemy4.png');
    Obstacle.game.load.image('enemy5', 'Assets/enemy5.png');
    Obstacle.game.load.image('enemy6', 'Assets/enemy6.png');
    Obstacle.game.load.image('enemy7', 'Assets/enemy7.png');
    Obstacle.game.load.image('enemy8', 'Assets/enemy8.png');
    Obstacle.game.load.image('enemy9', 'Assets/enemy9.png');
    Obstacle.game.load.audio('audio', ['Assets/1.mp3', 'Assets/2.mp3']);


}

// initialize the Obstacle.game
var create = function() {
    music = Obstacle.game.add.audio('audio');
    music.play();
    var j = 1;
    Obstacle.game.add.tileSprite(0, 0, 640, 100000, 'background');
    Obstacle.game.world.setBounds(0, 0, 640, 100000);
    Obstacle.game.physics.startSystem(Phaser.Physics.ARCADE);
    Obstacle.playerGroup = Obstacle.game.add.physicsGroup();
    player = Obstacle.playerGroup.create(Obstacle.game.world.centerX, 99900, 'player');
    player.anchor.set(0.5);
    player.body.collideWorldBounds = true;
    Obstacle.game.physics.enable(player, Phaser.Physics.ARCADE);
    Obstacle.game.camera.follow(player);
    cursors = Obstacle.game.input.keyboard.createCursorKeys();
    Obstacle.enemyGroup = Obstacle.game.add.physicsGroup();
    Obstacle.enemies = [];

    while (player.alive && j < 100) {
        Obstacle.enemies.push(
            new EnemyController(Math.floor(Math.random() * 500 + 200), 99900 - 500 * j, 'enemy' + Math.floor(Math.random() * 9 + 1))
        );
        j++;
    }
}



// update Obstacle.game state each frame
var update = function() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    if (cursors.left.isDown) {
        // player.x -= 4;
        player.body.velocity.x = -500;
    } else if (cursors.right.isDown) {
        // player.x += 4;
        player.body.velocity.x = 500;
    }
    if (cursors.up.isDown) {
        // player.y -= 4;
        player.body.velocity.y = -500;
    } else if (cursors.down.isDown) {
        // player.y += 4;
        player.body.velocity.y = 500;
    }
    for (var i = 0; i < Obstacle.enemies.length; i++) {
        Obstacle.enemies[i].update();
    }
    Obstacle.game.physics.arcade.overlap(Obstacle.playerGroup, Obstacle.enemyGroup, gameOver);
}
var gameOver = function(playerSprite, enemySprite) {
    setTimeout(function() {
        window.location.reload();
    }, 1000)
    playerSprite.kill();
    enemySprite.kill();
}
// before camera render (mostly for debug)
var render = function() {
    Obstacle.game.debug.text("Score: " + ((99900 - (player.position.y - player.position.y % 1000)) / 100 - 9), 400, 70, "#fff", "30px Arial");
}
