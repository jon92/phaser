// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(0, 0, Phaser.AUTO, 'area', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var cursors;
var spaceKey;
var worldScale = 1;

// Called first
function preload() {
    game.load.image('map', 'images/map.jpg');
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.setResizeCallback(function() {
        game.scale.setMaximum();
    });
    this.cursors = game.input.keyboard.createCursorKeys();
}

// Called after preload
function create() {
    game.world.setBounds(0, 0, 3000, 2024);
    game.add.sprite(0, 0, 'map');

    // Create some text in the middle of the game area
    var helloText = game.add.text(250, 250, 'Hello, Phaser!', {
        fontSize: '32px',
        fill: '#00F'
    });
    helloText.anchor.set(0.5, 0.5);

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

// Called once every frame, ideally 60 times per second
function update() {
    if (this.cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (this.cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (this.cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (this.cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    var mouseWorldX = game.input.worldX;
    var mouseWorldY = game.input.worldY;

    if (spaceKey.isDown)
    {
        //var pointToZoomX = game.camera.x / worldScale + (game.camera.width * 0.5);
        //var pointToZoomY = game.camera.y / worldScale + (game.camera.height * 0.5);

        //game.camera.setPosition(0, 0);
        //var pointToZoomX = (game.camera.width * 0.5) + (game.camera.x / worldScale);
        //var pointToZoomY = (game.camera.height * 0.5) + (game.camera.y / worldScale);

        var pointToZoomX = (game.camera.x + game.camera.width * 0.5) / worldScale;
        var pointToZoomY = (game.camera.y + game.camera.height * 0.5) / worldScale;

        console.log(pointToZoomX);
        console.log(pointToZoomY);
        worldScale += 0.05;

        game.world.scale.set(worldScale);
        console.log(worldScale);
        console.log('------------------------');
        //var pointToZoomX = 404;
        //var pointToZoomY = 301;
        var topLeftPointX = pointToZoomX * worldScale - (game.camera.width * 0.5);
        var topLeftPointY = pointToZoomY * worldScale - (game.camera.height * 0.5);
        game.camera.setPosition(topLeftPointX, topLeftPointY);
        //game.camera.focusOnXY(545 * worldScale, 506 * worldScale);
        //game.camera.focusOnXY(mouseWorldX, mouseWorldY);
    }
}

function render() {

    game.debug.cameraInfo(game.camera, 500, 32);

}