class OptionsState extends GenericMenuState {
    public constructor() {
        super("Options", 24, [
            ["Color", () => {
                StateManager.change_state(new OptionsTintState());
            }],
            ["Audio", () => {
                StateManager.change_state(new OptionsAudioState());
            }]
        ], [], () => { StateManager.change_state(new MainMenuState()); });
    }
}
