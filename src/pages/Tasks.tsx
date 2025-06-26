import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  MoreHorizontal,
  Edit,
  Trash2,
  PlayCircle,
  X,
  Search,
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

function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}) {
  const StatusIcon = statusIcons[task.status];

  return (
    <Card className="transition-all duration-200 hover:shadow-soft-lg group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => {
                const statuses: Task["status"][] = [
                  "todo",
                  "in-progress",
                  "blocked",
                  "done",
                ];
                const currentIndex = statuses.indexOf(task.status);
                const nextStatus =
                  statuses[(currentIndex + 1) % statuses.length];
                onStatusChange(task.id, nextStatus);
              }}
              className="hover:scale-110 transition-transform"
            >
              <StatusIcon className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </button>
            <h3 className="font-semibold truncate">{task.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={priorityColors[task.priority]}
              variant="secondary"
            >
              {task.priority}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

function KanbanView({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}) {
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
            <div className="space-y-3 min-h-[200px]">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
              {columnTasks.length === 0 && (
                <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground">
                  <p className="text-sm">No tasks</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GanttView({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}) {
  const tasksWithDates = tasks.filter((task) => task.deadline);
  const today = new Date();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Timeline View
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {tasksWithDates.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No tasks with deadlines to display
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasksWithDates
              .sort(
                (a, b) =>
                  (a.deadline?.getTime() || 0) - (b.deadline?.getTime() || 0),
              )
              .map((task) => {
                const daysUntilDeadline = task.deadline
                  ? Math.ceil(
                      (task.deadline.getTime() - today.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )
                  : 0;
                const isOverdue = daysUntilDeadline < 0;
                const isUrgent =
                  daysUntilDeadline >= 0 && daysUntilDeadline <= 3;

                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge
                          className={priorityColors[task.priority]}
                          variant="secondary"
                        >
                          {task.priority}
                        </Badge>
                        <Badge
                          variant={
                            task.status === "done" ? "default" : "outline"
                          }
                          className={
                            task.status === "done"
                              ? "bg-success text-success-foreground"
                              : ""
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {task.pomodorosSpent}/{task.pomodorosEstimated}{" "}
                          pomodoros
                        </span>
                        {task.storyPoints && (
                          <span>{task.storyPoints} pts</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${
                          isOverdue
                            ? "text-destructive"
                            : isUrgent
                              ? "text-warning"
                              : "text-muted-foreground"
                        }`}
                      >
                        {task.deadline?.toLocaleDateString()}
                      </div>
                      <div
                        className={`text-xs ${
                          isOverdue
                            ? "text-destructive"
                            : isUrgent
                              ? "text-warning"
                              : "text-muted-foreground"
                        }`}
                      >
                        {isOverdue
                          ? `${Math.abs(daysUntilDeadline)} days overdue`
                          : daysUntilDeadline === 0
                            ? "Due today"
                            : `${daysUntilDeadline} days left`}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(task)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(task.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SprintView({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}) {
  const sprintTasks = tasks.filter((task) => task.storyPoints);
  const totalPoints = sprintTasks.reduce(
    (acc, task) => acc + (task.storyPoints || 0),
    0,
  );
  const completedPoints = sprintTasks
    .filter((task) => task.status === "done")
    .reduce((acc, task) => acc + (task.storyPoints || 0), 0);
  const inProgressPoints = sprintTasks
    .filter((task) => task.status === "in-progress")
    .reduce((acc, task) => acc + (task.storyPoints || 0), 0);

  return (
    <div className="space-y-6">
      {/* Sprint Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                In Progress
              </span>
              <span className="text-2xl font-bold text-primary">
                {inProgressPoints}
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
                {totalPoints > 0
                  ? Math.round((completedPoints / totalPoints) * 100)
                  : 0}
                %
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sprint Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sprint Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completed: {completedPoints} pts</span>
              <span>Remaining: {totalPoints - completedPoints} pts</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className="bg-success h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${totalPoints > 0 ? (completedPoints / totalPoints) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sprintTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {sprintTasks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Timer className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No tasks with story points assigned
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Add story points to tasks to see them in sprint view
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function Tasks() {
  const [currentView, setCurrentView] = useState("kanban");
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Form state for add/edit task
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    status: "todo" as Task["status"],
    pomodorosEstimated: 1,
    storyPoints: 1,
    tags: "",
    deadline: "",
  });

  // Task management functions
  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskForm.title,
      description: taskForm.description,
      status: taskForm.status,
      priority: taskForm.priority,
      deadline: taskForm.deadline ? new Date(taskForm.deadline) : undefined,
      tags: taskForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      subtasks: [],
      pomodorosSpent: 0,
      pomodorosEstimated: taskForm.pomodorosEstimated,
      storyPoints: taskForm.storyPoints,
      projectId: "default",
      dependencies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      progress: 0,
    };

    setTasks((prev) => [newTask, ...prev]);
    setShowAddDialog(false);
    resetForm();
  };

  const handleEditTask = () => {
    if (!editingTask) return;

    const updatedTask: Task = {
      ...editingTask,
      title: taskForm.title,
      description: taskForm.description,
      priority: taskForm.priority,
      deadline: taskForm.deadline ? new Date(taskForm.deadline) : undefined,
      tags: taskForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      pomodorosEstimated: taskForm.pomodorosEstimated,
      storyPoints: taskForm.storyPoints,
      updatedAt: new Date(),
    };

    setTasks((prev) =>
      prev.map((task) => (task.id === editingTask.id ? updatedTask : task)),
    );
    setShowEditDialog(false);
    setEditingTask(null);
    resetForm();
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const progress =
            newStatus === "done"
              ? 100
              : newStatus === "in-progress"
                ? 50
                : newStatus === "blocked"
                  ? 25
                  : 0;
          return {
            ...task,
            status: newStatus,
            progress,
            updatedAt: new Date(),
          };
        }
        return task;
      }),
    );
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      pomodorosEstimated: task.pomodorosEstimated,
      storyPoints: task.storyPoints || 1,
      tags: task.tags.join(", "),
      deadline: task.deadline ? task.deadline.toISOString().split("T")[0] : "",
    });
    setShowEditDialog(true);
  };

  const resetForm = () => {
    setTaskForm({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      pomodorosEstimated: 1,
      storyPoints: 1,
      tags: "",
      deadline: "",
    });
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Task Management</h1>
              <p className="text-muted-foreground">
                Manage your tasks with Kanban, Timeline, and Sprint views
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
                      Timeline
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {showFilters && (
              <div className="flex gap-2">
                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setPriorityFilter("all");
                    setStatusFilter("all");
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* View Content */}
        {currentView === "kanban" && (
          <KanbanView
            tasks={filteredTasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
        {currentView === "gantt" && (
          <GanttView
            tasks={filteredTasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
        {currentView === "sprint" && (
          <SprintView
            tasks={filteredTasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}

        {/* Add Task Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, title: e.target.value })
                    }
                    placeholder="Task title..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, description: e.target.value })
                    }
                    placeholder="Describe the task..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={taskForm.tags}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, tags: e.target.value })
                    }
                    placeholder="design, frontend, urgent"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={taskForm.priority}
                      onValueChange={(value: Task["priority"]) =>
                        setTaskForm({ ...taskForm, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={taskForm.status}
                      onValueChange={(value: Task["status"]) =>
                        setTaskForm({ ...taskForm, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="pomodoros">Estimated Pomodoros</Label>
                    <Input
                      id="pomodoros"
                      type="number"
                      min="1"
                      value={taskForm.pomodorosEstimated}
                      onChange={(e) =>
                        setTaskForm({
                          ...taskForm,
                          pomodorosEstimated: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="storyPoints">Story Points</Label>
                    <Input
                      id="storyPoints"
                      type="number"
                      min="1"
                      value={taskForm.storyPoints}
                      onChange={(e) =>
                        setTaskForm({
                          ...taskForm,
                          storyPoints: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={taskForm.deadline}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, deadline: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddTask} disabled={!taskForm.title.trim()}>
                Add Task
              </Button>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, title: e.target.value })
                    }
                    placeholder="Task title..."
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, description: e.target.value })
                    }
                    placeholder="Describe the task..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                  <Input
                    id="edit-tags"
                    value={taskForm.tags}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, tags: e.target.value })
                    }
                    placeholder="design, frontend, urgent"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select
                      value={taskForm.priority}
                      onValueChange={(value: Task["priority"]) =>
                        setTaskForm({ ...taskForm, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={taskForm.status}
                      onValueChange={(value: Task["status"]) =>
                        setTaskForm({ ...taskForm, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="edit-pomodoros">Estimated Pomodoros</Label>
                    <Input
                      id="edit-pomodoros"
                      type="number"
                      min="1"
                      value={taskForm.pomodorosEstimated}
                      onChange={(e) =>
                        setTaskForm({
                          ...taskForm,
                          pomodorosEstimated: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-storyPoints">Story Points</Label>
                    <Input
                      id="edit-storyPoints"
                      type="number"
                      min="1"
                      value={taskForm.storyPoints}
                      onChange={(e) =>
                        setTaskForm({
                          ...taskForm,
                          storyPoints: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-deadline">Deadline</Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    value={taskForm.deadline}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, deadline: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleEditTask}
                disabled={!taskForm.title.trim()}
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
