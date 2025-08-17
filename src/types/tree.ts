// types/tree.ts

/** All allowed node types for the tree */
export const CONTENT_TYPES = [
  "hub",
  "root",
  "experience",
  "education",
  "project",
  "about",
  "contact"
] as const;

export interface RawNode {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  children?: RawNode[];
}

export interface TreeData {
  nodesById: Record<string, TreeNode>;
  rootId: string;
}

export type ContentType = typeof CONTENT_TYPES[number];

/** Common props for all node types */
interface BaseNode {
  type: ContentType;
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  children?: string[]; // Recursive
}
export interface RootNode extends BaseNode {
  type: "root";
  description?: string; // optional, could show tagline
  children: string[];   // must have children
  // ✅ no imageUrl here
}


/** Hubs are navigation-only, minimal content */
export interface HubNode extends BaseNode {
  type: "hub" ;
  description?: string;
  children: string[];
}

/** Content-heavy node types */
export interface ProjectNode extends BaseNode {
  type: "project";
  description: string;
  imageUrl?: string;
}

export interface ExperienceNode extends BaseNode {
  type: "experience";
  description: string;
  imageUrl?: string;
}

export interface EducationNode extends BaseNode {
  type: "education";
  description: string;
  imageUrl?: string;
}

export interface AboutNode extends BaseNode {
  type: "about";
  description: string;
  imageUrl?: string;
}

export interface ContactNode extends BaseNode {
  type: "contact";
  description?: string;
}

/** The full tree node union */
export type TreeNode =
  | RootNode
  | HubNode
  | ProjectNode
  | ExperienceNode
  | EducationNode
  | AboutNode
  | ContactNode;
