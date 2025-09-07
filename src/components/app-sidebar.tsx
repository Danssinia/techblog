"use client"

import * as React from "react"


import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Settings,
  PlusCircle,
  Edit3,
  Menu,
  ChevronRight,
  ChevronDown,
  BookOpenText,
  User,
  Newspaper,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Posts",
      url: "/dashboard/blogs",
      icon: FileText,
    },
    {
      title: "Comments",
      url: "#",
      icon: MessageSquare,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "#",
      icon: User,
    },
    {
      title: "My Posts",
      url: "#",
      icon: BookOpenText,
      children: [
      { key: "user.my-posts.new", label: "Create New Post", icon: <PlusCircle className="h-4 w-4" /> },
      { key: "user.my-posts.edit", label: "Edit My Posts", icon: <Edit3 className="h-4 w-4" /> },
      ],
    },
    {
      title: "Comment",
      url: "#",
      icon: MessageSquare as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
  ],

}

// //Define types for NavItem and NavMainProps
// type ChildItem = {
//   key: string;
//   label: string;
//   icons: React.ReactNode;
// };

// type NavItem = {
//   title: string;
//   url: string;
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   children?: ChildItem[];
// };

// type NavMainProps = {
//   items: NavItem[];
// };



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const [open, setOpen] = React.useState(false);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Newspaper className="!size-5" />
                <span className="text-base font-semibold">TechBlog</span>
              </a>
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((menu,index)=>(
          <div key={index}>
            <div className="text-sm px-4">
                <a href={menu.url} className="flex items-center gap-2 hover:bg-[#2b2a2a] p-1 hover:rounded-lg">
                  <span>{<menu.icon size={16}/>}</span>
                  <span>{menu.title}</span>
                </a>
            </div>
          </div>
        ))}
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
