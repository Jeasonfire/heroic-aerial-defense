class Entity {
    public x: number;
    public y: number;
    public projectile_direction: number;
    public shooting_rate: number;
    public update_func: (self: Entity, level: Level, time: Time) => any;
    public active: boolean;

    protected shooting_offset: [number, number];

    private graphic: string;
    private hitbox: Rectangle;
    private shoot_cooldown_time: number;
    private stats: {health: number, dead: boolean, frame: number};

    public constructor(x: number, y: number, health: number, shooting_rate: number,
            projectile_direction: number, graphic: string,
            update_func: (self: Entity, level: Level, time: Time) => any, loader: ResourceLoader) {
        this.x = x;
        this.y = y;
        this.projectile_direction = projectile_direction;
        this.shooting_rate = shooting_rate;
        this.graphic = graphic;
        this.update_func = update_func;
        this.shoot_cooldown_time = 0;
        let dims = loader.get_image_dimensions(graphic);
        this.hitbox = new Rectangle(0, 0, dims[0], dims[1]);
        this.stats = {health: health, dead: false, frame: 0};
        this.active = true;
        this.shooting_offset = [Math.ceil(dims[0] / 2.0), 0];
    }

    public get_graphic(): string {
        return this.graphic;
    }

    public get_hitbox(): Rectangle {
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;
        return this.hitbox;
    }

    public get_health(): number {
        return this.stats.health;
    }

    public is_dead(): boolean {
        return this.stats.dead;
    }

    public get_frame(): number {
        return Math.min(2, Math.floor(this.stats.frame));
    }

    public shoot(time: Time, projectiles: Projectile[], loader: ResourceLoader): boolean {
        if (this.shooting_rate > 0 && this.shoot_cooldown_time < time.total_ms) {
            this.shoot_cooldown_time = time.total_ms + 1000 / this.shooting_rate;
            projectiles.push(new Projectile(this.x + this.shooting_offset[0] * this.projectile_direction,
                this.y + this.shooting_offset[1], this.projectile_direction, ProjectileType.BASIC, loader));
            return true;
        } else {
            return false;
        }
    }

    public take_damage(damage: number) {
        if (this.active) {
            this.stats.health -= damage;
            if (this.stats.health <= 0) {
                new TWEEN.Tween(this.stats)
                        .to({frame: 3}, 150)
                        .easing(TWEEN.Easing.Cubic.Out)
                        .onComplete(() => { this.stats.dead = true; })
                        .start();
            }
        }
    }
}
