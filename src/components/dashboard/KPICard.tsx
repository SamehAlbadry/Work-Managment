import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: LucideIcon;
  color: "primary" | "success" | "pomodoro" | "focus";
  className?: string;
}

const colorVariants = {
  primary: "border-l-primary bg-primary/5",
  success: "border-l-success bg-success/5",
  pomodoro: "border-l-pomodoro bg-pomodoro/5",
  focus: "border-l-focus bg-focus/5",
};

const iconColorVariants = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  pomodoro: "text-pomodoro bg-pomodoro/10",
  focus: "text-focus bg-focus/10",
};

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  color,
  className,
}: KPICardProps) {
  return (
    <Card
      className={cn(
        "border-l-4 transition-all duration-200 hover:shadow-soft-lg hover:scale-105",
        colorVariants[color],
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-card-foreground mb-1">
              {value}
            </p>
            {change && (
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    change.type === "increase"
                      ? "text-success"
                      : "text-destructive",
                  )}
                >
                  {change.type === "increase" ? "+" : "-"}
                  {Math.abs(change.value)}%
                </span>
                <span className="text-xs text-muted-foreground">
                  vs yesterday
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              iconColorVariants[color],
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
