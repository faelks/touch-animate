import { Point } from "./Point.js";
import { TouchAnimation } from "./TouchAnimation.js";

// Create the html canvas element and add styling
function createCanvas(x, y, radius) {
  const canvas = document.createElement("canvas");
  canvas.id = `${Math.random() * 1000}`;
  canvas.height = radius * 2;
  canvas.width = radius * 2;

  canvas.style = `
    position: absolute; 
    left: ${x - radius}px;
    top: ${y - radius}px;
    border-radius: ${radius}px;
  `;

  return canvas;
}

// Get library options, use defaults if missing
function getOptions(inputOptions) {
  const defaultOptions = {
    type: "swell",
    duration: 600,
    steps: 200,
    radius: 30,
    color: "black",
  };

  return {
    ...defaultOptions,
    ...inputOptions,
  };
}

function addTouchAnimation(element, options) {
  if (!element) {
    console.error("No element given");
    return;
  }

  const { radius, duration, steps, color, type } = getOptions(options);

  function animate({ x, y }) {
    const canvas = createCanvas(x, y, radius);
    const context = canvas.getContext("2d");
    element.appendChild(canvas);

    const origo = new Point(radius, radius);
    const animation = new TouchAnimation({
      context,
      origo,
      radius,
      steps,
      duration,
      color,
      type,
    });

    animation.start();
    console.log(animation);

    setTimeout(function () {
      canvas.remove();
    }, duration);
  }

  element.addEventListener("click", animate);
}

export { addTouchAnimation };
