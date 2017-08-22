class BulletControllerType2 extends BulletController {
    constructor(position, direction, configs) {
        super(
            position,
            "bullet-cannon2.png",
            direction,
            Clash.playerBulletGroup,
            {
                bulletSpeed: 800,
                nameMusic: 'shotrocket',
                radius: 20,
                transparency: false,
                bulletStrength: 10,
                angle: configs.angle
            }
        );
    }
}
