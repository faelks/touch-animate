import { Point } from "./Point.js";

export class TouchAnimation {
  constructor({ type, context, origo, radius, steps, duration, color }) {
    this.context = context;
    this.origo = origo;
    this.radius = radius;
    this.steps = steps;
    this.color = color;
    this.duration = duration;
    this.type = type;
  }

  start() {
    switch (this.type) {
      case "spiral":
        this.spiral();
        break;
      default:
        this.swell();
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.radius * 2, this.radius * 2);
  }

  drawCircle(radius) {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.arc(this.origo.x, this.origo.y, radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
  }

  drawLine(startPoint, endPoint) {
    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.moveTo(startPoint.x, startPoint.y);
    this.context.lineTo(endPoint.x, endPoint.y);
    this.context.stroke();
    this.context.closePath();
  }

  swell() {
    const durationStep = this.duration / this.steps;
    const radiusStep = this.radius / this.steps;

    const swellIteration = (i, steps) => {
      if (i <= steps) {
        this.drawCircle(radiusStep * i);
        setTimeout(() => {
          this.clear();
          swellIteration(i + 1, steps);
        }, durationStep);
      }
    };

    swellIteration(0, this.steps);
  }

  spiral() {
    const durationStep = this.duration / this.steps;

    const spiralIteration = (angle, radius) => {
      const newAngle = angle + 1;
      const newRadius = radius + 0.1;

      const x = this.origo.x + newRadius * Math.sin(newAngle);
      const y = this.origo.y + newRadius * Math.cos(newAngle);

      const sourcePoint = new Point(x, y);
      const endPoint = sourcePoint.incrementBothBy(2);
      this.drawLine(sourcePoint, endPoint);

      setTimeout(() => {
        spiralIteration(newAngle, newRadius);
      }, durationStep);
    };

    spiralIteration(0, 0);
  }
}
