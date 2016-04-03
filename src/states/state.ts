class StateManager {
    private static current_state: State = null;
    private static new_state: State = null;
    private static should_change: boolean = false;

    public static change_state(state: State) {
        StateManager.new_state = state;
        StateManager.should_change = true;
    }

    public static update_state(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        if (StateManager.should_change) {
            if (StateManager.current_state !== null) {
                StateManager.current_state.destroy();
            }
            StateManager.current_state = StateManager.new_state;
            StateManager.current_state.initialize(loader);
            StateManager.should_change = false;
        }
        if (StateManager.current_state !== null) {
            StateManager.current_state.render(ctx, loader);
        }
    }
}

interface State {
    initialize(loader: ResourceLoader);
    render(ctx: CanvasRenderingContext2D, loader: ResourceLoader);
    destroy();
}
