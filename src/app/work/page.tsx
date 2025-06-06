import WorkHistoryComponent from "@/components/ui/work-history";
import { AppViewTransition } from "@/components/view-transition";

export default function Work() {
  return (
    <div className="flex flex-col items-center justify-center  w-full py-8">
      <AppViewTransition name="work-history">
        <WorkHistoryComponent />
      </AppViewTransition>
    </div>
  );
}
