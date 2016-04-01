class GameState implements State {
    public initialize() {
    }
    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        ctx.drawImage(loader.get_image("game_art"), 0, 0);
        draw_text(ctx, "Game", 1, 1);
    }
    public destroy() {
    }
}
