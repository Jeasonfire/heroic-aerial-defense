enum ProjectileType {
    BASIC
}

class Projectile extends AIEntity {
    public dead: boolean;

    private direction: number;

    public constructor(x: number, y: number, direction: number, projectile_type: ProjectileType) {
        super(x, y, Projectile.get_graphic(projectile_type), Projectile.get_update_func(projectile_type));
        this.direction = direction;
        this.dead = false;
    }

    public check_hits(enemies: Enemy[]) {
        if (this.dead) {
            console.log("[ERROR] Tried to check hits with a dead projectile. Forgot to remove from projectile list?");
            return;
        }
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].get_hitbox().contains(this.x, this.y)) {
                enemies[i].take_damage(1);
                this.dead = true;
            }
        }
    }

    private static get_graphic(type: ProjectileType): string {
        switch (type) {
        default:
        case ProjectileType.BASIC:
            return "projectile_basic";
        }
    }

    private static get_update_func(type: ProjectileType): (self: Projectile, time: Time) => any {
        switch (type) {
        default:
        case ProjectileType.BASIC:
            return (self: Projectile, time: Time) => {
                self.x += self.direction * 100 * time.delta;
            };
        }
    }
}
