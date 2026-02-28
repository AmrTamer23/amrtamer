import { cn } from "@/lib/utils";

type StatusType = Project["status"];

const statusLabel: Record<StatusType, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  planning: "Planning",
};

const statusTone: Record<StatusType, string> = {
  completed: "bg-emerald-400",
  "in-progress": "bg-amber-400",
  planning: "bg-sky-400",
};

export function StatusPulse({
  status,
  note,
  lastUpdated,
}: {
  status: StatusType;
  note?: string;
  lastUpdated?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[var(--surface-2)] p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className={cn("inline-flex size-2 rounded-full", statusTone[status])} />
        <span className="text-meta text-[var(--text-soft)]">{statusLabel[status]}</span>
      </div>
      {note ? <p className="text-sm text-[var(--text-strong)]/90">{note}</p> : null}
      {lastUpdated ? (
        <p className="mt-2 text-xs text-[var(--text-soft)]">Last updated: {lastUpdated}</p>
      ) : null}
    </div>
  );
}
