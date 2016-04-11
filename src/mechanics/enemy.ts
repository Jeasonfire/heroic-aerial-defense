enum EnemyType {
    BOMBER, BOMBER_MKII, FIGHTER, FIGHTER_MKII, FIGHTER_MKIII
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
            return "ship_bomber";
        }
    }

    private static get_update_func(type: EnemyType, loader: ResourceLoader): (self: Enemy, level: Level) => any {
        switch (type) {
        default:
        case EnemyType.BOMBER:
            return (self: Enemy, level: Level) => {
                if (self.data["origin"] === undefined) {
                    self.data["origin"] = self.y;
                }
                self.y = self.data["origin"] + 3 * Math.sin(Time.total_ms / 12000.0 * 2.0 * Math.PI);
            };
        case EnemyType.BOMBER_MKII:
            return (self: Enemy, level: Level) => {
                if (self.data["origin"] === undefined) {
                    self.data["origin"] = self.y;
                }
                self.y = self.data["origin"] + 3 * Math.sin(Time.total_ms / 3000.0 * 2.0 * Math.PI);
            };
        case EnemyType.FIGHTER:
            return (self: Enemy, level: Level) => {
                self.shoot(level.projectiles, loader);
            };
        case EnemyType.FIGHTER_MKII:
        case EnemyType.FIGHTER_MKIII:
            return (self: Enemy, level: Level) => {
                if (self.data["shoot_count"] === undefined) {
                    self.data["shoot_count"] = 0;
                    self.data["cooldown_count"] = self.shooting_rate / 3.0;
                    self.data["original_shooting_rate"] = self.shooting_rate;
                    self.data["origin"] = self.y;
                }
                self.y = self.data["origin"] + Math.sin(Time.total_ms / 100.0 / self.data["cooldown_count"] * 2.0 * Math.PI);
                if (self.shoot(level.projectiles, loader)) {
                    self.data["shoot_count"]++;
                    if (self.data["shoot_count"] >= self.data["cooldown_count"]) {
                        self.shooting_rate = 0.5;
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
            return 1;
        case EnemyType.BOMBER_MKII:
        case EnemyType.FIGHTER_MKIII:
            return 2;
        }
    }

    private static get_shooting_rate(type: EnemyType): number {
        switch (type) {
        default:
            return 0;
        case EnemyType.FIGHTER:
            return 0.5;
        case EnemyType.FIGHTER_MKII:
            return 9;
        case EnemyType.FIGHTER_MKIII:
            return 18;
        }
    }
}
