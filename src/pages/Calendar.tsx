import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, Clock, Users } from "lucide-react";

// Mock calendar events for demonstration
const mockEvents = [
  {
    id: 1,
    title: "Team Standup",
    time: "9:00 AM - 9:30 AM",
    type: "meeting",
    attendees: 5,
    color: "bg-meeting",
  },
  {
    id: 2,
    title: "Focus Block - Development",
    time: "10:00 AM - 12:00 PM",
    type: "focus",
    color: "bg-success",
  },
  {
    id: 3,
    title: "Client Review",
    time: "2:00 PM - 3:00 PM",
    type: "meeting",
    attendees: 3,
    color: "bg-primary",
  },
  {
    id: 4,
    title: "Design Review",
    time: "4:00 PM - 5:00 PM",
    type: "focus",
    color: "bg-focus",
  },
];

export default function Calendar() {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your time blocks and meetings
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Block
          </Button>
        </div>

        {/* Coming Soon Notice */}
        <Card className="border-2 border-dashed border-muted bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <CalendarIcon className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calendar Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Full drag-and-drop calendar functionality with time blocking,
              meeting scheduling, and notifications will be available soon.
            </p>
          </CardContent>
        </Card>

        {/* Preview of Today's Schedule */}
        <Card className="transition-all duration-200 hover:shadow-soft-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className={`w-4 h-16 rounded-full ${event.color}`} />
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {event.time}
                    {event.attendees && (
                      <>
                        <Users className="w-4 h-4 ml-2" />
                        {event.attendees} people
                      </>
                    )}
                  </div>
                </div>
                <Badge
                  variant={event.type === "meeting" ? "default" : "secondary"}
                >
                  {event.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Feature Preview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Drag & Drop</h3>
              <p className="text-sm text-muted-foreground">
                Easily rearrange your schedule with intuitive drag-and-drop
                functionality
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Time Blocking</h3>
              <p className="text-sm text-muted-foreground">
                Create focused work blocks and allocate time for deep work
                sessions
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-soft-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 text-warning rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Meeting Invites</h3>
              <p className="text-sm text-muted-foreground">
                Send invitations and get notifications 10 minutes before
                meetings
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
