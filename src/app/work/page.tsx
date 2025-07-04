import { WorkHistory } from "@/app/work/components/work-history";
import { AppViewTransition } from "@/components/view-transition";

export default function Work() {
  return (
    <div className="flex flex-col items-center md:justify-center w-full py-4 md:py-8 px-4 md:px-0">
      <AppViewTransition name="work-history">
        <WorkHistory />
      </AppViewTransition>
    </div>
  );
}
