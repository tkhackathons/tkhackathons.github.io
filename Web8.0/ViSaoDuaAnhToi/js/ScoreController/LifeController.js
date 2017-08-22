class LifeController{
    constructor(x,y,spriteName,configs){
        this.sprite = Gamefefe.game.add.sprite(x,y,spriteName);
        this.sprite.fixedToCamera=true;
        this.configs=configs;
    }
    update(){
        if(Gamefefe.isDead){
            this.sprite.kill();

            Gamefefe.lives.shift();
            
            Gamefefe.timeDead++;
            if(Gamefefe.timeDead==3){
                Gamefefe.game.state.start('lost');
            }else{
                Gamefefe.players[0].setPosition(Gamefefe.properties.xPosition,0);
            }
            Gamefefe.isDead=false;
        }
    }
}