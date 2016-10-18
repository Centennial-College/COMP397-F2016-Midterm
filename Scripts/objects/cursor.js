var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file cursor.ts
 * @author Kevin Ma
 * @description This class is used for custom cursors in game
 * extends from the Bitmap class
 * @date Oct 18 2016
 * @version 0.13.0
 */
var objects;
(function (objects) {
    var Cursor = (function (_super) {
        __extends(Cursor, _super);
        //instance variables
        function Cursor(imageString) {
            _super.call(this, assets.getResult(imageString));
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            //set registration point to center
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
        }
        Cursor.prototype.setPosition = function (newPos) {
            this.x = newPos.x;
            this.y = newPos.y;
        };
        Cursor.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        return Cursor;
    }(createjs.Bitmap));
    objects.Cursor = Cursor;
})(objects || (objects = {}));
//# sourceMappingURL=cursor.js.map