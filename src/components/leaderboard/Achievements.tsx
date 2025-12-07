import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Star, Lock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface AchievementsProps {
  userStats?: {
    totalSaved: number;
    transactionCount: number;
    optimalRate: number;
  };
}

export function Achievements({ userStats }: AchievementsProps) {
  const achievements: Achievement[] = [
    {
      id: 'first-optimization',
      name: 'First Optimization',
      description: 'Save $10+ on your first transaction',
      icon: <Star className="h-5 w-5" />,
      unlocked: (userStats?.totalSaved || 0) >= 10,
      progress: userStats?.totalSaved || 0,
      maxProgress: 10,
    },
    {
      id: 'gas-guru',
      name: 'Gas Guru',
      description: 'Save $1,000+ in total',
      icon: <Trophy className="h-5 w-5" />,
      unlocked: (userStats?.totalSaved || 0) >= 1000,
      progress: userStats?.totalSaved || 0,
      maxProgress: 1000,
    },
    {
      id: 'early-adopter',
      name: 'Early Adopter',
      description: 'Used GasGuard in the first week',
      icon: <Medal className="h-5 w-5" />,
      unlocked: true, // Would check actual date
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Achieve 90%+ optimal execution rate',
      icon: <Award className="h-5 w-5" />,
      unlocked: (userStats?.optimalRate || 0) >= 90,
      progress: userStats?.optimalRate || 0,
      maxProgress: 90,
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-white/5 shadow-2xl">
      <CardHeader className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Achievements</CardTitle>
        </div>
        <CardDescription>Unlock badges by mastering gas optimization</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "group relative overflow-hidden p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                achievement.unlocked
                  ? "bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-transparent border-green-500/20 hover:border-green-500/40"
                  : "bg-white/5 border-white/5 hover:bg-white/10"
              )}
            >
              {achievement.unlocked && (
                <div className="absolute inset-0 bg-green-500/5 blur-xl group-hover:bg-green-500/10 transition-colors" />
              )}

              <div className="relative flex items-start gap-4">
                <div
                  className={cn(
                    "p-3 rounded-xl transition-all duration-300 shadow-inner",
                    achievement.unlocked
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/20"
                      : "bg-white/5 text-muted-foreground"
                  )}
                >
                  {achievement.unlocked ? achievement.icon : <Lock className="h-5 w-5" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={cn(
                      "font-semibold tracking-tight",
                      achievement.unlocked ? "text-white" : "text-muted-foreground"
                    )}>
                      {achievement.name}
                    </h4>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-0 text-[10px] uppercase tracking-wider font-bold">
                        Unlocked
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground/80 leading-snug">
                    {achievement.description}
                  </p>

                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="pt-2 space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Progress</span>
                        <span className={achievement.unlocked ? "text-green-400" : ""}>
                          {Math.min(achievement.progress, achievement.maxProgress)} /{' '}
                          {achievement.maxProgress}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000 ease-out",
                            achievement.unlocked ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-white/20"
                          )}
                          style={{
                            width: `${Math.min(
                              (achievement.progress / achievement.maxProgress) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
