class LevelTemplate {
    public static LEVELS = [
        new LevelTemplate([
            [[EnemyType.FIGHTER_MKIII], [3]],
        ]),
        new LevelTemplate([
            [[EnemyType.BOMBER], [2]],
            [[EnemyType.BOMBER, EnemyType.FIGHTER, EnemyType.BOMBER], [1, 2, 1]],
            [[EnemyType.FIGHTER], [8]],
        ]),
        new LevelTemplate([
            [[EnemyType.BOMBER_MKII], [3]],
            [[EnemyType.BOMBER_MKII, EnemyType.FIGHTER_MKII, EnemyType.BOMBER_MKII], [2, 1, 1]],
            [[EnemyType.FIGHTER_MKII], [1]],
        ]),
    ];

    public boss: boolean;

    private enemy_types: [EnemyType[], number[]][];

    public constructor(enemy_types: [EnemyType[], number[]][], boss: boolean = false) {
        this.enemy_types = enemy_types;
        this.boss = boss;
    }

    public generate_enemies(level: Level, loader: ResourceLoader): [Enemy[], number] {
        let enemies: Enemy[] = [];
        let x_offset = 90;
        for (let i = 0; i < this.enemy_types.length; i++) {
            let enemy_wave = this.enemy_types[i];
            for (let j = 0; j < enemy_wave[0].length; j++) {
                for (let k = 0; k < enemy_wave[1][j]; k++) {
                    enemies.push(new Enemy(x_offset, 16 + 32 * Math.random(), enemy_wave[0][j], level, loader));
                    x_offset += 20;
                }
            }
            x_offset += 20;
        }
        return [enemies, x_offset];
    }
}
