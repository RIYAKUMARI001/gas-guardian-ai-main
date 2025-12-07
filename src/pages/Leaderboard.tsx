import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Crown, TrendingUp } from 'lucide-react';
import { Achievements } from '@/components/leaderboard/Achievements';
import axios from 'axios';
import { cn } from '@/lib/utils';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
// Hardcoded for now to match backend default if env var is missing/incorrect
const API_URL = 'http://localhost:8080';

interface LeaderboardEntry {
  rank: number;
  walletAddress: string;
  totalSaved: number;
  transactionCount: number;
  optimalRate: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'all' | 'month'>('all');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/leaderboard`, {
          params: { timeframe, limit: 100 },
        });
        if (response.data.success) {
          setLeaderboard(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 300000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [timeframe]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400 fill-yellow-400/20" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-300 fill-slate-300/20" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600 fill-amber-600/20" />;
    return <span className="text-muted-foreground font-mono text-lg font-bold">#{rank}</span>;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.1)]";
    if (rank === 2) return "bg-gradient-to-r from-slate-300/10 to-transparent border-slate-300/10";
    if (rank === 3) return "bg-gradient-to-r from-amber-700/10 to-transparent border-amber-700/10";
    return "bg-black/20 border-white/5 hover:bg-white/5";
  };

  return (
    <MainLayout>
      <div className="relative mb-8 p-8 rounded-3xl bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-background border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-12 bg-purple-500/10 blur-[100px] rounded-full" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Global Rankings</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            See who's saving the most on gas fees. Compete with other GasGuardians and earn exclusive badges.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-black/20 border-white/5 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">Top Gas Savers</CardTitle>
                  <CardDescription>Ranked by total USD saved</CardDescription>
                </div>
                <div className="flex items-center p-1 bg-white/5 rounded-lg border border-white/5">
                  <button
                    onClick={() => setTimeframe('all')}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                      timeframe === 'all'
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    All Time
                  </button>
                  <button
                    onClick={() => setTimeframe('month')}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                      timeframe === 'month'
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    This Month
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 w-full bg-white/5 animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-white/5 rounded-xl border border-dashed border-white/10">
                  <Trophy className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No data available yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-12 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5 md:col-span-4 pl-2">User</div>
                    <div className="col-span-3 text-right">Total Saved</div>
                    <div className="col-span-3 hidden md:block text-center">Transactions</div>
                    <div className="col-span-3 md:col-span-1 text-right">Rate</div>
                  </div>
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={cn(
                        "grid grid-cols-12 items-center p-4 rounded-xl border transition-all duration-300",
                        getRankStyle(entry.rank)
                      )}
                    >
                      <div className="col-span-1 flex justify-center w-8">
                        {getRankIcon(entry.rank)}
                      </div>

                      <div className="col-span-5 md:col-span-4 pl-2">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-white/90 bg-black/20 px-2 py-0.5 rounded border border-white/5">
                            {formatAddress(entry.walletAddress)}
                          </code>
                          {entry.rank <= 3 && (
                            <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] bg-white/10 text-white/60">
                              TOP {entry.rank}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 text-right">
                        <span className="font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded inline-block">
                          ${entry.totalSaved.toFixed(2)}
                        </span>
                      </div>

                      <div className="col-span-3 hidden md:block text-center text-muted-foreground">
                        {entry.transactionCount}
                      </div>

                      <div className="col-span-3 md:col-span-1 flex justify-end">
                        <div className="flex flex-col items-end gap-1">
                          <span className={cn(
                            "font-bold text-sm",
                            entry.optimalRate >= 90 ? "text-purple-400" : "text-slate-400"
                          )}>
                            {entry.optimalRate.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Achievements
            userStats={{
              totalSaved: 125.40, // Mock data for now, ideally fetched from user profile
              transactionCount: 47,
              optimalRate: 87,
            }}
          />

          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg">Pro Tip</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Executing transactions during low-traffic hours (typically 2-6 AM UTC) significantly improves your optimal execution rate.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
