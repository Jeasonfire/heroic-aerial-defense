class Level {
    public player: Player;
    public projectiles: Projectile[];
    public enemies: Enemy[];
    public scrolling_speed: number;
    public level_finish: number;

    public constructor(loader: ResourceLoader, scrolling_speed: number, template: LevelTemplate) {
        this.player = new Player(8, 32, 10, 32, loader);
        this.projectiles = [];
        let temp = template.generate_enemies(this, loader);
        this.enemies = temp[0];
        this.level_finish = template.boss ? Infinity : Time.total_ms + temp[1] / scrolling_speed * 1000.0;
        this.scrolling_speed = scrolling_speed;
    }

    public finished(): boolean {
        return Time.total_ms > this.level_finish;
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        if (this.level_finish - Time.total_ms > 1000 && this.enemies.length === 0) {
            this.level_finish = Time.total_ms + 1000;
        }

        let y_movement = 0;
        if (!this.player.is_dead()) {
            if (mouse_control) {
                if (mouse_y - this.player.y < -1) y_movement--;
                if (mouse_y - this.player.y > 1) y_movement++;
                if (mouse_down) {
                    this.player.shoot(this.projectiles, loader);
                }
            } else {
                if (input_up) y_movement--;
                if (input_down) y_movement++;
                if (input_shoot) {
                    this.player.shoot(this.projectiles, loader);
                }
            }
        }
        this.player.move(0, y_movement);
        draw_image(ctx, loader.get_image("ship_player_" + this.player.get_frame()), this.player.x, this.player.y);

        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].is_dead()) {
                this.enemies.splice(i, 1);
            } else if (!this.enemies[i].active && this.enemies[i].x - this.player.x < 60) {
                this.enemies[i].active = true;
            } else {
                this.enemies[i].update_func(this.enemies[i], this);
                this.enemies[i].x -= this.scrolling_speed * Time.delta;
                draw_image(ctx, loader.get_image(this.enemies[i].get_graphic() + "_" + this.enemies[i].get_frame()), this.enemies[i].x, this.enemies[i].y);
                let enemy_hitbox = this.enemies[i].get_hitbox();
                if (enemy_hitbox.overlap(this.player.get_hitbox()) && this.enemies[i].get_health() > 0) {
                    this.enemies[i].take_damage(Infinity);
                    this.player.take_damage(2);
                    ParticleManager.burst(this.enemies[i].x, this.enemies[i].y, 0.1, 30, 140);
                }
                if (this.enemies[i].x < -enemy_hitbox.w / 2.0) {
                    this.enemies[i].take_damage(Infinity);
                }
            }
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].dead) {
                this.projectiles.splice(i, 1);
            } else {
                this.projectiles[i].update_func(this.projectiles[i], this);
                this.projectiles[i].check_hits(this);
                draw_image(ctx, loader.get_image(this.projectiles[i].get_graphic()), this.projectiles[i].x, this.projectiles[i].y);
                if (this.projectiles[i].x - this.player.x > 64) {
                    this.projectiles[i].dead = true;
                }
            }
        }
    }
}
