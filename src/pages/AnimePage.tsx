import React, { useState } from "react";
import { ExternalLink, Star, Tv, CheckCircle, PauseCircle, XCircle, BookmarkPlus } from "lucide-react";
import { animeList } from "../data/anime";
import type { Anime } from "../data/anime";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";

const statusConfig: Record<
  Anime["status"],
  { label: string; color: string; icon: React.ReactNode; badge: "success" | "info" | "warning" | "error" | "default" }
> = {
  Watching: { label: "Watching", color: "text-emerald-500", icon: <Tv size={14} />, badge: "success" },
  Completed: { label: "Completed", color: "text-blue-500", icon: <CheckCircle size={14} />, badge: "info" },
  "Plan to Watch": { label: "Plan to Watch", color: "text-amber-500", icon: <BookmarkPlus size={14} />, badge: "warning" },
  "On Hold": { label: "On Hold", color: "text-orange-500", icon: <PauseCircle size={14} />, badge: "warning" },
  Dropped: { label: "Dropped", color: "text-red-500", icon: <XCircle size={14} />, badge: "error" },
};

const statuses = ["All", "Watching", "Completed", "Plan to Watch", "On Hold", "Dropped"];

const AnimePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = animeList.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.genre.some((g) => g.toLowerCase().includes(search.toLowerCase())) ||
      a.studio.toLowerCase().includes(search.toLowerCase());
    const matchStatus = activeStatus === "All" || a.status === activeStatus;
    return matchSearch && matchStatus;
  });

  const countByStatus = (status: string) =>
    animeList.filter((a) => a.status === status).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🌸 Anime
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track your anime journey and discover new titles</p>
      </div>

      {/* Status Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {(["Watching", "Completed", "Plan to Watch", "On Hold", "Dropped"] as Anime["status"][]).map((status) => {
          const cfg = statusConfig[status];
          const count = countByStatus(status);
          return (
            <button
              key={status}
              onClick={() => setActiveStatus(status === activeStatus ? "All" : status)}
              className={`p-3 rounded-xl border transition-all text-left ${
                activeStatus === status
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
                  : "border-black/8 dark:border-white/8 bg-white dark:bg-white/5 hover:border-violet-500/50"
              }`}
            >
              <div className={`flex items-center gap-1.5 mb-1 ${cfg.color}`}>
                {cfg.icon}
                <span className="text-xs font-medium">{cfg.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search anime, genre, studio..." />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${view === "grid" ? "bg-violet-500 text-white" : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${view === "list" ? "bg-violet-500 text-white" : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400"}`}
            >
              List
            </button>
          </div>
          <select
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-white/8 border border-black/8 dark:border-white/8 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🌸</p>
          <p className="text-gray-500 dark:text-gray-400">No anime found matching your search.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((anime) => {
            const cfg = statusConfig[anime.status];
            return (
              <div
                key={anime.id}
                className="group rounded-2xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 overflow-hidden hover:border-fuchsia-500/50 hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x192/1a1a2e/a855f7?text=${encodeURIComponent(anime.title)}`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={cfg.badge}>{cfg.label}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-sm line-clamp-2">{anime.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < Math.round((anime.rating / 10) * 5) ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"} />
                      ))}
                      <span className="text-xs text-gray-400 ml-0.5">{anime.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{anime.episodes} eps</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{anime.studio} · {anime.year}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {anime.genre.slice(0, 3).map((g) => (
                      <span key={g} className="px-2 py-0.5 rounded-md bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 text-xs">
                        {g}
                      </span>
                    ))}
                  </div>
                  {anime.malUrl && (
                    <a
                      href={anime.malUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-medium text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-500/30 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/10 transition-colors"
                    >
                      View on MAL <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((anime) => {
            const cfg = statusConfig[anime.status];
            return (
              <div
                key={anime.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 hover:border-fuchsia-500/50 transition-all group"
              >
                <img
                  src={anime.coverImage}
                  alt={anime.title}
                  className="w-12 h-16 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x64/1a1a2e/a855f7?text=?`; }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{anime.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{anime.studio} · {anime.year} · {anime.episodes} eps</p>
                    </div>
                    <Badge variant={cfg.badge}>{cfg.label}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className={i < Math.round((anime.rating / 10) * 5) ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">{anime.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {anime.genre.slice(0, 2).map((g) => (
                        <span key={g} className="text-xs text-gray-500 dark:text-gray-400">{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {anime.malUrl && (
                  <a
                    href={anime.malUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-fuchsia-500 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/10 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnimePage;
