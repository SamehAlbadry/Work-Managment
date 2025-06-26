import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Timer,
  Calendar,
  Clock,
  Settings,
  BarChart3,
  CheckSquare,
  FileText,
  FolderKanban,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Timer",
    href: "/pomodoro",
    icon: Timer,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Docs",
    href: "/docs",
    icon: FileText,
  },
  {
    title: "Timesheet",
    href: "/timesheet",
    icon: Clock,
  },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-focus rounded-lg flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent">
            FocusFlow Pro
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-secondary/80 hover:scale-105",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.title}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/settings"
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200",
              "hover:bg-secondary/80",
              location.pathname === "/settings"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-2">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
                    "hover:bg-secondary/80",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  title={item.title}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
