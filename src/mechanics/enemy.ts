enum EnemyType {
    BASIC
}

class Enemy extends AIEntity {
    public active: boolean;

    private hitbox: Rectangle;
    private stats: {health: number, dead: boolean, frame: number};

    public constructor(x: number, y: number, enemy_type: EnemyType, loader: ResourceLoader) {
        let graphic = Enemy.get_graphic(enemy_type);
        super(x, y, graphic, Enemy.get_update_func(enemy_type));

        let dims = loader.get_image_dimensions(graphic + "_0");
        this.hitbox = new Rectangle(0, 0, dims[0], dims[1]);
        this.active = false;
        this.stats = {health: Enemy.get_health(enemy_type), dead: false, frame: 0};
    }

    public get_hitbox(): Rectangle {
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;
        return this.hitbox;
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

    public is_dead(): boolean {
        return this.stats.dead;
    }

    public get_frame(): number {
        return Math.min(2, Math.floor(this.stats.frame));
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
                self.y += 0.05 * Math.sin(time.total_ms / 4000.0 * 2.0 * Math.PI);
            };
        }
    }

    private static get_health(type: EnemyType): number {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return 3;
        }
    }
}
