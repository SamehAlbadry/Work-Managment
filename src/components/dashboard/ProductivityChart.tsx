import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const weeklyData = [
  { day: "Mon", hours: 6.5, focus: 78, pomodoros: 12 },
  { day: "Tue", hours: 7.2, focus: 85, pomodoros: 14 },
  { day: "Wed", hours: 5.8, focus: 72, pomodoros: 11 },
  { day: "Thu", hours: 8.1, focus: 92, pomodoros: 16 },
  { day: "Fri", hours: 7.5, focus: 88, pomodoros: 15 },
  { day: "Sat", hours: 4.2, focus: 65, pomodoros: 8 },
  { day: "Sun", hours: 3.8, focus: 58, pomodoros: 7 },
];

export function ProductivityChart() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="transition-all duration-200 hover:shadow-soft-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="hours"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-200 hover:shadow-soft-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Focus Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [`${value}%`, "Focus Score"]}
                />
                <Line
                  type="monotone"
                  dataKey="focus"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: "hsl(var(--success))",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
