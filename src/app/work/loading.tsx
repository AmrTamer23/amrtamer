import { Skeleton } from "@/components/ui/skeleton";

export default function WorkLoading() {
  return (
    <div className="w-full max-w-5xl space-y-4">
      <div className="surface-1 rounded-2xl p-5 space-y-3">
        <Skeleton className="h-4 w-32 bg-white/10" />
        <Skeleton className="h-10 w-96 bg-white/10" />
        <Skeleton className="h-5 w-full bg-white/10" />
      </div>
      {[0, 1].map((idx) => (
        <div key={idx} className="surface-1 rounded-xl p-4 space-y-3">
          <Skeleton className="h-6 w-56 bg-white/10" />
          <Skeleton className="h-4 w-80 bg-white/10" />
          <Skeleton className="h-20 w-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}
