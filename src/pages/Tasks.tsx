import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Calendar,
  BarChart3,
  Kanban,
  Settings,
  Filter,
  Timer,
  Clock,
  AlertCircle,
  CheckCircle,
  Circle,
  Pause,
} from "lucide-react";
import { Task } from "@/types";

// Mock data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design system updates",
    description: "Update button components and color palette",
    status: "in-progress",
    priority: "high",
    deadline: new Date("2024-01-15"),
    tags: ["design", "ui"],
    subtasks: [
      {
        id: "s1",
        title: "Update buttons",
        completed: true,
        createdAt: new Date(),
      },
      {
        id: "s2",
        title: "Color palette",
        completed: false,
        createdAt: new Date(),
      },
    ],
    pomodorosSpent: 3,
    pomodorosEstimated: 5,
    storyPoints: 8,
    projectId: "proj1",
    dependencies: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    progress: 60,
  },
  {
    id: "2",
    title: "API Integration",
    description: "Connect frontend with new backend endpoints",
    status: "todo",
    priority: "medium",
    tags: ["development", "api"],
    subtasks: [],
    pomodorosSpent: 0,
    pomodorosEstimated: 8,
    storyPoints: 13,
    projectId: "proj1",
    dependencies: ["1"],
    createdAt: new Date(),
    updatedAt: new Date(),
    progress: 0,
  },
  {
    id: "3",
    title: "User testing session",
    description: "Conduct usability testing with 5 users",
    status: "done",
    priority: "high",
    tags: ["research", "ux"],
    subtasks: [
      {
        id: "s3",
        title: "Recruit users",
        completed: true,
        createdAt: new Date(),
      },
      {
        id: "s4",
        title: "Prepare test script",
        completed: true,
        createdAt: new Date(),
      },
      {
        id: "s5",
        title: "Conduct sessions",
        completed: true,
        createdAt: new Date(),
      },
    ],
    pomodorosSpent: 6,
    pomodorosEstimated: 6,
    storyPoints: 5,
    projectId: "proj1",
    dependencies: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    progress: 100,
  },
];

const priorityColors = {
  low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusIcons = {
  todo: Circle,
  "in-progress": Timer,
  blocked: Pause,
  done: CheckCircle,
};

function TaskCard({ task }: { task: Task }) {
  const StatusIcon = statusIcons[task.status];

  return (
    <Card className="transition-all duration-200 hover:shadow-soft-lg hover:scale-105 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold truncate">{task.title}</h3>
          </div>
          <Badge className={priorityColors[task.priority]} variant="secondary">
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        {/* Pomodoros */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4 text-pomodoro" />
            <span>
              {task.pomodorosSpent}/{task.pomodorosEstimated}
            </span>
          </div>
          {task.storyPoints && (
            <Badge variant="outline" className="text-xs">
              {task.storyPoints} pts
            </Badge>
          )}
        </div>

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Deadline */}
        {task.deadline && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{task.deadline.toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function KanbanView({ tasks }: { tasks: Task[] }) {
  const columns = [
    { id: "todo", title: "To Do", status: "todo" as const },
    { id: "in-progress", title: "In Progress", status: "in-progress" as const },
    { id: "blocked", title: "Blocked", status: "blocked" as const },
    { id: "done", title: "Done", status: "done" as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status,
        );

        return (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <Badge variant="secondary">{columnTasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GanttView({ tasks }: { tasks: Task[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Gantt Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Gantt View Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Interactive Gantt chart with task dependencies, timeline
            visualization, and drag-to-reschedule functionality.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SprintView({ tasks }: { tasks: Task[] }) {
  const sprintTasks = tasks.filter((task) => task.storyPoints);
  const totalPoints = sprintTasks.reduce(
    (acc, task) => acc + (task.storyPoints || 0),
    0,
  );
  const completedPoints = sprintTasks
    .filter((task) => task.status === "done")
    .reduce((acc, task) => acc + (task.storyPoints || 0), 0);

  return (
    <div className="space-y-6">
      {/* Sprint Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Total Points
              </span>
              <span className="text-2xl font-bold">{totalPoints}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Completed
              </span>
              <span className="text-2xl font-bold text-success">
                {completedPoints}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Velocity
              </span>
              <span className="text-2xl font-bold">
                {Math.round((completedPoints / totalPoints) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sprint Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sprintTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default function Tasks() {
  const [currentView, setCurrentView] = useState("kanban");
  const [tasks] = useState<Task[]>(mockTasks);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Task Management</h1>
            <p className="text-muted-foreground">
              Manage your tasks with Kanban, Gantt, and Sprint views
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={currentView} onValueChange={setCurrentView}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kanban">
                  <div className="flex items-center gap-2">
                    <Kanban className="w-4 h-4" />
                    Kanban
                  </div>
                </SelectItem>
                <SelectItem value="gantt">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Gantt
                  </div>
                </SelectItem>
                <SelectItem value="sprint">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    Sprint
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* View Content */}
        {currentView === "kanban" && <KanbanView tasks={tasks} />}
        {currentView === "gantt" && <GanttView tasks={tasks} />}
        {currentView === "sprint" && <SprintView tasks={tasks} />}
      </div>
    </Layout>
  );
}
