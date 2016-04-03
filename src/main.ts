class Main {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private time = new Time();
    private loader = new ResourceLoader();

    public constructor(canvas_id: string, width: number, height: number) {
        this.canvas = <HTMLCanvasElement> document.getElementById(canvas_id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        window.onmousemove = (evt) => {
            let canvas_rect = this.canvas.getBoundingClientRect();
            mouse_x = evt.clientX - this.canvas.getBoundingClientRect().left;
            mouse_x = Math.floor(mouse_x * width / (canvas_rect.bottom - canvas_rect.top));
            mouse_y = evt.clientY - this.canvas.getBoundingClientRect().top;
            mouse_y = Math.floor(mouse_y * height / (canvas_rect.right - canvas_rect.left));
        };
        window.onmousedown = () => {
            mouse_down = true;
        };
        window.onmouseup = () => {
            mouse_down = false;
        };

        StateManager.change_state(new MainMenuState());
    }

    public load_resources() {
        this.loader.load_images([
            ["bg", "./res/background.png"],
            ["ship_player", "./res/ship_player_0.png"],
            ["ship_basic", "./res/ship_basic_0.png"],
            ["ship_basic_0", "./res/ship_basic_0.png"],
            ["ship_basic_1", "./res/ship_basic_1.png"],
            ["ship_basic_2", "./res/ship_basic_2.png"],
            ["projectile_basic", "./res/projectile_basic.png"],
        ]);
    }

    public render(time: number) {
        this.time.update_time(time);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 64, 64);

        if (!this.loader.done()) {
            this.draw_loading(this.time.delta);
            return;
        }

        StateManager.update_state(this.time, this.ctx, this.loader);
        TWEEN.update(time);
    }

    private draw_loading(delta: number) {
        this.loader.update_loading(delta);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(2, 30, 60 * this.loader.loaded, 4);
    }
}

let main = null;
window.onload = () => {
    main = new Main("container", 64, 64);
    main.load_resources();
    requestAnimationFrame(render);
};

function render(time: number) {
    requestAnimationFrame(render);
    if (main !== null) {
        main.render(time);
    }
}
