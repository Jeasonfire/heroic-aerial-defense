class WinState extends GenericMenuState {
    public constructor() {
        super("You win!", 58, [
            ["Main Menu", () => {
                StateManager.change_state(new MainMenuState());
            }]
        ], [], null);
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        super.render(ctx, loader);
        draw_text(ctx, "Your   score: " + ScoreManager.score, 32, 32);
    }
}
