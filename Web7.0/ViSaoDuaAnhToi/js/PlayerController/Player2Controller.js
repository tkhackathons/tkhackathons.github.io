class Player2Controller extends PlayerController{
    constructor(x, y, configs){
        super(x, y, `player2Walk`, Object.assign(
      configs, {
        speed    : 10,
        gravity : 2000
      }
    ));
    }
}