import { cn } from "@/lib/utils";

export function EvidenceChip({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-[var(--text-soft)]",
        className
      )}
    >
      {value}
    </span>
  );
}
