class Player {
    public x: number;
    public y: number;
    public shooting_rate: number;
    public speed: number;

    private shoot_cooldown_time: number;

    public constructor(x: number = 4, y: number = 28, shooting_rate: number = 10, speed: number = 24) {
        this.x = x;
        this.y = y;
        this.shooting_rate = shooting_rate;
        this.speed = speed;
        this.shoot_cooldown_time = 0;
    }

    public move(time: Time, x: number, y: number) {
        this.x += x * this.speed * time.delta;
        this.y += y * this.speed * time.delta * 2.0;
        if (y === 0) {
            this.y = Math.floor(this.y);
        }
    }

    public shoot(time: Time): Projectile {
        if (this.shoot_cooldown_time > time.total_ms) {
            return null;
        } else {
            this.shoot_cooldown_time = time.total_ms + 1000 / this.shooting_rate;
            return new Projectile(this.x + 7, this.y + 4, 1, ProjectileType.BASIC);
        }
    }
}
