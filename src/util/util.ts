function draw_text(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, scale: number = 1, style: string = "white") {
    let original_style = ctx.fillStyle;
    ctx.save();
    ctx.fillStyle = style;
    ctx.font = (7 * scale) + "px pixel";
    ctx.fillText(text, Math.floor(x - text_width_div2(ctx, text, scale)), Math.floor(y + 5 * scale - 3.5));
    ctx.restore();
}

function draw_image(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number) {
    ctx.drawImage(image, Math.floor(x - image.width / 2.0), Math.floor(y - image.height / 2.0));
}

function draw_rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number = 1, h: number = 1, style: string = "white") {
    ctx.save();
    ctx.fillStyle = style;
    ctx.fillRect(Math.floor(x - w / 2.0), Math.floor(y - h / 2.0), w, h);
    ctx.restore();
}

function text_width(ctx: CanvasRenderingContext2D, text: string, scale: number = 1) {
    ctx.save();
    ctx.font = (7 * scale) + "px pixel";
    let width = ctx.measureText(text).width;
    ctx.restore();
    return Math.floor(width);
}

function text_width_div2(ctx: CanvasRenderingContext2D, text: string, scale: number = 1) {
    ctx.save();
    ctx.font = (7 * scale) + "px pixel";
    let width = ctx.measureText(text).width;
    ctx.restore();
    return Math.floor(width / 2.0);
}

let mouse_x = 0;
let mouse_y = 0;
let mouse_down = false;
let key: boolean[] = [];

let KEY_UP = 87;
let KEY_DOWN = 83;
let KEY_SHOOT = 32;
let KEY_RESET = 82;

window.onkeydown = (ev: KeyboardEvent) => {
    key[ev.keyCode] = true;
};
window.onkeyup = (ev: KeyboardEvent) => {
    key[ev.keyCode] = false;
};

function mouse_over(x: number, y: number, w: number, h: number): boolean {
    return !(mouse_x < x - w / 2.0 || mouse_x >= x + w / 2.0 ||
            mouse_y < y - h / 2.0 || mouse_y >= y + h / 2.0);
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
        return !(other.x + other.w / 2.0 < this.x - this.w / 2.0 || other.x >= this.x + this.w / 2.0 ||
                other.y + other.h / 2.0 < this.y - this.h / 2.0 || other.y >= this.y + this.h / 2.0);
    }

    public contains(x: number, y: number): boolean {
        return !(x < this.x - this.w / 2.0 || x >= this.x + this.w / 2.0 ||
                y < this.y - this.h / 2.0 || y >= this.y + this.h / 2.0);
    }
}
