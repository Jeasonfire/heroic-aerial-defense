class MainMenuState implements State {
    public initialize() {
    }
    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        ctx.drawImage(loader.get_image("main_menu_bg"), 0, 0);
        draw_text(ctx, "Main menu", 1, 1);
        draw_text(ctx, "Time: " + time.total_ms, 1, 7);
        if (time.total_ms > 10) {
            change_state(new GameState());
        }
    }
    public destroy() {
    }
}
