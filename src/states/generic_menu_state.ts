class GenericMenuState implements State {
    private buttons: [{name: string, hover: boolean, activation: number}, () => any][];
    private sliders: [{name: string, slider_pos: number}, (slider_pos: number) => any][];
    private click_time: number;
    private title: string;
    private y_offset: number;
    private back: [{name: string, hover: boolean, activation: number}, () => any];

    protected constructor(title: string, y_offset: number, buttons: [string, (() => any)][], sliders: [{name: string, slider_pos: number}, ((slider_pos: number) => any)][], back_action: () => any) {
        this.title = title;
        this.y_offset = y_offset;
        this.buttons = [];
        for (let i = 0; i < buttons.length; i++) {
            this.buttons.push([{name: buttons[i][0], hover: false, activation: 0}, buttons[i][1]]);
        }
        this.sliders = sliders;
        this.back = back_action !== null ?  [{name: "Back", hover: false, activation: 0}, back_action] : null;
    }

    public initialize() {
        this.click_time = Time.total_ms;
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        ctx.save();
        ctx.drawImage(loader.get_image("bg_bot"), 0, 0);
        ctx.drawImage(loader.get_image("bg_mid"), 0, 0);
        ctx.drawImage(loader.get_image("bg_top"), 0, 0);

        draw_text(ctx, this.title, 32, 5, 2);
        for (let i = 0; i < this.sliders.length; i++) {
            this.render_slider(ctx, 32, this.y_offset + i * 9, this.sliders[i]);
        }
        for (let i = 0; i < this.buttons.length; i++) {
            this.render_button(ctx, 32, this.y_offset + (i + this.sliders.length) * 9, this.buttons[i]);
        }
        if (this.back !== null) {
            this.render_button(ctx, 32, 56, this.back);
        }
    }

    public render_button(ctx: CanvasRenderingContext2D, x: number, y: number, button: [{name: string, hover: boolean, activation: number}, (() => any)]) {
        let hovering = mouse_over(x, y, text_width(ctx, button[0].name) + 2, 9);
        if (hovering !== button[0].hover) {
            if (hovering) {
                new TWEEN.Tween(button[0])
                        .to({ activation: 1 }, 100)
                        .start();
                button[0].hover = true;
            } else {
                new TWEEN.Tween(button[0])
                        .to({ activation: 0 }, 200)
                        .start();
                button[0].hover = false;
            }
        }
        draw_text(ctx, button[0].name, x, y);
        draw_rect(ctx, x, y + 4, text_width(ctx, button[0].name) * button[0].activation, 1);
        if (hovering && mouse_down && Time.total_ms - this.click_time > 300) {
            this.click_time = Time.total_ms;
            button[1]();
        }
    }

    public render_slider(ctx: CanvasRenderingContext2D, x: number, y: number, slider: [{name: string, slider_pos: number}, ((slider_pos: number) => any)]) {
        let hover_minus = mouse_over(x - 24, y, 12, 8);
        let hover_plus = mouse_over(x + 24, y, 12, 8);
        let hover = mouse_over(x, y, 64, 7);

        draw_text(ctx, "-", x - 24 - (hover_minus ? 1 : 0), y);
        draw_text(ctx, "+", x + 24 + (hover_plus ? 1 : 0), y);
        draw_rect(ctx, x, y - 1, 30 * slider[0].slider_pos, 3 + (hover ? 4 : 0), "rgba(255, 255, 255, 0.4)");

        if (mouse_down) {
            if (hover_minus) {
                slider[0].slider_pos -= Time.delta;
                if (slider[0].slider_pos < 0) {
                    slider[0].slider_pos = 0;
                }
                slider[1](slider[0].slider_pos);
            }
            if (hover_plus) {
                slider[0].slider_pos += Time.delta;
                if (slider[0].slider_pos > 1) {
                    slider[0].slider_pos = 1;
                }
                slider[1](slider[0].slider_pos);
            }
        }
        draw_text(ctx, slider[0].name, x, y);
    }

    public destroy() {
    }
}
