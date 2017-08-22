var bootState = {
    create : function () {
        Nakama.game.scale.minWidth = 640;
        Nakama.game.scale.minHeight = 360;
        Nakama.game.scale.maxWidth = 800;
        Nakama.game.scale.maxHeight = 450;
        Nakama.game.scale.pageAlignHorizontally = true;
        Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        Nakama.game.time.advancedTiming = true;

        //SETUP

        Nakama.layer;
        Nakama.layer2;
        Nakama.player;
        Nakama.enemy;
        Nakama.items = [];
        Nakama.text_score;
        Nakama.banana;
        Nakama.stateText;
        Nakama.numkey = 0;
        Nakama.numEnemy = 10;
        Nakama.numBoss = 10;
        Nakama.curTime = 0;
        Nakama.bossTime = 10;
        Nakama.timeToRestart = 0;
        Nakama.pokemonName;
        Nakama.raycastLines;
        Nakama.collection = [];
        Nakama.collectionsprite = [];
        Nakama.collectionBackgroud = [];
        Nakama.map;
        Nakama.audio;
        Nakama.spritePokemon;

        Nakama.game.state.start('load');
    }
}