import type { BaseCardProps } from "./NodeCard";

export type RootCardProps = Pick<
  BaseCardProps,
  "node" | "isFocused"
>;

export function RootCard({ node, isFocused }: RootCardProps) {
const img = node.imageUrl;
  return (
    <div
      className={[
        "h-full w-full rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 shadow-md",
        "flex flex-col items-center justify-center text-center p-6",
        isFocused ? "ring-2 ring-slate-400" : "",
      ].join(" ")}
    >
      {/* Image */}
      <div className="row-span-3 h-24 w-24 overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center">
        {img ? (
          <img src={img} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs text-slate-400">No image</span>
        )}
      </div>
      <h1 className="text-2xl font-bold text-slate-800">{node.title}</h1>
      {node.description && (
        <p className="mt-2 text-slate-600">{node.description}</p>
      )}
    
    </div>
    
  );
}
