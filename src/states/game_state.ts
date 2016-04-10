class GameState implements State {
    private level: Level;
    private level_num: number;
    private scroll: number;
    private parallax_multiplier: number;
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
        this.scroll = 0;
        this.parallax_multiplier = 4.0;
        this.start_time = Time.total_ms;
        this.dead_time = -1;
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        this.scroll -= Time.delta * this.level.scrolling_speed * this.parallax_multiplier;

        set_translation(0, 0);
        draw_image(ctx, loader.get_image("bg_bot"), Math.floor(this.scroll / 1.4) % 128 + 64, 32);
        draw_image(ctx, loader.get_image("bg_bot"), Math.floor(this.scroll / 1.4) % 128 + 192, 32);
        draw_image(ctx, loader.get_image("bg_mid"), Math.floor(this.scroll) % 128 + 64, 32);
        draw_image(ctx, loader.get_image("bg_mid"), Math.floor(this.scroll) % 128 + 192, 32);
        draw_image(ctx, loader.get_image("bg_top"), Math.floor(this.scroll * 1.7) % 128 + 64, 32);
        draw_image(ctx, loader.get_image("bg_top"), Math.floor(this.scroll * 1.7) % 128 + 192, 32);

        draw_text(ctx, "Health: " + this.level.player.get_health(), 32, 5);
        if (Time.total_ms - this.start_time < 2000) {
            draw_text(ctx, String(this.level_num + 1), 32, 32, 2);
        }
        if (Time.total_ms - this.dead_time < 3000 && this.level.player.is_dead()) {
            draw_text(ctx, "You died.", 32, 50);
        }

        set_translation(Math.floor(this.scroll / this.parallax_multiplier), 0);
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
