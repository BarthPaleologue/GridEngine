import { Tile } from "./tile"

export class Grid {
    nbCellsX: number;
    nbCellsY: number;
    cellSize: number;
    grid: Array<Array<Tile>>;

    constructor(nbCellsX: number, nbCellsY: number, cellSize: number) {
        this.nbCellsX = nbCellsX;
        this.nbCellsY = nbCellsY;
        this.cellSize = cellSize;
        this.grid = [];
        for (let i = 0; i < this.nbCellsX; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.nbCellsY; j++) {
                this.grid[i].push(new Tile("default", i, j));
            }
        }
    }
    initRandom() {
        for (let ligne of this.grid) {
            for (let tile of ligne) {
                tile.type = Tile.randomType();
            }
        }
    }
    getTile(x: number, y: number) {
        return this.grid[x][y];
    }
}