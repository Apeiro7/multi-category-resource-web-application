export interface Software {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  tags: string[];
  platform: string[];
  isFree: boolean;
  rating: number;
}

export const softwareList: Software[] = [
  {
    id: "sw1",
    name: "VS Code",
    description: "Lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js.",
    category: "Development",
    url: "https://code.visualstudio.com/",
    icon: "💻",
    tags: ["editor", "coding", "ide"],
    platform: ["Windows", "Mac", "Linux"],
    isFree: true,
    rating: 5,
  },
  {
    id: "sw2",
    name: "Figma",
    description: "Collaborative interface design tool for UI/UX design with real-time collaboration features.",
    category: "Design",
    url: "https://figma.com/",
    icon: "🎨",
    tags: ["design", "ui", "ux", "prototyping"],
    platform: ["Windows", "Mac", "Web"],
    isFree: true,
    rating: 5,
  },
  {
    id: "sw3",
    name: "Obsidian",
    description: "A powerful knowledge base and note-taking app that works on top of a local folder of plain text Markdown files.",
    category: "Productivity",
    url: "https://obsidian.md/",
    icon: "📝",
    tags: ["notes", "markdown", "knowledge base"],
    platform: ["Windows", "Mac", "Linux"],
    isFree: true,
    rating: 5,
  },
  {
    id: "sw4",
    name: "OBS Studio",
    description: "Free and open source software for video recording and live streaming with powerful scene composition.",
    category: "Media",
    url: "https://obsproject.com/",
    icon: "🎬",
    tags: ["streaming", "recording", "video"],
    platform: ["Windows", "Mac", "Linux"],
    isFree: true,
    rating: 4,
  },
  {
    id: "sw5",
    name: "Postman",
    description: "API platform for building and using APIs. Simplify each step of the API lifecycle.",
    category: "Development",
    url: "https://postman.com/",
    icon: "🔧",
    tags: ["api", "testing", "development"],
    platform: ["Windows", "Mac", "Linux"],
    isFree: true,
    rating: 4,
  },
  {
    id: "sw6",
    name: "DaVinci Resolve",
    description: "Professional video editing, color correction, visual effects and audio post production software.",
    category: "Media",
    url: "https://www.blackmagicdesign.com/products/davinciresolve",
    icon: "🎞️",
    tags: ["video editing", "color grading", "vfx"],
    platform: ["Windows", "Mac", "Linux"],
    isFree: true,
    rating: 5,
  },
  {
    id: "sw7",
    name: "Notion",
    description: "All-in-one workspace for notes, docs, wikis, projects, and collaboration.",
    category: "Productivity",
    url: "https://notion.so/",
    icon: "🗂️",
    tags: ["notes", "project management", "wiki"],
    platform: ["Windows", "Mac", "Web"],
    isFree: true,
    rating: 4,
  },
  {
    id: "sw8",
    name: "Git",
    description: "Free and open source distributed version control system for tracking code changes.",
    category: "Development",
    url: "https://git-scm.com/",
    icon: "🌿",
    tags: ["version control", "git", "development"],
    platform: ["Windows", "Mac", "Linux"],
    isFree: true,
    rating: 5,
  },
];
