class GenericMenuState implements State {
    private buttons: [{name: string, activation: number}, () => any][];
    private sliders: [{name: string, slider_pos: number}, (slider_pos: number) => any][];
    private start_time: number;
    private title: string;
    private y_offset: number;
    private back: [{name: string, hover: boolean, activation: number}, () => any];

    protected constructor(title: string, y_offset: number, buttons: [string, (() => any)][], sliders: [{name: string, slider_pos: number}, ((slider_pos: number) => any)][], back_action: () => any) {
        this.title = title;
        this.y_offset = y_offset;
        this.buttons = [];
        for (let i = 0; i < buttons.length; i++) {
            this.buttons.push([{name: buttons[i][0], activation: 0}, buttons[i][1]]);
        }
        this.sliders = sliders;
        this.back = back_action !== null ?  [{name: "Back", hover: false, activation: 0}, back_action] : null;
    }

    public initialize() {
        this.start_time = Time.total_ms;
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        draw_text(ctx, this.title, 32, 10, 1);
        for (let i = 0; i < this.sliders.length; i++) {
            this.render_slider(ctx, 32, this.y_offset + i * 11, this.sliders[i]);
        }
        for (let i = 0; i < this.buttons.length; i++) {
            this.render_button(ctx, 32, this.y_offset + i * 9 + this.sliders.length * 11, this.buttons[i]);
        }
        if (this.back !== null) {
            this.render_button(ctx, 32, 56, this.back);
        }
    }

    public render_button(ctx: CanvasRenderingContext2D, x: number, y: number, button: [{name: string, activation: number}, (() => any)]) {
        let hovering = mouse_over(x, y, text_width(ctx, button[0].name) + 2, 9);
        if (hovering) {
            if (button[0].activation < 1) {
                button[0].activation = Math.min(button[0].activation + Time.delta * 10, 1);
            }
        } else {
            if (button[0].activation > 0) {
                button[0].activation = Math.max(button[0].activation - Time.delta * 10, 0);
            }
        }
        draw_text(ctx, button[0].name, x, y);
        draw_rect(ctx, x, y + 4, text_width(ctx, button[0].name) * button[0].activation, 1);
        if (hovering && mouse_clicked && Time.total_ms - this.start_time > 300) {
            button[1]();
        }
    }

    public render_slider(ctx: CanvasRenderingContext2D, x: number, y: number, slider: [{name: string, slider_pos: number}, ((slider_pos: number) => any)]) {
        let hovering = mouse_over(x - 1, y + 1, 64, 11);

        let slider_width = 40 * slider[0].slider_pos;
        draw_rect(ctx, x, y + 4, 42, 5, "rgba(170, 170, 170, 0.1)");
        draw_rect(ctx, x, y + 4, 40, 3, "#222222");
        draw_rect(ctx, x - 20 + slider_width / 2.0, y + 4, slider_width, 3, (hovering ? "#AAAAAA" : "#666666"));

        if (hovering && mouse_down && Time.total_ms - this.start_time > 300) {
            let new_slider_pos = Math.ceil((mouse_x - (x - 20)) / 2) / 20;
            slider[0].slider_pos = Math.min(1, Math.max(0, new_slider_pos));
            slider[1](slider[0].slider_pos);
        }
        draw_text(ctx, slider[0].name, x, y);
    }

    public destroy() {
    }
}
