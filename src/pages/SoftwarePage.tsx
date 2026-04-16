import React, { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { softwareList } from "../data/software";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";

const categories = ["All", ...Array.from(new Set(softwareList.map((s) => s.category)))];

const SoftwarePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = softwareList.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🧩 Software
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Curated list of must-have software tools</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search software..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20"
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
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500 dark:text-gray-400">No software found matching your search.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((sw) => (
            <div
              key={sw.id}
              className="group relative flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
            >
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                      {sw.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{sw.name}</h3>
                      <Badge variant="purple">{sw.category}</Badge>
                    </div>
                  </div>
                  {sw.isFree && <Badge variant="success">Free</Badge>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{sw.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {sw.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/8 text-xs text-gray-500 dark:text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i <= sw.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{sw.rating}.0</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {sw.platform.map((p) => (
                    <Badge key={p} variant="default">{p}</Badge>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5">
                <a
                  href={sw.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
                >
                  Visit Website <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoftwarePage;
