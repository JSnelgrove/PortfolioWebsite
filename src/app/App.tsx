import TreeView from "@/components/TreeView/TreeView";
import { buildTreeData } from "@/data/buildTree";
import { TREE_DATA } from "@/data/tree";


export default function App() {
  const treeData = buildTreeData(TREE_DATA); // ✅ now a TreeData object
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Jack Snelgrove</h1>
      <TreeView tree={treeData} />
    </main>
  );
}
