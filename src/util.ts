function draw_text(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, scale: number = 1, style: string = "white") {
    let original_style = this.ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.font = (7 * scale) + "px pixel";
    ctx.fillText(text, x, y + 5 * scale);
}
