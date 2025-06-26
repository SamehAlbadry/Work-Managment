import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Pause, Square, RotateCcw, Settings, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface PomodoroSession {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  task: string;
  reflection: string;
  completed: boolean;
  cycleNumber: number;
}

type TimerState = "idle" | "running" | "paused" | "completed";

export default function Pomodoro() {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [currentSession, setCurrentSession] =
    useState<Partial<PomodoroSession> | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showReflectionDialog, setShowReflectionDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [reflection, setReflection] = useState("");
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [cycleCount, setCycleCount] = useState(0);
  const [canStart, setCanStart] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(pomodoroMinutes * 60);
    setTimerState("idle");
    setCurrentSession(null);
    setCanStart(false);
    setTaskDescription("");
  }, [pomodoroMinutes]);

  const requestTaskDescription = () => {
    setShowTaskDialog(true);
  };

  const confirmTask = () => {
    if (taskDescription.trim()) {
      setCanStart(true);
      setShowTaskDialog(false);
    }
  };

  const startTimer = useCallback(() => {
    if (!canStart && timerState === "idle") {
      requestTaskDescription();
      return;
    }

    if (timerState === "idle") {
      const newCycleNumber = cycleCount + 1;
      setCycleCount(newCycleNumber);
      setCurrentSession({
        id: Date.now().toString(),
        startTime: new Date(),
        duration: pomodoroMinutes * 60,
        task: taskDescription,
        cycleNumber: newCycleNumber,
        completed: false,
      });
    }
    setTimerState("running");
  }, [timerState, pomodoroMinutes, taskDescription, canStart, cycleCount]);

  const pauseTimer = useCallback(() => {
    setTimerState("paused");
  }, []);

  const endSession = useCallback(() => {
    if (currentSession) {
      setTimerState("completed");
      setShowReflectionDialog(true);
    }
  }, [currentSession]);

  const completeSession = useCallback(() => {
    if (currentSession && reflection.trim()) {
      const completedSession: PomodoroSession = {
        ...currentSession,
        id: currentSession.id!,
        startTime: currentSession.startTime!,
        endTime: new Date(),
        duration: pomodoroMinutes * 60 - timeLeft,
        task: currentSession.task!,
        reflection: reflection.trim(),
        completed: true,
        cycleNumber: currentSession.cycleNumber!,
      };

      setSessions((prev) => [completedSession, ...prev]);
      setReflection("");
      setShowReflectionDialog(false);
      resetTimer();
    }
  }, [currentSession, reflection, timeLeft, resetTimer, pomodoroMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState === "running" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerState === "running") {
      endSession();
    }

    return () => clearInterval(interval);
  }, [timerState, timeLeft, endSession]);

  const progress =
    ((pomodoroMinutes * 60 - timeLeft) / (pomodoroMinutes * 60)) * 100;

  useEffect(() => {
    if (timerState === "idle") {
      setTimeLeft(pomodoroMinutes * 60);
    }
  }, [pomodoroMinutes, timerState]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
          <p className="text-muted-foreground">
            Stay focused with enforced reflection after each session
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Timer Card */}
          <div className="lg:col-span-2">
            <Card className="transition-all duration-200 hover:shadow-soft-lg">
              <CardContent className="p-8 text-center">
                {/* Cycle Counter */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold">
                    Cycle {cycleCount}
                  </span>
                </div>

                {/* Circular Progress */}
                <div className="relative w-56 h-56 mx-auto mb-8">
                  <svg
                    className="w-56 h-56 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="hsl(var(--muted))"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="hsl(var(--pomodoro))"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Timer Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={cn(
                        "text-center",
                        timerState === "running" && "animate-timer",
                      )}
                    >
                      <div className="text-5xl font-bold text-card-foreground mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {timerState === "running"
                          ? "Focus Time"
                          : timerState === "paused"
                            ? "Paused"
                            : timerState === "completed"
                              ? "Completed!"
                              : "Ready to Start"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Task */}
                {taskDescription && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Current Task
                    </p>
                    <p className="font-medium text-lg">{taskDescription}</p>
                  </div>
                )}

                {/* Duration Settings */}
                {timerState === "idle" && (
                  <div className="mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettingsDialog(true)}
                      className="gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {pomodoroMinutes} min
                    </Button>
                  </div>
                )}

                {/* Timer Controls */}
                <div className="flex items-center justify-center gap-3">
                  {timerState === "idle" || timerState === "paused" ? (
                    <Button
                      onClick={startTimer}
                      size="lg"
                      className="bg-pomodoro hover:bg-pomodoro/90 text-white px-8"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {timerState === "idle" ? "Start" : "Resume"}
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </Button>
                  )}

                  {timerState !== "idle" && (
                    <Button
                      onClick={endSession}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      End
                    </Button>
                  )}

                  {timerState !== "running" && (
                    <Button
                      onClick={resetTimer}
                      variant="ghost"
                      size="lg"
                      className="px-8"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Sessions
                  </span>
                  <span className="font-semibold">{sessions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Time
                  </span>
                  <span className="font-semibold">
                    {Math.floor(
                      sessions.reduce((acc, s) => acc + s.duration, 0) / 60,
                    )}
                    m
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Cycle
                  </span>
                  <span className="font-semibold">{cycleCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Session Logs */}
        <Card className="transition-all duration-200 hover:shadow-soft-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Today's Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No sessions completed yet today.</p>
                <p className="text-sm">
                  Start your first Pomodoro to see your progress!
                </p>
              </div>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Cycle</TableHead>
                      <TableHead className="w-32">Date</TableHead>
                      <TableHead className="w-24">From</TableHead>
                      <TableHead className="w-24">To</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reflection</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow
                        key={session.id}
                        className="hover:bg-secondary/50"
                      >
                        <TableCell>
                          <Badge variant="secondary">
                            #{session.cycleNumber}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {session.startTime.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {session.startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          {session.endTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>{session.task}</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground truncate">
                            {session.reflection}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Duration Settings Dialog */}
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="duration">Pomodoro Duration</Label>
                <Select
                  value={pomodoroMinutes.toString()}
                  onValueChange={(value) => setPomodoroMinutes(parseInt(value))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="25">25 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Button
                  onClick={() => setShowSettingsDialog(false)}
                  className="flex-1"
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Task Description Dialog */}
        <Dialog open={showTaskDialog} onOpenChange={() => {}}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>What will you work on?</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="task">Task Description</Label>
                <Input
                  id="task"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Describe what you'll focus on..."
                  className="mt-2"
                  autoFocus
                />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Button
                  onClick={confirmTask}
                  disabled={!taskDescription.trim()}
                  className="flex-1"
                >
                  Start Session
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reflection Dialog */}
        <Dialog open={showReflectionDialog} onOpenChange={() => {}}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Session Reflection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="reflection">How did this session go?</Label>
                <Textarea
                  id="reflection"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Reflect on what you accomplished, any challenges faced, or insights gained..."
                  className="mt-2 min-h-[100px]"
                  autoFocus
                />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Button
                  onClick={completeSession}
                  disabled={!reflection.trim()}
                  className="flex-1"
                >
                  Complete Session
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
