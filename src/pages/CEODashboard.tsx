
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
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const revenueData = [
  {
    name: "Jan",
    revenue: 4000,
    projection: 3400,
  },
  {
    name: "Feb",
    revenue: 3500,
    projection: 3600,
  },
  {
    name: "Mar",
    revenue: 5000,
    projection: 4000,
  },
  {
    name: "Apr",
    revenue: 4500,
    projection: 4200,
  },
  {
    name: "May",
    revenue: 5500,
    projection: 4500,
  },
  {
    name: "Jun",
    revenue: 6000,
    projection: 4800,
  },
];

const departmentData = [
  { name: "Sales", meetings: 15 },
  { name: "Marketing", meetings: 8 },
  { name: "Finance", meetings: 6 },
  { name: "Tech", meetings: 12 },
  { name: "Ops", meetings: 9 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#22c55e",
  },
  projection: {
    label: "Projection",
    color: "#4ade80",
  },
  meetings: {
    label: "Meetings",
    color: "#16a34a",
  },
};

export const CEODashboard = () => {
  return (
    <AppLayout allowedRoles={["ceo"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CEO Dashboard</h1>
          <p className="text-muted-foreground">
            Company performance and executive meetings
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Quarter Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$16M</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last quarter
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Company Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12%</div>
                  <p className="text-xs text-muted-foreground">
                    Year over year
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Executive Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    This week
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue vs projection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <LineChart data={revenueData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="revenue" stroke="#22c55e" name="revenue" />
                    <Line type="monotone" dataKey="projection" stroke="#4ade80" strokeDasharray="5 5" name="projection" />
                  </LineChart>
                  <ChartLegend>
                    <ChartLegendContent />
                  </ChartLegend>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company KPIs</CardTitle>
                <CardDescription>
                  Key performance indicators across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Revenue Growth</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">+12%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Customer Acquisition</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">+8%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Operational Efficiency</span>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">+2%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Employee Satisfaction</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">+5%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Market Share</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">+3%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Meeting Distribution</CardTitle>
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
                <CardTitle>Executive Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Board Meeting</p>
                      <p className="text-sm text-muted-foreground">Today, 3:00 PM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Strategic Planning</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Investor Meeting</p>
                      <p className="text-sm text-muted-foreground">May 10, 11:00 AM</p>
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
