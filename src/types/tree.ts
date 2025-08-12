// src/types/tree.ts

/** A node in your tree/graph */
export type TreeNode = {
  /** Unique ID for linking and focus navigation */
  id: string;

  /** Required title (shown in NodeCard header) */
  title: string;

  /** Optional subtitle (shown in NodeCard in overview) */
  subtitle?: string;

  /** Optional longer description (shown in focus mode) */
  description?: string;

  /** Optional image for NodeCard */
  imageUrl?: string;

  /** Optional link for "Open" button */
  href?: string;

  /** Children in the tree */
  children?: TreeNode[];
};

/** View mode of the tree camera */
export type ViewMode = "focus" | "overview";
