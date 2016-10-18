/**
 * @file play.ts
 * @author Kevin Ma
 * @description This class handles all the behaviors and attributes for the main gameplay
 * @date Oct 18 2016
 * @version 0.13.0 - crosshair cursor and outline enemy on mouseover
 */
module scenes {
    export class Play extends objects.Scene {

        // instance variables
        private _backgroundImage: createjs.Bitmap;
        private _enemy: objects.Enemy
        private _scoreLabel: objects.Label;
        private _timeLabel: objects.Label;
        private _timer: number
        private _score: number
        private _crosshairCursor: objects.Cursor
        private _onTopOfEnemy: boolean

        constructor() {
            super();
        }

        public start(): void {
            console.log('Game scene started...');

            //var initializatons    
            this._timer = 0
            this._score = 0
            stage.cursor = 'none'
            this._onTopOfEnemy = false

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

            this._initializeCursor()




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

                //spawn new enemy & cursor
                // need spawn cursor over enemy in order to retain layers
                this.removeChild(this._crosshairCursor)
                this._initializeEnemy()
                this._initializeCursor()
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
            this.addChild(this._enemy)
            this.addChild(this._enemy.lifeLabel)
        }

        /**
         * Instantiates cursor object and attaches appropiate event listeners
         * 
         * @private
         * 
         * @memberOf Play
         */
        private _initializeCursor(): void {
            this._crosshairCursor = new objects.Cursor("Crosshair")

            stage.on('stagemousemove', (event: createjs.MouseEvent) => {
                this._crosshairCursor.setPosition(
                    new objects.Vector2(
                        Math.floor(stage.mouseX),
                        Math.floor(stage.mouseY)
                    )
                )
                // check if cursor collides with hitBox of enemy
                this._onTopOfEnemy = this._checkCollision(event)

            }, this)
            this._crosshairCursor.on('click', this._onEnemyClick, this)

            this.addChild(this._crosshairCursor)
        }

        /**
         * Checks if the cursor is in hitbox of the enemy object
         * 
         * @private
         * @param {createjs.MouseEvent} event
         * @returns {boolean}
         * 
         * @memberOf Play
         */
        private _checkCollision(event: createjs.MouseEvent): boolean {
            if (this._crosshairCursor.x >= (this._enemy.x - this._enemy.halfWidth)
                && this._crosshairCursor.x <= (this._enemy.x + this._enemy.halfWidth)
                && this._crosshairCursor.y >= (this._enemy.y - this._enemy.halfHeight)
                && this._crosshairCursor.y <= (this._enemy.y + this._enemy.halfHeight)) {

                this._onEnemyMouseover(event)
                return true
            }
            else {
                this._onEnemyMouseout(event)
                return false
            }
        }

        /**
         * Removes one life from enemy. Checks for death and post death actions
         * 
         * @private
         * @param {createjs.MouseEvent} event
         * 
         * @memberOf Play
         */
        private _onEnemyClick(event: createjs.MouseEvent): void {
            if (this._onTopOfEnemy) {
                this._enemy.shot()
                console.log('clicked enemy');
            }

        }

        /**
         * Outlines enemy in red when mouse hovered over him to show that he is shootable
         * 
         * @private
         * @param {createjs.MouseEvent} event
         * 
         * @memberOf Play
         */
        private _onEnemyMouseover(event: createjs.MouseEvent): void {
            // red outline when hover over robber
            this._enemy.shadow = new createjs.Shadow("#f00", 0, 0, 25)

        }

        /**
         * Removes red outline from enemy when he is not shootable
         * 
         * @private
         * @param {createjs.MouseEvent} event
         * 
         * @memberOf Play
         */
        private _onEnemyMouseout(event: createjs.MouseEvent): void {
            // normal shadow when mouse off robber
            this._enemy.shadow = new createjs.Shadow('#000', 3, 3, 15)

        }
    }
}