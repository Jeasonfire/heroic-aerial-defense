class Level {
    public player: Player;
    public projectiles: Projectile[];
    public enemies: Enemy[];
    public scrolling_speed: number;

    public constructor(loader: ResourceLoader, scrolling_speed: number, enemies: Enemy[]) {
        this.player = new Player(8, 32, 10, scrolling_speed, loader);
        this.player.speed = scrolling_speed;
        this.projectiles = [];
        this.enemies = enemies;
        this.scrolling_speed = scrolling_speed;
    }

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        let y_movement = 0;
        if (!this.player.is_dead()) {
            if (key[KEY_UP]) y_movement--;
            if (key[KEY_DOWN]) y_movement++;
            if (key[KEY_SHOOT]) {
                this.player.shoot(time, this.projectiles, loader);
            }
        }
        this.player.move(time, 1, y_movement);
        if (key[KEY_RESET]) {
            StateManager.change_state(new GameState());
        }
        draw_image(ctx, loader.get_image("ship_player_" + this.player.get_frame()), this.player.x, this.player.y);

        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].is_dead()) {
                this.enemies.splice(i, 1);
            } else if (!this.enemies[i].active && this.enemies[i].x - this.player.x < 60) {
                this.enemies[i].active = true;
            } else {
                this.enemies[i].update_func(this.enemies[i], this, time);
                draw_image(ctx, loader.get_image(this.enemies[i].get_graphic() + "_" + this.enemies[i].get_frame()), this.enemies[i].x, this.enemies[i].y);
                if (this.enemies[i].get_hitbox().overlap(this.player.get_hitbox())) {

                }
            }
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].dead) {
                this.projectiles.splice(i, 1);
            } else {
                this.projectiles[i].update_func(this.projectiles[i], this, time);
                this.projectiles[i].x += this.player.speed * time.delta;
                this.projectiles[i].check_hits(this);
                draw_image(ctx, loader.get_image(this.projectiles[i].get_graphic()), this.projectiles[i].x, this.projectiles[i].y);
                if (this.projectiles[i].x - this.player.x > 64) {
                    this.projectiles[i].dead = true;
                }
            }
        }
    }
}
