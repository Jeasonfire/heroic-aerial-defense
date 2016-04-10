class Main {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private loader = new ResourceLoader();
    private scroll: number;

    public constructor(canvas_id: string, width: number, height: number) {
        this.canvas = <HTMLCanvasElement> document.getElementById(canvas_id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        this.scroll = 0;

        window.onmousemove = (evt) => {
            let canvas_rect = this.canvas.getBoundingClientRect();
            mouse_x = evt.clientX - this.canvas.getBoundingClientRect().left;
            mouse_x = Math.floor(mouse_x * width / (canvas_rect.bottom - canvas_rect.top));
            mouse_y = evt.clientY - this.canvas.getBoundingClientRect().top;
            mouse_y = Math.floor(mouse_y * height / (canvas_rect.right - canvas_rect.left));
        };

        StateManager.change_state(new MainMenuState());
    }

    public load_resources() {
        this.loader.load_images([
            ["bg_bot", "./res/background_bot.png"],
            ["bg_mid", "./res/background_mid.png"],
            ["bg_top", "./res/background_top.png"],

            ["ship_player", "./res/ship_player_0.png"],
            ["ship_player_0", "./res/ship_player_0.png"],
            ["ship_player_1", "./res/ship_player_1.png"],
            ["ship_player_2", "./res/ship_player_2.png"],

            ["ship_basic", "./res/ship_basic_0.png"],
            ["ship_basic_0", "./res/ship_basic_0.png"],
            ["ship_basic_1", "./res/ship_basic_1.png"],
            ["ship_basic_2", "./res/ship_basic_2.png"],

            ["projectile_basic", "./res/projectile_basic.png"],
        ]);
    }

    public render(time: number) {
        Time.update_time(time);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 64, 64);

        if (!this.loader.done()) {
            this.draw_loading(Time.delta);
        } else {
            this.draw_background();
            StateManager.update_state(this.ctx, this.loader);
            ParticleManager.render(this.ctx);
        }

        mouse_clicked = false;
        this.apply_tint();
    }

    private apply_tint() {
        if (tint[0].toFixed(2) === tint[1].toFixed(2) && tint[1].toFixed(2) === tint[2].toFixed(2)) {
            return; // White tint, no need to change anything
        }

        let image_data = this.ctx.getImageData(0, 0, 64, 64);
        let data = image_data.data;

        let avg_tint = (tint[0] + tint[1] + tint[2]) / 3.0;
        let real_tint = tint.map((n: number) => { return n / avg_tint; });
        // Step of 4 because RGBA = 4 indices
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.max(0, data[i] * real_tint[0]));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * real_tint[1]));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * real_tint[2]));
        }
        this.ctx.putImageData(image_data, 0, 0);
    }

    private draw_background() {
        this.scroll -= Time.delta * 48 * StateManager.get_scrolling_speed();

        draw_image(this.ctx, this.loader.get_image("bg_bot"), Math.floor(this.scroll / 1.4) % 128 + 64, 32);
        draw_image(this.ctx, this.loader.get_image("bg_bot"), Math.floor(this.scroll / 1.4) % 128 + 192, 32);
        draw_image(this.ctx, this.loader.get_image("bg_mid"), Math.floor(this.scroll) % 128 + 64, 32);
        draw_image(this.ctx, this.loader.get_image("bg_mid"), Math.floor(this.scroll) % 128 + 192, 32);
        draw_image(this.ctx, this.loader.get_image("bg_top"), Math.floor(this.scroll * 1.7) % 128 + 64, 32);
        draw_image(this.ctx, this.loader.get_image("bg_top"), Math.floor(this.scroll * 1.7) % 128 + 192, 32);
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
