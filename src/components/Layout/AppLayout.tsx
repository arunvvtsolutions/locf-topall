import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar, AppHeader } from "@/components/Layout";
import { BreadcrumbNavigation } from "@/components/Common/BreadcrumbNavigation";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const { title, subtitle } = location.pathname === "/" ? { title: "Dashboard", subtitle: "Welcome to the Dashboard" } : { title: "Dashboard", subtitle: "Welcome to the Dashboard" };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <AppHeader title={title} subtitle={subtitle} />
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <BreadcrumbNavigation />
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
