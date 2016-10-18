var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file play.ts
 * @author Kevin Ma
 * @description This class handles all the behaviors and attributes for the main gameplay
 * @date Oct 18 2016
 * @version 1.1.0 - when enemy spawns, faces random directions
 */
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
        }
        Play.prototype.start = function () {
            console.log('Game scene started...');
            //var initializatons    
            this._timer = 0;
            this._score = 0;
            this._deadAnimCounter = 0;
            stage.cursor = 'none';
            this._onTopOfEnemy = false;
            this._backgroundImage = new createjs.Bitmap(assets.getResult("Bg"));
            this.addChild(this._backgroundImage);
            this._scoreLabel = new objects.Label("Score: 0", "40px comic sans ms", "#f7e907", 90, 40);
            this._scoreLabel.shadow = new createjs.Shadow("#000", 5, 5, 15);
            this.addChild(this._scoreLabel);
            this._timeLabel = new objects.Label("Time: 0", "40px comic sans ms", "#f7e907", 100, 90);
            this._timeLabel.shadow = new createjs.Shadow("#000", 5, 5, 15);
            this.addChild(this._timeLabel);
            this._initializeEnemy();
            this._initializeCursor();
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            this._timer++;
            this._timeLabel.text = "Time: " + Math.floor(this._timer / config.Game.FPS);
            // dead Enemy
            if (!this._enemy.alive) {
                this._onTopOfEnemy = false;
                // // lets animation finish playing before deleting and creating new
                // this._deadAnimCounter++
                // if (this._deadAnimCounter >= 12) {
                //     console.log('finished animation');
                //     this._deadAnimCounter = 0
                // update score
                this._score += 5;
                this._scoreLabel.text = "Score: " + this._score;
                //spawn new enemy & cursor
                // need spawn cursor over enemy in order to retain layers
                this.removeChild(this._crosshairCursor);
                this._initializeEnemy();
                this._initializeCursor();
            }
            //update scene's game objects
            this._enemy.update();
        };
        /**
         * Instantiates enemy object with random # lives between 1 and 5.
         * Attaches click event so enemy can be killed
         *
         * @private
         *
         * @memberOf Play
         */
        Play.prototype._initializeEnemy = function () {
            this._enemy = new objects.Enemy("robber", Math.floor(Math.random() * 5 + 1), // random number between 1 and 5
            Math.floor(Math.random() * 10 + 1));
            this._enemy.shadow = new createjs.Shadow('#000', 3, 3, 15);
            this.addChild(this._enemy);
            this.addChild(this._enemy.lifeLabel);
        };
        /**
         * Instantiates cursor object and attaches appropiate event listeners
         *
         * @private
         *
         * @memberOf Play
         */
        Play.prototype._initializeCursor = function () {
            var _this = this;
            this._crosshairCursor = new objects.Cursor("Crosshair");
            stage.on('stagemousemove', function (event) {
                _this._crosshairCursor.setPosition(new objects.Vector2(Math.floor(stage.mouseX), Math.floor(stage.mouseY)));
                // check if cursor collides with hitBox of enemy
                _this._onTopOfEnemy = _this._checkCollision(event);
            }, this);
            this._crosshairCursor.on('click', this._onEnemyClick, this);
            this.addChild(this._crosshairCursor);
        };
        /**
         * Checks if the cursor is in hitbox of the enemy object
         *
         * @private
         * @param {createjs.MouseEvent} event
         * @returns {boolean}
         *
         * @memberOf Play
         */
        Play.prototype._checkCollision = function (event) {
            if (this._crosshairCursor.x >= (this._enemy.x - this._enemy.halfWidth)
                && this._crosshairCursor.x <= (this._enemy.x + this._enemy.halfWidth)
                && this._crosshairCursor.y >= (this._enemy.y - this._enemy.halfHeight)
                && this._crosshairCursor.y <= (this._enemy.y + this._enemy.halfHeight)) {
                this._onEnemyMouseover(event);
                return true;
            }
            else {
                this._onEnemyMouseout(event);
                return false;
            }
        };
        /**
         * Removes one life from enemy. Checks for death and post death actions
         *
         * @private
         * @param {createjs.MouseEvent} event
         *
         * @memberOf Play
         */
        Play.prototype._onEnemyClick = function (event) {
            if (this._onTopOfEnemy) {
                this._enemy.shot();
            }
        };
        /**
         * Outlines enemy in red when mouse hovered over him to show that he is shootable
         *
         * @private
         * @param {createjs.MouseEvent} event
         *
         * @memberOf Play
         */
        Play.prototype._onEnemyMouseover = function (event) {
            // red outline when hover over robber
            this._enemy.shadow = new createjs.Shadow("#f00", 0, 0, 25);
        };
        /**
         * Removes red outline from enemy when he is not shootable
         *
         * @private
         * @param {createjs.MouseEvent} event
         *
         * @memberOf Play
         */
        Play.prototype._onEnemyMouseout = function (event) {
            // normal shadow when mouse off robber
            this._enemy.shadow = new createjs.Shadow('#000', 3, 3, 15);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map