export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  tags: string[];
  isFree: boolean;
}

export const toolList: Tool[] = [
  {
    id: "t1",
    name: "ChatGPT",
    description: "OpenAI's powerful AI assistant for writing, coding, analysis, and more.",
    category: "AI",
    url: "https://chat.openai.com/",
    icon: "🤖",
    tags: ["ai", "chatbot", "writing", "coding"],
    isFree: true,
  },
  {
    id: "t2",
    name: "Canva",
    description: "Design tool for creating presentations, social media posts, logos, and more.",
    category: "Design",
    url: "https://canva.com/",
    icon: "🎨",
    tags: ["design", "graphics", "presentation"],
    isFree: true,
  },
  {
    id: "t3",
    name: "GitHub",
    description: "Code hosting platform for version control and collaboration with Git.",
    category: "Development",
    url: "https://github.com/",
    icon: "🐙",
    tags: ["git", "code", "collaboration", "open source"],
    isFree: true,
  },
  {
    id: "t4",
    name: "Vercel",
    description: "Deploy web apps instantly with automatic CI/CD, previews, and serverless functions.",
    category: "Deployment",
    url: "https://vercel.com/",
    icon: "▲",
    tags: ["deployment", "hosting", "ci/cd", "serverless"],
    isFree: true,
  },
  {
    id: "t5",
    name: "Cloudflare",
    description: "CDN, DNS, security, and performance optimization for your websites and apps.",
    category: "Infrastructure",
    url: "https://cloudflare.com/",
    icon: "☁️",
    tags: ["cdn", "dns", "security", "performance"],
    isFree: true,
  },
  {
    id: "t6",
    name: "regex101",
    description: "Build, test and debug regular expressions with a detailed explanation.",
    category: "Development",
    url: "https://regex101.com/",
    icon: "🔍",
    tags: ["regex", "testing", "development"],
    isFree: true,
  },
  {
    id: "t7",
    name: "Excalidraw",
    description: "Virtual collaborative whiteboard for sketching diagrams and wireframes.",
    category: "Productivity",
    url: "https://excalidraw.com/",
    icon: "✏️",
    tags: ["whiteboard", "diagrams", "collaboration"],
    isFree: true,
  },
  {
    id: "t8",
    name: "ScreenToGif",
    description: "Record your screen, webcam or sketchboard to GIF, video or other formats.",
    category: "Media",
    url: "https://www.screentogif.com/",
    icon: "📹",
    tags: ["gif", "screen recording", "video"],
    isFree: true,
  },
  {
    id: "t9",
    name: "Squoosh",
    description: "Make images smaller using best-in-class codecs, right in the browser.",
    category: "Media",
    url: "https://squoosh.app/",
    icon: "🖼️",
    tags: ["image", "compression", "optimization"],
    isFree: true,
  },
  {
    id: "t10",
    name: "Shields.io",
    description: "Concise, consistent, and legible badges for your GitHub README files.",
    category: "Development",
    url: "https://shields.io/",
    icon: "🛡️",
    tags: ["badges", "github", "readme"],
    isFree: true,
  },
];
