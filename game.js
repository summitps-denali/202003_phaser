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
var resourcesText3; //pop
var resourcesText4; //rep
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
var reputation = 100;
var population = 100;
var spacebar;
var eventNum = 0;
var eventBG;
var eventSplash;
var eventText;
var eventOption1;
var eventOption2;
var eventOption3;
var eventOption4;
var eventConfirm;
var endGameSplash;
var endingText;
var endingText2;
var pandemicText = ["A highly infectious disease descends upon your forces through an unknown vector. . .", 
"Quarantine the afflicted", "Kill the infected", "Quarantine everybody","Go on with your lives"];
var pandemicResponse = ["You successfully isolate most of the infected.\nFeeding them strains your food supply.\nUnfortunately, asymptomatic carriers spread the disease farther than anticipated.",
"The infected are dead.\nYour swift response stops the disease in its tracks.\nDespite this, everyone is outraged.",
"Everyone stays indoors, but the lack of workers strains your food supply and economy.",
"The disease's spread is unchecked.\nYour people die, and those remaining blame you."]
var innovationText = ["Your engineers create a scientific marvel! \nNow, to put it to use . . .", 
"Weaponize it", "Utilize it for manufacturing", "Use it for propaganda", "Destroy it before the public finds out"];
var innovationResponse = ["Your enemies look upon the might of your empire and tremble.",
"Your industry flourishes!", "Your technological progress is renowned!", "Science is too dangerous.\nOur faith should be in time-honored traditions, not technology."]
var mercenaryText = ["Hardened mercenaries arrive at your doorstep . . .", 
"Disperse this rabble", "Hire them as soldiers", "Party with them", "Hire them to help people"];
var mercenaryResponse = ["You get rid of the mercenaries before they can do any harm.\nYour people are grateful.",
"Your people are wary of the newcomers, but all they seem to care for is money.", "They roughhouse and cause chaos.\nHowever, people appreciate how down-to-earth you seem.", 
"They help with the harvest. Their help is appreciated, but nobody wants to admit it."]
var ablazeText = ["The capital is being raided!",
"Give them your food", "Give them your gold", "Give them your people" , "Fight them off"];
var ablazeResponse = ["The raiders run off with as much food as they can carry.",
"The raiders greedily grease their palms.", "Shocked, your people curse you as they are carted away.", "You rally the militia.\nYou are outnumbered.\nAnd yet, you hold the line."]
var riotText = ["Peaceful protests have erupted into riots!",
"Enact martial law", "Suppress information about the riot", "Hold public forums", "Quell riot with force"];
var riotResponse = ["The grumblings quiet at the sight of steel.\nStill, the people will hold a grudge for quite some time.",
"News of the riot does not travel far, thankfully.\nYou pay a fair price to the fixers.", "You hear the people's concerns about the lack of available healthcare.\nYou begin implementing more progressive policies with the people's backing.",
"Your brutality only encourages further resistance."]
var starvationText = ["There's not enough food to go around . . .", 
"Cut down on rations", "Order soldiers to fight on", "Pillage the countryside", "Order soldiers to forage"];
var starvationResponse = ["Your soldiers complain, but the rationing works.",
"Your soldiers do their best, but hunger overtakes loyalty.\nA battalion deserts.", "You become known for your ruthlessness, but at least your people will eat.", 
"You forego defence in favor of food.\nSome gold goes missing . . ."]
var recruitsText = ["Fresh-faced recruits arrive at your doorstep,\nready to lay down their lives . . .",
"Accept them into your ranks", "Use them for propaganda", "Assign them to manual labor", "Tell them to go home"];
var recruitsResponse = ["They may be young, but their tenacity is undeniable.\nIf they want to fight, they'll have their chance.",
"Their story is spun as an inspiring tale and spread around your kingdom, raising spirits.", "They're a little disappointed, but at least they're safe from the reality of war . . .", 
"They return home. They may be disappointed, but their parents are endlessly grateful."]
var surrenderText = ["An enemy battalion has surrendered to you.\nThey're at your mercy.",
"Execute them and take their loot", "Let them return to their families", "Recruit them", "Imprison them"];
var surrenderResponse = ["The prisoners are shown no mercy.\nTheir equipment sure is shiny . . .",
"They are filled with gratitude.\nTheir families spread word of your mercy.\nAnd send you some secret gifts.", "Surprised by your offer, many eagerly join your ranks.\nWhy waste such talent and training?",
"You hold them in a prisoner camp in fair conditions.\nAfter the war, they'll be given a fair trial."]
var endingSplash;
var endingText; //variable
var endingSpeech = ["", 
"", 
""];
var game = new Phaser.Game(config);