import { canvas, connector } from "./global";
import { createElementNode } from "./ElementNode";
import { attachDraggableToNodeHtmlEl } from "./draggable";

const render = (el: HTMLElement) => {
  document.body.append(el);
};

(function () {
  canvas.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    const node = createElementNode({ x: 0, y: 0 });
    const evt = attachDraggableToNodeHtmlEl(node);

    render(node.htmlEl);
    connector.insertNode(node);
    connector.updateNodeConnections();

    evt.positionUpdated = () => {
      node.updateElementMetadata();
      connector.updateNodeConnections();
    };
  });
})();
