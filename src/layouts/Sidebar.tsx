import { Gamepad, Home } from 'lucide-react';

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Jogos',
    url: 'jogos',
    icon: Gamepad,
  },
];

export function Sidebar() {
  return (
    <ShadcnSidebar>
      <SidebarContent className="h-full dark:bg-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center items-center my-3">
            <h1 className="font-bebas dark:text-[#fff] text-center text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] tracking-wider">
              VAULT GAMES
            </h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1 mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full h-12">
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-[1rem] tracking-wider">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
