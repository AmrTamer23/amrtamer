import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <section className="w-full max-w-5xl">
      <div className="surface-1 rounded-2xl p-5 sm:p-7 lg:p-9">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Skeleton className="h-28 w-28 rounded-2xl bg-white/10" />
            <Skeleton className="h-4 w-40 bg-white/10" />
            <Skeleton className="h-4 w-32 bg-white/10" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 bg-white/10" />
            <Skeleton className="h-12 w-72 bg-white/10" />
            <Skeleton className="h-16 w-full bg-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Skeleton className="h-20 bg-white/10" />
              <Skeleton className="h-20 bg-white/10" />
              <Skeleton className="h-20 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
