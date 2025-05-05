
import { MeetingStatus } from "@/contexts/MeetingContext";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: MeetingStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "status-pill",
        status === "pending" && "status-pending",
        status === "approved" && "status-approved",
        status === "rejected" && "status-rejected"
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
