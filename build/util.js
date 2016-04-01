function draw_text(ctx, text, x, y, scale, style) {
    if (scale === void 0) { scale = 1; }
    if (style === void 0) { style = "white"; }
    var original_style = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.font = (7 * scale) + "px pixel";
    ctx.fillText(text, x, y + 5 * scale);
}
