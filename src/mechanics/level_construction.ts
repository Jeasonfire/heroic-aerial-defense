class LevelTemplate {
    public static LEVELS = [
        new LevelTemplate([
            [[EnemyType.IMP], [3]],
        ]),
        new LevelTemplate([
            [[EnemyType.IMP], [4]],
            [[EnemyType.IMP, EnemyType.DEMON, EnemyType.IMP], [1, 1, 1]],
            [[EnemyType.DEMON], [2]],
        ]),
        new LevelTemplate([
            [[EnemyType.GREATER_IMP], [3]],
            [[EnemyType.GREATER_IMP, EnemyType.GREATER_DEMON, EnemyType.GREATER_IMP], [2, 1, 1]],
            [[EnemyType.GREATER_DEMON], [1]],
        ]),
    ];

    private enemy_types: [EnemyType[], number[]][];

    public constructor(enemy_types: [EnemyType[], number[]][]) {
        this.enemy_types = enemy_types;
    }

    public generate_enemies(level: Level, loader: ResourceLoader): [Enemy[], number] {
        let enemies: Enemy[] = [];
        let x_offset = 24;
        for (let i = 0; i < this.enemy_types.length; i++) {
            let enemy_wave = this.enemy_types[i];
            x_offset += 32;
            for (let j = 0; j < enemy_wave[0].length; j++) {
                for (let k = 0; k < enemy_wave[1][j]; k++) {
                    x_offset += 16;
                    enemies.push(new Enemy(x_offset, 16 + 32 * Math.random(), enemy_wave[0][j], level, loader));
                }
            }
        }
        return [enemies, x_offset];
    }
}
