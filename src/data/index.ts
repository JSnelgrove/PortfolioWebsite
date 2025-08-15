// src/data/index.ts
import { buildTreeData } from "./buildTree";
import { TREE_DATA as RAW_TREE } from "./tree"; // your existing nested data
export const treeData = buildTreeData(RAW_TREE);
