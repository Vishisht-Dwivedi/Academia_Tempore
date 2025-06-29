import * as React from "react";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Plus,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navMain = [
  {
    title: "Teachers",
    url: "#",
    icon: <GraduationCap className="mr-2 h-4 w-4" />,
    items: [{ title: "Manage", url: "/dashboard/teachers" }],
  },
  {
    title: "Classrooms",
    url: "#",
    icon: <Building2 className="mr-2 h-4 w-4" />,
    items: [{ title: "Manage", url: "/dashboard/classrooms" }],
  },
  {
    title: "Subjects",
    url: "#",
    icon: <BookOpen className="mr-2 h-4 w-4" />,
    items: [{ title: "Manage", url: "/dashboard/subjects" }],
  },
];

export const AppSidebar = React.memo(function AppSidebar(props) {
  const pathname = usePathname();

  return (
    <Sidebar
      {...props}
      className="h-screen sticky top-0 shadow-md border-r bg-white dark:bg-zinc-900"
    >
      <SidebarHeader className="px-4 pt-4 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="border-b-2 border-fuchsia-400 mb-2"
            >
              <a href="/dashboard" className="flex items-center w-full">
                <img src="/logo.png" alt="Academia Tempore" className="w-full" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="text-sidebar-primary text-sm leading-snug font-medium text-center">
              <a href="https://github.com/Vishisht-Dwivedi/">
                <div className="flex justify-around items-center">
                  <p>Built and Managed by <br /> Vishisht Dwivedi</p>
                </div>
              </a>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <h4 className="text-xs text-muted-foreground uppercase px-2 mb-1">
            Entities
          </h4>
          <SidebarMenu>
            {navMain.map((section, index) => (
              <Collapsible
                key={section.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-fuchsia-100 hover:text-fuchsia-600 transition-colors">
                      {section.icon}
                      {section.title}
                      <Plus
                        className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                        aria-hidden
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>

                {section.items?.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {section.items.map((item) => {
                        const isActive = pathname === item.url;
                        return (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={`text-sm transition-colors ${isActive
                                ? "bg-fuchsia-100 text-fuchsia-700 font-semibold"
                                : "hover:bg-muted"
                                }`}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto px-4 pb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-40">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SidebarRail />
    </Sidebar>
  );
});
