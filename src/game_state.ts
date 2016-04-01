class GameState implements State {
    private level: Level;
    private scroll: number;

    public initialize() {
        this.level = new Level(new Player(), []);
        this.scroll = 0;
    }

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        this.scroll -= time.delta * 32;
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
    public enemies: Enemy[];

    public constructor(player: Player = new Player(), enemies: Enemy[] = []) {
        this.player = player;
        this.enemies = enemies;
    }

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        this.player.move(time, 1, 0);
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update_func(this.enemies[i], time);
        }

        ctx.drawImage(loader.get_image("player_ship"), Math.floor(this.player.x), Math.floor(this.player.y));
    }
}

class Player {
    public x: number;
    public y: number;
    public speed: number;

    public constructor(x: number = 4, y: number = 28, speed: number = 32) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    public move(time: Time, x: number, y: number) {
        this.x += x * this.speed * time.delta;
        this.y += y * this.speed * time.delta;
    }
}

class Enemy {
    public x: number;
    public y: number;
    public graphic: string;
    public update_func: (self: Enemy, time: Time) => any;

    public constructor(x: number = 0, y: number = 28,
            graphic: string = "basic_ship",
            update_func: (self: Enemy, time: Time) => any = () => {}) {
        this.x = x;
        this.y = y;
        this.graphic = graphic;
        this.update_func = update_func;
    }
}
