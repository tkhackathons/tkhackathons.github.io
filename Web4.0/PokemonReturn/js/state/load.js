var loadState = {
    preload: function () {
        //Load Assets

        Nakama.game.load.image('collectionBackgroud', 'assets/collectionBackgroud.png');
        //  MAP
        //Nakama.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        Nakama.game.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        Nakama.game.load.tilemap('map3', 'assets/maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
        //Nakama.game.load.image('map_tile1', 'assets/maps/0.png');
        Nakama.game.load.image('22', 'assets/maps/22.png');
        Nakama.game.load.image('24', 'assets/maps/24.png');
        Nakama.game.load.image('25', 'assets/maps/25.png');
        Nakama.game.load.image('26', 'assets/maps/26.png');
        Nakama.game.load.image('27', 'assets/maps/27.png');
        Nakama.game.load.image('28', 'assets/maps/28.png');
        // MENU
        Nakama.game.load.image('menus', 'assets/menu.png');
        Nakama.game.load.image('backgroud_menu', 'assets/backgroud_menu.png');

        //  PLAYER
        Nakama.game.load.spritesheet('Aerodactyl', 'assets/Aerodactyl.png', 41, 32);
        Nakama.game.load.spritesheet('Aerodactyls', 'assets/Aerodactyls.png', 41, 32);
        Nakama.game.load.spritesheet('Kabutop', 'assets/Kabutop.png', 33, 32);
        Nakama.game.load.spritesheet('Moltres-67x61', 'assets/Moltres-67x61.png', 67, 61);
        Nakama.game.load.spritesheet('Pinser-37x30', 'assets/Pinser-37x30.png', 37, 30);
        Nakama.game.load.spritesheet('Cat', 'assets/Cat.png', 31, 32);
        Nakama.game.load.spritesheet('Hooh', 'assets/Hooh.png', 69, 64);
        Nakama.game.load.spritesheet('Mangmar', 'assets/Mangmar.png', 33, 30);
        Nakama.game.load.spritesheet('Mantina', 'assets/Mantina.png', 56, 54);
        Nakama.game.load.spritesheet('Nomal', 'assets/Nomal.png', 91, 69);
        Nakama.game.load.spritesheet('Snorlar', 'assets/Snorlar.png', 33, 34);
        Nakama.game.load.spritesheet('Tauros', 'assets/Tauros.png', 31, 33);

        // ITEMS
        Nakama.game.load.image('Money-14x16', 'assets/Money-14x16.png');
        Nakama.game.load.image('Banana', 'assets/Banana.png');
        Nakama.game.load.image('Tonic', 'assets/Tonic.png');
        Nakama.game.load.image('Rope', 'assets/Rope.png');
        Nakama.game.load.image('Key', 'assets/Key.png');
        Nakama.game.load.image('Diamond', 'assets/Diamond.png');
        Nakama.game.load.image('Pea', 'assets/Pea.png');

        //BULLET
        Nakama.game.load.image('BulletType1', 'assets/BulletType1.png');
        Nakama.game.load.image('BulletType2', 'assets/BulletType2.png');

        //Health Bar
        Nakama.game.load.image('Health', 'assets/Health.png');

        //AUDIO
        Nakama.game.load.audio('menu', 'assets/audio/menu.wav');
        Nakama.game.load.audio('back', 'assets/audio/back.mp3');
        Nakama.game.load.audio('attack', 'assets/audio/attack.wav');
        Nakama.game.load.audio('dead2', 'assets/audio/dead2.wav');
        Nakama.game.load.audio('fire', 'assets/audio/fire.wav');
        Nakama.game.load.audio('levelup', 'assets/audio/levelup.wav');
        Nakama.game.load.audio('pickkey', 'assets/audio/pickkey.wav');
        Nakama.game.load.audio('win', 'assets/audio/win.wav');
    },

    create: function () {
        Nakama.game.state.start('menu');
    }
}