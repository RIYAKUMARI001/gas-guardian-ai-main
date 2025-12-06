import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, ExternalLink, Zap, TrendingDown } from "lucide-react";

interface ChainData {
  name: string;
  logo: string;
  gasPrice: number;
  txCost: number;
  txCostUsd: number;
  speed: string;
  savings?: number;
  isBest?: boolean;
}

const chainData: ChainData[] = [
  {
    name: "Flare",
    logo: "🔥",
    gasPrice: 18,
    txCost: 0.0042,
    txCostUsd: 0.42,
    speed: "~2s",
    savings: 89,
    isBest: true,
  },
  {
    name: "Ethereum",
    logo: "⟠",
    gasPrice: 25,
    txCost: 0.0089,
    txCostUsd: 3.82,
    speed: "~15s",
  },
  {
    name: "Polygon",
    logo: "⬡",
    gasPrice: 45,
    txCost: 0.0015,
    txCostUsd: 0.78,
    speed: "~2s",
    savings: 79,
  },
  {
    name: "BSC",
    logo: "⬢",
    gasPrice: 5,
    txCost: 0.0012,
    txCostUsd: 0.95,
    speed: "~3s",
    savings: 75,
  },
  {
    name: "Avalanche",
    logo: "🔺",
    gasPrice: 28,
    txCost: 0.0035,
    txCostUsd: 1.24,
    speed: "~2s",
    savings: 66,
  },
  {
    name: "Arbitrum",
    logo: "🔵",
    gasPrice: 0.1,
    txCost: 0.00025,
    txCostUsd: 0.52,
    speed: "~0.5s",
    savings: 86,
  },
];

export function ChainComparisonTable() {
  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Multi-Chain Cost Comparison
            </CardTitle>
            <CardDescription className="mt-1">
              Real-time gas costs via FDC cross-chain data
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="glow" className="gap-1">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Live
            </Badge>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Chain</TableHead>
                <TableHead className="font-semibold text-right">Gas Price</TableHead>
                <TableHead className="font-semibold text-right">Tx Cost</TableHead>
                <TableHead className="font-semibold text-right">USD Cost</TableHead>
                <TableHead className="font-semibold text-right">Speed</TableHead>
                <TableHead className="font-semibold text-right">vs ETH</TableHead>
                <TableHead className="font-semibold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chainData.map((chain) => (
                <TableRow
                  key={chain.name}
                  className={chain.isBest ? "bg-primary/5 hover:bg-primary/10" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{chain.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{chain.name}</span>
                          {chain.isBest && (
                            <Badge variant="success" className="text-[10px] px-1.5 py-0">
                              BEST VALUE
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {chain.gasPrice} gwei
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {chain.txCost.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        chain.isBest
                          ? "text-success font-semibold"
                          : chain.txCostUsd > 2
                          ? "text-destructive"
                          : ""
                      }
                    >
                      ${chain.txCostUsd.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {chain.speed}
                  </TableCell>
                  <TableCell className="text-right">
                    {chain.savings ? (
                      <div className="flex items-center justify-end gap-1 text-success">
                        <TrendingDown className="h-3 w-3" />
                        <span className="font-medium">{chain.savings}%</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
              <span className="text-xl">🔥</span>
            </div>
            <div>
              <p className="font-semibold text-success">Flare offers the best value!</p>
              <p className="text-sm text-muted-foreground">
                Save up to 89% compared to Ethereum mainnet
              </p>
            </div>
          </div>
          <Button variant="success">
            Execute on Flare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
