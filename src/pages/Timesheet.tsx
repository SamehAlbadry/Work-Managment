import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock timesheet data for demonstration
const mockTimeEntries = [
  {
    id: 1,
    startTime: "9:00 AM",
    endTime: "9:25 AM",
    duration: "25 min",
    task: "Code review and feedback",
    type: "pomodoro",
  },
  {
    id: 2,
    startTime: "9:35 AM",
    endTime: "10:00 AM",
    duration: "25 min",
    task: "Bug fixes in authentication module",
    type: "pomodoro",
  },
  {
    id: 3,
    startTime: "10:15 AM",
    endTime: "10:40 AM",
    duration: "25 min",
    task: "Database optimization research",
    type: "pomodoro",
  },
  {
    id: 4,
    startTime: "11:00 AM",
    endTime: "11:25 AM",
    duration: "25 min",
    task: "UI component development",
    type: "pomodoro",
  },
  {
    id: 5,
    startTime: "2:00 PM",
    endTime: "2:25 PM",
    duration: "25 min",
    task: "Documentation updates",
    type: "pomodoro",
  },
];

const totalTime = mockTimeEntries.reduce((acc, entry) => {
  return acc + 25; // Each pomodoro is 25 minutes
}, 0);

export default function Timesheet() {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Timesheet</h1>
            <p className="text-muted-foreground">
              View your completed Pomodoro sessions for today
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Time
                  </p>
                  <p className="text-2xl font-bold">
                    {Math.floor(totalTime / 60)}h {totalTime % 60}m
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Sessions
                  </p>
                  <p className="text-2xl font-bold">{mockTimeEntries.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pomodoro/10 text-pomodoro rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Session
                  </p>
                  <p className="text-2xl font-bold">25m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timesheet Table */}
        <Card className="transition-all duration-200 hover:shadow-soft-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Today's Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockTimeEntries.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
                <p className="text-muted-foreground">
                  Complete your first Pomodoro session to see it appear here
                  automatically.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Start Time</TableHead>
                      <TableHead className="w-32">End Time</TableHead>
                      <TableHead className="w-24">Duration</TableHead>
                      <TableHead>Task Description</TableHead>
                      <TableHead className="w-24">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTimeEntries.map((entry) => (
                      <TableRow
                        key={entry.id}
                        className="hover:bg-secondary/50"
                      >
                        <TableCell className="font-medium">
                          {entry.startTime}
                        </TableCell>
                        <TableCell>{entry.endTime}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{entry.duration}</Badge>
                        </TableCell>
                        <TableCell>{entry.task}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-pomodoro/10 text-pomodoro border-pomodoro/20"
                          >
                            Pomodoro
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Integration Notice */}
        <Card className="border-2 border-dashed border-muted bg-muted/20">
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">
              Auto-Filled from Pomodoro Sessions
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              This timesheet automatically captures all your completed Pomodoro
              sessions. Start using the Pomodoro timer to see your productive
              hours tracked here in real-time.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
