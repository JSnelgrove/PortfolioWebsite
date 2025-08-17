// src/utils/nodes.ts
import type { TreeNode } from "@/types/tree";

export function findTitle(
  nodes: { data: TreeNode }[],
  id: string
): string | undefined {
  return nodes.find((n) => n.data.id === id)?.data.title;
}

export function getChildIds(node: TreeNode): string[] {
  return node.children ?? [];
}
/*
export function getParentId(
  nodes: { data: TreeNode }[],
  nodeId: string
): string | null {
  for (const n of nodes) {
    if (n.data.children?.includes(nodeId)) {
      return n.data.id;
    }
  }
  return null;
}*/

export function getNodeSize(node: TreeNode) {
    const width = 360; // keep width fixed for now
    let height = 160;  // default
  
    switch (node.type) {
      case "root":
        height = 200;
        break;
      case "hub":
        height = 140;
        break;
      case "project":
      case "experience":
      case "education":
        height = 180;
        break;
      case "about":
      case "contact":
        height = 160;
        break;
    }
  
    return { w: width, h: height };
  }