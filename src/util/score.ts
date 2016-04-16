class ScoreManager {
    public static score: number = 0;

    public static add_score(enemy_type: EnemyType) {
        ScoreManager.score += Enemy.get_score(enemy_type);
    }
}
