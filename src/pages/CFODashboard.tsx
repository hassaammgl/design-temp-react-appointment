
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
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const financeData = [
  {
    name: "Jan",
    revenue: 4000,
    expenses: 2400,
    profit: 1600,
  },
  {
    name: "Feb",
    revenue: 3500,
    expenses: 2200,
    profit: 1300,
  },
  {
    name: "Mar",
    revenue: 5000,
    expenses: 3100,
    profit: 1900,
  },
  {
    name: "Apr",
    revenue: 4500,
    expenses: 2900,
    profit: 1600,
  },
  {
    name: "May",
    revenue: 5500,
    expenses: 3300,
    profit: 2200,
  },
  {
    name: "Jun",
    revenue: 6000,
    expenses: 3500,
    profit: 2500,
  },
];

const budgetData = [
  { name: "Tech", budget: 45, actual: 42 },
  { name: "HR", budget: 25, actual: 23 },
  { name: "Marketing", budget: 35, actual: 38 },
  { name: "Sales", budget: 30, actual: 28 },
  { name: "Ops", budget: 20, actual: 18 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#22c55e",
  },
  expenses: {
    label: "Expenses",
    color: "#f97316",
  },
  profit: {
    label: "Profit",
    color: "#4ade80",
  },
  budget: {
    label: "Budget",
    color: "#4ade80",
  },
  actual: {
    label: "Actual",
    color: "#16a34a",
  },
};

export const CFODashboard = () => {
  return (
    <AppLayout allowedRoles={["cfo"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CFO Dashboard</h1>
          <p className="text-muted-foreground">
            Financial overview and budget tracking
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Financial Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="meetings">Financial Meetings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$5.5M</div>
                  <p className="text-xs text-muted-foreground">
                    +10% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3.3M</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Profit Margin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">40%</div>
                  <p className="text-xs text-muted-foreground">
                    +3% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>
                  Monthly financial metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <div>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <LineChart data={financeData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Line type="monotone" dataKey="revenue" stroke="#22c55e" name="revenue" />
                      <Line type="monotone" dataKey="expenses" stroke="#f97316" name="expenses" />
                      <Line type="monotone" dataKey="profit" stroke="#4ade80" name="profit" />
                    </LineChart>
                    <ChartLegend>
                      <ChartLegendContent />
                    </ChartLegend>
                  </div>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Departmental Budget vs Actual</CardTitle>
                <CardDescription>
                  Current month budget performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3] w-full">
                  <div>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <BarChart data={budgetData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="budget" fill="#4ade80" name="budget" />
                      <Bar dataKey="actual" fill="#16a34a" name="actual" />
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
                <CardTitle>Budget Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Marketing Budget</span>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Over by 8%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>IT Infrastructure</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Under by 2%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>R&D Projects</span>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">On Target</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Quarterly Review</p>
                      <p className="text-sm text-muted-foreground">Today, 1:00 PM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Budget Planning</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                    </div>
                    <span className="bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs">Confirmed</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Investor Presentation</p>
                      <p className="text-sm text-muted-foreground">May 12, 2:00 PM</p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs">Pending</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Audit Discussion</p>
                      <p className="text-sm text-muted-foreground">May 15, 3:00 PM</p>
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
