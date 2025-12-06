import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface GasMetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  badge?: {
    label: string;
    variant: "low" | "medium" | "high" | "glow";
  };
  icon: ReactNode;
  glowing?: boolean;
}

export function GasMetricCard({
  title,
  value,
  subValue,
  trend,
  trendValue,
  badge,
  icon,
  glowing = false,
}: GasMetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <Card variant={glowing ? "glow" : "glass"} className="group hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                {icon}
              </div>
              {badge && (
                <Badge variant={badge.variant}>{badge.label}</Badge>
              )}
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {subValue && (
              <p className="text-sm text-muted-foreground mt-1">{subValue}</p>
            )}
          </div>
          {trend && trendValue && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend === "up" && "text-destructive",
                trend === "down" && "text-success",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              <TrendIcon className="h-4 w-4" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
