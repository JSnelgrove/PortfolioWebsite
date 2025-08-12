// src/components/TreeView/DebugOverlay.tsx
import type { HierarchyPointNode } from "d3-hierarchy";
import type { TreeNode } from "@/data/tree";
import { X, Y } from "@/utils/geom";

export function DebugOverlay({
  flags,
  nodes,
  focusedNode,
  debugTarget,
  worldCenterP,
  minX, maxX, minY, maxY,
  nodeWidth, nodeHeight,
}: {
  flags: {
    DEBUG_CROSSHAIRS: boolean;
    DEBUG_TREE_BOUNDS: boolean;
    DEBUG_NODE_CENTERS: boolean;
    DEBUG_LABELS: boolean;
  };
  nodes: HierarchyPointNode<TreeNode>[];
  focusedNode: HierarchyPointNode<TreeNode>;
  debugTarget: HierarchyPointNode<TreeNode> | null;
  worldCenterP: { x: number; y: number };
  minX: number; maxX: number; minY: number; maxY: number;
  nodeWidth: number; nodeHeight: number;
}) {
  const { DEBUG_CROSSHAIRS, DEBUG_TREE_BOUNDS, DEBUG_NODE_CENTERS, DEBUG_LABELS } = flags;

  return (
    <>
      {/* Tree bounds (blue dashed) */}
      {DEBUG_TREE_BOUNDS && (
        <g>
          <rect
            x={minX - nodeWidth / 2}
            y={minY - nodeHeight / 2}
            width={(maxX - minX) + nodeWidth}
            height={(maxY - minY) + nodeHeight}
            fill="none"
            stroke="rgba(0,128,255,0.65)"
            strokeDasharray="6 4"
            strokeWidth={1.5}
          />
          {DEBUG_LABELS && (
            <text x={minX - nodeWidth / 2} y={minY - nodeHeight / 2 - 6} fontSize={10} fill="rgba(0,128,255,0.8)">
              tree bounds
            </text>
          )}
        </g>
      )}

      {/* Node centers (optional dots) */}
      {DEBUG_NODE_CENTERS && nodes.map((n) => (
        <circle key={n.data.id} cx={X(n)} cy={Y(n)} r={2.5} fill="rgba(0,0,0,0.5)" />
      ))}

      {/* Focused node (red) */}
      {DEBUG_CROSSHAIRS && focusedNode && (
        <g>
          <line x1={X(focusedNode) - 12} y1={Y(focusedNode)} x2={X(focusedNode) + 12} y2={Y(focusedNode)} stroke="rgba(255,0,0,0.85)" strokeWidth={1}/>
          <line x1={X(focusedNode)} y1={Y(focusedNode) - 12} x2={X(focusedNode)} y2={Y(focusedNode) + 12} stroke="rgba(255,0,0,0.85)" strokeWidth={1}/>
          {DEBUG_LABELS && <text x={X(focusedNode) + 14} y={Y(focusedNode) - 6} fontSize={10} fill="rgba(255,0,0,0.9)">focused {focusedNode.data.id}</text>}
        </g>
      )}

      {/* Pending target (green) */}
      {DEBUG_CROSSHAIRS && debugTarget && (
        <g>
          <line x1={X(debugTarget) - 12} y1={Y(debugTarget)} x2={X(debugTarget) + 12} y2={Y(debugTarget)} stroke="rgba(0,160,0,0.95)" strokeWidth={1}/>
          <line x1={X(debugTarget)} y1={Y(debugTarget) - 12} x2={X(debugTarget)} y2={Y(debugTarget) + 12} stroke="rgba(0,160,0,0.95)" strokeWidth={1}/>
          {DEBUG_LABELS && <text x={X(debugTarget) + 14} y={Y(debugTarget) - 6} fontSize={10} fill="rgba(0,160,0,0.95)">target {debugTarget.data.id}</text>}
        </g>
      )}

      {/* World@screenCenter (black) */}
      {DEBUG_CROSSHAIRS && (
        <g>
          <line x1={worldCenterP.x - 10} y1={worldCenterP.y} x2={worldCenterP.x + 10} y2={worldCenterP.y} stroke="rgba(0,0,0,0.7)" strokeWidth={1}/>
          <line x1={worldCenterP.x} y1={worldCenterP.y - 10} x2={worldCenterP.x} y2={worldCenterP.y + 10} stroke="rgba(0,0,0,0.7)" strokeWidth={1}/>
          {DEBUG_LABELS && <text x={worldCenterP.x + 12} y={worldCenterP.y - 6} fontSize={10} fill="rgba(0,0,0,0.75)">world@screenCenter</text>}
        </g>
      )}
    </>
  );
}
