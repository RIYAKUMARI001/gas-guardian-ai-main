import { MainLayout } from "@/components/layout/MainLayout";
import { ChainComparisonTable } from "@/components/compare/ChainComparisonTable";

const Compare = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          <span className="gradient-text">Chain Comparison</span>
        </h1>
        <p className="text-muted-foreground">
          Compare transaction costs across multiple chains in real-time
        </p>
      </div>
      <ChainComparisonTable />
    </MainLayout>
  );
};

export default Compare;
