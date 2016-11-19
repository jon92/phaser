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
var mapScale;
var map;
var initialZoom;
var mapRatio;
var initialMapWidth;
var initialMapHeight;

var menuLeftWidth;
var menuRightWidth;
var menuTopHeight;
var menuBottomHeight;

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

    initialZoom = 1;
}

// Called after preload
function create() {
    menuLeftWidth = 100;
    menuRightWidth = 100;
    menuTopHeight = 25;
    menuBottomHeight = 25;
    var gameWidth = game.scale.dom.visualBounds.width; // width of the game (based on window width)
    var gameHeight = game.scale.dom.visualBounds.height; // height of the game (based on window height)
    var gameRatio = gameWidth / gameHeight;

    //initialize groups
    map = game.add.group();
    var mapSprite = map.create(0, 0, 'map');
    map.x = menuLeftWidth;
    map.y = menuTopHeight;

    //manage map
    mapRatio = map.width / map.height;
    if (mapRatio < gameRatio) {
        map.width = (gameWidth - menuLeftWidth - menuRightWidth) * initialZoom;
        map.height = (map.width / mapRatio) * initialZoom;
    } else {
        map.height = (gameHeight - menuTopHeight - menuBottomHeight) * initialZoom;
        map.width = (map.height * mapRatio) * initialZoom;
    }
    initialMapWidth = map.width;
    initialMapHeight = map.height;

    // debug - menus
    menuTop = new Phaser.Rectangle(0, 0, gameWidth, menuTopHeight);
    menuBottom = new Phaser.Rectangle(0, gameHeight - menuBottomHeight, gameWidth, menuBottomHeight);
    menuLeft = new Phaser.Rectangle(0, 0, menuLeftWidth, gameHeight);
    menuRight = new Phaser.Rectangle(gameWidth - menuRightWidth, 0, menuRightWidth, gameHeight);
    button  = game.add.button(0, 0);

    game.world.setBounds(0, 0, map.width + menuLeftWidth + menuRightWidth, map.height + menuTopHeight + menuBottomHeight);

    // centrage de la carte
    map.x -= (map.width - (gameWidth - menuLeftWidth - menuRightWidth)) * 0.5;
    map.y -= (map.height - (gameHeight- menuTopHeight - menuBottomHeight)) * 0.5;

    mapSprite.inputEnabled = true;
    mapSprite.events.onInputDown.add(listener, this);

    button = game.add.button(0, 0, 'button', listener2, this, 2, 1, 0);
}

function listener() {
    console.log('click');
}

function listener2() {
    console.log('click2');
}

// Called once every frame, ideally 60 times per second
function update() {
    var step = 4;
    if (this.cursors.up.isDown)
    {
        if (map.y + step < menuTopHeight) {
            map.y += step;
        }
    }
    else if (this.cursors.down.isDown)
    {
        if ((map.y + map.height - step) > game.height - menuBottomHeight) {
            map.y -= step;
        }
    }

    if (this.cursors.right.isDown)
    {
        if ((map.x + map.width - step) > game.width - menuRightWidth) {
            map.x -= step;
        }
    }
    else if (this.cursors.left.isDown)
    {
        if (map.x + step < menuLeftWidth) {
            map.x += step;
        }
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
    game.debug.geom(menuTop,'#000000');
    game.debug.geom(menuBottom,'#000000');
    game.debug.geom(menuRight,'#000000');
    game.debug.geom(menuLeft,'#000000');

}

function zoom(zoomIn) {
    //trouver le point de la carte qui se trouve sous le centre de la caméra
    centerOfCameraX = game.camera.width * 0.5;
    centerOfCameraY = game.camera.height * 0.5;
    pointX = (centerOfCameraX - (map.x - game.world.x)) / (map.width / initialMapWidth);
    pointY = (centerOfCameraY - (map.y - game.world.y)) / (map.height / initialMapHeight);

    //zoomer en fonction du point haut gauche de la carte
    if (zoomIn) {
        if ((map.width / initialMapWidth) < 3) {
            map.scale.set(map.scale.x + 0.02);
        }
    } else {
        if ((map.width / initialMapWidth) > 1) {
            map.scale.set(map.scale.x - 0.02);
        }
    }

    // repositionner le point précédent sous le centre de la carte
    //// trouver le point de la carte qui se trouve sous le centre de la caméra actuellement
    newPointX = (centerOfCameraX - (map.x - game.world.x)) / (map.width / initialMapWidth);
    newPointY = (centerOfCameraY - (map.y - game.world.y)) / (map.height / initialMapHeight);

    //// faire la différence avec l'ancien point pour repositionner le tout
    var diffX = (pointX - newPointX) * (map.width / initialMapWidth);
    map.x -= diffX;
    var diffY = (pointY - newPointY) * (map.height / initialMapHeight);
    map.y -= diffY;
}