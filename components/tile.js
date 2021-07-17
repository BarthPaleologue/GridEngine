export class Tile {
    constructor(type, x, y) {
        this.instance = new Path2D();
        this.type = type;
        this.x = x;
        this.y = y;
    }
    static randomType() {
        let types = ["plaine", "eau", "montagne", "gouffre", "default"];
        return types[Math.floor(Math.random() * (types.length - 1))];
    }
}
