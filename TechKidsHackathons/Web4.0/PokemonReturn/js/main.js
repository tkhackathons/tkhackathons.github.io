var Nakama = {
    coins: 0,
    score: 0,
    key: 2
}
Nakama.configs = {
    MOVE_SPEED: 100
},

window.onload = function () {
    Nakama.game = new Phaser.Game(800, 450, Phaser.AUTO, '');
    Nakama.game.state.add('boot',bootState);
    Nakama.game.state.add('load',loadState);
    Nakama.game.state.add('menu',menuState);
    Nakama.game.state.add('play',playState);
    //Nakama.game.state.add('win',winState);


    Nakama.game.state.start('boot');
}