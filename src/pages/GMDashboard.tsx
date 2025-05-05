
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

const meetingData = [
  { name: "Week 1", internal: 12, external: 8 },
  { name: "Week 2", internal: 15, external: 10 },
  { name: "Week 3", internal: 8, external: 12 },
  { name: "Week 4", internal: 10, external: 15 },
];

const departmentData = [
  { name: "Sales", meetings: 10 },
  { name: "Marketing", meetings: 8 },
  { name: "HR", meetings: 6 },
  { name: "Tech", meetings: 12 },
  { name: "Finance", meetings: 7 },
];

const chartConfig = {
  internal: {
    label: "Internal Meetings",
    color: "#22c55e",
  },
  external: {
    label: "External Meetings",
    color: "#4ade80",
  },
  meetings: {
    label: "Meetings",
    color: "#16a34a",
  },
};

export const GMDashboard = () => {
  return (
    <AppLayout allowedRoles={["gm"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GM Dashboard</h1>
          <p className="text-muted-foreground">
            Operations and departmental management
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    Across all departments
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Department Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">
                    +2% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Weekly Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    Internal and external
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Meeting Distribution</CardTitle>
                <CardDescription>
                  Internal vs External meetings by week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <BarChart data={meetingData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="internal" fill="#22c55e" name="internal" />
                    <Bar dataKey="external" fill="#4ade80" name="external" />
                  </BarChart>
                  <ChartLegend>
                    <ChartLegendContent />
                  </ChartLegend>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Meeting Load</CardTitle>
                <CardDescription>
                  Meetings by department this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <BarChart data={departmentData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="meetings" fill="#16a34a" name="meetings" />
                  </BarChart>
                  <ChartLegend>
                    <ChartLegendContent />
                  </ChartLegend>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Department Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Sales Team</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">On Track</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Marketing Team</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">On Track</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>HR Department</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">On Track</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Tech Department</span>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Needs Attention</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Finance Team</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">On Track</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Management Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Department Heads Review</p>
                      <p className="text-sm text-muted-foreground">Today, 11:00 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Operations Planning</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Client Meeting: ABC Corp</p>
                      <p className="text-sm text-muted-foreground">May 10, 1:00 PM</p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Pending</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Employee Onboarding Review</p>
                      <p className="text-sm text-muted-foreground">May 12, 10:00 AM</p>
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
