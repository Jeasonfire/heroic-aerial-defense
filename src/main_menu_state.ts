class MainMenuState implements State {
    buttons: [{name: string, hover: boolean, activation: number}, () => any][];

    public initialize() {
        this.buttons = [
            [{name: "Play", hover: false, activation: 0}, () => {
                change_state(new GameState());
            }],
            [{name: "Options", hover: false, activation: 0}, () => {
                alert("Options not implemented yet.");
            }]
        ];
    }

    public render(time: Time, ctx: CanvasRenderingContext2D, loader: ResourceLoader) {
        ctx.drawImage(loader.get_image("bg"), 0, 0);
        draw_text(ctx, "HeAeDe", 5, 5, 2);
        draw_text(ctx, "Heroic", 10, 18, 1);
        draw_text(ctx, "Aerial", 15, 24, 1);
        draw_text(ctx, "Defense", 20, 30, 1);
        for (let i = 0; i < this.buttons.length; i++) {
            let hovering = mouse_over(9 + (i > 0 ? ctx.measureText(this.buttons[i - 1][0].name + "    ").width : 0) - 2, 52,
                    ctx.measureText(this.buttons[i][0].name).width + 2, 9);
            if (hovering !== this.buttons[i][0].hover) {
                if (hovering) {
                    new TWEEN.Tween(this.buttons[i][0])
                            .to({ activation: 1 }, 64)
                            .start();
                    this.buttons[i][0].hover = true;
                } else {
                    new TWEEN.Tween(this.buttons[i][0])
                            .to({ activation: 0 }, 32)
                            .start();
                    this.buttons[i][0].hover = false;
                }
            }
            draw_text(ctx, this.buttons[i][0].name, 9 + (i > 0 ? ctx.measureText(this.buttons[i - 1][0].name + "    ").width : 0), 54);
            ctx.fillRect(9 + (i > 0 ? ctx.measureText(this.buttons[i - 1][0].name + "    ").width : 0), 62,
                        Math.floor((ctx.measureText(this.buttons[i][0].name).width - 1) * this.buttons[i][0].activation), 1);
            if (hovering && mouse_down) {
                this.buttons[i][1]();
            }
        }
    }

    public destroy() {
    }
}
