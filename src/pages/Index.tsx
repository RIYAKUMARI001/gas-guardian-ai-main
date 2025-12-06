import { MainLayout } from "@/components/layout/MainLayout";
import { GasMetricCard } from "@/components/dashboard/GasMetricCard";
import { GasChart } from "@/components/dashboard/GasChart";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { Fuel, DollarSign, Activity, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            <span className="gradient-text">Mempool Mentor</span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered gas optimization for Flare Network
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2 py-1.5 px-3">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            FTSOv2 Connected
          </Badge>
          <Badge variant="outline" className="gap-2 py-1.5 px-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            FDC Active
          </Badge>
          <Link to="/chat">
            <Button variant="hero" className="gap-2">
              Ask AI Copilot
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <GasMetricCard
          title="Current Gas"
          value="18 gwei"
          subValue="~$0.42 per tx"
          trend="down"
          trendValue="-12%"
          badge={{ label: "MEDIUM", variant: "medium" }}
          icon={<Fuel className="h-5 w-5 text-primary" />}
        />
        <GasMetricCard
          title="FLR Price"
          value="$0.0234"
          subValue="via FTSOv2"
          trend="up"
          trendValue="+3.2%"
          badge={{ label: "LIVE", variant: "glow" }}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          glowing
        />
        <GasMetricCard
          title="Network Load"
          value="45%"
          subValue="Moderate congestion"
          trend="neutral"
          trendValue="Stable"
          badge={{ label: "NORMAL", variant: "low" }}
          icon={<Activity className="h-5 w-5 text-primary" />}
        />
        <GasMetricCard
          title="Best Time Today"
          value="4:00 AM"
          subValue="~60% cheaper"
          badge={{ label: "PREDICTED", variant: "glow" }}
          icon={<Clock className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Charts and Recommendations */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <GasChart />
        </div>
        <div>
          <RecommendationCard />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/gasguard" className="block">
          <div className="glass rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform">
                <Fuel className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">GasGuard Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Set up on-chain safety nets
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/chat" className="block">
          <div className="glass rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/compare" className="block">
          <div className="glass rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-primary group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Compare Chains</h3>
                <p className="text-sm text-muted-foreground">
                  Find the cheapest execution path
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Index;
