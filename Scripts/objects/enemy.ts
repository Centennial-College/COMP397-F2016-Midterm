module objects {
    export class Enemy extends objects.GameObject {

        private _move: objects.Vector2;
        private _speed: number;

        private _life: number;

        // public variables
        public name: string;
        public width: number;
        public height: number;
        public center: objects.Vector2;

        constructor(imageString: string, life: number) {
            super(enemyAtlas, imageString, "");

            // randomly spawn robbers locations
            this.setPosition(new Vector2(
                (Math.random() * config.Screen.WIDTH),
                Math.random() * config.Screen.HEIGHT
            ))

            this._life = life;
        }

        get life(): number {
            return this._life;
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
            console.log('enemy has been shot.');
            this._life--;
            console.log('remaining lives: ' + this.life);

        }

        private _dead(): void {
            currentScene.removeChild(this);
        }
    }
}