import type { BaseCardProps } from "./NodeCard";
import type { ContactNode, Link } from "@/types/tree"; 


export type ContactCardProps = Omit<BaseCardProps, "node"> & {
  node: ContactNode;   // override node type
};


export function ContactCard({
  node,
  isFocused,
}: ContactCardProps) {

  return (
    <div
      className={[
        "h-full w-full rounded-3xl border bg-white shadow-sm relative",
        "grid grid-cols-[96px_1fr] grid-rows-[auto_1fr_auto] gap-3 p-4",
        isFocused ? "ring-2 ring-slate-400" : "",
      ].join(" ")}
    >


      {/* Title */}
      <div className="truncate text-xl font-semibold leading-tight justify-center">
        {node.title}
      </div>

      {/* Nav buttons (multiple links) */}
      <div className="col-start-2 mt-2 flex flex-wrap items-center gap-2">

        {/* Render new links[] if present */}
        {node.links?.map((l: Link) => (
        <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
            {/* Icon */}
            {l.icon && (
            <img
                src={l.icon}
                alt=""
                className="h-4 w-4 object-contain"
            />
            )}

            {/* Label */}
            <span>{l.label || "Link"}</span>
        </a>
        ))}
      </div>
    </div>
  );
}
