class GameState implements State {
    private level: Level;
    private scroll: number;

    public initialize(loader: ResourceLoader) {
        this.level = new Level(32, new Player(), [
            new Enemy(120, 16 + Math.random() * 32, EnemyType.BASIC, loader),
            new Enemy(130, 16 + Math.random() * 32, EnemyType.BASIC, loader),
            new Enemy(140, 16 + Math.random() * 32, EnemyType.BASIC, loader),
            new Enemy(150, 16 + Math.random() * 32, EnemyType.BASIC, loader),
        ]);
        this.scroll = 0;
    }

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        this.scroll -= time.delta * this.level.scrolling_speed;
        ctx.drawImage(loader.get_image("bg"), Math.floor(this.scroll) % 64, 0);
        ctx.drawImage(loader.get_image("bg"), 64 + Math.floor(this.scroll) % 64, 0);
        ctx.save();
        ctx.translate(Math.floor(this.scroll), 0);
        this.level.render(time, ctx, loader);
        ctx.restore();
    }

    public destroy() {
    }
}

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
        let y_movement = key[KEY_UP] ? 1 : key[KEY_DOWN] ? -1 : 0;

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
            }
        }
    }
}
