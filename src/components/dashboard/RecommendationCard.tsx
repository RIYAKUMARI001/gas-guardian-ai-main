import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Calendar, ArrowRight } from "lucide-react";

interface Recommendation {
  action: "execute" | "wait" | "schedule";
  message: string;
  savings: string;
  time?: string;
}

const recommendations: Recommendation[] = [
  {
    action: "wait",
    message: "Gas expected to drop 45% in 2 hours",
    savings: "$2.40",
    time: "2h 15m",
  },
  {
    action: "execute",
    message: "Current gas is near 24h low",
    savings: "$0.00",
  },
  {
    action: "schedule",
    message: "Best time today: 4:00 AM UTC",
    savings: "$3.80",
    time: "6h 30m",
  },
];

const actionConfig = {
  execute: {
    icon: Zap,
    label: "Execute Now",
    variant: "success" as const,
    buttonVariant: "success" as const,
  },
  wait: {
    icon: Clock,
    label: "Wait",
    variant: "warning" as const,
    buttonVariant: "warning" as const,
  },
  schedule: {
    icon: Calendar,
    label: "Schedule",
    variant: "secondary" as const,
    buttonVariant: "secondary" as const,
  },
};

export function RecommendationCard() {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => {
          const config = actionConfig[rec.action];
          const Icon = config.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-muted/50 p-4 hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={config.variant}>{config.label}</Badge>
                    {rec.time && (
                      <span className="text-xs text-muted-foreground">in {rec.time}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-success">Save {rec.savings}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
