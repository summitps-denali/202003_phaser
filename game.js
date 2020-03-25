var config = {
	type: Phaser.AUTO,
    width: 1500,
    height: 664,
    pixelArt: true,
	scene: [preload, menu, scene2],
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true,
			//debugShowBody: true,
            //debugShowStaticBody: true,
            //debugShowVelocity: true,
        }
    },
}

var group;
var buildings;
var units;
var select;
var game = new Phaser.Game(config);