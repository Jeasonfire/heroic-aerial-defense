class Entity {
    public x: number;
    public y: number;
    public projectile_direction: number;
    public shooting_rate: number;
    public update_func: (self: Entity, level: Level) => any;
    public active: boolean;

    protected shooting_offsets: [number, number][];

    private graphic: string;
    private hitbox: Rectangle;
    private shoot_cooldown_time: number;
    private health: number;
    private last_frame_update_time = 0;

    public constructor(x: number, y: number, health: number, shooting_rate: number,
            projectile_direction: number, graphic: string,
            update_func: (self: Entity, level: Level) => any, loader: ResourceLoader) {
        this.x = x;
        this.y = y;
        this.projectile_direction = projectile_direction;
        this.shooting_rate = shooting_rate;
        this.graphic = graphic;
        this.update_func = update_func;
        this.shoot_cooldown_time = 0;
        let dims = loader.get_image_dimensions(graphic);
        this.hitbox = new Rectangle(0, 0, dims[0], dims[1]);
        this.health = health;
        this.active = true;
        this.shooting_offsets = [[Math.ceil(dims[0] / 2.0), 0]];
        this.last_frame_update_time = -1;
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
        return this.health;
    }

    public is_dead(): boolean {
        return this.health <= 0;
    }

    public shoot(projectiles: Projectile[], loader: ResourceLoader): boolean {
        if (this.shooting_rate > 0 && this.shoot_cooldown_time < Time.total_ms) {
            this.shoot_cooldown_time = Time.total_ms + 1000 / this.shooting_rate;
            for (let i = 0; i < this.shooting_offsets.length; i++) {
                projectiles.push(new Projectile(this.x + this.shooting_offsets[i][0] * this.projectile_direction,
                    this.y + this.shooting_offsets[i][1], this.projectile_direction, ProjectileType.BASIC, loader));
            }
            return true;
        } else {
            return false;
        }
    }

    public take_damage(damage: number) {
        if (this.active) {
            this.health -= damage;
        }
    }
}
