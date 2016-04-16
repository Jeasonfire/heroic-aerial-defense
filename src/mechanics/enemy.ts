enum EnemyType {
    BOMBER, BOMBER_MKII, FIGHTER, FIGHTER_MKII, FIGHTER_MKIII
}

class Enemy extends Entity {
    public type: EnemyType;

    private data: {};

    public constructor(x: number, y: number, enemy_type: EnemyType, level: Level, loader: ResourceLoader) {
        super(x, y, Enemy.get_health(enemy_type), Enemy.get_shooting_rate(enemy_type),
            -1, Enemy.get_graphic(enemy_type), Enemy.get_update_func(enemy_type, loader), loader);
        this.active = false;
        this.data = {};
        this.type = enemy_type;
        Enemy.initialize(enemy_type, this);
    }

    public static initialize(type: EnemyType, self: Enemy) {
        switch (type) {
        case EnemyType.FIGHTER_MKIII:
            self.shooting_offsets.push([self.shooting_offsets[0][0], self.shooting_offsets[0][1] + 2]);
            break;
        }
    }

    public static get_graphic(type: EnemyType): string {
        switch (type) {
        default:
            return "ship_bomber";
        case EnemyType.BOMBER_MKII:
            return "ship_bomber_mk2";
        case EnemyType.FIGHTER:
            return "ship_fighter";
        case EnemyType.FIGHTER_MKII:
            return "ship_fighter_mk2";
        case EnemyType.FIGHTER_MKIII:
            return "ship_fighter_mk3";
        }
    }

    public static get_update_func(type: EnemyType, loader: ResourceLoader): (self: Enemy, level: Level) => any {
        switch (type) {
        default:
        case EnemyType.BOMBER:
        case EnemyType.BOMBER_MKII:
            return (self: Enemy, level: Level) => {
                if (self.data["boost_time"] === undefined) {
                    self.data["boost_time"] = Time.total_ms + 500.0 - (self.type === EnemyType.BOMBER ? 500 : 0);
                    self.data["speed"] = self.type === EnemyType.BOMBER ? 48 : 96;
                }
                if (self.data["boost_time"] < Time.total_ms) {
                    self.x += Math.min(self.data["speed"], (self.data["boost_time"] - Time.total_ms) / 1000.0 * self.data["speed"]) * Time.delta;
                }
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
                    self.data["cooldown_count"] = self.shooting_rate / 1.5;
                    self.data["original_shooting_rate"] = self.shooting_rate;
                    self.data["origin"] = self.y;
                    self.data["shooting"] = false;
                }
                if (self.shoot(level.projectiles, loader)) {
                    self.data["shoot_count"]++;
                    self.data["shooting"] = true;
                    if (self.data["shoot_count"] >= self.data["cooldown_count"]) {
                        self.shooting_rate = 0.5;
                        self.data["shoot_count"] = 0;
                        self.data["shooting"] = false;
                    }
                    if (self.data["shoot_count"] === 1) {
                        self.shooting_rate = self.data["original_shooting_rate"];
                    }
                }
                self.y = self.data["origin"] + 2.5 * Math.sin(Time.total_ms / 250.0 / self.data["cooldown_count"] * 2.0 * Math.PI);
            };
        }
    }

    public static get_health(type: EnemyType): number {
        switch (type) {
        default:
        case EnemyType.FIGHTER:
            return 1;
        case EnemyType.FIGHTER_MKII:
            return 2;
        case EnemyType.BOMBER:
            return 4;
        case EnemyType.BOMBER_MKII:
        case EnemyType.FIGHTER_MKIII:
            return 6;
        }
    }

    public static get_score(type: EnemyType): number {
        switch (type) {
        default:
        case EnemyType.FIGHTER:
            return 200;
        case EnemyType.FIGHTER_MKII:
            return 500;
        case EnemyType.BOMBER:
            return 300;
        case EnemyType.BOMBER_MKII:
        case EnemyType.FIGHTER_MKIII:
            return 1000;
        }
    }

    public static get_shooting_rate(type: EnemyType): number {
        switch (type) {
        default:
            return 0;
        case EnemyType.FIGHTER:
            return 0.5;
        case EnemyType.FIGHTER_MKII:
            return 5;
        case EnemyType.FIGHTER_MKIII:
            return 15;
        }
    }
}
