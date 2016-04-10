class OptionsState extends GenericMenuState {
    public scrolling_speed = 1.0;

    public constructor() {
        super("Options", 22, [
            ["Color", () => {
                StateManager.change_state(new OptionsTintState());
            }],
            ["Audio", () => {
                StateManager.change_state(new OptionsAudioState());
            }]
        ], [], () => { StateManager.change_state(new MainMenuState()); });
    }
}
