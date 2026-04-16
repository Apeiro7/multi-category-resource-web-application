import React, { useState } from "react";
import { Play, ChevronDown, ChevronRight, CheckCircle2, Circle, X, Star, Clock } from "lucide-react";
import { videoSeries, type VideoSeries, type Episode, type Season } from "../data/videos";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";

const VideosPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedSeries, setSelectedSeries] = useState<VideoSeries | null>(null);
  const [_selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);
  const [playingEpisode, setPlayingEpisode] = useState<{ episode: Episode; season: Season } | null>(null);
  const [watchedEps, setWatchedEps] = useState<Set<string>>(new Set());

  const filtered = videoSeries.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.genre.some((g) => g.toLowerCase().includes(search.toLowerCase()))
  );

  const openSeries = (series: VideoSeries) => {
    setSelectedSeries(series);
    setSelectedSeason(series.seasons[0]);
    setExpandedSeason(series.seasons[0]?.id ?? null);
    setPlayingEpisode(null);
  };

  const closeSeries = () => {
    setSelectedSeries(null);
    setSelectedSeason(null);
    setPlayingEpisode(null);
  };

  const playEpisode = (episode: Episode, season: Season) => {
    setPlayingEpisode({ episode, season });
    setWatchedEps((prev) => new Set([...prev, episode.id]));
  };

  const toggleSeason = (seasonId: string) => {
    setExpandedSeason((prev) => (prev === seasonId ? null : seasonId));
  };

  const typeColor: Record<string, string> = {
    Anime: "from-fuchsia-500 to-pink-500",
    Series: "from-blue-500 to-cyan-500",
    Movie: "from-amber-500 to-orange-500",
    Tutorial: "from-emerald-500 to-teal-500",
  };

  const typeBadge: Record<string, "purple" | "info" | "warning" | "success"> = {
    Anime: "purple",
    Series: "info",
    Movie: "warning",
    Tutorial: "success",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🎞️ Videos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Anime, series, movies & tutorials with season & episode player</p>
      </div>

      {/* Series Browser */}
      {!selectedSeries && (
        <>
          <SearchBar value={search} onChange={setSearch} placeholder="Search videos..." />
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🎬</p>
              <p className="text-gray-500 dark:text-gray-400">No videos found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((series) => {
                const totalEps = series.seasons.reduce((a, s) => a + s.episodes.length, 0);
                return (
                  <button
                    key={series.id}
                    onClick={() => openSeries(series)}
                    className="group relative rounded-2xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 overflow-hidden hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 text-left"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={series.coverImage}
                        alt={series.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x176/1a1a2e/6d28d9?text=${encodeURIComponent(series.title)}`; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-medium text-white bg-gradient-to-r ${typeColor[series.type]}`}>
                        {series.type}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center">
                          <Play size={24} className="text-white ml-1 fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">{series.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{series.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          {series.genre.slice(0, 2).map((g) => (
                            <Badge key={g} variant="default">{g}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={11} />
                          <span>{totalEps} ep{totalEps !== 1 ? "s" : ""}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} className={i < Math.round((series.rating / 10) * 5) ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"} />
                        ))}
                        <span className="text-xs text-gray-400 ml-0.5">{series.rating}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Series Player View */}
      {selectedSeries && (
        <div className="space-y-4">
          {/* Back + Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={closeSeries}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X size={16} />
              <span>Back to list</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Player + Info */}
            <div className="lg:col-span-2 space-y-4">
              {/* Video Player */}
              <div className="rounded-2xl overflow-hidden bg-black aspect-video relative">
                {playingEpisode ? (
                  <iframe
                    src={`${playingEpisode.episode.embedUrl}?autoplay=1`}
                    title={playingEpisode.episode.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 cursor-pointer"
                    onClick={() => {
                      const firstSeason = selectedSeries.seasons[0];
                      if (firstSeason) playEpisode(firstSeason.episodes[0], firstSeason);
                    }}>
                    <img
                      src={selectedSeries.coverImage}
                      alt={selectedSeries.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Play size={28} className="text-white ml-1 fill-white" />
                      </div>
                      <p className="text-white/80 text-sm">Click to play Episode 1</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Now Playing Info */}
              {playingEpisode && (
                <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8">
                  <p className="text-xs text-violet-500 font-medium mb-1">NOW PLAYING</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{playingEpisode.episode.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {playingEpisode.season.title} · Episode {playingEpisode.episode.number} · {playingEpisode.episode.duration}
                  </p>
                </div>
              )}

              {/* Series Info */}
              <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedSeries.coverImage}
                    alt={selectedSeries.title}
                    className="w-16 h-22 rounded-lg object-cover flex-shrink-0 hidden sm:block"
                    style={{ height: "88px" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h2 className="font-bold text-lg text-gray-900 dark:text-white">{selectedSeries.title}</h2>
                      <Badge variant={typeBadge[selectedSeries.type]}>{selectedSeries.type}</Badge>
                    </div>
                    {selectedSeries.studio && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{selectedSeries.studio}</p>}
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSeries.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedSeries.genre.map((g) => (
                        <Badge key={g} variant="default">{g}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Season/Episode Selector */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📺</span> Seasons & Episodes
              </h3>
              {selectedSeries.seasons.map((season) => (
                <div key={season.id} className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
                  {/* Season Header */}
                  <button
                    onClick={() => toggleSeason(season.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 font-medium text-sm transition-colors ${
                      expandedSeason === season.id
                        ? "bg-violet-500 text-white"
                        : "bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/8"
                    }`}
                  >
                    <span className="text-left">
                      Season {season.number}: {season.title}
                      <span className="ml-2 opacity-70 font-normal">({season.episodes.length} eps)</span>
                    </span>
                    {expandedSeason === season.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {/* Episodes List */}
                  {expandedSeason === season.id && (
                    <div className="bg-white dark:bg-white/3 divide-y divide-black/5 dark:divide-white/5">
                      {season.episodes.map((ep) => {
                        const isWatched = watchedEps.has(ep.id) || ep.isWatched;
                        const isPlaying = playingEpisode?.episode.id === ep.id;
                        return (
                          <button
                            key={ep.id}
                            onClick={() => playEpisode(ep, season)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                              isPlaying
                                ? "bg-violet-50 dark:bg-violet-500/15"
                                : "hover:bg-gray-50 dark:hover:bg-white/5"
                            }`}
                          >
                            {isWatched ? (
                              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Circle size={16} className="text-gray-300 dark:text-gray-600 flex-shrink-0" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-medium truncate ${isPlaying ? "text-violet-500" : "text-gray-700 dark:text-gray-300"}`}>
                                Ep {ep.number}: {ep.title}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">{ep.duration}</p>
                            </div>
                            {isPlaying && (
                              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosPage;
