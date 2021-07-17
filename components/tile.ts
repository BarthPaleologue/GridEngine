
export class Tile {
    type: string;
    x: number;
    y: number;
    instance = new Path2D()

    constructor(type: string, x: number, y: number) {
        this.type = type;
        this.x = x;
        this.y = y;
    }
    static randomType() {
        let types = ["plaine", "eau", "montagne", "gouffre", "default"];
        return types[Math.floor(Math.random() * (types.length - 1))];
    }
}