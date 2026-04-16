import React, { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { linkList } from "../data/links";
import SearchBar from "../components/SearchBar";
import Badge from "../components/Badge";

const categories = ["All", ...Array.from(new Set(linkList.map((l) => l.category)))];

const catBadge: Record<string, "default" | "info" | "success" | "warning" | "purple"> = {
  Documentation: "info",
  Community: "success",
  Anime: "purple",
  News: "warning",
  Learning: "success",
  Design: "purple",
  Discovery: "warning",
};

const LinksPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = linkList.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === "All" || l.category === activeCategory;
    return matchSearch && matchCat;
  });

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const grouped = categories
    .filter((cat) => cat !== "All")
    .map((cat) => ({
      category: cat,
      items: filtered.filter((l) => l.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🔗 Links
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Important websites and resources, always at hand</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search links..." />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
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
          <p className="text-4xl mb-3">🔗</p>
          <p className="text-gray-500 dark:text-gray-400">No links found.</p>
        </div>
      ) : activeCategory !== "All" ? (
        /* Flat view when a category is selected */
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((link) => (
            <LinkCard key={link.id} link={link} copiedId={copiedId} onCopy={copyUrl} />
          ))}
        </div>
      ) : (
        /* Grouped view */
        <div className="space-y-8">
          {grouped.map((group) => (
            <div key={group.category}>
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Badge variant={catBadge[group.category] || "default"}>{group.category}</Badge>
                <span>{group.items.length} links</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {group.items.map((link) => (
                  <LinkCard key={link.id} link={link} copiedId={copiedId} onCopy={copyUrl} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface LinkCardProps {
  link: (typeof linkList)[0];
  copiedId: string | null;
  onCopy: (id: string, url: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, copiedId, onCopy }) => {
  const isCopied = copiedId === link.id;
  return (
    <div className="group flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center text-xl flex-shrink-0">
        {link.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{link.name}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onCopy(link.id, link.url)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
              title="Copy URL"
            >
              {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{link.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {link.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/8 text-xs text-gray-400 dark:text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
