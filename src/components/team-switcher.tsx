import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";


export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={"Prophetic Developers"}
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-10!"
        >
          {/* Fixed logo */}
          <div className="w-10 h-1- data-[state=open]:h-8 shrink-0 flex items-center justify-center rounded-lg">
            <img
              src="/3D-Effects.png"
              className="w-full h-full object-contain"
              alt="Logo"
            />
          </div>

          {/* Text */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium uppercase">RentoConnect</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
