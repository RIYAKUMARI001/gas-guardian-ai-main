import { MainLayout } from "@/components/layout/MainLayout";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Chat = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          <span className="gradient-text">AI Copilot</span>
        </h1>
        <p className="text-muted-foreground">
          Ask questions about gas optimization and get real-time recommendations
        </p>
      </div>
      <ChatInterface />
    </MainLayout>
  );
};

export default Chat;
