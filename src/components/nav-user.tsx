"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { getUserInfo } from "../utils/utils";
import { logoutAdmin } from "../actions/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getVendorInfo } from "../utils/vendor-utils";
import { logoutVendor } from "../actions/vendor";
import { useState } from "react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = getUserInfo();
  const vendoruser = getVendorInfo();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggingOut(true);
    if (user?.data?.user_id != null) {
      try {
        logoutAdmin(user?.data?.user_id, navigate);
      } catch (error) {
        console.error("Logout failed:", error);
        setIsLoggingOut(false); // re-enable if failed
      }
    }
    if (vendoruser?.id) {
      try {
        logoutVendor(Number(vendoruser.id), navigate);
      } catch (error) {
        console.error("Logout failed:", error);
        setIsLoggingOut(false); // re-enable if failed
      }
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user ? user?.data?.username?.charAt(0).toUpperCase() : vendoruser?.name?.charAt(0).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="font-medium">{user ? user?.data?.username : vendoruser?.name}</span>
                <span className="">{user ? user?.data?.email : vendoruser?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <Link
                to={"/profile"}
                className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user ? user?.data?.username?.charAt(0).toUpperCase() : vendoruser?.name}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user ? user?.data?.username : vendoruser?.name}
                  </span>
                  <span className="truncate">{user ? user?.data?.email : vendoruser?.email}</span>
                </div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className={`cursor-pointer ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoggingOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
