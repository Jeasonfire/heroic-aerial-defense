var GameState = (function () {
    function GameState() {
    }
    GameState.prototype.initialize = function () {
    };
    GameState.prototype.render = function (time, ctx, loader) {
        ctx.drawImage(loader.get_image("game_art"), 0, 0);
        draw_text(ctx, "Game", 1, 1);
    };
    GameState.prototype.destroy = function () {
    };
    return GameState;
}());
