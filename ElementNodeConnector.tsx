import { ElementNode } from "./ElementNode";

export class ElementNodeConnector {
  private readonly _nodes: ElementNode[];
  private readonly _ctx: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    this._nodes = [];
    this._ctx = canvas.getContext("2d");
  }

  public insertNode(...nodes: ElementNode[]) {
    this._nodes.push(...nodes);
  }

  public resetCanvas() {
    this._ctx.closePath();
    const { width, height } = this.canvas;
    this._ctx.clearRect(0, 0, width, height);
  }

  private _connect() {
    let [node, ...rest] = this._nodes;
    while (node != null && rest.length) {
      const nextNode = rest.shift();
      this.bindTwoElementNode(node, nextNode);
      node = nextNode;
    }
  }

  public updateNodeConnections() {
    this.resetCanvas();
    this._prepareInk();
    this._connect();
    this._draw();
  }

  private bindTwoElementNode(nodeA: ElementNode, nodeB: ElementNode) {
    const ctx = this._ctx;
    const a = nodeA.coord;
    const b = nodeB.coord;

    const desc = nodeA.describePosFrom(nodeB);

    const ax = desc.isLeftSided ? a.x2 : a.x1;
    const ay = desc.isUpper ? a.y2 : a.y1;

    const bx = desc.isLeftSided ? b.x1 : b.x2;
    const by = desc.isUpper ? b.y1 : b.y2;

    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
  }

  private _prepareInk() {
    this._ctx.beginPath();
    return this._ctx;
  }

  private _draw(style: "stroke" | "fill" = "stroke") {
    this._ctx[style]();
    this._ctx.closePath();
  }
}
