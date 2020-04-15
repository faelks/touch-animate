import { Point } from "./Point.js";
import { TouchAnimation } from "./TouchAnimation.js";
import { Canvas } from "./Canvas.js";
import { debugPositions } from "./utils.js";

function getOptions(inputOptions) {
  const defaultOptions = {
    element: document.body,
    type: "swell",
    duration: 600,
    steps: 200,
    radius: 30,
    color: "black",
    particleCount: 50,
    debug: false,
  };

  return {
    ...defaultOptions,
    ...inputOptions,
  };
}

function addTouchAnimation(options) {
  const {
    element,
    radius,
    duration,
    steps,
    color,
    type,
    particleCount,
    debug,
  } = getOptions(options);

  function animate(event) {
    if (debug) {
      debugPositions(event);
    }

    const canvas = new Canvas({
      element,
      radius,
      color,
      touchPoint: new Point(event.pageX, event.pageY),
      debug,
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
