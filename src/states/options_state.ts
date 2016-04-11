class OptionsState extends GenericMenuState {
    public constructor() {
        super("Options", 22, [
            ["Color", () => {
                StateManager.change_state(new OptionsTintState());
            }],
            ["Audio", () => {
                StateManager.change_state(new OptionsAudioState());
            }],
            ["Controls", () => {
                StateManager.change_state(new OptionsControlsState());
            }],
        ], [], () => { StateManager.change_state(new MainMenuState()); });
    }
}
