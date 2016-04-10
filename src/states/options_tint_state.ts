class OptionsTintState extends GenericMenuState {
    public scrolling_speed = 1.0;

    public constructor() {
        super("Color", 22, [], [
            [{name: "Red", slider_pos: (tint[0] - 1.0 / 3.0) * 3.0 / 2.0}, (slider_pos: number) => {
                tint[0] = slider_pos * 2.0 / 3.0 + 1.0 / 3.0;
            }],
            [{name: "Green", slider_pos: (tint[1] - 1.0 / 3.0) * 3.0 / 2.0}, (slider_pos: number) => {
                tint[1] = slider_pos * 2.0 / 3.0 + 1.0 / 3.0;
            }],
            [{name: "Blue", slider_pos: (tint[2] - 1.0 / 3.0) * 3.0 / 2.0}, (slider_pos: number) => {
                tint[2] = slider_pos * 2.0 / 3.0 + 1.0 / 3.0;
            }],
        ], () => { StateManager.change_state(new OptionsState()); });
    }
}
