// src/data/buildTree.ts
import type {
  TreeNode,
  ContentType,
  HubNode,
  RootNode,
  ProjectNode,
  ExperienceNode,
  EducationNode,
  AboutNode,
  ContactNode,
  TreeData, 
  RawNode
} from "@/types/tree";

type TypeResolver = (node: RawNode, parentId?: string) => ContentType;

const defaultResolver: TypeResolver = (node, parentId) => {
  if (!parentId) return "root";
  if (parentId === "projects") return "project";
  if (parentId === "experience") return "experience";
  if (parentId === "education") return "education";
  if (node.id === "about") return "about";
  if (node.id === "contact") return "contact";
  if (node.children?.length) return "hub"; 
  return "about";
};

export function buildTreeData(
  raw: RawNode,
  resolveType: TypeResolver = defaultResolver
): TreeData {
  const nodesById: Record<string, TreeNode> = {};

  const walk = (node: RawNode, parentId?: string) => {
    const type = resolveType(node, parentId);
    const childrenIds = (node.children ?? []).map((c) => c.id);

    let typed: TreeNode;

    switch (type) {
      case "hub":
        typed = {
          type,
          id: node.id,
          title: node.title,
          children: childrenIds,
        } as HubNode;
      break;
        
      case "root":
        typed = {
          type,
          id: node.id,
          title: node.title,
          subtitle: node.subtitle,
          description: node.description,
          imageUrl: node.imageUrl,
          href: node.href,
          children: childrenIds
        } as RootNode; // covers both hub & root
        break;

      case "project":
        typed = {
          type,
          id: node.id,
          title: node.title,
          subtitle: node.subtitle,
          description: node.description ?? "",
          imageUrl: node.imageUrl,
          href: node.href,
          children: childrenIds
        } as ProjectNode;
        break;

      case "experience":
        typed = {
          type,
          id: node.id,
          title: node.title,
          subtitle: node.subtitle,
          description: node.description ?? "",
          imageUrl: node.imageUrl,
          href: node.href,
          children: childrenIds
        } as ExperienceNode;
        break;

      case "education":
        typed = {
          type,
          id: node.id,
          title: node.title,
          subtitle: node.subtitle,
          description: node.description ?? "",
          imageUrl: node.imageUrl,
          href: node.href,
          children: childrenIds
        } as EducationNode;
        break;

      case "about":
        typed = {
          type,
          id: node.id,
          title: node.title,
          subtitle: node.subtitle,
          description: node.description ?? "",
          imageUrl: node.imageUrl,
          href: node.href,
          children: childrenIds
        } as AboutNode;
        break;

      case "contact":
        typed = {
          type,
          id: node.id,
          title: node.title,
          subtitle: node.subtitle,
          description: node.description,
          href: node.href,
          children: childrenIds
        } as ContactNode; 
        break;

      default:
        throw new Error(`Unknown node type: ${type}`);
    }

    nodesById[typed.id] = typed;

    for (const child of node.children ?? []) {
      walk(child, node.id);
    }
  };

  walk(raw);
  return { nodesById, rootId: raw.id };
}
