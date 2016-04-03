class GameState implements State {
    private level: Level;
    private scroll: number;
    private parallax_multiplier: number;

    public initialize(loader: ResourceLoader) {
        this.level = new Level(loader, 16, [
            new Enemy(120, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
            new Enemy(140, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
            new Enemy(160, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
            new Enemy(180, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
            new Enemy(220, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
            new Enemy(240, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
            new Enemy(260, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
            new Enemy(280, 16 + Math.random() * 32, EnemyType.TURRET_BASIC, this.level, loader),
        ]);
        this.scroll = 0;
        this.parallax_multiplier = 4.0;
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
        set_translation(Math.floor(this.scroll / this.parallax_multiplier), 0);
        this.level.render(ctx, loader);
    }

    public destroy() {
        set_translation(0, 0);
    }
}
