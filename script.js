import { Viewport, keyboard, Game } from "./components/engine";
let renderer = document.getElementById("renderer");
let ctx = renderer.getContext("2d");
let ui = document.getElementById("UI");
let uiCtx = ui.getContext("2d");
let display = new Viewport(ctx, uiCtx, renderer.clientWidth, renderer.clientHeight);
let game = new Game(display);
game.loadRandomGrid();
document.getElementById("gameArea").addEventListener("mousemove", e => {
    game.mouseX = e.offsetX;
    game.mouseY = e.offsetY;
});
document.addEventListener("keydown", e => {
    keyboard[e.keyCode] = true;
    if (e.keyCode == 107)
        game.zoom(1.5);
    if (e.keyCode == 109)
        game.zoom(1 / 1.5);
});
document.addEventListener("keyup", e => {
    keyboard[e.keyCode] = false;
});
game.update();
