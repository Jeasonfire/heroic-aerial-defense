class AIEntity {
    public x: number;
    public y: number;
    public graphic: string;
    public update_func: (self: AIEntity, time: Time) => any;

    public constructor(x: number, y: number,
            graphic: string, update_func: (self: AIEntity, time: Time) => any) {
        this.x = x;
        this.y = y;
        this.graphic = graphic;
        this.update_func = update_func;
    }
}
