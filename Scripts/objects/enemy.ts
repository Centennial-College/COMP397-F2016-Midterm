/**
 * @file enemy.ts
 * @author Kevin Ma
 * @description This class handles all behaviors and attributes of the Enemy game object and
 * extends from the GameObject class
 * @date Oct 18 2016
 * @version 1.1.0 - when enemy spawns, faces random directions
 */
module objects {
    export class Enemy extends objects.GameObject {

        //instance variables
        private _move: objects.Vector2;
        private _speed: number;

        private _life: number;

        private _alive: boolean
        private _lifeLabel: objects.Label

        private _deadAnimPlayedDuration: number

        // public variables
        public name: string;
        public width: number;
        public height: number;
        public center: objects.Vector2;

        constructor(imageString: string, life: number, directionFacing: number) {
            super(enemyAtlas, imageString, "poof", 5);

            // Facing right if random number generated is > 5 (50% chance)
            // else facing left
            this.scaleX = (directionFacing > 5) ? 1 : -1;

            let randomXCoord = Math.floor((Math.random() * config.Screen.WIDTH))
            let randomYCoord = Math.floor((Math.random() * config.Screen.HEIGHT))
            this._deadAnimPlayedDuration = 0

            // CHECK SPAWN BOUNDS OF THE ENEMY OBJECT'S POSITION
            // registration point is the middle of the enemy sprite
            // ensure that the spawn location is within bounds of the canvas
            // min bounds, should be at least half of enemy width so will be fully visible
            randomXCoord = Math.max(randomXCoord, this.halfWidth)
            // max bounds, should be <= screen width - half enemy width
            randomXCoord = Math.min(randomXCoord, config.Screen.WIDTH - this.halfWidth)

            // min bounds, should be at least half of enemy height so will be visible
            randomYCoord = Math.max(randomYCoord, this.halfHeight)
            // max bounds, should be <= screen height - half enemy height
            randomYCoord = Math.min(randomYCoord, config.Screen.HEIGHT - this.halfHeight)

            let initialPosition = new Vector2(
                randomXCoord,
                randomYCoord
            )

            // randomly spawn robbers locations
            this.setPosition(initialPosition)

            this._life = life;
            this._alive = true
            // this._alive = true

            // create label attributed to the enemy object
            this._lifeLabel = new objects.Label(
                "Lives: " + this.life,
                "20px comic sans ms",
                "#f7e907",
                initialPosition.x,
                initialPosition.y - this.height / 2
            )
            this._lifeLabel.shadow = new createjs.Shadow('#000', 2, 2, 5)
        }

        get lifeLabel(): objects.Label {
            return this._lifeLabel
        }

        get life(): number {
            return this._life;
        }

        get alive(): boolean {
            return this._alive
        }

        /**
         * Plays the death animation of the enemy object when lives reach 0. 
         * Checks are put in place to ensure that the animation finishes playing before
         * the enemy is removed from the scene
         * 
         * 
         * @memberOf Enemy
         */
        public update(): void {
            if (this.life == 0) {
                if (this._deadAnimPlayedDuration == 0)
                    this.gotoAndPlay(this.deathAnim)

                this._deadAnimPlayedDuration++

                if (this._deadAnimPlayedDuration >= config.Game.FPS / this.numberOfDeathAnimationFrames) {
                    this._dead()
                    this._deadAnimPlayedDuration = 0
                }
            }
        }

        public setPosition(pos: objects.Vector2): void {
            this.x = pos.x;
            this.y = pos.y;
            this.position = pos
        }

        public getPosition(): objects.Vector2 {
            return new objects.Vector2(this.x, this.y);
        }

        public shot(): void {
            // ONLY allows the player to shoot the enemy if the deathAnim
            // is not being played and the enemy is alive
            if (this._deadAnimPlayedDuration == 0 && this.life != 0) {

                // update life and respective label
                // prevents botters from using autoclickers to crash the game
                this._life -= 1
                this._lifeLabel.text = "Lives: " + this.life
            }
        }

        private _dead(): void {
            currentScene.removeChild(this.lifeLabel)
            currentScene.removeChild(this)
            this._alive = false
        }
    }
}