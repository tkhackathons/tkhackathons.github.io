var bootState= {
  preload: function(){
  	if (localStorage.getItem('highScore')<0) localStorage.getItem('highScore')=0;
    // CSW.physics.startSystem(Phaser.Physics.ARCADE);
    console.log("boot.js");

    CSW.state.start('load');
  }
}
