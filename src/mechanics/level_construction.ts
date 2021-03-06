class LevelTemplate {
    public static LEVELS = [
        new LevelTemplate([
            [[EnemyType.BOMBER], [2]],
            [[EnemyType.FIGHTER], [4]],
        ]),
        new LevelTemplate([
            [[EnemyType.BOMBER_MKII], [2]],
            [[EnemyType.FIGHTER_MKII], [3]],
            [[EnemyType.FIGHTER], [8]],
            [[EnemyType.FIGHTER_MKII], [3]],
            [[EnemyType.BOMBER_MKII], [1]],
        ]),
        new LevelTemplate([
            [[EnemyType.BOMBER_MKII], [3]],
            [[EnemyType.FIGHTER_MKIII], [2]],
            [[EnemyType.FIGHTER_MKII], [6]],
            [[EnemyType.FIGHTER_MKIII], [4]],
            [[EnemyType.FIGHTER_MKII], [10]],
            [[EnemyType.BOMBER], [1]],
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
