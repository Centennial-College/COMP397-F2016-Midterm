module scenes {
    export class Play extends objects.Scene {

        private _backgroundImage: createjs.Bitmap;
        private _enemy: objects.Enemy

        constructor() {
            super();
        }

        public start(): void {
            this._backgroundImage = new createjs.Bitmap(assets.getResult("Bg"))
            this.addChild(this._backgroundImage)

            this._enemy = new objects.Enemy("enemy", 2)
            this.addChild(this._enemy)

            stage.addChild(this);
        }

        public update(): void {
        }

        private _onEnemyClick(event: createjs.MouseEvent): void {
        }
    }
}