"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { Activity, Users, BookOpen } from "lucide-react";

const overallProgressData = [
  { month: "Jan", progress: 65 },
  { month: "Feb", progress: 70 },
  { month: "Mar", progress: 78 },
  { month: "Apr", progress: 82 },
  { month: "May", progress: 85 },
  { month: "Jun", progress: 92 },
];

const subjectPerformanceData = [
  { subject: "Math", studentA: 88, studentB: 76, studentC: 92 },
  { subject: "Science", studentA: 95, studentB: 89, studentC: 85 },
  { subject: "History", studentA: 78, studentB: 85, studentC: 80 },
  { subject: "English", studentA: 91, studentB: 94, studentC: 88 },
];

const chartConfig: ChartConfig = {
  progress: {
    label: "Overall Progress",
    color: "hsl(var(--primary))",
  },
  studentA: {
    label: "Student A",
    color: "hsl(var(--chart-1))",
  },
  studentB: {
    label: "Student B",
    color: "hsl(var(--chart-2))",
  },
  studentC: {
    label: "Student C",
    color: "hsl(var(--chart-3))",
  },
};

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Class Engagement
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28/30</div>
            <p className="text-xs text-muted-foreground">
              93% participation rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lessons Completed
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <p className="text-xs text-muted-foreground">
              3 new lessons this week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Monthly progress of the class average.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={overallProgressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Comparing performance of top students across subjects.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={subjectPerformanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="studentA" fill="var(--color-studentA)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="studentB" fill="var(--color-studentB)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="studentC" fill="var(--color-studentC)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
