import { Point } from "./Point.js";
import { TouchAnimation } from "./TouchAnimation.js";
import { Canvas } from "./Canvas.js";

function getOptions(inputOptions) {
  const defaultOptions = {
    type: "swell",
    duration: 600,
    steps: 200,
    radius: 30,
    color: "black",
    particleCount: 50,
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

  const { radius, duration, steps, color, type, particleCount } = getOptions(
    options
  );

  function animate({ pageX, pageY }) {
    const canvas = new Canvas({
      element,
      radius,
      color,
      touchPoint: new Point(pageX, pageY),
    });

    const animation = new TouchAnimation({
      canvas,
      steps,
      duration,
      color,
      type,
      particleCount,
    });

    animation.start();

    setTimeout(function () {
      canvas.remove();
    }, duration);
  }

  element.addEventListener("click", animate);
}
export { addTouchAnimation };
