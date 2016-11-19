// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(0, 0, Phaser.AUTO, 'area', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var cursors;
var plusKey;
var minusKey;
var worldScale = 1;
var map;
var initialZoom;

// Called first
function preload() {
    game.load.image('map', 'images/map.jpg');
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.setResizeCallback(function() {
        game.scale.setMaximum();
    });

    // initialize keyboard
    this.cursors = game.input.keyboard.createCursorKeys();
    plusKey = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ADD);
    minusKey = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_SUBTRACT);

    // initialize zoom
    initialZoom = 1;
}

// Called after preload
function create() {
    var menuLeftWidth = 100;
    var menuRightWidth = 100;
    var menuTopHeight = 25;
    var menuBottomHeight = 25;
    var gameWidth = game.scale.dom.visualBounds.width; // width of the game (based on window width)
    var gameHeight = game.scale.dom.visualBounds.height; // height of the game (based on window height)
    var gameRatio = gameWidth / gameHeight;

    //manage map
    map = game.add.sprite(menuLeftWidth, menuTopHeight, 'map');
    var mapRatio = map.width / map.height;
    if (mapRatio < gameRatio) {
        map.width = (gameWidth - menuLeftWidth - menuRightWidth) * initialZoom;
        map.height = (gameWidth / mapRatio) * initialZoom;
    } else {
        map.height = (gameHeight - menuTopHeight - menuBottomHeight) * initialZoom;
        map.width = (gameHeight * mapRatio) * initialZoom;
    }

    game.world.setBounds(0, 0, map.width + menuLeftWidth + menuRightWidth, map.height + menuTopHeight + menuBottomHeight);



    //centrage de la caméra
    game.camera.setPosition(((game.world.width - gameWidth) * 0.5), ((game.world.height - gameHeight) * 0.5));

    //var i = 0
    //while(i <10) {
    //    zoom(true);
    //    i += 1;
    //}
}

// Called once every frame, ideally 60 times per second
function update() {
    var step = 4;
    if (this.cursors.up.isDown)
    {
        game.camera.y -= step;
    }
    else if (this.cursors.down.isDown)
    {
        game.camera.y += step;
    }

    if (this.cursors.left.isDown)
    {
        game.camera.x -= step;
    }
    else if (this.cursors.right.isDown)
    {
        game.camera.x += step;
    }

    if (plusKey.isDown)
    {
        zoom(true);
    }
    else if (minusKey.isDown)
    {
        zoom(false);
    }
}

function render() {

    game.debug.cameraInfo(game.camera, 500, 32);

}

function zoom(zoomIn) {
    var pointX = (game.camera.x + game.camera.width * 0.5) / worldScale;
    var pointY = (game.camera.y + game.camera.height * 0.5) / worldScale;

    if (zoomIn) {
        worldScale =  worldScale > (4 / initialZoom) ? (4 / initialZoom) : worldScale + 0.02;
    } else {
        worldScale =  worldScale <= (1 / initialZoom) ? (1 / initialZoom) : worldScale - 0.02;
    }
    game.world.scale.set(worldScale);

    var pointToZoomX = pointX * worldScale - (game.camera.width * 0.5);
    var pointToZoomY = pointY * worldScale - (game.camera.height * 0.5);

    game.camera.setPosition(pointToZoomX, pointToZoomY);
}