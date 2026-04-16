import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard,
  Cpu,
  Film,
  Flower2,
  BookOpen,
  Wrench,
  Link2,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type Page =
  | "dashboard"
  | "software"
  | "videos"
  | "anime"
  | "courses"
  | "tools"
  | "links";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ReactNode; emoji: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, emoji: "🏠" },
  { id: "software", label: "Software", icon: <Cpu size={18} />, emoji: "🧩" },
  { id: "videos", label: "Videos", icon: <Film size={18} />, emoji: "🎞️" },
  { id: "anime", label: "Anime", icon: <Flower2 size={18} />, emoji: "🌸" },
  { id: "courses", label: "Courses", icon: <BookOpen size={18} />, emoji: "📚" },
  { id: "tools", label: "Tools", icon: <Wrench size={18} />, emoji: "🛠️" },
  { id: "links", label: "Links", icon: <Link2 size={18} />, emoji: "🔗" },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10 dark:border-white/10 border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-gray-900 dark:text-white">MyVault</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Resource Hub</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight size={14} className="opacity-70" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-black/10 dark:border-white/10 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <div className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/5">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">MyVault v1.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-[#0f0f1a]/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">MyVault</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-[#0f0f1a] border-r border-black/10 dark:border-white/10 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-60 bg-white dark:bg-[#0d0d1a] border-r border-black/10 dark:border-white/8 z-40">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
