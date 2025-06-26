export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "blocked" | "done";
  priority: "low" | "medium" | "high" | "critical";
  deadline?: Date;
  tags: string[];
  subtasks: Subtask[];
  pomodorosSpent: number;
  pomodorosEstimated: number;
  storyPoints?: number;
  assignee?: string;
  projectId: string;
  parentTaskId?: string;
  dependencies: string[];
  createdAt: Date;
  updatedAt: Date;
  startDate?: Date;
  endDate?: Date;
  progress: number;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface PomodoroSession {
  id: string;
  taskId?: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  task: string;
  completed: boolean;
  reflection?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  mode: "kanban" | "gantt" | "sprint";
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  goal: string;
  status: "planning" | "active" | "completed";
  totalPoints: number;
  completedPoints: number;
  velocity: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: "task" | "meeting" | "break" | "focus-block";
  taskId?: string;
  color?: string;
  reminders: number[]; // minutes before event
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  linkedTaskIds: string[];
  linkedEventIds: string[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export interface ViewMode {
  current: "kanban" | "gantt" | "sprint" | "calendar";
  available: ("kanban" | "gantt" | "sprint" | "calendar")[];
}

export interface Analytics {
  focusPercentage: number;
  totalTimeWorked: number;
  pomodorosPerDay: number;
  tasksCompleted: number;
  streak: number;
  weeklyData: {
    day: string;
    hours: number;
    focus: number;
    pomodoros: number;
    tasksCompleted: number;
  }[];
  productivityHeatmap: {
    date: string;
    value: number;
  }[];
}
