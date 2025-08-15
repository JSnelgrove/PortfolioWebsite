// src/hooks/useTreeLayout.ts
import { useMemo } from "react";
import { hierarchy, tree as d3tree } from "d3-hierarchy";
import type { TreeData, TreeNode } from "@/types/tree";
import { X, Y } from "@/utils/geom";

export function useTreeLayout({
  tree,
  nodeWidth,
  nodeHeight,
  nodeGapX,
  nodeGapY,
}: {
  tree?: TreeData; // optional so undefined doesn't crash
  nodeWidth: number;
  nodeHeight: number;
  nodeGapX: number;
  nodeGapY: number;
}) {
  return useMemo(() => {
    if (!tree) {
      return {
        nodes: [],
        links: [],
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      };
    }

    const rootNode = tree.nodesById[tree.rootId];

    const h = hierarchy<TreeNode>(
      rootNode,
      (n) => n.children?.map((id) => tree.nodesById[id]) ?? []
    );

    const layout = d3tree<TreeNode>()
      .nodeSize([nodeWidth + nodeGapX, nodeHeight + nodeGapY])
      .separation((a, b) => {
        const base = a.parent === b.parent ? 1 : 2;
        const hubWeight =
          a.data.type === "hub" || b.data.type === "hub" ? 1.3 : 1;
        return base * hubWeight;
      });

    const root = layout(h);
    const nodes = root.descendants();
    const links = root.links();

    const minX = Math.min(...nodes.map((n) => X(n)));
    const maxX = Math.max(...nodes.map((n) => X(n)));
    const minY = Math.min(...nodes.map((n) => Y(n)));
    const maxY = Math.max(...nodes.map((n) => Y(n)));

    const width = maxX - minX + nodeWidth + nodeGapX * 2;
    const height = maxY - minY + nodeHeight + nodeGapY * 2;

    const translateX = -(minX - nodeWidth / 2) + nodeGapX;
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
  }, [tree, nodeWidth, nodeHeight, nodeGapX, nodeGapY]);
}
