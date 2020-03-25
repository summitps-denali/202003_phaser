class menu extends Phaser.Scene{
	
	constructor() {
		super("titleScreen");
	}
	create() {
       // var titleButton = this.add.text(20, 20, "TITLE game", { font: "25px Arial", fill: "white" });

		var title = this.add.image(750, 325, 'TITLE');
		title.setScale(9, 9 )
        title.setInteractive({ useHandCursor: true });

        title.on('pointerdown', () => this.startGame());
	}
    startGame() {
        this.scene.switch('playGame');
    }
}

