module.exports = class Square {
    constructor(width) {
        this.width = width;
        this.m = 3;
    }

    area() {
        return this.width ** 2;
    }
}; 