import { Grid } from "./grid";
import { Tile } from "./tile";
export class Viewport {
    constructor(ctx, ui, width, height) {
        this.ctx = ctx;
        this.ui = ui;
        this.width = width;
        this.height = height;
    }
}
export class Game {
    constructor(viewport) {
        this.cameras = [];
        this.currentGrid = new Grid(1, 1, 1);
        this.hoveredTile = new Tile("default", 0, 0);
        this.mouseX = 0;
        this.mouseY = 0;
        this.viewport = viewport;
        this.cameras.push(new Camera(0, 0));
        this.activeCamera = this.cameras[0];
    }
    loadRandomGrid() {
        this.currentGrid = new Grid(20, 20, 15);
        this.currentGrid.initRandom();
    }
    displayCurrentGrid() {
        this.viewport.ctx.fillStyle = "black";
        this.viewport.ctx.fillRect(0, 0, this.viewport.ctx.canvas.width, this.viewport.ctx.canvas.height);
        for (let i = 0; i < this.currentGrid.nbCellsX; i++) {
            for (let j = 0; j < this.currentGrid.nbCellsY; j++) {
                let tile = this.currentGrid.grid[i][j];
                switch (tile.type) {
                    case "plaine":
                        this.viewport.ctx.fillStyle = "green";
                        break;
                    case "eau":
                        this.viewport.ctx.fillStyle = "blue";
                        break;
                    case "montagne":
                        this.viewport.ctx.fillStyle = "grey";
                        break;
                    case "gouffre":
                        this.viewport.ctx.fillStyle = "black";
                        break;
                    case "default":
                        this.viewport.ctx.fillStyle = "purple";
                        break;
                    default:
                        this.viewport.ctx.fillStyle = "crimson";
                }
                if (tile == this.hoveredTile)
                    this.viewport.ctx.fillStyle = "cyan";
                let renderedTile = new Path2D();
                let x = i * this.currentGrid.cellSize - this.activeCamera.x;
                let y = j * this.currentGrid.cellSize + this.activeCamera.y;
                let size = this.currentGrid.cellSize * .97;
                if (x + size > 0 && y + size > 0 && x < this.viewport.ctx.canvas.width && y < this.viewport.ctx.canvas.height) {
                    this.viewport.ctx.beginPath();
                    renderedTile.rect(x, y, size, size);
                    this.viewport.ctx.fill(renderedTile);
                }
                tile.instance = renderedTile;
            }
        }
    }
    zoom(factor) {
        let target = this.currentGrid.cellSize * factor;
        let start = this.currentGrid.cellSize;
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                this.currentGrid.cellSize = start + (target - start) * i / 100;
            }, i * 5);
        }
    }
    getHoveredTile(mX, mY, cX, cY) {
        let x = Math.floor((mX + cX) / this.currentGrid.cellSize);
        let y = Math.floor((mY - cY) / this.currentGrid.cellSize);
        if (x >= 0 && x < this.currentGrid.nbCellsX && y >= 0 && y < this.currentGrid.nbCellsY) {
            return this.currentGrid.getTile(x, y);
        }
        else {
            return "Nope";
        }
    }
    update() {
        let tile = this.getHoveredTile(this.mouseX, this.mouseY, this.activeCamera.x, this.activeCamera.y);
        if (tile != "Nope")
            this.hoveredTile = tile;
        if (keyboard[38])
            this.activeCamera.y += 5;
        if (keyboard[40])
            this.activeCamera.y -= 5;
        if (keyboard[37])
            this.activeCamera.x -= 5;
        if (keyboard[39])
            this.activeCamera.x += 5;
        this.displayCurrentGrid();
        requestAnimationFrame(() => this.update());
    }
}
export class Camera {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export let keyboard = {};
