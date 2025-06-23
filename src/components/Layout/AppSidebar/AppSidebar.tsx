import React from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavigationGroups } from "./NavigationGroups";
import { BookOpen, Home, Upload } from "lucide-react";

export const AppSidebar = () => {
  const items = [
    {
      group: "Main",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          path: "/",
          icon: Home,
          show: true,
        },
        {
          id: "2",
          label: "Program Management",
          path: "/program-management",
          icon: BookOpen,
          show: true,
        },
        {
          id: "3",
          label: "Question Bank",
          path: "/q-bank",
          icon: Upload,
          show: true,
        },
        {
          id: "4",
          label: "Assessment",
          path: "/assessment",
          icon: Home,
          show: true,
        },
        {
          id: "5",
          label: "Attainment",
          path: "/attainment",
          icon: Home,
          show: true,
        },
        {
          id: "6",
          label: "PO Attainment",
          path: "/po-attainment",
          icon: Home,
          show: true,
        },
        {
          id: "7",
          label: "Mapping",
          path: "/mapping",
          icon: Home,
          show: true,
        },
        {
          id: "8",
          label: "Reports",
          path: "/reports",
          icon: Home,
          show: true,
        },
      ],
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <NavigationGroups navigationItems={items} />
      </SidebarContent>
    </Sidebar>
  );
};
