import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Wallet, Bell, Shield, Zap, ExternalLink } from "lucide-react";

const Settings = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-muted-foreground">
          Configure your Mempool Mentor preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Wallet Connection */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Wallet</CardTitle>
                <CardDescription>Connect your wallet to use GasGuard</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2 w-2 rounded-full bg-warning" />
                  <span className="text-sm">Not connected</span>
                </div>
              </div>
              <Button variant="default">
                Connect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Network Settings */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Network</CardTitle>
                <CardDescription>Flare network configuration</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Network</p>
                <p className="text-sm text-muted-foreground">Coston2 Testnet</p>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">FTSOv2 Feed</p>
                <p className="text-sm text-muted-foreground">FLR/USD pair</p>
              </div>
              <Badge variant="glow">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">FDC Connector</p>
                <p className="text-sm text-muted-foreground">Cross-chain data</p>
              </div>
              <Badge variant="glow">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Alert preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Gas Price Alerts</p>
                <p className="text-sm text-muted-foreground">Notify when gas drops below target</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Execution Updates</p>
                <p className="text-sm text-muted-foreground">GasGuard transaction status</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">AI Recommendations</p>
                <p className="text-sm text-muted-foreground">Proactive optimization tips</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Security</CardTitle>
                <CardDescription>GasGuard contract settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium">GasGuard Contract</p>
                <p className="text-xs text-muted-foreground font-mono">0x1234...5678</p>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto-revert on failure</p>
                <p className="text-sm text-muted-foreground">Protect funds if conditions aren't met</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Simulation before execution</p>
                <p className="text-sm text-muted-foreground">Dry-run transactions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
