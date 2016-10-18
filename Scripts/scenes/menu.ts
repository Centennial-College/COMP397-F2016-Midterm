/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        private _backgroundImage: createjs.Bitmap;
        // Label or bitmap
        // Button 
        private _playBtn: objects.Button;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start(): void {
            console.log("Menu Scene Started");

            // bg img
            this._backgroundImage = new createjs.Bitmap(assets.getResult("Bg"))
            this.addChild(this._backgroundImage)

            // 5x5 Box Blur filter on bg image
            let blurFilter = new createjs.BlurFilter(5, 5);
            this._backgroundImage.filters = [blurFilter];
            let bitmapBounds = this._backgroundImage.getBounds();

            this._backgroundImage.cache(bitmapBounds.x, bitmapBounds.y, bitmapBounds.width, bitmapBounds.height);

            this._playBtn = new objects.Button("PlayBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 150);
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update(): void {
        }

        private _playBtnClick(event: createjs.MouseEvent) {
            console.log("PRINT");
            scene = config.Scene.GAME;
            changeScene();
        }
    }
}