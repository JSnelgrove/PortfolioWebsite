// src/components/TreeView/TreeView.tsx
import { useLayoutEffect } from "react";
import type { HierarchyPointLink } from "d3-hierarchy";
import type { TreeNode } from "@/data/tree";
import { useTreeLayout } from "@/hooks/useTreeLayout";
import { useTreeCamera, type ViewMode } from "@/hooks/useTreeCamera";
import { X, Y, worldAtScreenCenter } from "@/utils/geom";
import { DebugOverlay } from "./DebugOverlay";
import { NodeCard } from "./NodeCard";

/* ============================== DEBUG TOGGLES ============================== */
const DEBUG_CROSSHAIRS   = true;   // screen center, focused node, pending target, world@screenCenter
const DEBUG_TREE_BOUNDS  = true;   // blue dashed rect around tree extents
const DEBUG_NODE_CENTERS = false;  // dots at each node center
const DEBUG_LABELS       = true;   // labels near debug markers

type Props = {
  data: TreeNode;
  nodeWidth?: number;
  nodeHeight?: number;
  nodeGapX?: number;
  nodeGapY?: number;
  startMode?: ViewMode;
  startId?: string;
};

// tiny guard for overview pose check
function nearlyEqual(a: number, b: number, eps = 0.01) {
  return Math.abs(a - b) < eps;
}

export default function TreeView({
  data,
  nodeWidth = 360,
  nodeHeight = 180,
  nodeGapX = 64,
  nodeGapY = 140,
  startMode = "overview",
  startId,
}: Props) {
  // Layout
  const {
    nodes, links, width, height,
    translateX, translateY,
    minX, maxX, minY, maxY,
  } = useTreeLayout({ data, nodeWidth, nodeHeight, nodeGapX, nodeGapY });

  // Camera
  const {
    cam, tweenCam, focusPrezi, zoomOut, recenterToFocused,
    mode, setMode, currentId, setCurrentId,
    focusedId, focusedNode,
    debugTargetId, setDebugTargetId,
    panRef, scaleRef,
  } = useTreeCamera({
    data, nodes, width, height,
    translateX, translateY,
    nodeWidth, nodeHeight,
    startMode, startId,
  });

  // Recenter when mode/focus changes — uses shared helper (prevents drift)
  useLayoutEffect(() => {
    if (mode === "overview") {
      setDebugTargetId(null);

      const atOverview =
        nearlyEqual(panRef.current.x, 0) &&
        nearlyEqual(panRef.current.y, 0) &&
        nearlyEqual(scaleRef.current, 1);

      if (!atOverview) void tweenCam(0, 0, 1, 0.6);
      return;
    }

    void recenterToFocused();
  }, [
    mode,
    currentId,            // which node is focused
    width, height,        // canvas size affects center math
    translateX, translateY,
    nodeWidth, nodeHeight,
  ]);

  // World@screenCenter (black crosshair), convert to raw world P for plotting
  const Zc = worldAtScreenCenter(panRef.current, scaleRef.current, width, height);
  const worldCenterP = { x: Zc.x - translateX, y: Zc.y - translateY };

  // quick title lookup for child button labels
  const findTitle = (id: string) => nodes.find((n) => n.data.id === id)?.data.title;

  const debugTarget = debugTargetId
    ? nodes.find((n) => n.data.id === debugTargetId) ?? null
    : null;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        {mode === "focus" ? (
          <>
            <button
              onClick={async () => {
                setMode("overview");
                setCurrentId(null);
                await zoomOut();
              }}
              className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Zoom out to full tree
            </button>
            {(currentId ?? data.id) !== data.id && (
              <button
                onClick={() => focusPrezi(data.id)}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                Back to root
              </button>
            )}
          </>
        ) : (
          <span className="text-slate-500 text-sm">
            Overview — click a node to focus (debug overlay ON)
          </span>
        )}
      </div>

      <div className="relative w-full overflow-hidden rounded-xl border bg-white">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-[75vh]"
        >
          {/* Fixed screen-center crosshair (not camera-transformed) */}
          {DEBUG_CROSSHAIRS && (
            <g>
              <line
                x1={width / 2 - 10}
                y1={height / 2}
                x2={width / 2 + 10}
                y2={height / 2}
                stroke="rgba(0,0,0,0.35)"
                strokeWidth={1}
              />
              <line
                x1={width / 2}
                y1={height / 2 - 10}
                x2={width / 2}
                y2={height / 2 + 10}
                stroke="rgba(0,0,0,0.35)"
                strokeWidth={1}
              />
              {DEBUG_LABELS && (
                <text
                  x={width / 2 + 12}
                  y={height / 2 - 6}
                  fontSize={10}
                  fill="rgba(0,0,0,0.55)"
                >
                  screen center
                </text>
              )}
            </g>
          )}

          {/* CAMERA via SVG attributes: translate(pan) → scale(s) → translate(static) */}
          <g transform={`translate(${cam.x} ${cam.y})`}>
            <g transform={`scale(${cam.s})`}>
              <g transform={`translate(${translateX} ${translateY})`}>
                {/* Links */}
                <g className="pointer-events-none stroke-slate-300">
                  {links.map((l: HierarchyPointLink<TreeNode>, i: number) => {
                    const x1 = X(l.source);
                    const y1 = Y(l.source) + nodeHeight / 2;
                    const x2 = X(l.target);
                    const y2 = Y(l.target) - nodeHeight / 2;
                    const mx = (x1 + x2) / 2;
                    return (
                      <path
                        key={i}
                        d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                        fill="none"
                        className="stroke-[2]"
                      />
                    );
                  })}
                </g>

                {/* Nodes */}
                {nodes.map((n) => (
                  <NodeCard
                    key={n.data.id}
                    node={n.data}
                    x={X(n)}
                    y={Y(n)}
                    w={nodeWidth}
                    h={nodeHeight}
                    isFocused={mode === "focus" && n.data.id === focusedId}
                    mode={mode}
                    parentId={n.parent?.data.id ?? null}
                    childIds={n.children?.map((c) => c.data.id) ?? []}
                    onFocus={() => focusPrezi(n.data.id)}
                    onGoParent={() => n.parent?.data.id && focusPrezi(n.parent.data.id)}
                    onGoChild={(cid) => focusPrezi(cid)}
                    findTitle={findTitle}
                  />
                ))}

                {/* Debug overlays inside world space */}
                <DebugOverlay
                  flags={{ DEBUG_CROSSHAIRS, DEBUG_TREE_BOUNDS, DEBUG_NODE_CENTERS, DEBUG_LABELS }}
                  nodes={nodes}
                  focusedNode={nodes.find((nn) => nn.data.id === focusedId) ?? nodes[0]}
                  debugTarget={debugTarget}
                  worldCenterP={worldCenterP}
                  minX={minX}
                  maxX={maxX}
                  minY={minY}
                  maxY={maxY}
                  nodeWidth={nodeWidth}
                  nodeHeight={nodeHeight}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
