function draw_text(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, scale: number = 1, style: string = "white") {
    let original_style = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.font = (7 * scale) + "px pixel";
    ctx.fillText(text, x, y + 5 * scale);
}

let mouse_x = 0;
let mouse_y = 0;
let mouse_down = false;
let key: boolean[] = [];

let KEY_UP = 83;
let KEY_DOWN = 87;
let KEY_SHOOT = 32;

window.onkeydown = (ev: KeyboardEvent) => {
    key[ev.keyCode] = true;
};
window.onkeyup = (ev: KeyboardEvent) => {
    key[ev.keyCode] = false;
};

function mouse_over(x: number, y: number, w: number, h: number): boolean {
    return !(mouse_x < x || mouse_x >= x + w || mouse_y < y || mouse_y >= y + h);
}

class Rectangle {
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public constructor(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public mouse_over(): boolean {
        return mouse_over(this.x, this.y, this.w, this.h);
    }

    public overlap(other: Rectangle): boolean {
        return !(other.x + other.w < this.x || other.x >= this.x + this.w ||
                other.y + other.h < this.y || other.y >= this.y + this.h);
    }
}
