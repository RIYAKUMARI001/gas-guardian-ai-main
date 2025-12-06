import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[300px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      
      <Sidebar />
      
      <main className="ml-64 min-h-screen transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
