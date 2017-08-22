
class Player3Controller extends PlayerController{
    constructor(x, y, configs){
        super(x, y, `player3Walk`, Object.assign(
      configs, {
        speed    : 10,
        gravity : 2000
      }
    ));
    }
}