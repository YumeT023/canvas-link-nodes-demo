export const ELEMENT_NODE_HTML_SIZE = 50;

export const createElementNode = (at: Pick<ElementAttributes, "x" | "y">) => {
  const html = document.createElement("div");
  html.className = "element-node";

  html.style.height = html.style.width = `${ELEMENT_NODE_HTML_SIZE}px`;
  html.style.left = `${at.x}px`;
  html.style.top = `${at.y}px`;
  return ElementNode.create(html);
};

export interface ElementAttributes {
  x: number;
  y: number;
  w: number;
  h: number;
}

export class ElementNode {
  public metadata: ElementAttributes;

  private constructor(public htmlEl: HTMLElement) {
    this.updateElementMetadata();
  }

  public describePosFrom(other: ElementNode) {
    const a = this.coord;
    const b = other.coord;
    return {
      isLeftSided: a.x2 < b.x1,
      isUpper: a.y2 < b.y1,
    };
  }

  public static create(selector: string | HTMLElement) {
    if (typeof selector === "string") {
      if (!selector.startsWith("#")) throw new Error("non-id Selector");
      const el = document.getElementById(selector.substring(1));
      return new ElementNode(el);
    }
    return new ElementNode(selector);
  }

  public updateElementMetadata() {
    const rect = this.htmlEl.getBoundingClientRect();
    const { x, y, width: w, height: h } = rect;
    this.metadata = { x, y, w, h };
  }

  public get coord() {
    const { x, w, y, h } = this.metadata;
    return {
      x1: x,
      x2: x + w,
      y1: y,
      y2: y + h,
    };
  }
}
