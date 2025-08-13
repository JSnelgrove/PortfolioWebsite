export type NodeType = "hub" | "root" | "experience" | "education" | "project" | "about" | "contact";

export const CONTENT_TYPES = ["root","experience","education","project","about","contact"] as const;
export type ContentType = typeof CONTENT_TYPES[number];

export type BaseNode = {
  id: string;
  title: string;
  type: NodeType;
  parentId?: string;
  children?: string[];
};

export type HubNode = BaseNode & {
  type: "hub";
  icon?: string;
  subtitle?: string;
};

export type ExternalLink = { label: string; url: string };
export type GalleryImage = { src: string; alt?: string; credit?: string };

export type RootNode = BaseNode & {
  type: "root";
  summary?: string;
  location: string;
  description?: string;
  images?: GalleryImage[];
  links?: ExternalLink[];
  meta?: Record<string, string | number>;
};

export type ExperienceNode = BaseNode & {
  type: "experience";
  summary?: string;
  location: string;
  description?: string;
  images?: GalleryImage[];
  links?: ExternalLink[];
  meta?: Record<string, string | number>;
};

export type EducationNode = BaseNode & {
  type: "education";
  summary?: string;
  location:string;
  description?: string;
  images?: GalleryImage[];
  links?: ExternalLink[];
  meta?: Record<string, string | number>;
};

export type ProjectNode = BaseNode & {
  type: "project";
  summary?: string;
  location:string;
  description?: string;
  images?: GalleryImage[];
  links?: ExternalLink[];
  meta?: Record<string, string | number>;
};

export type AboutNode = BaseNode & {
  type: "about";
  summary?: string;
  location:string;
  description?: string;
  images?: GalleryImage[];
  links?: ExternalLink[];
  meta?: Record<string, string | number>;
};

export type ContactNode = BaseNode & {
  type: "contact";
  summary?: string;
  location:string;
  description?: string;
  images?: GalleryImage[];
  links?: ExternalLink[];
  meta?: Record<string, string | number>;
};


export type TreeNode = HubNode | ExperienceNode | EducationNode | RootNode | AboutNode | ContactNode | ProjectNode;

export type TreeData = {
  nodesById: Record<string, TreeNode>;
  rootId: string;
};

export function isHub(n?: TreeNode | null): n is HubNode {
  return !!n && n.type === "hub";
}
export function isRoot(n?: TreeNode | null): n is RootNode {
  return !!n && n.type === "root";
}
export function isExperience(n?: TreeNode | null): n is ExperienceNode {
  return !!n && n.type === "experience";
}
export function isProject(n?: TreeNode | null): n is ProjectNode {
  return !!n && n.type === "project";
}
export function isEducation(n?: TreeNode | null): n is EducationNode {
  return !!n && n.type === "education";
}
export function isAbout(n?: TreeNode | null): n is AboutNode {
  return !!n && n.type === "about";
}
export function isContact(n?: TreeNode | null): n is ContactNode {
  return !!n && n.type === "contact";
}

export function isContent(n?: TreeNode | null): n is (RootNode|ExperienceNode|EducationNode|ProjectNode|AboutNode|ContactNode) {
  return !!n && n.type !== "hub";
}

/** View mode of the tree camera */
export type ViewMode = "focus" | "overview";
