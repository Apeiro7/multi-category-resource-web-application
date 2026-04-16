import React from "react";
import { TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { softwareList } from "../data/software";
import { videoSeries } from "../data/videos";
import { animeList } from "../data/anime";
import { courseList } from "../data/courses";
import { toolList } from "../data/tools";
import { linkList } from "../data/links";
import type { Page } from "../components/Sidebar";

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const stats = [
  { label: "Software", count: softwareList.length, icon: "🧩", color: "from-violet-500 to-purple-600", page: "software" as Page },
  { label: "Videos", count: videoSeries.reduce((a, v) => a + v.seasons.reduce((b, s) => b + s.episodes.length, 0), 0), icon: "🎞️", color: "from-rose-500 to-pink-600", page: "videos" as Page },
  { label: "Anime", count: animeList.length, icon: "🌸", color: "from-fuchsia-500 to-pink-500", page: "anime" as Page },
  { label: "Courses", count: courseList.length, icon: "📚", color: "from-blue-500 to-cyan-500", page: "courses" as Page },
  { label: "Tools", count: toolList.length, icon: "🛠️", color: "from-amber-500 to-orange-500", page: "tools" as Page },
  { label: "Links", count: linkList.length, icon: "🔗", color: "from-emerald-500 to-teal-500", page: "links" as Page },
];

const recentAnime = animeList.filter((a) => a.status === "Watching").slice(0, 3);
const enrolledCourses = courseList.filter((c) => c.enrolled && (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100).slice(0, 3);

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-2xl shadow-violet-500/20">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)`
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={20} className="text-yellow-300" />
            <span className="text-sm font-medium text-white/80 uppercase tracking-widest">Welcome Back</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Personal Vault 🗄️
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-xl">
            Everything you love — software, anime, videos, courses, tools and important links — all in one beautifully organized place.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {stats.map((s) => (
              <button
                key={s.label}
                onClick={() => onNavigate(s.page)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-medium backdrop-blur-sm transition-all duration-200 border border-white/20"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-violet-500" />
          Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stats.map((stat) => (
            <button
              key={stat.label}
              onClick={() => onNavigate(stat.page)}
              className="group relative overflow-hidden rounded-xl p-4 bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
              <ArrowRight size={14} className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Currently Watching */}
        {recentAnime.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🌸</span> Currently Watching
            </h2>
            <div className="space-y-3">
              {recentAnime.map((anime) => (
                <button
                  key={anime.id}
                  onClick={() => onNavigate("anime")}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 hover:border-fuchsia-500/50 transition-all group text-left"
                >
                  <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="w-12 h-16 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/48x64?text=?"; }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{anime.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{anime.genre.slice(0, 2).join(" · ")}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-500">Watching</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 dark:text-gray-600 group-hover:text-fuchsia-500 flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Course Progress */}
        {enrolledCourses.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📚</span> Course Progress
            </h2>
            <div className="space-y-3">
              {enrolledCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => onNavigate("courses")}
                  className="w-full p-4 rounded-xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 hover:border-blue-500/50 transition-all text-left group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{course.icon}</span>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{course.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{course.platform}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-blue-500 flex-shrink-0">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🔗</span> Quick Links
          </span>
          <button onClick={() => onNavigate("links")} className="text-sm text-violet-500 hover:text-violet-400 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </button>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {linkList.slice(0, 8).map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all group"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white truncate">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
