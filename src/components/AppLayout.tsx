import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="p-2 hover:bg-accent rounded-lg transition-colors" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    AI-Powered Train Traffic Control
                  </h1>
                  <p className="text-sm text-muted-foreground">SIH25022 Demo System</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">System Online</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}