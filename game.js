/*global Phaser game game_state*/

game_state.game = function() {};

var scene = "dark_hall";
var room = "hall";
var counter1 = 0;
var counter2 = 0;
var counter3 = 0;

game_state.game.prototype = {
    preload: function() {
        game.load.image('choice_bn', 'assets/buttons/choice.png');
        game.load.image('choice_bn_hover', 'assets/buttons/choice_hover.png');
        game.load.image('choice_bn_click', 'assets/buttons/choice_click.png');
    },

    create: function() {
        
        this.choice1 = new choice_btn(50, 450, 'choice_btn', function() {
            
        }, this);
        this.choice2 = new choice_btn(230, 450, 'choice_btn', function() {
            
        }, this);
        this.choice3 = new choice_btn(410, 450, 'choice_btn', function() {
            
        }, this);
        this.choice4 = new choice_btn(590, 450, 'choice_btn', function() {
            
        }, this);
        
        this.mainText = game.add.text(200, 100, '', {
            font: '16px Arial',
            fill: '#FFF',
            wordWrap: true,
            wordWrapWidth: 400,
            align: 'center'
        });
        this.enterRoom('hall');
    },

    update: function() {
        
    },
    
    enterRoom: function(newRoom) {
        var self = this;
        if (scene == "dark_hall") {
            if (newRoom == "hall") {
                this.mainText.setText("You are in a Dark Hall. It is dark. The hall is dark. You want out.");
                
                this.choice1.setText("Yes.");
                this.choice1.setEvent(function() {
                    counter1++;
                    if (counter1 < 20) {
                        this.mainText.setText("Yes. You want to get out.");
                    }
                    else {
                        this.mainText.setText("JUST GET OUT ALREADY!");
                        this.choice1.setText("@!!%$&@$");
                        this.choice1.setEvent(function(){});
                    }
                });
                
                this.choice2.setText("Go Left");
                this.choice2.setEvent(function() {
                    this.enterRoom("statue_room");
                    this.disableAllButtons(1000);
                });
                
                this.choice3.setText("Go Right");
                this.choice3.setEvent(function() {
                    if (counter2 == 0) {
                        this.enterRoom("eye_room");
                    this.disableAllButtons(1000);
                    }
                    else {
                        this.mainText.setText("You can't.");
                    }
                });
                
                this.choice4.setText("Examine the hall");
                this.choice4.setEvent(function() {
                    if (counter2 == 0) {
                        this.mainText.setText("You look at the hall. It looks back. There are two doors to your left and right. You can't quite make anything else out.");
                    }
                    else if (counter2 == 1) {
                        this.mainText.setText("There are eyes everywhere.");
                    }
                });
            }
            else if (newRoom == "statue_room") {
                if (counter2 == 0) {
                    this.mainText.setText("You enter the left room. There's a stone statue of a fat man. You don't like it.");
                    counter3 = counter3 == 2 ? 2 : 1;
                    
                    this.choice1.setText("Scream");
                    this.choice1.setEvent(function() {
                        this.mainText.setText("You SCREAM at the statue. It SCREAMS back. You are all screaming.");
                        counter3 = 2;
                    });
                    
                    this.choice2.setText("Kick it");
                    this.choice2.setEvent(function() {
                        this.mainText.setText("You kick the statue, though you don't hurt your foot.");
                    });
                    
                    this.choice3.setText("Stare at it");
                    this.choice3.setEvent(function() {
                        this.mainText.setText("It stares back. The walls stare too. Everyone is staring.");
                    });
                    
                    this.choice4.setText("Leave");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                }
                else {
                    counter1 = 0;
                    if (counter3 == 0) {
                        this.mainText.setText("You enter the left room. There's a stone statue of an eye. You don't like it.");
                    }
                    else if (counter3 == 1) {
                        this.mainText.setText("You come back to the room with the statue. It is now an eye.");
                    }
                    else {
                        this.mainText.setText("You come back to the room with the statue. The statue is an angry eye.");
                    }
                    this.choice1.setText("Scream");
                    this.choice1.setEvent(function() {
                        this.mainText.setText("You can't scream.");
                        counter1++;
                        if (counter1 >= 20) {
                            counter1 = 0;
                            counter2 = 0;
                            counter3 = 0;
                            scene = "game_show1";
                            this.disableAllButtons(1000);
                            this.enterRoom("q0");
                        }
                    });
                    
                    this.choice2.setText("Flail");
                    this.choice2.setEvent(function() {
                        this.mainText.setText("You can't flail.");
                        counter1++;
                        if (counter1 >= 20) {
                            counter1 = 0;
                            counter2 = 0;
                            counter3 = 0;
                            scene = "game_show1";
                            this.disableAllButtons(1000);
                            this.enterRoom("q0");
                        }
                    });
                    
                    this.choice3.setText("Wait");
                    this.choice3.setEvent(function() {
                        this.mainText.setText(". . .");
                        counter1++;
                        if (counter1 >= 20) {
                            counter1 = 0;
                            counter2 = 0;
                            counter3 = 0;
                            scene = "game_show1";
                            this.enterRoom("q0");
                        }
                    });
                    
                    this.choice4.setText("Leave");
                    this.choice4.setEvent(function() {
                        this.mainText.setText("You can't leave.");
                        counter1++;
                        if (counter1 >= 20) {
                            counter1 = 0;
                            counter2 = 0;
                            counter3 = 0;
                            scene = "game_show1";
                            this.enterRoom("q0");
                        }
                    });
                }
            }
            else if (newRoom == "eye_room") {
                this.mainText.setText("You drag yourself into the right room. It is right afterall. It's empty. You walk to the end. It's still empty. You feel watched.");
                this.disableAllButtons(1000);
                
                this.choice1.setText("TURN AROUND");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("You turn around. The room is made of eyes. They are all watching you. It's time to LEAVE.");
                    counter2 = 1;
                    this.choice1.setText("Leave");
                    this.choice1.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice2.setText("Leave");
                    this.choice2.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice3.setText("Leave");
                    this.choice3.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice4.setText("Leave");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                });
                
                this.choice2.setText("TURN AROUND");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("You turn around. The room is made of eyes. They are all watching you. It's time to LEAVE.");
                    counter2 = 1;
                    this.choice1.setText("Leave");
                    this.choice1.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice2.setText("Leave");
                    this.choice2.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice3.setText("Leave");
                    this.choice3.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice4.setText("Leave");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                });
                
                this.choice3.setText("TURN AROUND");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("You turn around. The room is made of eyes. They are all watching you. It's time to LEAVE.");
                    counter2 = 1;
                    this.choice1.setText("Leave");
                    this.choice1.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice2.setText("Leave");
                    this.choice2.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice3.setText("Leave");
                    this.choice3.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice4.setText("Leave");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                });
                
                this.choice4.setText("TURN AROUND");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("You turn around. The room is made of eyes. They are all watching you. It's time to LEAVE.");
                    counter2 = 1;
                    this.choice1.setText("Leave");
                    this.choice1.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice2.setText("Leave");
                    this.choice2.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice3.setText("Leave");
                    this.choice3.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                    this.choice4.setText("Leave");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.enterRoom("hall");
                    });
                });
            }
        }
        else if (scene == "game_show1") {
            if (newRoom == "q0") {
                this.mainText.setText("Welcome to the MILLIONAIRS game show!!! You'll answer 10 questions. Get them all right and earn ONE MILLION DOLLARS!!! Are you ready!?");
                
                this.choice1.setText("Hell yeah!");
                this.choice1.setEvent(function() {
                    this.mainText.setText("Awesome! Let's continue!");
                    this.disableAllButtons(2000);
                    setTimeout(function() {
                        self.enterRoom("q1");
                    }, 2000);
                });
                
                this.choice2.setText("Okay.");
                this.choice2.setEvent(function() {
                    this.mainText.setText("Great! A bit more enthusiasm would be nice though. Let's move on!");
                    this.disableAllButtons(3000);
                    setTimeout(function() {
                        self.enterRoom("q1");
                    }, 3000);
                });
                
                this.choice3.setText(". . .");
                this.choice3.setEvent(function() {
                    this.mainText.setText("Um... Okay? Guess we have a quiet one today, but that's fine!");
                    this.disableAllButtons(3000);
                    setTimeout(function() {
                        self.enterRoom("q1");
                    }, 3000);
                });
                
                this.choice4.setText("Why am I here?");
                this.choice4.setEvent(function() {
                    this.mainText.setText("Well because you signed up! Don't worry about it, let's continue!");
                    this.disableAllButtons(3000);
                    counter1++;
                    setTimeout(function() {
                        self.enterRoom("q1");
                    }, 3000);
                });
            }
            else if (newRoom == "q1") {
                if (counter1 < 2) {
                    this.mainText.setText("Alright! Question 1... When was the Declaration of Independence signed?");
                }
                else if (counter1 == 2) {
                    this.mainText.setText("Again, question 1! When was the Declaration of Independence signed?");
                }
                else if (counter1 == 3) {
                    this.mainText.setText("When was the Declaration of Independence signed? Don't tire us!");
                }
                else if (counter1 == 4) {
                    this.mainText.setText("WHEN. WAS. THE. DECLARATION OF INDEPENDENCE. SIGNED!?");
                }
                else if (counter1 == 5) {
                    this.mainText.setText("When was the Declaration of Independence signed?");
                }
                
                this.choice1.setText("1587");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct! Next question:");
                    setTimeout(function() {
                        self.enterRoom("q2");
                    },1000);
                });
                
                this.choice2.setText("1723");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct! Next question:");
                    setTimeout(function() {
                        self.enterRoom("q2");
                    },1000);
                    
                });
                
                this.choice3.setText("5873");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct! Next question:");
                    setTimeout(function() {
                        self.enterRoom("q2");
                    },1000);
                });
                
                if (counter1 == 1) {
                    this.choice4.setText("Where am I");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(2000);
                        this.mainText.setText("Well, you're in a game show!");
                        counter1++;
                        setTimeout(function() {
                            self.enterRoom("q1");
                        },2000);
                    });
                }
                else if (counter1 == 2) {
                    this.choice4.setText("Who are you");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(2000);
                        this.mainText.setText("Umm... I'm you? Hup hup, let's go!");
                        counter1++;
                        setTimeout(function() {
                            self.enterRoom("q1");
                        },2000);
                    });
                }
                else if (counter1 == 3) {
                    this.choice4.setText("Why are you me");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(2000);
                        this.mainText.setText("You ask too many questions.");
                        counter1++;
                        setTimeout(function() {
                            self.enterRoom("q1");
                        },2000);
                    });
                }
                else if (counter1 == 4) {
                    this.choice4.setText("Why am I here");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(2000);
                        this.mainText.setText("I'll give you one final chance!");
                        counter1++;
                        setTimeout(function() {
                            self.enterRoom("q1");
                        },2000);
                    });
                }
                else if (counter1 == 5) {
                    this.choice4.setText("Answer me");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(3000);
                        this.mainText.setText("I WILL SUFFER YOU NO LONGER!");
                        //UNFINISHED - add spook.
                        setTimeout(function() {
                            scene = "tom_robs_isabelle";
                            self.enterRoom("start");
                        }, 4000);
                    });
                }
                else {
                    this.choice4.setText("1924");
                    this.choice4.setEvent(function() {
                        this.disableAllButtons(1000);
                        this.mainText.setText("Correct! Next question:");
                        setTimeout(function() {
                            self.enterRoom("q2");
                        },1000);
                    });
                }
            }
            else if (newRoom == "q2") {
                this.mainText.setText("Alright! Question 2, where are your feet?");
                
                this.choice1.setText("Below me");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct again!");
                    setTimeout(function() {
                        self.enterRoom("q3");
                    },1000);
                });
                
                this.choice2.setText("Trick question. I don't have feet");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct again!");
                    setTimeout(function() {
                        self.enterRoom("q3");
                    },1000);
                });
                
                this.choice3.setText("I left them at home");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct again!");
                    setTimeout(function() {
                        self.enterRoom("q3");
                    },1000);
                });
                
                this.choice4.setText("On my legs");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct again!");
                    setTimeout(function() {
                        self.enterRoom("q3");
                    },1000);
                });
            }
            else if (newRoom == "q3") {
                this.mainText.setText("Next, question 3: Why is the moon made of cheese?");
                
                this.choice1.setText("CHEESE!");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("CHEESE!");
                    setTimeout(function() {
                        self.enterRoom("q4");
                    },1000);
                });
                
                this.choice2.setText("Because God made it so");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Indeed.");
                    setTimeout(function() {
                        self.enterRoom("q4");
                    },1000);
                });
                
                this.choice3.setText("Government failed experiment");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Indeed.");
                    setTimeout(function() {
                        self.enterRoom("q4");
                    },1000);
                });
                
                this.choice4.setText("What's a moon");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Good answer, we don't know! Moving on...");
                    setTimeout(function() {
                        self.enterRoom("q4");
                    },2000);
                });
            }
            else if (newRoom == "q4") {
                this.mainText.setText("Question 4: Why does the fridge light go off when you close the door?");
                
                this.choice1.setText("To preserve energy");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("That is correct!");
                    setTimeout(function() {
                        self.enterRoom("q5");
                    },2000);
                });
                
                this.choice2.setText("So you don't melt the food");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Yes!");
                    setTimeout(function() {
                        self.enterRoom("q5");
                    },1000);
                });
                
                this.choice3.setText("Because food only spawns at light levels of 7 or below");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Wow! We got a genius here!");
                    setTimeout(function() {
                        self.enterRoom("q5");
                    },2000);
                });
                
                this.choice4.setText("To simulate night-time for the food");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Yes!");
                    setTimeout(function() {
                        self.enterRoom("q5");
                    },1000);
                });
            }
            else if (newRoom == "q5") {
                this.mainText.setText("Now for a hard one: What?");
                
                this.choice1.setText("What");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Hello!");
                    setTimeout(function() {
                        self.enterRoom("q6");
                    },1000);
                });
                
                this.choice2.setText("Who");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Me!");
                    setTimeout(function() {
                        self.enterRoom("q6");
                    },1000);
                });
                
                this.choice3.setText("Where");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Here!");
                    setTimeout(function() {
                        self.enterRoom("q6");
                    },1000);
                });
                
                this.choice4.setText("Why");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Cause!");
                    setTimeout(function() {
                        self.enterRoom("q6");
                    },1000);
                });
            }
            else if (newRoom == "q6") {
                this.mainText.setText("Question 6, over half way! Where do the wheels on the bus go?");
                
                this.choice1.setText("Round and round");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Yup!");
                    setTimeout(function() {
                        self.enterRoom("q7");
                    },1000);
                });
                
                this.choice2.setText("On the bus");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Exactly!");
                    setTimeout(function() {
                        self.enterRoom("q7");
                    },1000);
                });
                
                this.choice3.setText("The landfill");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Well yes...");
                    setTimeout(function() {
                        self.enterRoom("q7");
                    },2000);
                });
                
                this.choice4.setText("To the cheese moon");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(3000);
                    this.mainText.setText("That would technically be correct...");
                    setTimeout(function() {
                        self.enterRoom("q7");
                    },3000);
                });
            }
            else if (newRoom == "q7") {
                this.mainText.setText("7: The Heavy is dead!");
                
                this.choice1.setText("I think he is alive");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Interesting. Sure!");
                    setTimeout(function() {
                        self.enterRoom("q8");
                    },2000);
                });
                
                this.choice2.setText("Apple");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Interesting. Sure!");
                    setTimeout(function() {
                        self.enterRoom("q8");
                    },2000);
                });
                
                this.choice3.setText("The Heavy is dead.");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Correct!");
                    setTimeout(function() {
                        self.enterRoom("q8");
                    },1000);
                });
                
                this.choice4.setText("The Earth is flat");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Interesting. Sure!");
                    setTimeout(function() {
                        self.enterRoom("q8");
                    },2000);
                });
            }
            else if (newRoom == "q8") {
                this.mainText.setText("Question 8: Who killed Captain Alex?");
                
                this.choice1.setText("I did");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("You're on fire!");
                    setTimeout(function() {
                        self.enterRoom("q9");
                    },2000);
                });
                
                this.choice2.setText("Engineer did");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("You're on fire!");
                    setTimeout(function() {
                        self.enterRoom("q9");
                    },2000);
                });
                
                this.choice3.setText("The Tiger Mafia");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("You're on fire!");
                    setTimeout(function() {
                        self.enterRoom("q9");
                    },2000);
                });
                
                this.choice4.setText("He never died");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(3000);
                    this.mainText.setText("Yes! It's quite strange indeed.");
                    setTimeout(function() {
                        self.enterRoom("q9");
                    },3000);
                });
            }
            else if (newRoom == "q9") {
                this.mainText.setText("Question 9, almost there! What was Napoleon's last name?");
                
                this.choice1.setText("Bonaparte");
                this.choice1.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Yes! Yes!");
                    setTimeout(function() {
                        self.enterRoom("q10");
                    },2000);
                });
                
                this.choice2.setText("Bone Part");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(1000);
                    this.mainText.setText("Uh-huh!");
                    setTimeout(function() {
                        self.enterRoom("q10");
                    },1000);
                });
                
                this.choice3.setText("Bone a Part");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("Yes! Yes!");
                    setTimeout(function() {
                        self.enterRoom("q10");
                    },2000);
                });
                
                this.choice4.setText("Bon Appetit");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(2000);
                    this.mainText.setText("That's very good!");
                    setTimeout(function() {
                        self.enterRoom("q10");
                    },2000);
                });
            }
            else if (newRoom == "q10") {
                this.mainText.setText("Final Question! How many questions did you answer?");
                
                this.choice1.setText("10");
                this.choice1.disable();
                
                this.choice2.setText("not 10");
                this.choice2.setEvent(function() {
                    this.disableAllButtons(5000);
                    this.mainText.setText("Ooh!"); 
                    setTimeout(function() {
                        self.mainText.setText("I'm sorry... But that's incorrect. You'll have 5 seconds to live.");
                        setTimeout(function() {
                            self.enterRoom("fin");
                        }, 3000);
                    },2000);
                });
                
                this.choice3.setText("not 10");
                this.choice3.setEvent(function() {
                    this.disableAllButtons(5000);
                    this.mainText.setText("Ooh!"); 
                    setTimeout(function() {
                        self.mainText.setText("I'm sorry... But that's incorrect. You'll have 5 seconds to live.");
                        setTimeout(function() {
                            self.enterRoom("fin");
                        }, 3000);
                    },2000);
                });
                
                this.choice4.setText("not 10");
                this.choice4.setEvent(function() {
                    this.disableAllButtons(5000);
                    this.mainText.setText("Ooh!"); 
                    setTimeout(function() {
                        self.mainText.setText("I'm sorry... But that's incorrect. You'll have 5 seconds to live.");
                        setTimeout(function() {
                            self.enterRoom("fin");
                        }, 3000);
                    },2000);
                });
            }
            else if (newRoom == "fin") {
                self.mainText.setText("5");
                setTimeout(function() {
                    self.mainText.setText("4");
                    setTimeout(function() {
                        self.mainText.setText("3");
                        setTimeout(function() {
                            self.mainText.setText("2");
                            setTimeout(function() {
                                self.mainText.setText("1");
                                setTimeout(function() {
                                    scene = "tom_robs_isabelle";
                                    self.enterRoom("start");
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
                
                this.choice1.setText("No");
                this.choice1.setEvent(function() {
                    //nothing
                });
                
                this.choice2.setText("No");
                this.choice2.setEvent(function() {
                    //nothing
                });
                
                this.choice3.setText("No");
                this.choice3.setEvent(function() {
                    //nothing
                });
                
                this.choice4.setText("No");
                this.choice4.setEvent(function() {
                    //nothing
                });
            }
        }
        else if (scene == "tom_robs_isabelle") {
            if (newRoom == "start") {
                this.disableAllButtons(7000);
                counter1 = 0; // enemy hp
                counter2 = 0; // your hp
                counter3 = 0; // used gun
                var dodging = false;
                var did_dodge = false;
                this.mainText.setText("Tom Nook: I'm robbing you because you didn't pay your taxes");
                setTimeout(function() {
                    self.mainText.setText("Isabelle: Oh no.");
                    setTimeout(function() {
                        self.mainText.setText("Tom Nook: Give me your bells.");
                        setTimeout(function() {
                            self.mainText.setText("Isabelle: Help me.");
                            counter1 = 25;
                            counter2 = 10;
                            
                            var tom_nook = setInterval(function() {
                                if (dodging) {
                                    self.mainText.setText("Whoosh!");
                                    did_dodge = true;
                                }
                                else {
                                    self.mainText.setText("Ow! Tom Nook punched you!");
                                    counter2--;
                                }
                            }, 3000);
                            
                            self.choice1.setText("Punch him.");
                            self.choice1.setEvent(function() {
                                self.mainText.setText("Tom Nook: Ow.");
                                counter1--;
                                self.choice1.disable(1000);
                                self.choice1.loadTexture("choice_btn_click");
                            });
                            
                            self.choice2.setText("Et fod");
                            self.choice2.setEvent(function() {
                                self.mainText.setText("Nom nom nom.");
                                counter2 = counter2 >= 15 ? 15 : counter2 + 1;
                                self.choice2.disable(10000);
                                self.choice1.loadTexture("choice_btn_click");
                            });
                            
                            self.choice3.setText("Dodge");
                            self.choice3.setEvent(function() {
                                self.mainText.setText("You ducked.");
                                dodging = true;
                                setTimeout(function() {
                                    self.mainText.setText(did_dodge ? "You dodged his punch!" : "You dodged nothing.");
                                    dodging = false;
                                }, 1000);
                                self.choice3.disable(4000);
                                self.choice1.loadTexture("choice_btn_click");
                            });
                            
                            self.choice4.setText("SHOOT HIM");
                            self.choice4.setEvent(function() {
                                self.mainText.setText("POW!");
                                counter1 -= 10;
                                counter3 = 1;
                            });
                            
                            var fight = setInterval(function() {
                                if (counter1 <= 0) {
                                    self.disableAllButtons(3000);
                                    if (counter3 == 1) {
                                        clearInterval(tom_nook);
                                        setInterval(function() {
                                            clearInterval(fight);
                                            self.enterRoom("end_gun");
                                        }, 3000);
                                    }
                                    else {
                                        clearInterval(tom_nook);
                                        setInterval(function() {
                                            clearInterval(fight);
                                            self.enterRoom("end");
                                        }, 3000);
                                    }
                                }
                                else if (counter2 <= 0) {
                                    self.mainText.setText("You almost died! But you shot him.");
                                    counter1 = 0;
                                    counter3 = 1;
                                }
                            }, 20);
                        }, 2000);
                    }, 3000); 
                }, 2000); 
            }
            else if (newRoom == "end") {
                this.mainText.setText(counter3 == 1 ? "Isabelle: YOU SHOT HIM!!!" : "Isabelle: Thank you, he went crazy!");
                
                this.choice1.setText("GG");
                this.choice1.setEvent(function() {
                    this.mainText.setText("");
                });
                
                this.choice2.setText("GG");
                this.choice2.setEvent(function() {
                    this.mainText.setText("");
                });
                
                this.choice3.setText("GG");
                this.choice3.setEvent(function() {
                    this.mainText.setText("");
                });
                
                this.choice4.setText("GG");
                this.choice4.setEvent(function() {
                    this.mainText.setText("");
                });
            }
            else if (newRoom == "end_gun") {
                this.mainText.setText("yikes");
                
                this.choice1.setText("GG");
                this.choice1.setEvent(function() {
                    this.mainText.setText("");
                });
                
                this.choice2.setText("GG");
                this.choice2.setEvent(function() {
                    this.mainText.setText("");
                });
                
                this.choice3.setText("GG");
                this.choice3.setEvent(function() {
                    this.mainText.setText("");
                });
                
                this.choice4.setText("GG");
                this.choice4.setEvent(function() {
                    this.mainText.setText("");
                });
            }
        }
        else {
            console.log("Invalid Scene.");
        }
        room = newRoom;
    },
    
    disableAllButtons: function(ms) {
        if (ms != undefined) {
            this.choice1.disable(ms);
            this.choice2.disable(ms);
            this.choice3.disable(ms);
            this.choice4.disable(ms);
        }
        else {
            this.choice1.disable();
            this.choice2.disable();
            this.choice3.disable();
            this.choice4.disable();
        }
    }
};
game.state.add('game', game_state.game);

class choice_btn {
    constructor(x,y,image,click_event,caller) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.sprite = game.add.sprite(x,y,image);
        this.caller = caller;
        
        this.textBox = game.add.text(x+10,y+10, '', {
            font:'16px Arial',
            fill: '#FFF',
            wordWrap: true,
            wordWrapWidth: 140
        });
        
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(function() {
            this.sprite.loadTexture('choice_btn_click');
        }, this);
        this.sprite.events.onInputDown.add(click_event, caller);
        this.sprite.events.onInputOver.add(function() {
            this.sprite.loadTexture('choice_btn_hover');
        }, this);
        this.sprite.events.onInputOut.add(function() {
            this.sprite.loadTexture('choice_btn');
        }, this);
    }
    
    setEvent(newEvent) {
        this.sprite.events.onInputDown.removeAll();
        this.sprite.events.onInputDown.add(function() {
            this.sprite.loadTexture('choice_btn_click');
        }, this);
        this.sprite.events.onInputDown.add(newEvent, this.caller);
        this.sprite.loadTexture('choice_btn');
    }
    
    setText(newText) {
        this.textBox.setText(newText);
    }
    
    disable(ms) {
        var self = this;
        this.sprite.inputEnabled = false;
        this.sprite.loadTexture('choice_btn_click');
        if (ms != undefined) {
            setTimeout(function() {
                self.sprite.loadTexture('choice_btn');
                self.sprite.inputEnabled = true;
            }, ms);
        }
    }
    
    enable() {
        this.sprite.inputEnabled = true;
    }
}