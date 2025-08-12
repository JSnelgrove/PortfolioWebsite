// src/utils/geom.ts

/** Orientation helpers — keep your current convention */
export const X = (n: { x: number; y: number }) => n.x;
export const Y = (n: { x: number; y: number }) => n.y;

/** Clamp value between [min, max] */
export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

/** Compute focus scale to fit the node within `fill` fraction of canvas */
export function computeFocusScale(
  canvasW: number,
  canvasH: number,
  nodeW: number,
  nodeH: number,
  fill = 0.55 // matches your FOCUS_FILL
) {
  return Math.min((fill * canvasW) / nodeW, (fill * canvasH) / nodeH);
}

/** Core camera centering formula: pan = center − scale * (translate + P) */
export function centerAtNodeTransform(
  nodeCx: number,
  nodeCy: number,
  _nodeW: number,
  _nodeH: number,
  canvasW: number,
  canvasH: number,
  scale: number,
  translateX: number,
  translateY: number
) {
  const wx = translateX + nodeCx;
  const wy = translateY + nodeCy;
  return {
    x: canvasW / 2 - scale * wx,
    y: canvasH / 2 - scale * wy,
    scale,
  };
}

/** World coords (translate+P) under the fixed screen center */
export function worldAtScreenCenter(
  panXY: { x: number; y: number },
  scale: number,
  canvasW: number,
  canvasH: number
) {
  return {
    x: (canvasW / 2 - panXY.x) / scale,
    y: (canvasH / 2 - panXY.y) / scale,
  };
}

/** Zoom about a given world point Z (in translate+P coords) */
export function zoomAbout(
  panXY: { x: number; y: number },
  fromScale: number,
  toScale: number,
  Z: { x: number; y: number }
) {
  return {
    x: panXY.x + (fromScale - toScale) * Z.x,
    y: panXY.y + (fromScale - toScale) * Z.y,
    scale: toScale,
  };
}
