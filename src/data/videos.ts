export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  embedUrl: string;
  thumbnail?: string;
  isWatched?: boolean;
}

export interface Season {
  id: string;
  number: number;
  title: string;
  episodes: Episode[];
  year: number;
}

export interface VideoSeries {
  id: string;
  title: string;
  description: string;
  genre: string[];
  coverImage: string;
  banner?: string;
  type: "Anime" | "Series" | "Movie" | "Tutorial";
  seasons: Season[];
  rating: number;
  studio?: string;
}

export const videoSeries: VideoSeries[] = [
  {
    id: "v1",
    title: "Big Buck Bunny",
    description: "A classic animated short film. A large, fluffy rabbit encounters some small animals who bully him. Used here as a streaming demo.",
    genre: ["Animation", "Short Film"],
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg",
    type: "Movie",
    rating: 8.0,
    studio: "Blender Foundation",
    seasons: [
      {
        id: "s1",
        number: 1,
        title: "Main Film",
        year: 2008,
        episodes: [
          {
            id: "e1",
            number: 1,
            title: "Big Buck Bunny - Full Film",
            duration: "9:56",
            embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            isWatched: false,
          },
          {
            id: "e2",
            number: 2,
            title: "Behind the Scenes",
            duration: "5:30",
            embedUrl: "https://www.youtube.com/embed/YE7VzlLtp-4",
            isWatched: false,
          },
        ],
      },
    ],
  },
  {
    id: "v2",
    title: "Anime Music Compilation",
    description: "A collection of amazing anime openings and endings, perfect for getting hyped up or relaxing.",
    genre: ["Music", "Anime"],
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80",
    type: "Anime",
    rating: 9.0,
    studio: "Various Studios",
    seasons: [
      {
        id: "s1",
        number: 1,
        title: "Season 1 - Epic Openings",
        year: 2023,
        episodes: [
          {
            id: "e1",
            number: 1,
            title: "Top 10 Anime Openings 2023",
            duration: "12:40",
            embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            isWatched: false,
          },
          {
            id: "e2",
            number: 2,
            title: "Best Anime Endings of All Time",
            duration: "18:22",
            embedUrl: "https://www.youtube.com/embed/YE7VzlLtp-4",
            isWatched: false,
          },
          {
            id: "e3",
            number: 3,
            title: "Emotional Anime OSTs",
            duration: "15:10",
            embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            isWatched: false,
          },
        ],
      },
      {
        id: "s2",
        number: 2,
        title: "Season 2 - Battle Themes",
        year: 2024,
        episodes: [
          {
            id: "e4",
            number: 1,
            title: "Most Intense Battle OSTs",
            duration: "20:05",
            embedUrl: "https://www.youtube.com/embed/YE7VzlLtp-4",
            isWatched: false,
          },
          {
            id: "e5",
            number: 2,
            title: "Villain Theme Songs Compilation",
            duration: "14:33",
            embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            isWatched: false,
          },
        ],
      },
    ],
  },
  {
    id: "v3",
    title: "Web Dev Masterclass",
    description: "A comprehensive video series covering modern web development from HTML/CSS basics to advanced React and Node.js.",
    genre: ["Tutorial", "Programming"],
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    type: "Tutorial",
    rating: 9.5,
    studio: "DevHive Studios",
    seasons: [
      {
        id: "s1",
        number: 1,
        title: "Season 1 - Fundamentals",
        year: 2023,
        episodes: [
          {
            id: "e1",
            number: 1,
            title: "HTML & CSS Crash Course",
            duration: "45:12",
            embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            isWatched: true,
          },
          {
            id: "e2",
            number: 2,
            title: "JavaScript Essentials",
            duration: "52:08",
            embedUrl: "https://www.youtube.com/embed/YE7VzlLtp-4",
            isWatched: true,
          },
          {
            id: "e3",
            number: 3,
            title: "Responsive Design with Tailwind",
            duration: "38:45",
            embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            isWatched: false,
          },
        ],
      },
      {
        id: "s2",
        number: 2,
        title: "Season 2 - React & Backend",
        year: 2024,
        episodes: [
          {
            id: "e4",
            number: 1,
            title: "React Hooks Deep Dive",
            duration: "60:20",
            embedUrl: "https://www.youtube.com/embed/YE7VzlLtp-4",
            isWatched: false,
          },
          {
            id: "e5",
            number: 2,
            title: "Node.js & Express API",
            duration: "55:15",
            embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
            isWatched: false,
          },
        ],
      },
    ],
  },
];
