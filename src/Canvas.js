import { Point } from "./Point.js";

// Wrapper around the <canvas> and its drawing context
export class Canvas {
  constructor({ element, radius, touchPoint, color, debug }) {
    this.element = element;
    this.touchPoint = touchPoint;
    this.id = `${Math.random() * 10e4}`;
    this.color = color;
    this.debug = debug;

    // All canvas objects are circular
    this.radius = radius;
    this.height = radius * 2;
    this.width = radius * 2;

    this.htmlNode = this.createCanvas();
    this.context = this.createContext();
  }

  getCssStyleString() {
    return `
    position: absolute; 
    left: ${this.touchPoint.x - this.radius}px;
    top: ${this.touchPoint.y - this.radius}px;
    border-radius: ${this.radius}px;
    ${this.debug && "border: 1px solid red;"}
  `;
  }

  createCanvas() {
    const htmlNode = document.createElement("canvas");
    htmlNode.id = this.id;
    htmlNode.height = this.height;
    htmlNode.width = this.width;
    htmlNode.style = this.getCssStyleString();

    document.body.appendChild(htmlNode);
    return htmlNode;
  }

  createContext() {
    const context = this.htmlNode.getContext("2d");
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.lineWidth = 1;

    return context;
  }

  getOrigo() {
    return new Point(this.radius, this.radius);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawCircle(radius) {
    const origo = this.getOrigo();

    this.context.beginPath();
    this.context.arc(origo.x, origo.y, radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
  }

  drawLine(startPoint, endPoint) {
    this.context.beginPath();
    this.context.moveTo(startPoint.x, startPoint.y);
    this.context.lineTo(endPoint.x, endPoint.y);
    this.context.stroke();
    this.context.closePath();
  }

  drawRectangle(point, width, height) {
    this.context.fillRect(point.x, point.y, width, height);
  }

  remove() {
    this.htmlNode.remove();
  }
}
