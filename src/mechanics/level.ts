class Level {
    public player: Player;
    public projectiles: Projectile[];
    public enemies: Enemy[];
    public scrolling_speed: number;

    private level_finish: number;

    public constructor(loader: ResourceLoader, scrolling_speed: number, template: LevelTemplate) {
        this.player = new Player(8, 32, 10, scrolling_speed, loader);
        this.player.speed = scrolling_speed;
        this.projectiles = [];
        let temp = template.generate_enemies(this, loader);
        this.enemies = temp[0];
        this.level_finish = temp[1];
        this.scrolling_speed = scrolling_speed;
    }

    public finished(): boolean {
        return this.player.x > this.level_finish;
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        let y_movement = 0;
        if (!this.player.is_dead()) {
            if (input_up) y_movement--;
            if (input_down) y_movement++;
            if (input_shoot) {
                this.player.shoot(this.projectiles, loader);
            }
        }
        this.player.move(1, y_movement);
        draw_image(ctx, loader.get_image("ship_player_" + this.player.get_frame()), this.player.x, this.player.y);

        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].is_dead()) {
                this.enemies.splice(i, 1);
            } else if (!this.enemies[i].active && this.enemies[i].x - this.player.x < 60) {
                this.enemies[i].active = true;
            } else {
                this.enemies[i].update_func(this.enemies[i], this);
                draw_image(ctx, loader.get_image(this.enemies[i].get_graphic() + "_" + this.enemies[i].get_frame()), this.enemies[i].x, this.enemies[i].y);
                if (this.enemies[i].get_hitbox().overlap(this.player.get_hitbox()) && this.enemies[i].get_health() > 0) {
                    this.enemies[i].take_damage(Infinity);
                    this.player.take_damage(2);
                    ParticleManager.burst(this.enemies[i].x, this.enemies[i].y, 0.1, 30, 140);
                }
            }
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].dead) {
                this.projectiles.splice(i, 1);
            } else {
                this.projectiles[i].update_func(this.projectiles[i], this);
                this.projectiles[i].x += this.player.speed * Time.delta;
                this.projectiles[i].check_hits(this);
                draw_image(ctx, loader.get_image(this.projectiles[i].get_graphic()), this.projectiles[i].x, this.projectiles[i].y);
                if (this.projectiles[i].x - this.player.x > 64) {
                    this.projectiles[i].dead = true;
                }
            }
        }
    }
}
