/* Start of graphics utils */
function draw_text(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, scale: number = 1, style: string = "white") {
    let original_style = ctx.fillStyle;
    ctx.save();
    ctx.fillStyle = style;
    ctx.font = (7 * scale) + "px pixel";
    ctx.fillText(text, Math.floor(x - text_width_div2(ctx, text, scale) + offset_x), Math.floor(y + 5 * scale - 3.5 * scale + offset_y));
    ctx.restore();
}

function draw_image(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number) {
    ctx.drawImage(image, Math.floor(x - image.width / 2.0 + offset_x), Math.floor(y - image.height / 2.0 + offset_y));
}

function draw_rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number = 1, h: number = 1, style: string = "white") {
    ctx.save();
    ctx.fillStyle = style;
    ctx.fillRect(Math.floor(x - w / 2.0 + offset_x), Math.floor(y - h / 2.0 + offset_y), w, h);
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

let offset_x = 0;
let offset_y = 0;
function set_translation(x: number, y: number) {
    offset_x = x;
    offset_y = y;
}

let tint: [number, number, number] = [0.667, 0.667, 0.667];
/* End of graphics utils */

/* Start of audio utils */
/* Insert sound playing functions and such when they're implemented */

let vol_menu_sfx: number = 0.2;
let vol_game_sfx: number = 0.2;
let vol_music: number = 0.2;
/* End of audio utils */

/* Start of input utils */
let mouse_x = 0;
let mouse_y = 0;
let mouse_down = false;
let mouse_clicked = false;
let mouse_control = false;

let KEYS_UP = [87, 38];
let KEYS_DOWN = [83, 40];
let KEYS_SHOOT = [32];
let KEYS_RESET = [82];

let input_up = false;
let input_down = false;
let input_shoot = false;
let input_reset = false;

window.onkeydown = (ev: KeyboardEvent) => {
    if (KEYS_UP.indexOf(ev.keyCode) >= 0) input_up = true;
    if (KEYS_DOWN.indexOf(ev.keyCode) >= 0) input_down = true;
    if (KEYS_SHOOT.indexOf(ev.keyCode) >= 0) input_shoot = true;
    if (KEYS_RESET.indexOf(ev.keyCode) >= 0) input_reset = true;
};
window.onkeyup = (ev: KeyboardEvent) => {
    if (KEYS_UP.indexOf(ev.keyCode) >= 0) input_up = false;
    if (KEYS_DOWN.indexOf(ev.keyCode) >= 0) input_down = false;
    if (KEYS_SHOOT.indexOf(ev.keyCode) >= 0) input_shoot = false;
    if (KEYS_RESET.indexOf(ev.keyCode) >= 0) input_reset = false;
};


window.onmousedown = () => {
    mouse_down = true;
    mouse_clicked = true;
};
window.onmouseup = () => {
    mouse_down = false;
};

function mouse_over(x: number, y: number, w: number, h: number): boolean {
    return !(mouse_x < x - w / 2.0 || mouse_x >= x + w / 2.0 ||
            mouse_y < y - h / 2.0 || mouse_y >= y + h / 2.0);
}

/* End of input utils */

/* Misc. */
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
