var MainMenuState = (function () {
    function MainMenuState() {
    }
    MainMenuState.prototype.initialize = function () {
    };
    MainMenuState.prototype.render = function (time, ctx, loader) {
        ctx.drawImage(loader.get_image("main_menu_bg"), 0, 0);
        draw_text(ctx, "Main menu", 1, 1);
        draw_text(ctx, "Time: " + time.total_ms, 1, 7);
        if (time.total_ms > 10) {
            change_state(new GameState());
        }
    };
    MainMenuState.prototype.destroy = function () {
    };
    return MainMenuState;
}());
