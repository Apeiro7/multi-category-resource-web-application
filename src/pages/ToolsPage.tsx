import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { toolList } from "../data/tools";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";

const categories = ["All", ...Array.from(new Set(toolList.map((t) => t.category)))];

const catColors: Record<string, string> = {
  AI: "from-violet-500 to-purple-600",
  Design: "from-pink-500 to-rose-500",
  Development: "from-blue-500 to-cyan-500",
  Deployment: "from-gray-700 to-gray-900",
  Infrastructure: "from-orange-500 to-amber-500",
  Productivity: "from-emerald-500 to-teal-500",
  Media: "from-fuchsia-500 to-pink-500",
};

const ToolsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = toolList.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🛠️ Tools
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Essential online tools for developers and creators</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search tools..." />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20"
                  : "bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/12"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🛠️</p>
          <p className="text-gray-500 dark:text-gray-400">No tools found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => {
            const gradient = catColors[tool.category] || "from-gray-500 to-gray-700";
            return (
              <div
                key={tool.id}
                className="group flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                <div className="p-5 flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                      <Badge variant="warning">{tool.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/8 text-xs text-gray-500 dark:text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-5 pb-5 flex gap-2">
                  {tool.isFree && (
                    <span className="flex items-center px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-500/20">
                      ✓ Free
                    </span>
                  )}
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity bg-gradient-to-r ${gradient} shadow-lg`}
                  >
                    Open Tool <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ToolsPage;
