class MainMenuState implements State {
    globalScale: {offset: number};
    buttons: [{name: string, hover: boolean, activation: number}, () => any][];

    public initialize() {
        this.globalScale = {offset: 0};
        this.buttons = [
            [{name: "Play", hover: false, activation: 0}, () => {
                StateManager.change_state(new GameState());
            }],
            [{name: "Options", hover: false, activation: 0}, () => {
                alert("Options not implemented yet.");
            }]
        ];
    }

    public render(ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        ctx.save();
        ctx.drawImage(loader.get_image("bg_bot"), 0, 0);
        ctx.drawImage(loader.get_image("bg_mid"), 0, 0);
        ctx.drawImage(loader.get_image("bg_top"), 0, 0);
        ctx.translate(this.globalScale.offset * 64, 1);

        draw_text(ctx, "HeAeDe", 32, 5, 2);
        draw_text(ctx, "Heroic", 20, 18, 1);
        draw_text(ctx, "Aerial", 28, 24, 1);
        draw_text(ctx, "Defense", 41, 30, 1);
        for (let i = 0; i < this.buttons.length; i++) {
            let hovering = mouse_over(32, 46 + 10 * i,
                    text_width(ctx, this.buttons[i][0].name) + 2, 9);
            if (hovering !== this.buttons[i][0].hover) {
                if (hovering) {
                    new TWEEN.Tween(this.buttons[i][0])
                            .to({ activation: 1 }, 100)
                            .start();
                    this.buttons[i][0].hover = true;
                } else {
                    new TWEEN.Tween(this.buttons[i][0])
                            .to({ activation: 0 }, 200)
                            .start();
                    this.buttons[i][0].hover = false;
                }
            }
            draw_text(ctx, this.buttons[i][0].name, 32, 46 + 10 * i);
            draw_rect(ctx, 32, 51 + 10 * i, text_width(ctx, this.buttons[i][0].name) * this.buttons[i][0].activation, 1);
            if (hovering && mouse_down) {
                this.buttons[i][1]();
            }
        }

        ctx.restore();
    }

    public destroy() {
    }
}
