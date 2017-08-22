class Player1Controller extends PlayerController{
    constructor(x, y, configs){
        super(x, y, `player1Walk`, Object.assign(
      configs, {
        speed    : 10,
        gravity : 2000
      }
    ));
    }
}