import { useState } from "react";
import { 
  LayoutDashboard, 
  Map, 
  Upload, 
  Settings, 
  AlertTriangle,
  Brain,
  Route,
  History,
  Train
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Map View", url: "/map", icon: Map },
  { title: "Upload Data", url: "/upload", icon: Upload },
  { title: "Schedule Optimizer", url: "/optimizer", icon: Settings },
  { title: "Conflict Alerts", url: "/conflicts", icon: AlertTriangle },
  { title: "Delay Prediction", url: "/prediction", icon: Brain },
  { title: "Rerouting", url: "/rerouting", icon: Route },
  { title: "Run History", url: "/history", icon: History },
  { title: "Admin Settings", url: "/admin", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary font-bold border-r-4 border-primary shadow-md ring-1 ring-primary/10" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-all duration-200";

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-64"} bg-card border-r railway-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg railway-gradient">
            <Train className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">Railway AI</h2>
              <p className="text-sm text-muted-foreground">Traffic Control</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {!isCollapsed && "Control Center"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${getNavCls({ isActive })}
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}