import { Layout } from "@/components/layout/Layout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ProductivityChart } from "@/components/dashboard/ProductivityChart";
import { Clock, Target, Timer, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentSessions = [
  {
    id: 1,
    task: "Design system updates",
    duration: "25 min",
    time: "10:30 AM",
    type: "focus" as const,
  },
  {
    id: 2,
    task: "Code review",
    duration: "25 min",
    time: "11:15 AM",
    type: "focus" as const,
  },
  {
    id: 3,
    task: "Team standup",
    duration: "15 min",
    time: "2:00 PM",
    type: "meeting" as const,
  },
  {
    id: 4,
    task: "Bug fixes",
    duration: "25 min",
    time: "3:30 PM",
    type: "focus" as const,
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: "Finish dashboard component",
    priority: "high" as const,
    estimate: "2 pomodoros",
  },
  {
    id: 2,
    title: "Review pull requests",
    priority: "medium" as const,
    estimate: "1 pomodoro",
  },
  {
    id: 3,
    title: "Update documentation",
    priority: "low" as const,
    estimate: "1 pomodoro",
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Good morning! 👋</h1>
          <p className="text-muted-foreground">
            Here's your productivity overview for today
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Hours Worked Today"
            value="6.5h"
            change={{ value: 12, type: "increase" }}
            icon={Clock}
            color="primary"
          />
          <KPICard
            title="Focus Score"
            value="85%"
            change={{ value: 8, type: "increase" }}
            icon={Target}
            color="success"
          />
          <KPICard
            title="Pomodoros Completed"
            value={13}
            change={{ value: 5, type: "increase" }}
            icon={Timer}
            color="pomodoro"
          />
          <KPICard
            title="Tasks Completed"
            value={8}
            change={{ value: 2, type: "decrease" }}
            icon={FileText}
            color="focus"
          />
        </div>

        {/* Charts */}
        <ProductivityChart />

        {/* Recent Activity & Upcoming Tasks */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        session.type === "focus" ? "bg-success" : "bg-meeting"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{session.task}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {session.duration}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.estimate}
                    </p>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "destructive"
                        : task.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
