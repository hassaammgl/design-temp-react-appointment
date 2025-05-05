
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useMeetings } from "@/contexts/MeetingContext";
import { MeetingCard } from "@/components/shared/MeetingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Meeting, MeetingStatus } from "@/contexts/MeetingContext";

export const ReceptionistDashboard = () => {
  const { getAllMeetings, assignMeeting, updateMeetingStatus } = useMeetings();
  const [statusFilter, setStatusFilter] = useState<MeetingStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const allMeetings = getAllMeetings();
  
  // Mock employees for demonstration
  const employees = [
    { id: "3", name: "Alex Employee" },
    { id: "4", name: "Sam Smith" },
    { id: "5", name: "Taylor Johnson" },
  ];

  // Apply filters
  const filteredMeetings = allMeetings.filter((meeting) => {
    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter;
    const matchesSearch = meeting.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          meeting.visitorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          meeting.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || meeting.date === selectedDate;
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  const handleAssignEmployee = (meetingId: string, employeeId: string) => {
    assignMeeting(meetingId, employeeId);
  };

  const handleUpdateStatus = (meetingId: string, status: MeetingStatus) => {
    updateMeetingStatus(meetingId, status);
  };

  return (
    <AppLayout allowedRoles={["receptionist"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receptionist Dashboard</h1>
          <p className="text-muted-foreground">
            Manage incoming meeting requests
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              onValueChange={(value) => setStatusFilter(value as MeetingStatus | "all")}
              defaultValue="all"
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div className="sm:col-span-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name, email, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Meetings Grid */}
        {filteredMeetings.length === 0 ? (
          <div className="text-center p-12">
            <p className="text-muted-foreground">No meetings match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting}>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`assign-${meeting.id}`}>Assign to</Label>
                    <Select 
                      onValueChange={(value) => handleAssignEmployee(meeting.id, value)}
                      defaultValue={meeting.assignedTo}
                    >
                      <SelectTrigger id={`assign-${meeting.id}`}>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={meeting.status === "approved" ? "default" : "outline"}
                      className={meeting.status === "approved" ? "bg-green-dark" : ""}
                      disabled={!meeting.assignedTo}
                      onClick={() => handleUpdateStatus(meeting.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant={meeting.status === "rejected" ? "destructive" : "outline"}
                      disabled={!meeting.assignedTo}
                      onClick={() => handleUpdateStatus(meeting.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </MeetingCard>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};
