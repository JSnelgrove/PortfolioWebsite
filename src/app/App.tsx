import TreeView from "@/components/TreeView/TreeView";
import { buildTreeData } from "@/data/buildTree";
import { TREE_DATA } from "@/data/tree";


export default function App() {
  const treeData = buildTreeData(TREE_DATA); 
  return (
    <main className="p-6">
      <TreeView tree={treeData} />
    </main>
  );
}
