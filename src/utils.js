export function range(length, start = 0) {
  return Array.from({ length }, (_x, i) => i + start);
}

export const debugPositions = (event) => {
  const { pageX, pageY, clientX, clientY, offsetX, offsetY, x, y } = event;
  const points = {
    "pageX/Y": [pageX, pageY],
    "clientX/Y": [clientX, clientY],
    "offsetX/Y": [offsetX, offsetY],
    "x/y": [x, y],
  };

  console.table(points);

  Object.entries(points).forEach(([name, pos]) => {
    const element = document.createElement("p");
    element.textContent = name;
    element.style = `
      position: absolute;
      top: ${pos[1]}px;
      left: ${pos[0]}px;
      font-size: 10px;
      color: tomato;
      border-top: 1px solid tomato;
      border-left: 1px solid tomato;
    `;
    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 3000);
  });
};
