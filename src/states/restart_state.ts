class RestartState extends GenericMenuState {
    public constructor(level: number) {
        super("Continue?", 40, [
            ["Continue", () => {
                StateManager.change_state(new GameState(level));
            }],
            ["Main Menu", () => {
                StateManager.change_state(new MainMenuState());
            }]
        ], [], null);
    }
}
