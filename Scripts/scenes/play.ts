module scenes {
    export class Play extends objects.Scene {

        private _backgroundImage: createjs.Bitmap;
        private _enemy: objects.Enemy
        private _scoreLabel: objects.Label;
        private _timeLabel: objects.Label;

        constructor() {
            super();
        }

        public start(): void {
            this._backgroundImage = new createjs.Bitmap(assets.getResult("Bg"))
            this.addChild(this._backgroundImage)

            this._scoreLabel = new objects.Label(
                "Score: 0",
                "40px comic sans ms",
                "#f7e907",
                90,
                40
            )
            this._scoreLabel.shadow = new createjs.Shadow("#000", 5, 5, 15)
            this.addChild(this._scoreLabel)

             this._timeLabel = new objects.Label(
                "Time: 0",
                "40px comic sans ms",
                "#f7e907",
                100,
                90
            )
            this._timeLabel.shadow = new createjs.Shadow("#000", 5, 5, 15)
            this.addChild(this._timeLabel)

            this._enemy = new objects.Enemy("robber", 2)
            this.addChild(this._enemy)

            stage.addChild(this);
        }

        public update(): void {
        }

        private _onEnemyClick(event: createjs.MouseEvent): void {
        }
    }
}