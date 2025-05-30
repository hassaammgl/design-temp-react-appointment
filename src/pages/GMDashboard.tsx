import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { MeetingRequestsPanel } from "@/components/dashboard/MeetingRequestsPanel";

export const GMDashboard = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout allowedRoles={["gm"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">General Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Operational overview and meeting requests
          </p>
        </div>
        
        {/* Meeting Requests Panel */}
        {user && <MeetingRequestsPanel userId={user.id} />}
      </div>
    </AppLayout>
  );
};
