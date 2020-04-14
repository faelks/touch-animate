import { Point } from "./Point.js";

export class Particle {
  constructor({ canvas, height, width, angle, steps }) {
    this.canvas = canvas;
    this.height = height;
    this.width = width;
    this.angle = angle;
    this.steps = steps;
  }

  draw(stepIndex) {
    const origo = this.canvas.getOrigo();
    const radius = this.canvas.radius;
    const stepConstant = stepIndex / this.steps;

    // Subtract from y since the y axis is inverted on canvas
    // x increments left to right, y increments top to bottom
    const x = origo.x + stepConstant * radius * Math.cos(this.angle);
    const y = origo.y - stepConstant * radius * Math.sin(this.angle);

    this.canvas.drawRectangle(new Point(x, y), this.width, this.height);
  }
}
