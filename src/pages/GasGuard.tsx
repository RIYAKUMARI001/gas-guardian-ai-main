import { MainLayout } from "@/components/layout/MainLayout";
import { GasGuardPanel } from "@/components/gasguard/GasGuardPanel";

const GasGuard = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          <span className="gradient-text">GasGuard</span>
        </h1>
        <p className="text-muted-foreground">
          On-chain protection that only executes when your conditions are met
        </p>
      </div>
      <GasGuardPanel />
    </MainLayout>
  );
};

export default GasGuard;
