// src/hooks/useTreeCamera.ts
import { useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import {
  computeFocusScale,
  centerAtNodeTransform,
  worldAtScreenCenter,
  zoomAbout,
  clamp,
  X,
  Y,
} from "@/utils/geom";
import type { TreeNode } from "@/types/tree";
import type { HierarchyPointNode } from "d3-hierarchy";

export type ViewMode = "focus" | "overview";

function nearlyEqual(a: number, b: number, eps = 0.01) {
  return Math.abs(a - b) < eps;
}

export function useTreeCamera({
  rootId,
  nodes,
  width,
  height,
  translateX,
  translateY,
  nodeWidth,
  nodeHeight,
  startMode = "overview",
  startId,
}: {
  rootId: string; // << was data: TreeNode
  nodes: HierarchyPointNode<TreeNode>[];
  width: number;
  height: number;
  translateX: number;
  translateY: number;
  nodeWidth: number;
  nodeHeight: number;
  startMode?: ViewMode;
  startId?: string;
}) {
  const [mode, setMode] = useState<ViewMode>(startMode);
  const [currentId, setCurrentId] = useState<string | null>(startId ?? rootId);
  const [debugTargetId, setDebugTargetId] = useState<string | null>(null);

  const focusedId = currentId ?? rootId;
  const focusedNode = nodes.find((n) => n.data.id === focusedId) ?? nodes[0];
  const rootNode = nodes.find((n) => n.data.id === rootId) ?? nodes[0];

  const initialScale =
    startMode === "focus"
      ? computeFocusScale(width, height, nodeWidth, nodeHeight)
      : 1;

  const initialPan =
    startMode === "focus"
      ? centerAtNodeTransform(
          X(focusedNode), Y(focusedNode),
          nodeWidth, nodeHeight,
          width, height,
          initialScale,
          translateX, translateY
        )
      : centerAtNodeTransform(
          X(rootNode), Y(rootNode),
          nodeWidth, nodeHeight,
          width, height,
          1,
          translateX, translateY
        );

  // Motion values → render state
  const mvX = useMotionValue(initialPan.x);
  const mvY = useMotionValue(initialPan.y);
  const mvS = useMotionValue(initialScale);

  const [cam, setCam] = useState({ x: initialPan.x, y: initialPan.y, s: initialScale });
  useMotionValueEvent(mvX, "change", (x) => setCam((c) => ({ ...c, x })));
  useMotionValueEvent(mvY, "change", (y) => setCam((c) => ({ ...c, y })));
  useMotionValueEvent(mvS, "change", (s) => setCam((c) => ({ ...c, s })));

  // Refs for math during tweens
  const panRef = useRef({ x: initialPan.x, y: initialPan.y });
  const scaleRef = useRef(initialScale);
  useMotionValueEvent(mvX, "change", (x) => (panRef.current.x = x));
  useMotionValueEvent(mvY, "change", (y) => (panRef.current.y = y));
  useMotionValueEvent(mvS, "change", (s) => (scaleRef.current = s));

  async function tweenCam(x: number, y: number, s: number, duration = 0.6) {
    await Promise.all([
      animate(mvX, x, { duration, ease: "easeInOut" }),
      animate(mvY, y, { duration, ease: "easeInOut" }),
      animate(mvS, s, { duration, ease: "easeInOut" }),
    ]);
  }

  async function recenterToFocused() {
    const node = nodes.find((n) => n.data.id === (currentId ?? rootId)) ?? nodes[0];
    const s = computeFocusScale(width, height, nodeWidth, nodeHeight);
    const { x, y } = centerAtNodeTransform(
      X(node), Y(node),
      nodeWidth, nodeHeight,
      width, height,
      s,
      translateX, translateY
    );

    if (
      nearlyEqual(x, panRef.current.x) &&
      nearlyEqual(y, panRef.current.y) &&
      nearlyEqual(s, scaleRef.current)
    ) {
      return;
    }

    await tweenCam(x, y, s, 0.55);
  }

  async function focusPrezi(targetId: string) {
    setDebugTargetId(targetId);

    const src = nodes.find((n) => n.data.id === (currentId ?? rootId)) ?? nodes[0];
    const dst = nodes.find((n) => n.data.id === targetId) ?? src;

    const s0 = scaleRef.current;
    const p0 = panRef.current;

    // 1) gentle zoom‑out about current screen center
    {
      const Zc = worldAtScreenCenter(p0, s0, width, height);
      const z1 = zoomAbout(p0, s0, clamp(s0 * 0.8, 0.45, 2.5), Zc);
      await tweenCam(z1.x, z1.y, z1.scale, 0.45);
    }

    // 2) pan to midpoint at mid scale
    {
      const midScale = scaleRef.current;
      const midX = (X(src) + X(dst)) / 2;
      const midY = (Y(src) + Y(dst)) / 2;
      const { x, y } = centerAtNodeTransform(
        midX, midY,
        nodeWidth, nodeHeight,
        width, height,
        midScale,
        translateX, translateY
      );
      await tweenCam(x, y, midScale, 0.55);
    }

    // 3) zoom‑in and center on destination
    {
      const endScale = computeFocusScale(width, height, nodeWidth, nodeHeight);
      const { x, y } = centerAtNodeTransform(
        X(dst), Y(dst),
        nodeWidth, nodeHeight,
        width, height,
        endScale,
        translateX, translateY
      );
      await tweenCam(x, y, endScale, 0.55);
    }

    setMode("focus");
    setCurrentId(targetId);
  }

  async function zoomOut() {
    setMode("overview");
    setCurrentId(null);
    await tweenCam(0, 0, 1, 0.6);
    setDebugTargetId(null);
  }

  return {
    cam,
    tweenCam,
    focusPrezi,
    zoomOut,
    recenterToFocused,
    mode,
    setMode,
    currentId,
    setCurrentId,
    focusedId: currentId ?? rootId,
    focusedNode,
    debugTargetId,
    setDebugTargetId,
    panRef,
    scaleRef,
  };
}
