var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
        }
        Play.prototype.start = function () {
            //var initializatons    
            this._timer = 0;
            this._score = 0;
            this._backgroundImage = new createjs.Bitmap(assets.getResult("Bg"));
            this.addChild(this._backgroundImage);
            this._scoreLabel = new objects.Label("Score: 0", "40px comic sans ms", "#f7e907", 90, 40);
            this._scoreLabel.shadow = new createjs.Shadow("#000", 5, 5, 15);
            this.addChild(this._scoreLabel);
            this._timeLabel = new objects.Label("Time: 0", "40px comic sans ms", "#f7e907", 100, 90);
            this._timeLabel.shadow = new createjs.Shadow("#000", 5, 5, 15);
            this.addChild(this._timeLabel);
            this._initializeEnemy();
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            this._timer++;
            this._timeLabel.text = "Time: " + Math.floor(this._timer / config.Game.FPS);
            // dead Enemy
            if (!this._enemy.alive) {
                // update score
                this._score++;
                this._scoreLabel.text = "Score: " + this._score;
                //spawn new enemy
                this._initializeEnemy();
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
            this._enemy = new objects.Enemy("robber", Math.floor(Math.random() * 5 + 1));
            this._enemy.on('click', this._onEnemyClick, this);
            this.addChild(this._enemy);
            this.addChild(this._enemy.lifeLabel);
        };
        Play.prototype._onEnemyClick = function (event) {
            this._enemy.shot();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map