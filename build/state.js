var current_state = null;
var new_state = null;
function change_state(state) {
    new_state = state;
}
function update_state(time, ctx, loader) {
    if (new_state !== current_state) {
        if (current_state !== null) {
            current_state.destroy();
        }
        current_state = new_state;
        current_state.initialize();
    }
    current_state.render(time, ctx, loader);
}
