import { Sun, BookOpen, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export type SidebarView = "adhkar" | "dua-khatm";

interface AppSidebarProps {
  onNavigate: (view: SidebarView) => void;
}

const menuItems = [
  {
    title: "أذكار الصباح والمساء",
    icon: Sun,
    view: "adhkar" as SidebarView,
  },
  {
    title: "دعاء ختم القرآن",
    icon: BookOpen,
    view: "dua-khatm" as SidebarView,
  },
];

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="font-quran text-sm mb-2">القائمة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.view)}
                    className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-quran text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function SidebarMenuTrigger() {
  return (
    <SidebarTrigger className="p-2 rounded-lg hover:bg-white/10 transition-colors">
      <Menu className="w-5 h-5" />
    </SidebarTrigger>
  );
}
