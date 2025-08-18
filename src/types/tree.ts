// types/tree.ts
export type Link ={
  icon: string;
  url: string;
  label: string;
}

export type Reference ={
  name: string;
  jobTitle: string;
  jpeg: string;
  date:Date;
  email:string;
}


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
  jobTitle?: string;
  startDate?: Date;
  endDate?: Date;
  references?: Reference[];
  links? : Link[];
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
  children?: string[]; // Recursive
}
export interface RootNode extends BaseNode {
  type: "root";
  description?: string; 
  children: string[];  
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
  links?: Link[];
  description: string;
  imageUrl?: string;
}

export interface ExperienceNode extends BaseNode {
  type: "experience";
  description: string;
  startDate: Date; 
  endDate: Date;
  references?: Reference[];
  imageUrl?: string;
}

export interface EducationNode extends BaseNode {
  type: "education";
  description: string;
  startDate: Date; 
  endDate: Date;
  imageUrl?: string;
}

export interface AboutNode extends BaseNode {
  type: "about";
  description: string;
  imageUrl?: string;
}

export interface ContactNode extends BaseNode {
  type: "contact";
  links? : Link[];
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
