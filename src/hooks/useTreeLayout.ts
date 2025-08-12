// src/hooks/useTreeLayout.ts
import { useMemo } from "react";
import { hierarchy, tree as d3tree } from "d3-hierarchy";
import type { TreeNode } from "@/data/tree";
import { X, Y } from "@/utils/geom";

export function useTreeLayout({
  data, nodeWidth, nodeHeight, nodeGapX, nodeGapY
}: {
  data: TreeNode;
  nodeWidth: number;
  nodeHeight: number;
  nodeGapX: number;
  nodeGapY: number;
}) {
  return useMemo(() => {
    const h = hierarchy<TreeNode>(data, (n) => n.children ?? null);

    // Keep your orientation: horizontal step (X) then vertical (Y)
    const layout = d3tree<TreeNode>().nodeSize([
      nodeWidth + nodeGapX,
      nodeHeight + nodeGapY,
    ]);

    const root = layout(h);
    const nodes = root.descendants();
    const links = root.links();

    const minX = Math.min(...nodes.map((n) => X(n)));
    const maxX = Math.max(...nodes.map((n) => X(n)));
    const minY = Math.min(...nodes.map((n) => Y(n)));
    const maxY = Math.max(...nodes.map((n) => Y(n)));

    const width  = (maxX - minX) + nodeWidth  + nodeGapX * 2;
    const height = (maxY - minY) + nodeHeight + nodeGapY * 2;

    // static padding translate (applied INSIDE scale)
    const translateX = -(minX - nodeWidth  / 2) + nodeGapX;
    const translateY = -(minY - nodeHeight / 2) + nodeGapY;

    return {
      nodes,
      links,
      width,
      height,
      translateX,
      translateY,
      minX,
      maxX,
      minY,
      maxY,
    };
  }, [data, nodeWidth, nodeHeight, nodeGapX, nodeGapY]);
}
