import { useState } from "react";
import { 
  Brain, 
  BarChart3, 
  Newspaper, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  Settings,
  Home,
  Menu
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
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Stock Tracker", url: "/stock-tracker", icon: BarChart3 },
  { title: "News Summarizer", url: "/news", icon: Newspaper },
  { title: "Predictive Charts", url: "/charts", icon: TrendingUp },
  { title: "AI Risk Feed", url: "/risk-feed", icon: AlertTriangle },
  { title: "Planner", url: "/planner", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} border-r border-border/50 bg-card/30 backdrop-blur-lg`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="SphereOfTech Logo" className="w-50 h-50 object-contain" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="p-4 bg-gradient-glass rounded-lg mx-3 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">AI Status</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All systems operational
                </p>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div className="bg-gradient-primary h-1.5 rounded-full w-4/5"></div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}