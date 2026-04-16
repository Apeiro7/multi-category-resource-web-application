import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar, { type Page } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SoftwarePage from "./pages/SoftwarePage";
import VideosPage from "./pages/VideosPage";
import AnimePage from "./pages/AnimePage";
import CoursesPage from "./pages/CoursesPage";
import ToolsPage from "./pages/ToolsPage";
import LinksPage from "./pages/LinksPage";

const pages: Record<Page, React.ReactNode> = {
  dashboard: null,
  software: <SoftwarePage />,
  videos: <VideosPage />,
  anime: <AnimePage />,
  courses: <CoursesPage />,
  tools: <ToolsPage />,
  links: <LinksPage />,
};

const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard",
  software: "🧩 Software",
  videos: "🎞️ Videos",
  anime: "🌸 Anime",
  courses: "📚 Courses",
  tools: "🛠️ Tools",
  links: "🔗 Links",
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  // Update document title
  useEffect(() => {
    document.title = `${pageTitles[currentPage]} — MyVault`;
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] transition-colors duration-300">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main content */}
      <main className="lg:ml-60 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          {currentPage === "dashboard" ? (
            <Dashboard onNavigate={handleNavigate} />
          ) : (
            pages[currentPage]
          )}
        </div>
      </main>

      {/* PWA Install Prompt Banner */}
      <PWAInstallBanner />
    </div>
  );
}

function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (deferredPrompt as any).prompt();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (deferredPrompt as any).userChoice;
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-black/10 dark:border-white/10 shadow-2xl">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xl flex-shrink-0">
          📱
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Install MyVault</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Add to home screen for easy access</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowBanner(false)}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors px-2 py-1"
          >
            Later
          </button>
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
