class preload extends Phaser.Scene{
	
	constructor() {
		super("bootGame");
	}
	preload(){
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('box', 'assets/box.png');
	    this.load.spritesheet('missile', 'assets/missile.png', {frameWidth: 150, frameHeight: 30});
	    this.load.image('bullet', 'assets/bullet.png');
	    this.load.spritesheet('fire', 'assets/effects/fire.png', {frameWidth: 100, frameHeight: 100});
	    this.load.spritesheet('weaponHit', 'assets/effects/weaponHit.png', {frameWidth: 100, frameHeight: 100});
	    this.load.spritesheet('fireball', 'assets/effects/fireball.png', {frameWidth: 68, frameHeight: 9});
	    this.load.spritesheet('missileExplosion', 'assets/effects/missileExplosion.png', {frameWidth: 100, frameHeight: 100});
	    this.load.image('enemyMech1', 'assets/enemyMech1.png');
	    this.load.spritesheet('minigun', 'assets/minigun.png', {frameWidth: 50, frameHeight: 51});
	    
	    this.load.spritesheet('missileLauncher', 'assets/missileLauncher.png', {frameWidth: 31, frameHeight: 32});
	    
	    this.load.image('shadow', 'assets/shadow.png');
	    this.load.spritesheet('player', 'assets/playerSprite.png', { frameWidth: 34, frameHeight: 49 });
	    this.load.spritesheet('playerMech1', 'assets/playerMech1.png', { frameWidth: 130, frameHeight: 130 });
	    //
	    this.load.spritesheet('rocketCounter', 'assets/UI/rocketUI.png', { frameWidth: 32, frameHeight: 32 });
	    this.load.spritesheet('bulletCounter', 'assets/UI/bulletCounter.png', { frameWidth: 32, frameHeight: 32 });
	    this.load.spritesheet('coolantActive', 'assets/UI/coolantActive.png', { frameWidth: 32, frameHeight: 32 });
	    this.load.spritesheet('repairActive', 'assets/UI/repairActive.png', { frameWidth: 32, frameHeight: 32 });
	    this.load.spritesheet('swordActive', 'assets/UI/swordActive.png', { frameWidth: 32, frameHeight: 32 });
	    this.load.spritesheet('moduleUI', 'assets/UI/set22.png', { frameWidth: 22, frameHeight: 22 });
	    this.load.spritesheet('hpUI', 'assets/hpBar.png', {frameWidth: 32, frameHeight: 4});
	    this.load.image('TITLE', 'assets/mainMenu.png');
	    this.load.image('bg1', 'assets/newParallax/bg1.png');
	    this.load.image('bg2', 'assets/newParallax/bg2.png');
	    this.load.image('bg3', 'assets/newParallax/bg3.png');
	    this.load.image('bg4', 'assets/newParallax/bg4.png');
	    this.load.image('bg5', 'assets/newParallax/bg5.png');
	    this.load.image('bg6', 'assets/newParallax/bg6.png');
	    this.load.image('crosshair', 'assets/crosshair.png');
		this.load.audio('missileFire', 'assets/sounds/missileFire.wav');
		this.load.audio('explosion', 'assets/sounds/explosion.wav');
		this.load.audio('emptyClip', 'assets/sounds/emptyClip.wav');
		this.load.audio('oneShot', 'assets/sounds/oneShot.wav');
		this.load.audio('gunCock', 'assets/sounds/gunCock.wav');
		this.load.spritesheet('infantry', 'assets/new/infantry.png', {frameWidth: 32, frameHeight: 48});
		this.load.spritesheet('tiles', 'assets/new/MWC tiles.png', {frameWidth: 32, frameHeight: 48});
		this.load.spritesheet('buildings', 'assets/new/buildings.png', {frameWidth: 32, frameHeight: 48});
		this.load.spritesheet('select', 'assets/new/select.png', {frameWidth: 32, frameHeight: 32});

	}
	create() {
		this.add.text(20, 20, "Loading game", {font: "25px Arial", fill: "white"});
		
		this.anims.create({
        key: 'fireAnim',
        frames: this.anims.generateFrameNumbers('missile', { start: 0, end: 60 }),
        frameRate: 1000,
        repeat: -1
    });
		this.anims.create({
        key: 'missileExplosionAnim',
        frames: this.anims.generateFrameNumbers('missileExplosion', { start: 0, end: 64 }),
        frameRate: 60,
        repeat: 0
    });
    
		this.anims.create({
        key: 'weaponHitAnim',
        frames: this.anims.generateFrameNumbers('weaponHit', { start: 0, end: 29 }),
        frameRate: 120,
        repeat: 0
    });
    	this.scene.start("titleScreen");
	}
}

