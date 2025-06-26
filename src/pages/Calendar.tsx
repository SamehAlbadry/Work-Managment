import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Users,
  MapPin,
  Bell,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CalendarEvent } from "@/types";

// Mock calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily team sync and planning",
    startTime: new Date("2024-01-15T09:00:00"),
    endTime: new Date("2024-01-15T09:30:00"),
    type: "meeting",
    color: "#3b82f6",
    reminders: [10],
  },
  {
    id: "2",
    title: "Deep Work - UI Development",
    description: "Focus block for component development",
    startTime: new Date("2024-01-15T10:00:00"),
    endTime: new Date("2024-01-15T12:00:00"),
    type: "focus-block",
    taskId: "1",
    color: "#10b981",
    reminders: [10],
  },
  {
    id: "3",
    title: "Client Review Meeting",
    description: "Review current progress with client",
    startTime: new Date("2024-01-15T14:00:00"),
    endTime: new Date("2024-01-15T15:00:00"),
    type: "meeting",
    color: "#f59e0b",
    reminders: [10, 60],
  },
  {
    id: "4",
    title: "Break",
    startTime: new Date("2024-01-15T15:00:00"),
    endTime: new Date("2024-01-15T15:15:00"),
    type: "break",
    color: "#6b7280",
    reminders: [],
  },
];

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  return {
    hour,
    label:
      hour === 0
        ? "12 AM"
        : hour < 12
          ? `${hour} AM`
          : hour === 12
            ? "12 PM"
            : `${hour - 12} PM`,
  };
});

const eventTypeColors = {
  "focus-block": "bg-success border-success text-success-foreground",
  meeting: "bg-primary border-primary text-primary-foreground",
  task: "bg-warning border-warning text-warning-foreground",
  break: "bg-muted border-muted text-muted-foreground",
};

function EventCard({ event }: { event: CalendarEvent }) {
  const duration =
    (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60);
  const startHour = event.startTime.getHours();
  const startMinute = event.startTime.getMinutes();
  const top = (startHour * 60 + startMinute) * (60 / 60); // 60px per hour
  const height = duration * (60 / 60);

  return (
    <div
      className={`absolute left-16 right-2 rounded-lg p-2 border-l-4 cursor-pointer transition-all hover:shadow-md ${eventTypeColors[event.type]}`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        minHeight: "32px",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{event.title}</h4>
          <p className="text-xs opacity-80">
            {event.startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -
            {event.endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <MoreHorizontal className="w-3 h-3 opacity-60" />
      </div>
    </div>
  );
}

function DayView({ events }: { events: CalendarEvent[] }) {
  const today = new Date();
  const todayEvents = events.filter(
    (event) => event.startTime.toDateString() === today.toDateString(),
  );

  return (
    <div className="space-y-4">
      {/* Day Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-2xl font-bold">
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Block
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            {/* Time Labels */}
            <div className="absolute left-0 top-0 bottom-0 w-14 border-r border-border">
              {hours.map((hour) => (
                <div
                  key={hour.hour}
                  className="h-15 flex items-start justify-end pr-2 pt-1 text-xs text-muted-foreground"
                  style={{ height: "60px" }}
                >
                  {hour.hour % 2 === 0 && hour.label}
                </div>
              ))}
            </div>

            {/* Grid Lines */}
            <div className="ml-14">
              {hours.map((hour) => (
                <div
                  key={hour.hour}
                  className="border-b border-border h-15"
                  style={{ height: "60px" }}
                />
              ))}
            </div>

            {/* Events */}
            <div className="relative">
              {todayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WeekView({ events }: { events: CalendarEvent[] }) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <div className="space-y-4">
      {/* Week Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-2xl font-bold">
            {startOfWeek.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Block
        </Button>
      </div>

      {/* Week Grid */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="text-center p-2">
                <div className="text-sm text-muted-foreground">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div
                  className={`text-lg font-semibold ${
                    day.toDateString() === today.toDateString()
                      ? "text-primary"
                      : ""
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Week Events */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dayEvents = events.filter(
                (event) =>
                  event.startTime.toDateString() === day.toDateString(),
              );

              return (
                <div
                  key={day.toISOString()}
                  className="space-y-1 min-h-[300px]"
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded text-xs border-l-2 ${eventTypeColors[event.type]}`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="opacity-80">
                        {event.startTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Calendar() {
  const [currentView, setCurrentView] = useState("day");
  const [events] = useState<CalendarEvent[]>(mockEvents);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Calendar</h1>
            <p className="text-muted-foreground">
              Smart time blocking and meeting management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={currentView} onValueChange={setCurrentView}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Calendar Views */}
        <Tabs value={currentView} onValueChange={setCurrentView}>
          <TabsContent value="day">
            <DayView events={events} />
          </TabsContent>
          <TabsContent value="week">
            <WeekView events={events} />
          </TabsContent>
        </Tabs>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div
                  className="w-4 h-8 rounded-sm"
                  style={{ backgroundColor: event.color }}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      {event.startTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -
                      {event.endTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {event.reminders.length > 0 && (
                      <>
                        <Bell className="w-4 h-4 ml-2" />
                        <span>{event.reminders[0]}m before</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge
                  variant={event.type === "meeting" ? "default" : "secondary"}
                >
                  {event.type.replace("-", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
