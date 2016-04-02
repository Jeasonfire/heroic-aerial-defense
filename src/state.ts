let current_state: State = null;
let new_state: State = null;

function change_state(state: State) {
    new_state = state;
}

function update_state(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
    if (new_state !== current_state) {
        if (current_state !== null) {
            current_state.destroy();
        }
        current_state = new_state;
        current_state.initialize(loader);
    }
    current_state.render(time, ctx, loader);
}

interface State {
    initialize(loader: ResourceLoader);
    render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader);
    destroy();
}
