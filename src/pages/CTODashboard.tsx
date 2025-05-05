
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const projectData = [
  {
    name: "Jan",
    completed: 12,
    ongoing: 18,
  },
  {
    name: "Feb",
    completed: 15,
    ongoing: 20,
  },
  {
    name: "Mar",
    completed: 10,
    ongoing: 25,
  },
  {
    name: "Apr",
    completed: 18,
    ongoing: 22,
  },
  {
    name: "May",
    completed: 22,
    ongoing: 15,
  },
  {
    name: "Jun",
    completed: 25,
    ongoing: 10,
  },
];

const meetingData = [
  { name: "Mon", meetings: 8 },
  { name: "Tue", meetings: 12 },
  { name: "Wed", meetings: 15 },
  { name: "Thu", meetings: 10 },
  { name: "Fri", meetings: 7 },
];

const chartConfig = {
  completed: {
    label: "Completed Projects",
    color: "#22c55e",
  },
  ongoing: {
    label: "Ongoing Projects",
    color: "#4ade80",
  },
  meetings: {
    label: "Meetings",
    color: "#16a34a",
  },
};

export const CTODashboard = () => {
  return (
    <AppLayout allowedRoles={["cto"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CTO Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of technical projects and meetings
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">
                    +5 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    This week
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>
                  Monthly project completion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <div>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <BarChart data={projectData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="completed" fill="#22c55e" name="completed" />
                      <Bar dataKey="ongoing" fill="#4ade80" name="ongoing" />
                    </BarChart>
                    <ChartLegend>
                      <ChartLegendContent />
                    </ChartLegend>
                  </div>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Technical Projects</CardTitle>
                <CardDescription>
                  Current and upcoming technical initiatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Cloud Migration</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">In Progress</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>API Modernization</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">In Progress</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Security Audit</span>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Planned</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>CI/CD Pipeline Upgrade</span>
                    <span className="bg-blue-500/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-xs">Completed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Database Optimization</span>
                    <span className="bg-blue-500/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-xs">Completed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Meeting Schedule</CardTitle>
                <CardDescription>
                  Daily meeting distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <div>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <BarChart data={meetingData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="meetings" fill="#16a34a" name="meetings" />
                    </BarChart>
                    <ChartLegend>
                      <ChartLegendContent />
                    </ChartLegend>
                  </div>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Tech Strategy Review</p>
                      <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Project Status Update</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Vendor Discussion</p>
                      <p className="text-sm text-muted-foreground">May 8, 1:00 PM</p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Pending</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};
