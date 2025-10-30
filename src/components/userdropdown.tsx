"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getVendorInfo } from "../utils/vendor-utils";
import { logoutVendor } from "../actions/vendor";
import { useState } from "react";

export default function UserDropdown() {
  const vendoruser = getVendorInfo();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (!vendoruser?.id || isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logoutVendor(Number(vendoruser.id), navigate);
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false); // re-enable if failed
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md border px-2 py-1 hover:bg-muted focus:outline-none">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">
              {vendoruser?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start text-left">
            <span className="text-sm font-medium">{vendoruser?.name}</span>
            <span className="text-xs text-muted-foreground">
              {vendoruser?.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="min-w-56 rounded-lg"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <Link
            to={"/profile"}
            className="flex items-center gap-2 px-3 py-2 text-left text-sm"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                {vendoruser?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{vendoruser?.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {vendoruser?.email}
              </span>
            </div>
          </Link>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className={`cursor-pointer ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
