class GameState implements State {
    private level: Level;
    private scroll: number;

    public initialize() {
        this.level = new Level(32, new Player(), [
            new Enemy(128, 28, EnemyType.BASIC)
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
        let y_movement = key[KEY_UP] ? 1 : (key[KEY_DOWN] ? -1 : 0);

        this.player.move(time, 1, y_movement);
        ctx.drawImage(loader.get_image("ship_player"), Math.floor(this.player.x), Math.floor(this.player.y));

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update_func(this.enemies[i], time);
            ctx.drawImage(loader.get_image(this.enemies[i].graphic), Math.floor(this.enemies[i].x), Math.floor(this.enemies[i].y));
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].update_func(this.projectiles[i], time);
            ctx.drawImage(loader.get_image(this.projectiles[i].graphic), Math.floor(this.projectiles[i].x), Math.floor(this.projectiles[i].y));
        }
    }
}

class Player {
    public x: number;
    public y: number;
    public speed: number;

    public constructor(x: number = 4, y: number = 28, speed: number = 24) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    public move(time: Time, x: number, y: number) {
        this.x += x * this.speed * time.delta;
        this.y += y * this.speed * time.delta;
        if (y === 0) {
            this.y = Math.floor(this.y);
        }
    }
}

class AIEntity {
    public x: number;
    public y: number;
    public graphic: string;
    public update_func: (self: AIEntity, time: Time) => any;

    public constructor(x: number, y: number,
            graphic: string, update_func: (self: AIEntity, time: Time) => any) {
        this.x = x;
        this.y = y;
        this.graphic = graphic;
        this.update_func = update_func;
    }
}

enum ProjectileType {
    BASIC
}

class Projectile extends AIEntity {
    private direction: number;

    public constructor(x: number, y: number, direction: number, projectile_type: ProjectileType) {
        super(x, y, Projectile.get_graphic(projectile_type), Projectile.get_update_func(projectile_type));
        this.direction = direction;
    }

    private static get_graphic(type: ProjectileType): string {
        switch (type) {
        default:
        case ProjectileType.BASIC:
            return "projectile_basic";
        }
    }

    private static get_update_func(type: ProjectileType): (self: Projectile, time: Time) => any {
        switch (type) {
        default:
        case ProjectileType.BASIC:
            return (self: Projectile, time: Time) => {
                self.x += self.direction * 60;
            };
        }
    }
}

enum EnemyType {
    BASIC
}

class Enemy extends AIEntity {
    public constructor(x: number, y: number, enemy_type: EnemyType) {
        super(x, y, Enemy.get_graphic(enemy_type), Enemy.get_update_func(enemy_type));
    }

    private static get_graphic(type: EnemyType): string {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return "ship_basic";
        }
    }

    private static get_update_func(type: EnemyType): (self: Enemy, time: Time) => any {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return (self: Enemy, time: Time) => {
                self.y = 28 + 5 * Math.sin(time.total_ms / 4000.0 * 2.0 * Math.PI);
            };
        }
    }
}
