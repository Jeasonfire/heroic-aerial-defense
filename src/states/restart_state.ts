class RestartState extends GenericMenuState {
    public scrolling_speed = 1.5;

    private level_num: number;

    public constructor(level: number) {
        super("Continue?", 40, [
            ["Continue", () => {
                StateManager.change_state(new GameState(level));
            }],
            ["Main Menu", () => {
                StateManager.change_state(new MainMenuState());
            }]
        ], [], null);
        this.level_num = level;
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        super.render(ctx, loader);
        if (input_reset) {
            StateManager.change_state(new GameState(this.level_num));
        }
    }
}
