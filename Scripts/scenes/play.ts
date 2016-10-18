module scenes {
    export class Play extends objects.Scene {

        private _backgroundImage: createjs.Bitmap;
        private _enemy: objects.Enemy
        private _scoreLabel: objects.Label;
        private _timeLabel: objects.Label;
        private _timer: number
        private _score: number

        constructor() {
            super();
        }

        public start(): void {
            console.log('Game scene started...');

            //var initializatons    
            this._timer = 0
            this._score = 0

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

            this._initializeEnemy()

            stage.addChild(this);
        }

        public update(): void {
            this._timer++
            this._timeLabel.text = "Time: " + Math.floor(this._timer / config.Game.FPS)

            // dead Enemy
            if (!this._enemy.alive) {
                // update score
                this._score += 5
                this._scoreLabel.text = "Score: " + this._score

                //spawn new enemy
                this._initializeEnemy()
            }

            //update scene's game objects
            this._enemy.update()
        }

        /**
         * Instantiates enemy object with random # lives between 1 and 5.
         * Attaches click event so enemy can be killed 
         * 
         * @private
         * 
         * @memberOf Play
         */
        private _initializeEnemy(): void {
            this._enemy = new objects.Enemy("robber", Math.floor(Math.random() * 5 + 1))
            this._enemy.shadow = new createjs.Shadow('#000', 3, 3, 15)
            this._enemy.on('click', this._onEnemyClick, this)
            this.addChild(this._enemy)

            this.addChild(this._enemy.lifeLabel)
        }

        private _onEnemyClick(event: createjs.MouseEvent): void {
            this._enemy.shot()
        }
    }
}