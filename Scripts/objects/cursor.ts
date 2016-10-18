/**
 * @file cursor.ts
 * @author Kevin Ma
 * @description This class is used for custom cursors in game
 * extends from the Bitmap class
 * @date Oct 18 2016
 * @version 0.13.0
 */
module objects {
    export class Cursor extends createjs.Bitmap {

        //instance variables

        constructor(imageString: string) {
            super(assets.getResult(imageString))
            this.x = stage.mouseX
            this.y = stage.mouseY

            //set registration point to center
            this.regX = this.getBounds().width / 2
            this.regY = this.getBounds().height / 2
        }

        public setPosition(newPos: Vector2): void {
            this.x = newPos.x
            this.y = newPos.y
        }

        public getPosition(): objects.Vector2 {
            return new Vector2(this.x, this.y)
        }

    }
}