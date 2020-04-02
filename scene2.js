/*  global Phaser  */
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
        for (var i = 0; i < 229; i++) {
            buildings.getFirstNth(i, true).allegiance = "null"; //whole lotta empty

        }

        buildings.getFirstNth(26, true).setFrame(5).allegiance = "allied"; //your castle
        buildings.getFirstNth(26, true).type = "capital"; //your castle
        buildings.getFirstNth(26, true).turnTaken = false; //your castle
        buildings.getFirstNth(26, true).hp = 4; //set hp
        buildings.getFirstNth(72, true).setFrame(7).allegiance = "allied"; //your garrison
        buildings.getFirstNth(72, true).type = "garrison"; //your garrison
        buildings.getFirstNth(72, true).hp = 3; //set hp
        buildings.getFirstNth(24, true).setFrame(2).allegiance = "allied"; //your town
        buildings.getFirstNth(24, true).type = "town"; //your town
        buildings.getFirstNth(24, true).hp = 2; //set hp
        buildings.getFirstNth(28, true).setFrame(10).allegiance = "allied"; //your barracks
        buildings.getFirstNth(28, true).turnTaken = false; //your barracks
        buildings.getFirstNth(28, true).type = "barracks"; //your barracks
        buildings.getFirstNth(28, true).hp = 2; //set hp


        buildings.getFirstNth(105, true).setFrame(3).allegiance = "neutral"; //neutral towns
        buildings.getFirstNth(105, true).hp = 2; //set hp

        buildings.getFirstNth(205, true).setFrame(4).allegiance = "enemy"; //enemy castle
        buildings.getFirstNth(205, true).hp = 4; //set hp
        buildings.getFirstNth(159, true).setFrame(6).allegiance = "enemy"; //enemy garrison
        buildings.getFirstNth(159, true).hp = 3; //set hp
        buildings.getFirstNth(207, true).setFrame(1).allegiance = "enemy"; //enemy town
        buildings.getFirstNth(207, true).hp = 2; //set hp
        buildings.getFirstNth(203, true).setFrame(9).allegiance = "enemy"; //enemy barracks
        buildings.getFirstNth(203, true).hp = 2; //set hp

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
        for (var i = 0; i < 229; i++) {
            units.getFirstNth(i, true).allegiance = "null"; //whole lotta empty

        }
        units.getFirstNth(51, true).setFrame(2).flipX = true; //your unit
        units.getFirstNth(51, true).allegiance = "allied";
        units.getFirstNth(51, true).turnTaken = false;
        units.getFirstNth(51, true).type = "soldier";
        units.getFirstNth(51, true).hp = 2;

        units.getFirstNth(180, true).setFrame(1); //enemy unit
        units.getFirstNth(180, true).allegiance = "enemy";
        units.getFirstNth(180, true).type = "soldier";
        units.getFirstNth(180, true).hp = 2;

        select = this.add.group();
        select.createMultiple({ key: 'select', frame: [0], repeat: 230, setScale: { x: 2, y: 2 } }); //create blank units
        Phaser.Actions.GridAlign(select.getChildren(), {
            width: 23,
            height: 11,
            cellWidth: 64,
            cellHeight: 64,
            x: 62,
            y: 60
        }); //order units
        //debugText = this.add.text(400, 500, 'n/a', { fontSize: '14px', fontFamily: 'courier' }); //town
        for (var i = 0; i < 229; i++) { //crate every selectable tile
            select.getFirstNth(i, true).setInteractive(); //make them clickable
            //unit.getFirstNth(i, true).id = i;//assign unit tiles ids
            select.getFirstNth(i, true).name = i; //assign select tiles ids
            select.getFirstNth(i, true).highlighted = false; //assign select tiles ids


            select.getFirstNth(i, true).on('pointerdown', function(pointer) { //when clicked


                if (pointer.rightButtonDown()) { //right click for movement
                    if (purchasing == null) { //only if we ain't buying, can we move. also make sure that we're rightclicking on something green and empty, unless it's a garrison
                        if (this.highlighted == true && units.getFirstNth(selectedUnit, true).turnTaken == false && units.getFirstNth(this.name, true).allegiance == "null" && buildings.getFirstNth(this.name, true).allegiance == "null") {
                            units.getFirstNth(selectedUnit, true).setFrame(0).allegiance = "null"; //delete unit
                            units.getFirstNth(this.name, true).setFrame(2).allegiance = "allied"; //teleport unit
                            units.getFirstNth(this.name, true).hp = units.getFirstNth(selectedUnit, true).hp; //preserve hp
                            units.getFirstNth(selectedUnit, true).hp = null; //delete old hp
                            units.getFirstNth(this.name, true).setFrame(2).turnTaken = true; //exhaust unit
                            if (units.getFirstNth(selectedUnit, true).flipX == true) { //flip x if you gotta
                                units.getFirstNth(this.name, true).flipX = true;
                            }
                            if (units.getFirstNth(selectedUnit, true).type == "soldier") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(2).type = "soldier";
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "archer") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(4).type = "archer";
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "knight") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(6).type = "knight";
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "crusader") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(8).type = "crusader";
                            }
                            for (var i = 0; i < 229; i++) { //reset all tiles
                                select.getFirstNth(i, true).selected = false;
                                select.getFirstNth(i, true).setFrame(0);
                                units.getFirstNth(i, true).clearTint();
                                units.getFirstNth(i, true).selected = false;
                            }
                        }
                        else if (this.highlighted == true && units.getFirstNth(selectedUnit, true).turnTaken == false && units.getFirstNth(this.name, true).allegiance == "null" && buildings.getFirstNth(this.name, true).type == "garrison") {
                            units.getFirstNth(selectedUnit, true).setFrame(0).allegiance = "null"; //delete unit
                            units.getFirstNth(this.name, true).setFrame(2).allegiance = "allied"; //teleport unit
                            units.getFirstNth(this.name, true).hp = units.getFirstNth(selectedUnit, true).hp; //preserve hp
                            units.getFirstNth(selectedUnit, true).hp = null; //delete old hp
                            units.getFirstNth(this.name, true).setFrame(2).turnTaken = true; //exhaust unit
                            if (units.getFirstNth(selectedUnit, true).flipX == true) { //flip x if you gotta
                                units.getFirstNth(this.name, true).flipX = true;
                            }
                            if (units.getFirstNth(selectedUnit, true).type == "soldier") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(2).type = "soldier";
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "archer") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(4).type = "archer";
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "knight") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(6).type = "knight";
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "crusader") { //preserve type
                                units.getFirstNth(this.name, true).setFrame(8).type = "crusader";
                            }
                            for (var i = 0; i < 229; i++) { //reset all tiles
                                select.getFirstNth(i, true).selected = false;
                                select.getFirstNth(i, true).setFrame(0);
                                units.getFirstNth(i, true).clearTint();
                                units.getFirstNth(i, true).selected = false;
                            }
                        }
                        else if (this.highlighted == true && units.getFirstNth(this.name, true).allegiance == "enemy") { //if attacking an enemy
                            if (units.getFirstNth(selectedUnit, true).type == "soldier") { //determine damage
                                units.getFirstNth(this.name, true).hp -= 1; //1 damage to enemy
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "archer") {
                                units.getFirstNth(this.name, true).hp -= 1; //1 damage to enemy
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "knight") {
                                units.getFirstNth(this.name, true).hp -= 1; //1 damage to enemy
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "crusader") {
                                units.getFirstNth(this.name, true).hp -= 3; //1 damage to enemy
                            }
                            if (units.getFirstNth(this.name, true).hp <= 0) { //if no hp left
                                units.getFirstNth(this.name, true).setFrame(0); // die
                                units.getFirstNth(this.name, true).hp = null; //delete old hp
                                units.getFirstNth(this.name, true).allegiance = "null"; //delete old hp
                            }
                            units.getFirstNth(selectedUnit, true).turnTaken = true; //exhaust unit
                            for (var i = 0; i < 229; i++) { //reset all tiles
                                select.getFirstNth(i, true).selected = false;
                                select.getFirstNth(i, true).setFrame(0);
                                units.getFirstNth(i, true).clearTint();
                                units.getFirstNth(i, true).selected = false;
                            }
                        }
                        else if (this.highlighted == true && buildings.getFirstNth(this.name, true).allegiance == "enemy") { //if attacking an enemy
                            if (units.getFirstNth(selectedUnit, true).type == "soldier") { //determine damage
                                buildings.getFirstNth(this.name, true).hp -= 1; //1 damage to enemy
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "archer") {
                                buildings.getFirstNth(this.name, true).hp -= 1; //1 damage to enemy
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "knight") {
                                buildings.getFirstNth(this.name, true).hp -= 1; //1 damage to enemy
                            }
                            else if (units.getFirstNth(selectedUnit, true).type == "crusader") {
                                buildings.getFirstNth(this.name, true).hp -= 3; //1 damage to enemy
                            }
                            if (buildings.getFirstNth(this.name, true).hp <= 0) { //if no hp left
                                buildings.getFirstNth(this.name, true).setFrame(0); // die
                                buildings.getFirstNth(this.name, true).hp = null; //delete old hp
                                buildings.getFirstNth(this.name, true).allegiance = "null"; //delete old hp
                                if (buildings.getFirstNth(this.name, true).type = "capital") {
                                    //end the game
                                    endGameSplash.setVisible(true);
                                    eventBG.setVisible(true)
                                    if (food < 0){
                                        reputation += food;
                                    }
                                    if (gold < 0) {
                                        reputation += gold;
                                    }
                                    if (population < 0) {
                                        reputation += population;
                                    }
                                    if (reputation > 100){
                                        endGameSplash.setFrame(1);
                                        endingText.setText("PHILOSOPHER KING").setVisible(true);
                                        endingText2.setText("Your rule will be immortalized into legend.").setVisible(true);
                                    }
                                    else {
                                        endGameSplash.setFrame(2);
                                        endingText.setText("TYRANT").setVisible(true);
                                        endingText2.setText("Your brutality will never be forgotten.").setVisible(true);
                                    }
                                }
                            }
                            units.getFirstNth(selectedUnit, true).turnTaken = true; //exhaust unit
                            for (var i = 0; i < 229; i++) { //reset all tiles
                                select.getFirstNth(i, true).selected = false;
                                select.getFirstNth(i, true).setFrame(0);
                                units.getFirstNth(i, true).clearTint();
                                units.getFirstNth(i, true).selected = false;
                            }
                        }
                    }
                }
                else { //left click
                    if (buildings.getFirstNth(this.name, true).type == "barracks") { //if clicking on a barracks, set purchasing to buy mode
                        purchasing = "buying"
                        for (var i = 0; i < 229; i++) { //reset all tile selections
                            select.getFirstNth(i, true).selected = false;
                            select.getFirstNth(i, true).highlighted = false;
                            select.getFirstNth(i, true).setFrame(0);
                            units.getFirstNth(i, true).clearTint();
                            units.getFirstNth(i, true).selected = false;
                            buildings.getFirstNth(i, true).clearTint();
                            buildings.getFirstNth(i, true).selected = false;
                        }
                        this.selected = true; //then select the barracks
                    }
                    if (buildings.getFirstNth(this.name, true).type == "capital") { //if clicking on a barracks, set purchasing to buy mode
                        purchasing = "buying"
                        for (var i = 0; i < 229; i++) { //reset all tile selections
                            select.getFirstNth(i, true).selected = false;
                            select.getFirstNth(i, true).highlighted = false;
                            select.getFirstNth(i, true).setFrame(0);
                            units.getFirstNth(i, true).clearTint();
                            units.getFirstNth(i, true).selected = false;
                            buildings.getFirstNth(i, true).clearTint();
                            buildings.getFirstNth(i, true).selected = false;
                        }
                        this.selected = true; //then select the barracks
                    }
                    else if (purchasing == null) { //if not clicking on barracks and purchasing is null
                        for (var i = 0; i < 229; i++) { //reset all tile selections
                            select.getFirstNth(i, true).selected = false;
                            select.getFirstNth(i, true).highlighted = false;
                            select.getFirstNth(i, true).setFrame(0);
                            units.getFirstNth(i, true).clearTint();
                            units.getFirstNth(i, true).selected = false;
                            buildings.getFirstNth(i, true).clearTint();
                            buildings.getFirstNth(i, true).selected = false;
                        }
                        this.selected = true; //then select one tile
                    }
                    else if (this.highlighted == true) { //if LEFTclicking on a highlighted tile and purchasing is NOT null (you must be buying, right?)
                        if (purchasing == "soldier") { //if buying a soldier
                            units.getFirstNth(this.name, true).setFrame(2).allegiance = "allied"; //spawn soldier
                            units.getFirstNth(this.name, true).type = "soldier";
                            units.getFirstNth(this.name, true).hp = 2;
                            food -= 10;
                        }
                        else if (purchasing == "archer") { //if buying a soldier
                            units.getFirstNth(this.name, true).setFrame(4).allegiance = "allied"; //spawn soldier

                            units.getFirstNth(this.name, true).type = "archer";
                            units.getFirstNth(this.name, true).hp = 2;
                            food -= 20;
                        }
                        else if (purchasing == "knight") { //if buying a soldier
                            units.getFirstNth(this.name, true).setFrame(6).allegiance = "allied"; //spawn soldier

                            units.getFirstNth(this.name, true).type = "knight";
                            units.getFirstNth(this.name, true).hp = 3;
                            food -= 40;
                        }
                        else if (purchasing == "crusader") { //if buying a soldier
                            units.getFirstNth(this.name, true).setFrame(8).allegiance = "allied"; //spawn soldier

                            units.getFirstNth(this.name, true).type = "crusader";
                            units.getFirstNth(this.name, true).hp = 5;
                            food -= 50;
                        }
                        if (purchasing != "buying") { //only if you've chosen an option
                            units.getFirstNth(this.name, true).turnTaken = true; //exhaust the unit that you spawned
                            buildings.getFirstNth(buildingPurchasedID, true).turnTaken = true; //exhaust building
                            units.getFirstNth(this.name, true).flipX = true; //flipx
                            purchasing = null; //set buying to null
                        }
                        for (var i = 0; i < 229; i++) { //reset all tile selections regardless
                            select.getFirstNth(i, true).selected = false;
                            select.getFirstNth(i, true).highlighted = false;
                            select.getFirstNth(i, true).setFrame(0);
                            units.getFirstNth(i, true).clearTint();
                            units.getFirstNth(i, true).selected = false;
                            buildings.getFirstNth(i, true).clearTint();
                            buildings.getFirstNth(i, true).selected = false;
                        }
                        this.selected = true; //then select one tile, if possible
                    }
                    else { //if none of these are true, just clear it all, man
                        for (var i = 0; i < 229; i++) { //reset all tile selections
                            select.getFirstNth(i, true).selected = false;
                            select.getFirstNth(i, true).highlighted = false;
                            select.getFirstNth(i, true).setFrame(0);
                            units.getFirstNth(i, true).clearTint();
                            units.getFirstNth(i, true).selected = false;
                            buildings.getFirstNth(i, true).clearTint();
                            buildings.getFirstNth(i, true).selected = false;
                        }
                        this.selected = true; //then select one tile
                        purchasing = null; //we ain't buyin
                    }
                }
            });
        } //all

        soldierText = this.add.text(400, 660, 'soldier (10 food)', { fontSize: '14px', fontFamily: 'courier' }); //gold
        archerText = this.add.text(400, 680, 'archer (20 food)', { fontSize: '14px', fontFamily: 'courier' }); //gold
        knightText = this.add.text(400, 700, 'knight (40 food)', { fontSize: '14px', fontFamily: 'courier' }); //gold
        crusaderText = this.add.text(400, 720, 'crusader (50 food)', { fontSize: '14px', fontFamily: 'courier' }); //gold
        reminderText = this.add.text(900, 680, 'left click on a highlighted square to buy a unit', { fontSize: '18px', fontFamily: 'courier' });
        reminderText2 = this.add.text(900, 680, 'right click on a highlighted square to move', { fontSize: '18px', fontFamily: 'courier' });

        soldierText.setVisible(false).setInteractive().on('pointerdown', function(pointer) {
            purchasing = "soldier";
        });
        archerText.setVisible(false).setInteractive().on('pointerdown', function(pointer) {
            purchasing = "archer";
        });
        knightText.setVisible(false).setInteractive().on('pointerdown', function(pointer) {
            purchasing = "knight";
        });
        crusaderText.setVisible(false).setInteractive().on('pointerdown', function(pointer) {
            purchasing = "crusader";
        });

        //building buy
        townText = this.add.text(400, 660, 'town (20 gold)', { fontSize: '14px', fontFamily: 'courier' }); //town
        garrisonText = this.add.text(400, 680, 'garrison (10 gold)', { fontSize: '14px', fontFamily: 'courier' }); //garrison
        barracksText = this.add.text(400, 700, 'barracks (30 gold)', { fontSize: '14px', fontFamily: 'courier' }); //barracks

        townText.setVisible(false).setInteractive().on('pointerdown', function(pointer) {
            //purchasing = "archer";
        });
        garrisonText.setVisible(false).setInteractive().on('pointerdown', function(pointer) {
            //purchasing = "knight";
        });
        barracksText.setVisible(false).setInteractive().on('pointerdown', function(pointer) {
            //purchasing = "crusader";
        });

        endButton = this.add.image(750, 700, 'endTurn').setScale(4, 4).setInteractive().on('pointerdown', function(pointer) {
            endButton.setFrame(2);


            var rng = Phaser.Math.Between(0, 9);
            if (rng > 7) { //do event
                endButton.disableInteractive();
                eventBG.setVisible(true);
                eventSplash.setVisible(true);
                eventText.setVisible(true);
                eventOption1.setVisible(true);
                eventOption2.setVisible(true);
                eventOption3.setVisible(true);
                eventOption4.setVisible(true);
                if (eventNum == 0) {
                    eventText.setText(pandemicText[0]);
                    eventOption1.setText(pandemicText[1]);
                    eventOption2.setText(pandemicText[2]);
                    eventOption3.setText(pandemicText[3]);
                    eventOption4.setText(pandemicText[4]);
                }
                else if (eventNum == 1) {
                    eventSplash.setFrame(1);
                    eventText.setText(innovationText[0]);
                    eventOption1.setText(innovationText[1]);
                    eventOption2.setText(innovationText[2]);
                    eventOption3.setText(innovationText[3]);
                    eventOption4.setText(innovationText[4]);
                }
                else if (eventNum == 2) {
                    eventSplash.setFrame(2);
                    eventText.setText(mercenaryText[0]);
                    eventOption1.setText(mercenaryText[1]);
                    eventOption2.setText(mercenaryText[2]);
                    eventOption3.setText(mercenaryText[3]);
                    eventOption4.setText(mercenaryText[4]);
                }
                else if (eventNum == 3) {
                    eventSplash.setFrame(3);
                    eventText.setText(ablazeText[0]);
                    eventOption1.setText(ablazeText[1]);
                    eventOption2.setText(ablazeText[2]);
                    eventOption3.setText(ablazeText[3]);
                    eventOption4.setText(ablazeText[4]);
                }
                else if (eventNum == 4) {
                    eventSplash.setFrame(4);
                    eventText.setText(riotText[0]);
                    eventOption1.setText(riotText[1]);
                    eventOption2.setText(riotText[2]);
                    eventOption3.setText(riotText[3]);
                    eventOption4.setText(riotText[4]);
                }
                else if (eventNum == 5) {
                    eventSplash.setFrame(5);
                    eventText.setText(starvationText[0]);
                    eventOption1.setText(starvationText[1]);
                    eventOption2.setText(starvationText[2]);
                    eventOption3.setText(starvationText[3]);
                    eventOption4.setText(starvationText[4]);
                }
                else if (eventNum == 6) {
                    eventSplash.setFrame(6);
                    eventText.setText(recruitsText[0]);
                    eventOption1.setText(recruitsText[1]);
                    eventOption2.setText(recruitsText[2]);
                    eventOption3.setText(recruitsText[3]);
                    eventOption4.setText(recruitsText[4]);
                }
                else if (eventNum == 7) {
                    eventSplash.setFrame(7);
                    eventText.setText(surrenderText[0]);
                    eventOption1.setText(surrenderText[1]);
                    eventOption2.setText(surrenderText[2]);
                    eventOption3.setText(surrenderText[3]);
                    eventOption4.setText(surrenderText[4]);
                }
                else {

                    eventBG.setVisible(false);
                    eventSplash.setVisible(false);
                    eventText.setVisible(false);
                    eventOption1.setVisible(false);
                    eventOption2.setVisible(false);
                    eventOption3.setVisible(false);
                    eventOption4.setVisible(false);
                    endButton.setInteractive();

                }

            }
            for (var i = 0; i < 229; i++) {
                units.getFirstNth(i, true).turnTaken = false; //reset turn exhaustion
                buildings.getFirstNth(i, true).turnTaken = false; //reset turn exhaustion
                if (buildings.getFirstNth(i, true).type == "town") {
                    food += 5;
                    population += 1;
                }
            }

            gold += 5;
            reputation += 1;
        });
        endButton.on('pointerover', function(pointer) {
            endButton.setFrame(1)
        });
        endButton.on('pointerout', function(pointer) {
            endButton.setFrame(0)
        });

        healthText = this.add.text(550, 680, 'HP', { fontSize: '24px', fontFamily: 'courier' });

        eventBG = this.add.image(0, 0, 'box').setOrigin(0, 0).setScale(1500, 750).setVisible(false);
        eventSplash = this.add.image(750, 0, 'events').setFrame(0).setScale(8, 8).setOrigin(0.5, 0).setVisible(false);
        eventText = this.add.text(750, 450, pandemicText[0], { fontSize: '24px', fontFamily: 'courier' }).setOrigin(0.5, 0).setVisible(false);
        eventConfirm = this.add.text(750, 540, "confirm", { fontSize: '24px', fontFamily: 'courier' }).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', function(pointer) {
            eventBG.setVisible(false);
            eventSplash.setVisible(false);
            eventText.setVisible(false);
            eventConfirm.setVisible(false);
            endButton.setInteractive();

            eventNum += 1; //next event set
        }).setVisible(false);
        eventOption1 = this.add.text(750, 540, pandemicText[1], { fontSize: '24px', fontFamily: 'courier' }).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', function(pointer) {
            eventOption1.setVisible(false);
            eventOption2.setVisible(false);
            eventOption3.setVisible(false);
            eventOption4.setVisible(false);
            eventConfirm.setVisible(true);

            if (eventNum == 0) { //quarantine
                eventText.setText(pandemicResponse[0]);
                food -= 30;
                population -= 20;
            }
            else if (eventNum == 1) { //weaponize
                eventText.setText(innovationResponse[0]);
                units.getFirstNth(1, true).setFrame(8).flipX = true; //your unit
                units.getFirstNth(1, true).allegiance = "allied";
                units.getFirstNth(1, true).turnTaken = false;
                units.getFirstNth(1, true).type = "crusader";
                units.getFirstNth(1, true).hp = 5;
                reputation += 5;
            }
            else if (eventNum == 2) { //disperse
                eventText.setText(mercenaryResponse[0]);
                reputation += 5;
            }
            else if (eventNum == 3) { //give raiders food
                eventText.setText(ablazeResponse[0]);
                food = (food / 2) - 10;
                reputation -= 20;
            }
            else if (eventNum == 4) { //enact martial law
                eventText.setText(riotResponse[0]);
                reputation = reputation / 2;
            }
            else if (eventNum == 5) { //cut down on rations
                eventText.setText(starvationResponse[0]);
                reputation -= 5;
                food += 10;
            }
            else if (eventNum == 6) { //accept younger soldiers

                eventText.setText(recruitsResponse[0]);
                units.getFirstNth(2, true).setFrame(2).flipX = true; //your unit
                units.getFirstNth(2, true).allegiance = "allied";
                units.getFirstNth(2, true).turnTaken = false;
                units.getFirstNth(2, true).type = "soldier";
                units.getFirstNth(2, true).hp = 2;
                units.getFirstNth(3, true).setFrame(4).flipX = true; //your unit
                units.getFirstNth(3, true).allegiance = "allied";
                units.getFirstNth(3, true).turnTaken = false;
                units.getFirstNth(3, true).type = "archer";
                units.getFirstNth(3, true).hp = 2;
            }
            else if (eventNum == 7) { //
                eventText.setText(surrenderResponse[0]);
                reputation -= 10;
                gold += 30;
            }
        }).setVisible(false);
        eventOption2 = this.add.text(750, 570, pandemicText[2], { fontSize: '24px', fontFamily: 'courier' }).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', function(pointer) {
            eventOption1.setVisible(false);
            eventOption2.setVisible(false);
            eventOption3.setVisible(false);
            eventOption4.setVisible(false);
            eventConfirm.setVisible(true);
            if (eventNum == 0) {
                eventText.setText(pandemicResponse[1]); //kill
                reputation -= 40;
                population -= 20;
            }
            else if (eventNum == 1) { //manufacturing
                eventText.setText(innovationResponse[1]);
                gold += 40;
                food += 20;
            }
            else if (eventNum == 2) { //hire them as soldiers
                eventText.setText(mercenaryResponse[1]);
                gold -= 20;
                units.getFirstNth(49, true).setFrame(6).flipX = true; //your unit
                units.getFirstNth(49, true).allegiance = "allied";
                units.getFirstNth(49, true).turnTaken = false;
                units.getFirstNth(49, true).type = "knight";
                units.getFirstNth(49, true).hp = 3;

            }
            else if (eventNum == 3) { //give them gold
                eventText.setText(ablazeResponse[1]);
                gold = (gold / 2) - 10;
                reputation -= 20;
            }
            else if (eventNum == 4) { //suppress info
                eventText.setText(riotResponse[1]);
                gold -= 20;
                reputation -= 1;
            }
            else if (eventNum == 5) { //fight on
                eventText.setText(starvationResponse[1]);
                reputation -= 5;
                population -= 20;
                food -= 10;
            }
            else if (eventNum == 6) { //propaganda
                eventText.setText(recruitsResponse[1]);
                reputation += 15;
            }
            else if (eventNum == 7) { //mercy
                eventText.setText(surrenderResponse[1]);
                reputation += 20;
                food += 10;
                gold += 10;
            }
        }).setVisible(false);
        eventOption3 = this.add.text(750, 600, pandemicText[3], { fontSize: '24px', fontFamily: 'courier' }).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', function(pointer) {
            eventOption1.setVisible(false);
            eventOption2.setVisible(false);
            eventOption3.setVisible(false);
            eventOption4.setVisible(false);
            eventConfirm.setVisible(true);
            if (eventNum == 0) {
                eventText.setText(pandemicResponse[2]); //quarantine everybody
                food -= 30;
                gold -= 30;
                population -= 5;
            }
            else if (eventNum == 1) { //propaganda
                eventText.setText(innovationResponse[2]);
                reputation += 20;
            }
            else if (eventNum == 2) { //party with them
                eventText.setText(mercenaryResponse[2]);
                gold -= 20;
                food -= 10;
                reputation += 10;
            }
            else if (eventNum == 3) { //give them PEOPLE
                eventText.setText(ablazeResponse[2]);
                population = population / 2;
                reputation -= 60;
            }
            else if (eventNum == 4) { //public forums
                eventText.setText(riotResponse[2]);
                reputation += 15;
                gold -= 20;
                food -= 20;
            }
            else if (eventNum == 5) { //pillage
                eventText.setText(starvationResponse[2]);
                reputation -= 40;
                food += 50;
            }
            else if (eventNum == 6) { //manual labor
                eventText.setText(recruitsResponse[2]);
                reputation += 5;
                gold += 10;
                population += 10;
            }
            else if (eventNum == 7) { //recruit
                eventText.setText(surrenderResponse[2]);
                reputation += 5;
                food -= 10;
                gold -= 10;
                units.getFirstNth(50, true).setFrame(6).flipX = true; //your unit
                units.getFirstNth(50, true).allegiance = "allied";
                units.getFirstNth(50, true).turnTaken = false;
                units.getFirstNth(50, true).type = "knight";
                units.getFirstNth(50, true).hp = 3;

            }
        }).setVisible(false);
        eventOption4 = this.add.text(750, 630, pandemicText[4], { fontSize: '24px', fontFamily: 'courier' }).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', function(pointer) {
            eventOption1.setVisible(false);
            eventOption2.setVisible(false);
            eventOption3.setVisible(false);
            eventOption4.setVisible(false);
            eventConfirm.setVisible(true);
            if (eventNum == 0) {
                eventText.setText(pandemicResponse[3]); //do nothing

                reputation -= 40;
                population -= 40;
                food -= 20;
                gold -= 20;
            }
            else if (eventNum == 1) { //destroy it ! 
                eventText.setText(innovationResponse[3]);
                gold += 20;
                population += 15;
            }
            else if (eventNum == 2) { //hire them to help around
                eventText.setText(mercenaryResponse[3]);
                reputation += 5;
                population += 5;
                gold -= 20;
                food += 15;
            }
            else if (eventNum == 3) { //fIGHT
                eventText.setText(ablazeResponse[3]);
                reputation += 10;
                population -= 30;
            }
            else if (eventNum == 4) { //quell riot with force
                eventText.setText(riotResponse[3]);
                reputation -= 50;
                population -= 30;
            }
            else if (eventNum == 5) { //forage
                eventText.setText(starvationResponse[3])
                food += 30;
                gold -= 30;
            }
            else if (eventNum == 6) { //manual labor
                eventText.setText(recruitsResponse[3]);
                reputation += 15;
                population += 20;
            }
            else if (eventNum == 7) { //imprison
                eventText.setText(surrenderResponse[3]);
                reputation += 5;
                food -= 10;
                gold -= 10;
            }
        }).setVisible(false);

        resourcesIcon = this.add.image(50, 700, 'resources').setScale(2, 2); //food
        resourcesText = this.add.text(100, 690, '100', { fontSize: '24px', fontFamily: 'courier' }); //food
        resourcesIcon = this.add.image(200, 700, 'resources').setScale(2, 2).setFrame(1); //gold
        resourcesText2 = this.add.text(250, 690, '100', { fontSize: '24px', fontFamily: 'courier' }); //gold
        resourcesIcon = this.add.image(1150, 700, 'resources').setScale(2, 2).setFrame(2); //pop
        resourcesText3 = this.add.text(1200, 690, '100', { fontSize: '24px', fontFamily: 'courier' }); //gold
        resourcesIcon = this.add.image(1300, 700, 'resources').setScale(2, 2).setFrame(3); //rep
        resourcesText4 = this.add.text(1350, 690, '100', { fontSize: '24px', fontFamily: 'courier' }); //gold
        endGameSplash = this.add.image(750, 0, 'ending').setScale(12, 12).setFrame(1).setOrigin(0.5, 0).setVisible(false); //ending loss by default
        
        endingText = this.add.text(750, 625, 'TYRANT', { fontSize: '64px', fontFamily: 'courier' }).setOrigin(0.5, 0.5).setVisible(false);
        endingText2 = this.add.text(750, 680, 'Your brutality will live on in infamy.', { fontSize: '24px', fontFamily: 'courier' }).setOrigin(0.5, 0.5).setVisible(false);
    } //end

    update() {
        soldierText.setVisible(false);
        archerText.setVisible(false);
        knightText.setVisible(false);
        crusaderText.setVisible(false);
        reminderText.setVisible(false);
        reminderText2.setVisible(false);
        healthText.setVisible(false);

        townText.setVisible(false);
        barracksText.setVisible(false);
        garrisonText.setVisible(false);
        resourcesText.setText(food);
        resourcesText2.setText(gold);
        resourcesText3.setText(population);
        resourcesText4.setText(reputation);
        for (var i = 0; i < 229; i++) { //for every tile

            if (select.getFirstNth(i, true).selected == true) { //check if selected
                if (units.getFirstNth(i, true).allegiance == "allied") { //and if allied

                    select.getFirstNth(i, true).setFrame(1); //then highlight

                    if (units.getFirstNth(i, true).turnTaken == false) { //if available to take a turn, highlight movement
                        select.getFirstNth(i - 1, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i - 2, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i + 1, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i + 2, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i - 24, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i - 23, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i - 22, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i + 22, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i + 23, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i + 24, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i - 46, true).setFrame(2).highlighted = true;
                        select.getFirstNth(i + 46, true).setFrame(2).highlighted = true;
                        units.getFirstNth(i, true).setTint(0x8CEA20);
                        units.getFirstNth(i, true).selected = true; //select unit as well
                        selectedUnit = i;
                        reminderText2.setVisible(true);
                        if (units.getFirstNth(i, true).type == "knight") {
                            select.getFirstNth(i - 3, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 3, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i - 21, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 21, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i - 25, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 25, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i - 24, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 45, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 47, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i - 45, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i - 47, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i - 69, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 69, true).setFrame(2).highlighted = true;
                        }
                        else if (units.getFirstNth(i, true).type == "crusader") {

                            select.getFirstNth(i - 2, true).setFrame(0).highlighted = false;
                            select.getFirstNth(i + 2, true).setFrame(0).highlighted = false;
                            select.getFirstNth(i - 24, true).setFrame(0).highlighted = false;
                            select.getFirstNth(i - 22, true).setFrame(0).highlighted = false;
                            select.getFirstNth(i + 22, true).setFrame(0).highlighted = false;
                            select.getFirstNth(i + 24, true).setFrame(0).highlighted = false;
                            select.getFirstNth(i - 46, true).setFrame(0).highlighted = false;
                            select.getFirstNth(i + 46, true).setFrame(0).highlighted = false;
                        }
                        //debugText.setText(i);
                        if (i < 11) { //if on the left side, top row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 11 && i < 24) { //if on the right, top row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 34) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 34 && i < 47) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 57) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 57 && i < 70) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 80) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 80 && i < 93) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 103) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 103 && i < 116) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }

                        else if (i < 126) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 126 && i < 139) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 149) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 149 && i < 162) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 172) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 172 && i < 185) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 195) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 195 && i < 208) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i < 218) { //if on the left side, next row
                            for (var f = 0; f < 10; f++) {
                                select.getFirstNth(21 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(22 + f * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(23 + f * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                        else if (i > 218 && i < 230) { //if on the right, next row
                            for (var d = 0; d < 10; d++) {
                                select.getFirstNth(1 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(2 + d * 23, true).setFrame(0).highlighted = false;
                                select.getFirstNth(3 + d * 23, true).setFrame(0).highlighted = false;
                            }
                        }
                    }
                    healthText.setVisible(true);
                    healthText.setText('HP: ' + units.getFirstNth(i, true).hp)

                } //end of if allied unit
                else if (buildings.getFirstNth(i, true).allegiance == "allied") {
                    buildings.getFirstNth(i, true).selected = true; //select unit as well
                    select.getFirstNth(i, true).setFrame(1); //then highlight
                    if (buildings.getFirstNth(i, true).turnTaken == false) { //available to buy from?
                        if (buildings.getFirstNth(i, true).type == "capital") { //is capital?

                            buildings.getFirstNth(i, true).setTint(0x8CEA20); //tint 
                            townText.setVisible(true); //options
                            barracksText.setVisible(true);
                            garrisonText.setVisible(true);
                            for (var i = 0; i < 229; i++) {}

                        }
                        else if (buildings.getFirstNth(i, true).type == "barracks") {
                            buildingPurchasedID = i;
                            select.getFirstNth(i - 1, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 1, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i - 23, true).setFrame(2).highlighted = true;
                            select.getFirstNth(i + 23, true).setFrame(2).highlighted = true;
                            buildings.getFirstNth(i, true).setTint(0x8CEA20);

                            soldierText.setVisible(true);
                            archerText.setVisible(true);
                            knightText.setVisible(true);
                            crusaderText.setVisible(true);
                            reminderText.setVisible(true);
                        }
                    } //end of building buys
                }
            } //end
            // else {
            //     select.getFirstNth(i, true).setFrame(0);
            //     units.getFirstNth(i, true).clearTint();
            // }
        } //test for units
    } //end

} //end
