/**
 * @file game.ts
 * @author Kevin Ma
 * @description This class is the manifest for all the typescript code for the game
 * @date Oct 18 2016
 * @version 0.1.0
 */
/// <reference path = "_reference.ts" />
// Global Variables
var assets;
var canvas;
var stage;
var currentScene;
var scene;
var spriteSheetLoader;
var enemyAtlas;
// Preload Assets required
var assetData = [
    { id: "PlayBtn", src: "../../Assets/images/sack.png" },
    { id: "Bg", src: "../../Assets/images/bank.png" },
    { id: "Enemy", src: "../../Assets/images/enemy.png" }
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    enemyAtlas = new createjs.SpriteSheet({
        "images": [
            assets.getResult("Enemy")
        ],
        "frames": [
            [1, 1, 200, 214, 0, 0, 0],
            [203, 1, 128, 125, 0, 0, -3],
            [203, 128, 102, 117, 0, -13, -9],
            [307, 128, 91, 98, 0, -18, -18],
            [400, 1, 128, 124, 0, 0, -4],
            [400, 127, 128, 124, 0, 0, -4]
        ],
        "animations": {
            "robber": { "frames": [0] },
            "poof2": { "frames": [1] },
            "poof4": { "frames": [2] },
            "poof5": { "frames": [3] },
            "poof1": { "frames": [4] },
            "poof3": { "frames": [5] }
        }
    });
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            console.log("Starting MENU scene");
            currentScene = new scenes.Menu();
            ;
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            console.log("Starting GAME scene");
            currentScene = new scenes.Play();
            break;
    }
}
//# sourceMappingURL=game.js.map