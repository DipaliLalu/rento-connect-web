import * as React from "react";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import data from "../utils/sidebar-data";
import { useGetLoginUser } from "../actions/auth";
import VendorData from "../utils/vendor-data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useGetLoginUser();
  // User permissions (always an array)
  const userPermissions: string[] = user?.data.permission || [];
  
  // Filter items based on permissions
  const filteredNavMain = data.navMain
  .map((section) => ({
    ...section,
    items: section.items.filter(
      (item) => !item.permission || userPermissions.includes(item.permission)
    ),
  }))
  // remove sections with no visible items
  .filter((section) => section.items.length > 0);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sessionStorage.getItem('jwt_access_vendor_token') ?VendorData.navMain: filteredNavMain}  />
      </SidebarContent>
    </Sidebar>
  );
}
