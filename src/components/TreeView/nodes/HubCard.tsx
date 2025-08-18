import type { BaseCardProps } from "./NodeCard";

export type HubCardProps = Pick<
  BaseCardProps,
  "node" | "isFocused"
>;

export function HubCard({
  node,
  isFocused,
}: HubCardProps) {
  return (
    <div
      className={[
        "h-full w-full rounded-3xl border-2 border bg-slate-50",
        "flex flex-col items-center justify-center p-4 gap-3",
        isFocused ? "ring-2 ring-slate-400" : "",
      ].join(" ")}
    >
      {/* Title */}
      <span className="text-lg font-semibold text-slate-600">
        {node.title}
      </span>
    </div>
  );
}
