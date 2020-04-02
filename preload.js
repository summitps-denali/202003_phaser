class preload extends Phaser.Scene{
	
	constructor() {
		super("bootGame");
	}
	preload(){
	    this.load.image('box', 'assets/box.png');
	    this.load.spritesheet('hpUI', 'assets/hpBar.png', {frameWidth: 32, frameHeight: 4});
	    this.load.image('TITLE', 'assets/mainMenu.png');
		this.load.spritesheet('infantry', 'assets/new/infantry.png', {frameWidth: 32, frameHeight: 48});
		this.load.spritesheet('tiles', 'assets/new/MWC tiles.png', {frameWidth: 32, frameHeight: 48});
		this.load.spritesheet('buildings', 'assets/new/buildings.png', {frameWidth: 32, frameHeight: 48});
		this.load.spritesheet('select', 'assets/new/select.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('endTurn', 'assets/new/endTurn.png', {frameWidth: 64, frameHeight: 32});
		this.load.spritesheet('events', 'assets/new/events.png', {frameWidth: 100, frameHeight: 52});
		this.load.spritesheet('resources', 'assets/new/resources.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('ending', 'assets/new/ending.png', {frameWidth: 96, frameHeight: 48});

	}
	create() {
		this.add.text(20, 20, "Loading game", {font: "25px Arial", fill: "white"});
    	this.scene.start("titleScreen");
	}
}

