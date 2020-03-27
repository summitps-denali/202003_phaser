/*global Phaser game game_state*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game.global = {
    age : 0,
    health : 0,
    money: 0,
    fame: 0
};

game_state.intro = function() {};
game_state.intro.prototype = {

    preload: function() {
        game.load.image('choice_btn', 'assets/buttons/choice.png');
        game.load.image('choice_btn_hover', 'assets/buttons/choice_hover.png');
        game.load.image('choice_btn_click', 'assets/buttons/choice_click.png');
        game.load.image('bg', 'assets/BGs/title.png');
    },

    create: function() {
        game.stage.backgroundColor = "#333";
        game.add.sprite(0,0,'bg');
        
        var start = game.add.sprite(320, 450, 'choice_btn');
        start.inputEnabled = true;
        start.events.onInputDown.add(function() {
            start.loadTexture('choice_btn_click');
            game.state.start('game');
        }, this);
        start.events.onInputOver.add(function() {
            start.loadTexture('choice_btn_hover');
        }, this);
        start.events.onInputOut.add(function() {
            start.loadTexture('choice_btn');
        }, this);
    },

    update: function() {

    },
};
game.state.add('intro', game_state.intro);
game.state.start('intro');
