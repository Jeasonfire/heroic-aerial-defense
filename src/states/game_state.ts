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

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        this.scroll -= time.delta * this.level.scrolling_speed * this.parallax_multiplier;
        draw_image(ctx, loader.get_image("bg"), Math.floor(this.scroll) % 128 + 64, 32);
        draw_image(ctx, loader.get_image("bg"), Math.floor(this.scroll) % 128 + 192, 32);
        draw_text(ctx, "Health: " + this.level.player.get_health(), 32, 5);
        ctx.save();
        ctx.translate(Math.floor(this.scroll / this.parallax_multiplier), 0);
        this.level.render(time, ctx, loader);
        ctx.restore();
    }

    public destroy() {
    }
}
