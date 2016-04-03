enum EnemyType {
    BASIC, TURRET
}

class Enemy extends Entity {
    public constructor(x: number, y: number, enemy_type: EnemyType, loader: ResourceLoader) {
        super(x, y, Enemy.get_health(enemy_type), Enemy.get_shooting_rate(enemy_type),
            -1, Enemy.get_graphic(enemy_type), Enemy.get_update_func(enemy_type, loader), loader);
        this.active = false;
    }

    private static get_graphic(type: EnemyType): string {
        switch (type) {
        default:
        case EnemyType.BASIC:
        case EnemyType.TURRET:
            return "ship_basic";
        }
    }

    private static get_update_func(type: EnemyType, loader: ResourceLoader): (self: Enemy, time: Time) => any {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return (self: Enemy, time: Time) => {
                self.y += 0.05 * Math.sin(time.total_ms / 4000.0 * 2.0 * Math.PI);
            };
        case EnemyType.TURRET:
            return (self: Enemy, time: Time) => {
                self.shoot(time, loader);
            };
        }
    }

    private static get_health(type: EnemyType): number {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return 3;
        case EnemyType.TURRET:
            return 2;
        }
    }

    private static get_shooting_rate(type: EnemyType): number {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return 0;
        case EnemyType.TURRET:
            return 0.5;
        }
    }
}
