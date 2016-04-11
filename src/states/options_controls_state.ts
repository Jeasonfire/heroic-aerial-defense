class OptionsControlsState extends GenericMenuState {
    public constructor() {
        super("Controls", 29, [
            [OptionsControlsState.get_input_name(), () => {
                mouse_control = !mouse_control;
                this.buttons[0][0].name = OptionsControlsState.get_input_name();
            }],
        ], [], () => { StateManager.change_state(new OptionsState()); });
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        super.render(ctx, loader);
        draw_text(ctx, "Input type: ", 32, 22);
    }

    private static get_input_name() {
        return mouse_control ? "Mouse" : "Keyboard";
    }
}
