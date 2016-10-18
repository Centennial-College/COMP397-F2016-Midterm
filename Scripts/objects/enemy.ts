/**
 * @file enemy.ts
 * @author Kevin Ma
 * @description This class handles all behaviors and attributes of the Enemy game object and
 * extends from the GameObject class
 * @date Oct 18 2016
 * @version 0.13.0
 */
module objects {
    export class Enemy extends objects.GameObject {

        //instance variables
        private _move: objects.Vector2;
        private _speed: number;

        private _life: number;

        private _alive: boolean
        private _lifeLabel: objects.Label

        // public variables
        public name: string;
        public width: number;
        public height: number;
        public center: objects.Vector2;

        constructor(imageString: string, life: number) {
            super(enemyAtlas, imageString, "");

            let randomXCoord = Math.floor((Math.random() * config.Screen.WIDTH))
            let randomYCoord = Math.floor((Math.random() * config.Screen.HEIGHT))

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

        public update(): void {
            if (this.life == 0) {
                this._dead()
            }
        }

        public setPosition(pos: objects.Vector2): void {
            this.x = pos.x;
            this.y = pos.y;
        }

        public getPosition(): objects.Vector2 {
            return new objects.Vector2(this.x, this.y);
        }

        public shot(): void {
            // update life and respective label
            this._life--;
            this._lifeLabel.text = "Lives: " + this.life

        }

        private _dead(): void {
            currentScene.removeChild(this.lifeLabel)
            currentScene.removeChild(this)
            this._alive = false
        }
    }
}