import TreeView from "@/components/TreeView/TreeView";
import { TREE_DATA } from "@/data/tree";

export default function App() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Jack Snelgrove</h1>
      <TreeView data={TREE_DATA} />
    </main>
  );
}
