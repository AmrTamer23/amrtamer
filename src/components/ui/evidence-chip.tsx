import { cn } from "@/lib/utils";
import { Badge } from "../reui/badge";


export function EvidenceChip({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <Badge

      size="lg"
      variant="primary-light"

    >
      {value}
    </Badge>
  );
}
