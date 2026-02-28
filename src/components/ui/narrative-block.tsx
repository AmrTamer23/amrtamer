import { cn } from "@/lib/utils";

export function NarrativeBlock({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-white/10 bg-[var(--surface-2)] p-4",
        className
      )}
    >
      <h3 className="text-meta mb-2 text-[var(--text-soft)]">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={`${title}-${idx}`} className="text-sm text-[var(--text-strong)]/90">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
