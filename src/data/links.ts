export interface LinkItem {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  tags: string[];
}

export const linkList: LinkItem[] = [
  {
    id: "l1",
    name: "MDN Web Docs",
    description: "The best documentation for web technologies: HTML, CSS, JavaScript and APIs.",
    category: "Documentation",
    url: "https://developer.mozilla.org/",
    icon: "📖",
    tags: ["docs", "web", "reference"],
  },
  {
    id: "l2",
    name: "Stack Overflow",
    description: "The largest community for developers to find and share answers.",
    category: "Community",
    url: "https://stackoverflow.com/",
    icon: "🔥",
    tags: ["community", "q&a", "development"],
  },
  {
    id: "l3",
    name: "DevDocs",
    description: "Fast, offline, and free documentation browser for developers.",
    category: "Documentation",
    url: "https://devdocs.io/",
    icon: "📚",
    tags: ["docs", "offline", "reference"],
  },
  {
    id: "l4",
    name: "MyAnimeList",
    description: "The largest online anime and manga database and community.",
    category: "Anime",
    url: "https://myanimelist.net/",
    icon: "🌸",
    tags: ["anime", "manga", "community"],
  },
  {
    id: "l5",
    name: "AniList",
    description: "Track, discover and share your anime and manga journey with rich stats.",
    category: "Anime",
    url: "https://anilist.co/",
    icon: "📊",
    tags: ["anime", "tracking", "stats"],
  },
  {
    id: "l6",
    name: "HackerNews",
    description: "Social news website focusing on computer science and entrepreneurship.",
    category: "News",
    url: "https://news.ycombinator.com/",
    icon: "📰",
    tags: ["news", "tech", "startups"],
  },
  {
    id: "l7",
    name: "Roadmap.sh",
    description: "Step by step guides and paths to learn tools or technologies for developers.",
    category: "Learning",
    url: "https://roadmap.sh/",
    icon: "🗺️",
    tags: ["roadmap", "learning", "career"],
  },
  {
    id: "l8",
    name: "Product Hunt",
    description: "Discover the best new products in tech every day.",
    category: "Discovery",
    url: "https://www.producthunt.com/",
    icon: "🚀",
    tags: ["products", "startups", "apps"],
  },
  {
    id: "l9",
    name: "Dribbble",
    description: "Community for designers to share, grow, and get hired.",
    category: "Design",
    url: "https://dribbble.com/",
    icon: "🎯",
    tags: ["design", "portfolio", "ui"],
  },
  {
    id: "l10",
    name: "FreeCodeCamp",
    description: "Learn to code for free with interactive lessons and projects.",
    category: "Learning",
    url: "https://www.freecodecamp.org/",
    icon: "🏕️",
    tags: ["coding", "free", "learning"],
  },
  {
    id: "l11",
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building modern designs.",
    category: "Documentation",
    url: "https://tailwindcss.com/",
    icon: "💨",
    tags: ["css", "framework", "docs"],
  },
  {
    id: "l12",
    name: "Can I Use",
    description: "Browser support tables for modern web technologies.",
    category: "Documentation",
    url: "https://caniuse.com/",
    icon: "✅",
    tags: ["browser", "compatibility", "web"],
  },
];
