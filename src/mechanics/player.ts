class Player extends Entity {
    public x: number;
    public y: number;
    public speed: number;

    public constructor(x: number, y: number, shooting_rate: number,
            speed: number, loader: ResourceLoader) {
        super(x, y, 3, shooting_rate, 1, "ship_player", () => {}, loader);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.shooting_offset[1] = 1;
    }

    public move(x: number, y: number) {
        this.x += x * this.speed * Time.delta;
        this.y += y * this.speed * Time.delta * 2.0;
        if (y === 0) {
            this.y = Math.floor(this.y);
        }
    }
}
