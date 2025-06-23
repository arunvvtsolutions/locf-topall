
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavigationGroup } from "./navigationConfig";

interface NavigationGroupsProps {
  navigationItems: NavigationGroup[];
}

export const NavigationGroups = ({ navigationItems }: NavigationGroupsProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  console.log("navigationItems",navigationItems);
  return (
    <>
      {navigationItems.map((group) => {
        const visibleItems = group.items.filter(item => item.show);
        if (visibleItems.length === 0) return null;

        return (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      isActive={location.pathname === item.path}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </>
  );
};
