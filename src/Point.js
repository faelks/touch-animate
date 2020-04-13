export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  incrementBothBy(value) {
    return new Point(this.x + value, this.y + value);
  }
}
