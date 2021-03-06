class Level {
    public player: Player;
    public projectiles: Projectile[];
    public enemies: Enemy[];
    public scrolling_speed: number;
    public level_finish: number;

    private player_dead: boolean;
    private starting_score: number;

    public constructor(loader: ResourceLoader, scrolling_speed: number, template: LevelTemplate) {
        this.player = new Player(8, 32, 10, 32, loader);
        this.projectiles = [];
        let temp = template.generate_enemies(this, loader);
        this.enemies = temp[0];
        this.level_finish = template.boss ? Infinity : Time.total_ms + temp[1] / scrolling_speed * 1000.0;
        this.scrolling_speed = scrolling_speed;
        this.player_dead = false;
        this.starting_score = ScoreManager.score;
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
            if ((y_movement < 0 && this.player.y < 0) || (y_movement > 0 && this.player.y > 64)) {
                y_movement = 0;
            }
            this.player.move(0, y_movement);
            draw_image(ctx, loader.get_image("ship_player"), this.player.x, this.player.y);
        } else if (!this.player_dead) {
            this.player_dead = true;
            ScoreManager.score = this.starting_score;
            ParticleManager.burst(this.player.x, this.player.y, 2, 50, 20);
        }

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy_hitbox = this.enemies[i].get_hitbox();
            if (this.enemies[i].is_dead()) {
                ParticleManager.burst(this.enemies[i].x, this.enemies[i].y, 0.2,
                    5 * Enemy.get_health(this.enemies[i].type));
                this.enemies.splice(i, 1);
            } else if (!this.enemies[i].active && this.enemies[i].x - enemy_hitbox.w / 2.0 < 70) {
                this.enemies[i].active = true;
            } else {
                this.enemies[i].x -= this.scrolling_speed * Time.delta;
                if (this.enemies[i].active) {
                    this.enemies[i].update_func(this.enemies[i], this);
                    draw_image(ctx, loader.get_image(this.enemies[i].get_graphic()), this.enemies[i].x, this.enemies[i].y);
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
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].dead) {
                this.projectiles.splice(i, 1);
            } else {
                this.projectiles[i].update_func(this.projectiles[i], this);
                this.projectiles[i].check_hits(this);
                draw_image(ctx, loader.get_image(this.projectiles[i].get_graphic()), this.projectiles[i].x, this.projectiles[i].y);
                if (this.projectiles[i].x > 64 || this.projectiles[i].x < 0) {
                    this.projectiles[i].dead = true;
                }
            }
        }
    }
}
