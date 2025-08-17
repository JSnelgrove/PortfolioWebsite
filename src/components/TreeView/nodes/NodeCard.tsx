import type { TreeNode } from "@/types/tree";
import { HubCard } from "./HubCard";
import { RootCard } from "./RootCard";
import { ContentCard } from "./ContentCard";

export type BaseCardProps = {
  node: TreeNode;
  isFocused: boolean;
  mode: "focus" | "overview";
  parentId: string | null;
  childIds: string[];
  onFocus: () => void;
  onGoParent: () => void;
  onGoChild: (cid: string) => void;
  findTitle: (id: string) => string | undefined;
};

export type NodeCardProps = BaseCardProps & {
  x: number;
  y: number;
  w: number;
  h: number;
};

export function NodeCard(props: NodeCardProps) {
  const { node, x, y, w, h, mode, onFocus } = props;

  return (
    <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h}>
      <div className="h-full w-full relative">
        {node.type === "hub" && <HubCard {...props} />}
        {node.type === "root" && <RootCard {...props} />}
        {node.type !== "hub" && node.type !== "root" && (
          <ContentCard {...props} />
        )}

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
