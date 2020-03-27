var config = {
	type: Phaser.AUTO,
    width: 1500,
    height: 740,
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
var selectedUnit = 0; //number
var endButton;
var resourcesIcon;
var resourcesText; //food
var resourcesText2; //gold
var resources;
var food = 100;
var gold = 100;
var soldierText;
var archerText;
var knightText;
var crusaderText;
var purchasing = null; //null when not buying, options are units/buildings
var buildingPurchasedID = null; //last id
var reminderText;
var reminderText2;
var townText;
var garrisonText;
var barracksText;
var healthText;
var debugText;
var reputation = 0;
var spacebar;
var eventBG;
var eventSplash;
var game = new Phaser.Game(config);