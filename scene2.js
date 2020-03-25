class scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //disable right click menu
        this.input.mouse.disableContextMenu();
        group = this.add.group({
            //key: 'bar',
            //frameQuantity: 32,
            //setXY: { x: 400, y: 300 },
            //setRotation: { value: 0, step: 0.1 },
            //setScale: { x: 2, y: 2}
        });
        group.createMultiple({ key: 'tiles', frame: [3], repeat: 229, setScale: { x: 2, y: 2 } }); //create tiles
        //Phaser.Actions.SetXY(group.getChildren(), 16, 24, 32);
        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 23,
            height: 10,
            cellWidth: 64,
            cellHeight: 64,
            x: 62,
            y: 36
        }); //order tiles
        // for (var i = 0; i < 229; i++) {
        //   var rngval = Phaser.Math.Between(1, 4);
        //   group.getFirstNth(i, true).setFrame(rngval); //populate with random tiles

        // }


        buildings = this.add.group();
        buildings.createMultiple({ key: 'buildings', frame: [0], repeat: 229, setScale: { x: 2, y: 2 } }); //create buildings
        Phaser.Actions.GridAlign(buildings.getChildren(), {
            width: 23,
            height: 10,
            cellWidth: 64,
            cellHeight: 64,
            x: 62,
            y: 36
        }); //order buildings

        buildings.getFirstNth(26, true).setFrame(5); //your castle
        buildings.getFirstNth(72, true).setFrame(7); //your barracks
        buildings.getFirstNth(24, true).setFrame(2); //your town
        buildings.getFirstNth(28, true).setFrame(10); //your barracks


        buildings.getFirstNth(105, true).setFrame(3); //neutral towns

        buildings.getFirstNth(205, true).setFrame(4); //enemy castle
        buildings.getFirstNth(159, true).setFrame(6); //enemy barracks
        buildings.getFirstNth(207, true).setFrame(1); //enemy castle
        buildings.getFirstNth(203, true).setFrame(9); //enemy barracks


        units = this.add.group();
        units.createMultiple({ key: 'infantry', frame: [0], repeat: 229, setScale: { x: 2, y: 2 } }); //create blank units
        Phaser.Actions.GridAlign(units.getChildren(), {
            width: 23,
            height: 10,
            cellWidth: 64,
            cellHeight: 64,
            x: 62,
            y: 36
        }); //order units


        units.getFirstNth(50, true).setFrame(2).setInteractive().flipX = true; //your unit
        units.getFirstNth(50, true).allegiance = "allied";

        units.getFirstNth(25, true).setFrame(2).setInteractive().flipX = true; //your unit
        units.getFirstNth(25, true).allegiance = "allied";


        units.getFirstNth(203, true).setFrame(1); //enemy unit

        select = this.add.group();
        select.createMultiple({ key: 'select', frame: [0], repeat: 229, setScale: { x: 2, y: 2 } }); //create blank units
        Phaser.Actions.GridAlign(select.getChildren(), {
            width: 23,
            height: 10,
            cellWidth: 64,
            cellHeight: 64,
            x: 62,
            y: 60
        }); //order units

        for (var i = 0; i < 229; i++) { //for every tile
            select.getFirstNth(i, true).setInteractive(); //make them clickable
            select.getFirstNth(i, true).on('pointerdown', function(pointer) { //when clicked

                if (pointer.rightButtonDown()) {//right click
                    if (this.frame = 2){
                        
                    }
                }
                else { //left click
                    for (var i = 0; i < 229; i++) { //reset all tiles
                        select.getFirstNth(i, true).selected = false;
                        select.getFirstNth(i, true).setFrame(0);
                    }
                    this.selected = true; //then select one tile
                }
            });

            //   select.getFirstNth(i, true).on('pointerout', function (pointer) {
            //     this.setFrame(0);
            // });

            // select.getFirstNth(i, true).on('pointerup', function (pointer) {

            //     this.setFrame(0);
            // });
        } //all 

        // select.getFirstNth(5, true).setFrame(2).flipX = true; //23
        // select.getFirstNth(28, true).setFrame(2).flipX = true; //23
        // select.getFirstNth(51, true).setFrame(2).flipX = true; //your unit
        // select.getFirstNth(74, true).setFrame(2).flipX = true; //your unit



    } //end

    update() {
        for (var i = 0; i < 229; i++) { //for every tile
            if (select.getFirstNth(i, true).selected == true) { //check if selected
                if (units.getFirstNth(i, true).allegiance == "allied") { //and if allied

                    select.getFirstNth(i, true).setFrame(1); //then highlight available movement
                    select.getFirstNth(i - 1, true).setFrame(2);
                    select.getFirstNth(i - 2, true).setFrame(2);
                    select.getFirstNth(i + 1, true).setFrame(2);
                    select.getFirstNth(i + 2, true).setFrame(2);
                    select.getFirstNth(i - 24, true).setFrame(2);
                    select.getFirstNth(i - 23, true).setFrame(2);
                    select.getFirstNth(i - 22, true).setFrame(2);
                    select.getFirstNth(i + 22, true).setFrame(2);
                    select.getFirstNth(i + 23, true).setFrame(2);
                    select.getFirstNth(i + 24, true).setFrame(2);
                    select.getFirstNth(i - 46, true).setFrame(2);
                    select.getFirstNth(i + 46, true).setFrame(2);
                    units.getFirstNth(i, true).setTint(0xff0000);
                    units.getFirstNth(i, true).selected = true; //select unit as well
                }
            }
            // else {
            //     select.getFirstNth(i, true).setFrame(0);
            //     units.getFirstNth(i, true).clearTint();
            // }
        } //test for units
    } //end
} //end
