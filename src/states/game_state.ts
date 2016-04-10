class GameState implements State {
    public scrolling_speed = 1.5;

    private level: Level;
    private level_num: number;
    private start_time: number;
    private dead_time: number;

    public constructor(level: number = 0) {
        this.level_num = level;
    }

    public initialize(loader: ResourceLoader) {
        if (this.level_num >= LevelTemplate.LEVELS.length || this.level_num < 0) {
            console.log("[ERROR]: Tried to load a level that doesn't exist. (Level " + this.level_num + ")");
            console.log("[WORKAROUND]: Loading level 0.");
            this.level_num = 0;
        }
        this.level = new Level(loader, 16, LevelTemplate.LEVELS[this.level_num]);
        this.start_time = Time.total_ms;
        this.dead_time = -1;
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        draw_text(ctx, "Health: " + this.level.player.get_health(), 32, 5);
        if (Time.total_ms - this.start_time < 2000) {
            draw_text(ctx, String(this.level_num + 1), 32, 32, 2);
        }
        if (Time.total_ms - this.dead_time < 3000 && this.level.player.is_dead()) {
            draw_text(ctx, "You died.", 32, 50);
        }
        this.level.render(ctx, loader);


        if (this.level.player.is_dead()) {
            if (this.dead_time === -1) {
                this.dead_time = Time.total_ms;
            }
            if (Time.total_ms - this.dead_time > 3000) {
                StateManager.change_state(new RestartState(this.level_num));
            }
        } else if (this.level.finished()) {
            if (this.level_num + 1 < LevelTemplate.LEVELS.length) {
                StateManager.change_state(new GameState(this.level_num + 1));
            } else {
                StateManager.change_state(new MainMenuState());
            }
        }
        if (input_reset) {
            StateManager.change_state(new GameState(this.level_num));
        }
    }

    public destroy() {
        set_translation(0, 0);
    }
}
