"use client";

import * as React from "react";
import { logout } from "@/lib/auth";
import {
  BadgeQuestionMark,
  BookText,
  Tags,
  LogOut,
  ChevronRight,
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
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navMain = [
  {
    title: "Questions",
    icon: BadgeQuestionMark,
    url: "/questions/list",
    isActive: true,
    items: [
      {
        title: "Liste",
        url: "/questions/list",
      },
      {
        title: "Créer",
        url: "/questions/new",
      },
    ],
  },
  {
    title: "Categories",
    icon: BookText,
    url: "#",
    items: [
      {
        title: "Liste",
        url: "#",
      },
      {
        title: "Créer",
        url: "#",
      },
    ],
  },
  {
    title: "Tags",
    icon: Tags,
    url: "#",
    items: [
      {
        title: "Liste",
        url: "#",
      },
      {
        title: "Créer",
        url: "#",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      className="bg-[hsl(var(--sidebar-background))]"
      {...props}
    >
      <SidebarHeader>
        {/* Tu peux mettre ici un logo ou un titre */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Déconnexion">
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <LogOut className="size-4" />
                  <span>Déconnexion</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
