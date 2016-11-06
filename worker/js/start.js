// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(0, 0, Phaser.AUTO, 'area', {
    preload: preload,
    create: create,
    update: update
});

// Called first
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.setResizeCallback(function() {
        game.scale.setMaximum();
    });
}

// Called after preload
function create() {

    // Create some text in the middle of the game area
    var helloText = game.add.text(250, 250, 'Hello, Phaser!', {
        fontSize: '32px',
        fill: '#00F'
    });
    helloText.anchor.set(0.5, 0.5);
}

// Called once every frame, ideally 60 times per second
function update() {
}