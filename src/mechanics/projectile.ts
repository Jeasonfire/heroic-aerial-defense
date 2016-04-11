enum ProjectileType {
    BASIC
}

class Projectile extends Entity {
    public dead: boolean;

    private direction: number;

    public constructor(x: number, y: number, direction: number, projectile_type: ProjectileType, loader: ResourceLoader) {
        super(x, y, 1, 0, 0, Projectile.get_graphic(projectile_type), Projectile.get_update_func(projectile_type), loader);
        this.direction = direction;
        this.dead = false;
    }

    public check_hits(level: Level) {
        if (this.dead) {
            console.log("[ERROR] Tried to check hits with a dead projectile. Forgot to remove from projectile list?");
            return;
        }
        for (let i = 0; i < level.enemies.length; i++) {
            if (level.enemies[i].get_hitbox().contains(this.x, this.y)) {
                level.enemies[i].take_damage(1);
                ParticleManager.burst(this.x, this.y, 0.15, 6);
                this.dead = true;
            }
        }
        if (level.player.get_hitbox().contains(this.x, this.y)) {
            level.player.take_damage(1);
            ParticleManager.burst(this.x, this.y, 0.1, 3);
            this.dead = true;
        }
    }

    private static get_graphic(type: ProjectileType): string {
        switch (type) {
        default:
        case ProjectileType.BASIC:
            return "projectile_basic";
        }
    }

    private static get_update_func(type: ProjectileType): (self: Projectile, level: Level) => any {
        switch (type) {
        default:
        case ProjectileType.BASIC:
            return (self: Projectile, level: Level) => {
                self.x += self.direction * 80 * Time.delta;
            };
        }
    }
}
