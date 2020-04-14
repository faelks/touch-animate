import { Point } from "./Point.js";
import { range } from "./utils.js";
import { Particle } from "./Particle.js";

export class TouchAnimation {
  constructor({ canvas, steps, duration, color, type, particleCount }) {
    this.canvas = canvas;
    this.steps = steps;
    this.duration = duration;
    this.color = color;
    this.type = type;

    // Only relevant if type = 'particle'
    this.particleCount = particleCount;

    this.stepDuration = duration / steps;
    this.stepDistance = canvas.radius / steps;
    this.origo = canvas.getOrigo();
  }

  start() {
    switch (this.type) {
      case "spiral":
        this.spiral();
        break;
      case "particle":
        console.log("particle");
        this.particle();
        break;
      case "swell":
        this.swell();
        break;
      default:
        throw new Error(`"${this.type}" is not a valid touch animation type`);
    }
  }

  swell() {
    const swellIteration = (i = 0) => {
      if (i > this.steps) {
        return;
      }

      this.canvas.drawCircle(this.stepDistance * i);

      setTimeout(() => {
        this.canvas.clear();

        swellIteration(i + 1);
      }, this.stepDuration);
    };

    swellIteration();
  }

  spiral() {
    const spiralIteration = (angle = 0, radius = 0) => {
      const newAngle = angle + 1;
      const newRadius = radius + 0.1;

      const x = this.origo.x + newRadius * Math.sin(newAngle);
      const y = this.origo.y + newRadius * Math.cos(newAngle);

      const sourcePoint = new Point(x, y);
      const endPoint = sourcePoint.incrementBothBy(2);
      this.canvas.drawLine(sourcePoint, endPoint);

      setTimeout(() => {
        spiralIteration(newAngle, newRadius);
      }, this.stepDuration);
    };

    spiralIteration();
  }

  particle() {
    const particles = range(this.particleCount, 1).map((i) => {
      // Adding a random height width multiplier leads to
      // differently sized particles.
      return new Particle({
        canvas: this.canvas,
        height: 2 * Math.random(),
        width: 2 * Math.random(),
        angle: ((2 * Math.PI) / this.particleCount) * i,
        steps: this.steps,
      });
    });

    const particleIteration = (i = 0) => {
      if (i > this.steps) {
        return;
      }
      particles.forEach((particle) => {
        particle.draw(i);
      });

      setTimeout(() => {
        this.canvas.clear();
        particleIteration(i + 1);
      }, this.stepDuration);
    };

    particleIteration();
  }
}
