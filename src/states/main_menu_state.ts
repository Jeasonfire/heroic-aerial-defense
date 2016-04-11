class MainMenuState extends GenericMenuState {
    public constructor() {
        super("", 46, [
            ["Play", () => {
                StateManager.change_state(new GameState());
            }],
            ["Options", () => {
                StateManager.change_state(new OptionsState());
            }]
        ], [], null);
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        super.render(ctx, loader);
        draw_text(ctx, "Heroic", 20, 10, 1);
        draw_text(ctx, "Aerial", 28, 16, 1);
        draw_text(ctx, "Defense", 41, 22, 1);
    }
}
