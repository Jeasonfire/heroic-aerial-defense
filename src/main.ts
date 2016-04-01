class Main {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private last_time = Date.now();
    private time = new Time();
    private loader = new ResourceLoader();

    public constructor(canvas_id: string, width: number, height: number) {
        this.canvas = <HTMLCanvasElement> document.getElementById(canvas_id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        change_state(new MainMenuState());
    }

    public load_resources() {
        this.loader.load_images([
            ["main_menu_bg", "./res/main_menu_background.png"],
            ["game_art", "./res/game_concept_art.png"],
        ]);
    }

    public render() {
        let now_time = Date.now();
        let delta = (now_time - this.last_time) / 1000.0;
        this.time.delta = delta;
        this.time.total_ms += delta;
        this.last_time = now_time;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 64, 64);

        if (!this.loader.done()) {
            this.draw_loading(delta);
            return;
        }

        update_state(this.time, this.ctx, this.loader);
        TWEEN.update();
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
    render();
};

function render() {
    requestAnimationFrame(render);
    if (main !== null) {
        main.render();
    }
}
