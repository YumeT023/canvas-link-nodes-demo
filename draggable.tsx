import { ELEMENT_NODE_HTML_SIZE, ElementNode } from "./ElementNode";
import { canvas } from "./global";

// TODO: make the drag smoother
export const attachDraggableToNodeHtmlEl = (node: ElementNode) => {
  let hold = false;
  const el = node.htmlEl;
  const event = {
    positionUpdated: () => {},
  };

  el.addEventListener("mousedown", () => {
    hold = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (hold) {
      const { x: mx, y: my } = e;

      const x = mx + ELEMENT_NODE_HTML_SIZE;
      const y = my + ELEMENT_NODE_HTML_SIZE;

      let hasUpdated = false;
      if (x >= 0 && x < canvas.width) {
        hasUpdated = true;
        (el.style as any).left = `${mx}px`;
      }
      if (y >= 0 && y < canvas.height) {
        hasUpdated = true;
        (el.style as any).top = `${my}px`;
      }
      hasUpdated && event.positionUpdated();
    }
  });

  window.addEventListener("mouseup", () => {
    hold = false;
  });

  return event;
};
