/**
 * @file gameobject.ts
 * @author Kevin Ma
 * @description This class is blueprint/template which all gameobjects build off from
 * @date Oct 18 2016
 * @version 1.0.0 - fixed two MAJOR bugs and Initial Release
 */
module objects {
    export abstract class GameObject extends createjs.Sprite {
        // instance variables
        private _width: number;
        private _height: number;
        private _name: string;
        private _position: Vector2;
        private _deathAnim: string;
        private _numberOfDeathAnimationFrames: number;

        // PUBLIC PROPERTIES
        get deathAnim(): string {
            return this._deathAnim
        }

        get numberOfDeathAnimationFrames(): number {
            return this._numberOfDeathAnimationFrames
        }

        get width(): number {
            return this._width
        }

        set width(w: number) {
            this._width = w;
        }

        get height(): number {
            return this._height
        }

        get halfWidth(): number {
            return this.width / 2
        }

        get halfHeight(): number {
            return this.height / 2
        }

        set height(h: number) {
            this._height = h;
        }

        get name(): string {
            return this._name;
        }

        set name(s: string) {
            this._name = s;
        }

        get position(): Vector2 {
            return this._position
        }

        set position(p: Vector2) {
            this._position = p;
        }

        constructor(atlas: createjs.SpriteSheet, imageString: string, deathAnimString: string, numberOfDeathAnimFrames: number) {
            super(atlas, imageString);

            this._deathAnim = deathAnimString
            this._numberOfDeathAnimationFrames = numberOfDeathAnimFrames
            this._initialize(imageString);
            this.start();
        }

        private _initialize(imageString: string): void {
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.position = new Vector2(this.x, this.y);

        }

        public start(): void { }
        public update(): void { }
    }
}