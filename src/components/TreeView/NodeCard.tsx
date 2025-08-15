// src/components/TreeView/NodeCard.tsx
import type { TreeNode } from "@/types/tree";

type Props = {
  node: TreeNode;
  x: number;
  y: number;
  w: number;
  h: number;
  isFocused: boolean;
  mode: "focus" | "overview";
  parentId: string | null;
  childIds: string[];
  onFocus: () => void;
  onGoParent: () => void;
  onGoChild: (cid: string) => void;
  findTitle: (id: string) => string | undefined;
};

export function NodeCard({
  node,
  x,
  y,
  w,
  h,
  isFocused,
  mode,
  parentId,
  childIds,
  onFocus,
  onGoParent,
  onGoChild,
  findTitle,
}: Props) {
  const img = node.imageUrl;
  const openLink = node.href ? { label: "Open", url: node.href } : undefined;

  return (
    <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h}>
      <div className="h-full w-full relative">
        <div
          className={[
            "h-full w-full rounded-3xl border bg-white shadow-sm",
            "grid grid-cols-[96px_1fr] grid-rows-[auto_1fr_auto] gap-3 p-4",
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

          {/* Title */}
          <div className="truncate text-xl font-semibold leading-tight">
            {node.title}
          </div>

          {/* Body */}
          {isFocused ? (
            <div className="min-w-0 text-slate-700 leading-snug">
              {node.description ?? ""}
            </div>
          ) : (
            <div className="min-w-0 truncate text-slate-600">
              {node.subtitle ?? ""}
            </div>
          )}

          {/* Nav buttons */}
          <div className="col-start-2 mt-2 flex flex-wrap items-center gap-2">
            {mode === "overview" && (
              <button
                onClick={onFocus}
                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                title="Focus this node"
              >
                Focus
              </button>
            )}
            {parentId && (
              <button
                onClick={onGoParent}
                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                title="Go to parent"
              >
                Parent
              </button>
            )}
            {childIds.slice(0, 3).map((cid) => (
              <button
                key={cid}
                onClick={() => onGoChild(cid)}
                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                title={`Go to ${cid}`}
              >
                {findTitle(cid) ?? "Child"}
              </button>
            ))}
            {openLink && (
              <a
                href={openLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                {openLink.label}
              </a>
            )}
          </div>
        </div>

        {/* Full-card overlay clickable in overview */}
        {mode === "overview" && (
          <button
            type="button"
            onClick={onFocus}
            className="absolute inset-0 rounded-3xl focus:outline-none focus:ring-2 focus:ring-slate-400"
            style={{ pointerEvents: "auto", zIndex: 10 }}
            aria-label={`Focus ${node.title}`}
          />
        )}
      </div>
    </foreignObject>
  );
}
