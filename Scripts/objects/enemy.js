var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file enemy.ts
 * @author Kevin Ma
 * @description This class handles all behaviors and attributes of the Enemy game object and
 * extends from the GameObject class
 * @date Oct 18 2016
 * @version 0.12.0
 */
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(imageString, life) {
            _super.call(this, enemyAtlas, imageString, "");
            var initialPosition = new objects.Vector2(Math.floor((Math.random() * config.Screen.WIDTH)), Math.floor(Math.random() * config.Screen.HEIGHT));
            // randomly spawn robbers locations
            this.setPosition(initialPosition);
            this._life = life;
            this._alive = true;
            this._lifeLabel = new objects.Label("Lives: " + this.life, "20px comic sans ms", "#f7e907", initialPosition.x, initialPosition.y - this.height / 2);
            this._lifeLabel.shadow = new createjs.Shadow('#000', 2, 2, 5);
        }
        Object.defineProperty(Enemy.prototype, "lifeLabel", {
            get: function () {
                return this._lifeLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "life", {
            get: function () {
                return this._life;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "alive", {
            get: function () {
                return this._alive;
            },
            enumerable: true,
            configurable: true
        });
        Enemy.prototype.update = function () {
            if (this.life == 0) {
                this._dead();
            }
        };
        Enemy.prototype.setPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        Enemy.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        Enemy.prototype.shot = function () {
            this._life--;
            this._lifeLabel.text = "Lives: " + this.life;
        };
        Enemy.prototype._dead = function () {
            currentScene.removeChild(this.lifeLabel);
            currentScene.removeChild(this);
            this._alive = false;
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map