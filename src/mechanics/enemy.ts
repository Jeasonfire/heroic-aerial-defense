enum EnemyType {
    BASIC, TURRET_ADVANCED, TURRET_BASIC
}

class Enemy extends Entity {
    private data: {};

    public constructor(x: number, y: number, enemy_type: EnemyType, level: Level, loader: ResourceLoader) {
        super(x, y, Enemy.get_health(enemy_type), Enemy.get_shooting_rate(enemy_type),
            -1, Enemy.get_graphic(enemy_type), Enemy.get_update_func(enemy_type, loader), loader);
        this.active = false;
        this.data = {};
    }

    private static get_graphic(type: EnemyType): string {
        switch (type) {
        default:
            return "ship_basic";
        }
    }

    private static get_update_func(type: EnemyType, loader: ResourceLoader): (self: Enemy, level: Level) => any {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return (self: Enemy, level: Level) => {
                self.y += 0.05 * Math.sin(Time.total_ms / 4000.0 * 2.0 * Math.PI);
            };
        case EnemyType.TURRET_BASIC:
            return (self: Enemy, level: Level) => {
                self.shoot(level.projectiles, loader);
            };
        case EnemyType.TURRET_ADVANCED:
            return (self: Enemy, level: Level) => {
                if (self.data["shoot_count"] === undefined) {
                    self.data["shoot_count"] = 0;
                    self.data["original_shooting_rate"] = self.shooting_rate;
                }
                if (self.shoot(level.projectiles, loader)) {
                    self.data["shoot_count"]++;
                    if (self.data["shoot_count"] === 3) {
                        self.shooting_rate = 0.3;
                        self.data["shoot_count"] = 0;
                    }
                    if (self.data["shoot_count"] === 1) {
                        self.shooting_rate = self.data["original_shooting_rate"];
                    }
                }
            };
        }
    }

    private static get_health(type: EnemyType): number {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return 3;
        case EnemyType.TURRET_BASIC:
            return 1;
        case EnemyType.TURRET_ADVANCED:
            return 2;
        }
    }

    private static get_shooting_rate(type: EnemyType): number {
        switch (type) {
        default:
        case EnemyType.BASIC:
            return 0;
        case EnemyType.TURRET_BASIC:
            return 0.4;
        case EnemyType.TURRET_ADVANCED:
            return 12;
        }
    }
}
