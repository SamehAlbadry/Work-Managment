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
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PomodoroSession {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  task: string;
  completed: boolean;
}

type TimerState = "idle" | "running" | "paused" | "completed";

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [currentSession, setCurrentSession] =
    useState<Partial<PomodoroSession> | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(25 * 60);
    setTimerState("idle");
    setCurrentSession(null);
  }, []);

  const startTimer = useCallback(() => {
    if (timerState === "idle") {
      setCurrentSession({
        id: Date.now().toString(),
        startTime: new Date(),
        duration: 25 * 60,
        completed: false,
      });
    }
    setTimerState("running");
  }, [timerState]);

  const pauseTimer = useCallback(() => {
    setTimerState("paused");
  }, []);

  const endSession = useCallback(() => {
    if (currentSession) {
      setTimerState("completed");
      setShowTaskDialog(true);
    }
  }, [currentSession]);

  const completeSession = useCallback(() => {
    if (currentSession && taskDescription.trim()) {
      const completedSession: PomodoroSession = {
        ...currentSession,
        id: currentSession.id!,
        startTime: currentSession.startTime!,
        endTime: new Date(),
        duration: 25 * 60 - timeLeft,
        task: taskDescription.trim(),
        completed: true,
      };

      setSessions((prev) => [completedSession, ...prev]);
      setTaskDescription("");
      setShowTaskDialog(false);
      resetTimer();
    }
  }, [currentSession, taskDescription, timeLeft, resetTimer]);

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

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
          <p className="text-muted-foreground">
            Stay focused with the Pomodoro Technique
          </p>
        </div>

        {/* Timer Card */}
        <Card className="max-w-md mx-auto transition-all duration-200 hover:shadow-soft-lg">
          <CardContent className="p-8 text-center">
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg
                className="w-48 h-48 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="hsl(var(--pomodoro))"
                  strokeWidth="6"
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
                  <div className="text-4xl font-bold text-card-foreground mb-1">
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
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{session.task}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.startTime.toLocaleTimeString()} -{" "}
                        {session.endTime.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">
                        {Math.round(session.duration / 60)}m
                      </Badge>
                      <div className="w-3 h-3 rounded-full bg-success" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Task Description Dialog */}
        <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>What did you work on?</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="task">Task Description</Label>
                <Input
                  id="task"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Describe what you accomplished..."
                  className="mt-2"
                  autoFocus
                />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Button
                  onClick={completeSession}
                  disabled={!taskDescription.trim()}
                  className="flex-1"
                >
                  Complete Session
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTaskDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
