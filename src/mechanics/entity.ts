class Entity {
    public x: number;
    public y: number;
    public projectile_direction: number;
    public shooting_rate: number;
    public update_func: (self: Entity, time: Time, loader: ResourceLoader) => any;
    public active: boolean;

    private graphic: string;
    private hitbox: Rectangle;
    private shoot_cooldown_time: number;
    private stats: {health: number, dead: boolean, frame: number};

    public constructor(x: number, y: number, health: number, shooting_rate: number,
            projectile_direction: number, graphic: string,
            update_func: (self: Entity, time: Time) => any, loader: ResourceLoader) {
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
    }

    public get_graphic(): string {
        return this.graphic;
    }

    public get_hitbox(): Rectangle {
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;
        return this.hitbox;
    }

    public is_dead(): boolean {
        return this.stats.dead;
    }

    public get_frame(): number {
        return Math.min(2, Math.floor(this.stats.frame));
    }

    public shoot(time: Time, loader: ResourceLoader) {
        if (this.shooting_rate <= 0 || this.shoot_cooldown_time > time.total_ms) {
            return null;
        } else {
            this.shoot_cooldown_time = time.total_ms + 1000 / this.shooting_rate;
            return new Projectile(this.x + 4, this.y + 1, this.projectile_direction, ProjectileType.BASIC, loader);
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
