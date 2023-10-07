// NOTE: by default, elements are stored in the 'windows' object, but re-declare canvas here for clarity
import { ElementNodeConnector } from "./ElementNodeConnector";

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const connector = new ElementNodeConnector(canvas);
