var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file menu.ts
 * @author Kevin Ma
 * @description The Menu class extends from the Scene class and includes all functionalities of
 * the Menu scene for the game
 * @date Oct 18 2016
 * @version 0.12.0
 */
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.start = function () {
            console.log("Menu scene started...");
            // bg img
            this._backgroundImage = new createjs.Bitmap(assets.getResult("Bg"));
            this.addChild(this._backgroundImage);
            // title Label
            this._menuTitleLabel = new objects.Label("Cops and Robbers", "90px Comic Sans MS", "#f7e907", config.Screen.CENTER_X, config.Screen.CENTER_Y - 100);
            this._menuTitleLabel.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            this.addChild(this._menuTitleLabel);
            // 5x5 Box Blur filter on bg image
            var blurFilter = new createjs.BlurFilter(5, 5);
            this._backgroundImage.filters = [blurFilter];
            var bitmapBounds = this._backgroundImage.getBounds();
            this._backgroundImage.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);
            this._playBtn = new objects.Button("PlayBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 150);
            this._playBtn.shadow = new createjs.Shadow("#000", 5, 5, 10);
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        Menu.prototype._playBtnClick = function (event) {
            scene = config.Scene.GAME;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map