class OptionsAudioState extends GenericMenuState {
    public constructor() {
        super("Audio", 22, [], [
            [{name: "Game sfx", slider_pos: vol_game_sfx}, (slider_pos: number) => {
                vol_game_sfx = slider_pos;
            }],
            [{name: "Menu sfx", slider_pos: vol_menu_sfx}, (slider_pos: number) => {
                vol_menu_sfx = slider_pos;
            }],
            [{name: "Music", slider_pos: vol_music}, (slider_pos: number) => {
                vol_music = slider_pos;
            }],
        ], () => { StateManager.change_state(new OptionsState()); });
    }
}
