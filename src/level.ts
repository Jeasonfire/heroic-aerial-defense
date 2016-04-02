class Level {
    public player: Player;
    public projectiles: Projectile[];
    public enemies: Enemy[];
    public scrolling_speed: number;

    public constructor(scrolling_speed: number, player: Player, enemies: Enemy[]) {
        this.player = player;
        this.player.speed = scrolling_speed;
        this.projectiles = [];
        this.enemies = enemies;
        this.scrolling_speed = scrolling_speed;
    }

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        let y_movement = key[KEY_UP] ? -1 : key[KEY_DOWN] ? 1 : 0;
        this.player.move(time, 1, y_movement);
        ctx.drawImage(loader.get_image("ship_player"), Math.floor(this.player.x), Math.floor(this.player.y));

        if (key[KEY_SHOOT]) {
            let projectile = this.player.shoot(time);
            if (projectile !== null) {
                this.projectiles.push(projectile);
            }
        }

        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].is_dead()) {
                this.enemies.splice(i, 1);
            } else {
                this.enemies[i].update_func(this.enemies[i], time);
                ctx.drawImage(loader.get_image(this.enemies[i].graphic), Math.floor(this.enemies[i].x), Math.floor(this.enemies[i].y));
            }
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].dead) {
                this.projectiles.splice(i, 1);
            } else {
                this.projectiles[i].update_func(this.projectiles[i], time);
                this.projectiles[i].check_hits(this.enemies);
                ctx.drawImage(loader.get_image(this.projectiles[i].graphic), Math.floor(this.projectiles[i].x), Math.floor(this.projectiles[i].y));
                if (this.projectiles[i].x - this.player.x > 64) {
                    this.projectiles[i].dead = true;
                }
            }
        }
    }
}
