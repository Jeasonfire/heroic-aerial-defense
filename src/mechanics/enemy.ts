enum EnemyType {
    IMP, GREATER_IMP, DEMON, GREATER_DEMON
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
        case EnemyType.IMP:
            return (self: Enemy, level: Level) => {
                if (self.data["origin"] === undefined) {
                    self.data["origin"] = self.y;
                }
                self.y = self.data["origin"] + 3 * Math.sin(Time.total_ms / 12000.0 * 2.0 * Math.PI);
            };
        case EnemyType.GREATER_IMP:
            return (self: Enemy, level: Level) => {
                if (self.data["origin"] === undefined) {
                    self.data["origin"] = self.y;
                }
                self.y = self.data["origin"] + 3 * Math.sin(Time.total_ms / 3000.0 * 2.0 * Math.PI);
            };
        case EnemyType.DEMON:
            return (self: Enemy, level: Level) => {
                self.shoot(level.projectiles, loader);
            };
        case EnemyType.GREATER_DEMON:
            return (self: Enemy, level: Level) => {
                if (self.data["shoot_count"] === undefined) {
                    self.data["shoot_count"] = 0;
                    self.data["original_shooting_rate"] = self.shooting_rate;
                    self.data["origin"] = self.y;
                }
                self.y = self.data["origin"] + 4 * Math.sin(Time.total_ms / 3000.0 * 2.0 * Math.PI);
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
        case EnemyType.IMP:
            return 2;
        case EnemyType.GREATER_IMP:
            return 4;
        case EnemyType.DEMON:
            return 1;
        case EnemyType.GREATER_DEMON:
            return 2;
        }
    }

    private static get_shooting_rate(type: EnemyType): number {
        switch (type) {
        default:
            return 0;
        case EnemyType.DEMON:
            return 0.4;
        case EnemyType.GREATER_DEMON:
            return 12;
        }
    }
}
