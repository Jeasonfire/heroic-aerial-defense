class GameState implements State {
    private level: Level;
    private scroll: number;
    private parallax_multiplier: number;

    public initialize(loader: ResourceLoader) {
        this.level = new Level(16, new Player(), [
            new Enemy(120, 16 + Math.random() * 32, EnemyType.BASIC, loader),
            new Enemy(140, 16 + Math.random() * 32, EnemyType.BASIC, loader),
            new Enemy(160, 16 + Math.random() * 32, EnemyType.BASIC, loader),
            new Enemy(180, 16 + Math.random() * 32, EnemyType.BASIC, loader),
        ]);
        this.scroll = 0;
        this.parallax_multiplier = 4.0;
    }

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        this.scroll -= time.delta * this.level.scrolling_speed * this.parallax_multiplier;
        ctx.drawImage(loader.get_image("bg"), Math.floor(this.scroll) % 64, 0);
        ctx.drawImage(loader.get_image("bg"), 64 + Math.floor(this.scroll) % 64, 0);
        ctx.save();
        ctx.translate(Math.floor(this.scroll / this.parallax_multiplier), 0);
        this.level.render(time, ctx, loader);
        ctx.restore();
    }

    public destroy() {
    }
}
