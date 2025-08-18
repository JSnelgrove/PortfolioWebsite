import type { BaseCardProps } from "./NodeCard";

export type ContentCardProps = Pick<
  BaseCardProps,
  "node" | "isFocused"
>;

export function ContentCard({
  node,
  isFocused,

}: ContentCardProps) {
  const img = node.imageUrl;

  return (
<div
  className={[
    "h-full w-full rounded-3xl border bg-white shadow-sm relative", // 👈 added relative
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
    {isFocused && (
        <div className="min-w-0 text-slate-700 leading-snug">
            {node.subtitle && (
            <div className="text-base font-medium mb-1">
                {node.subtitle}
            </div>
            )}
            {node.description && (
            <div className="text-sm text-slate-600">
                {node.description}
            </div>
            )}
        </div>
    )}
    </div>
  );
}
