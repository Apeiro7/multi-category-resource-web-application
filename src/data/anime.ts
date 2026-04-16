export interface Anime {
  id: string;
  title: string;
  description: string;
  genre: string[];
  episodes: number;
  status: "Watching" | "Completed" | "Plan to Watch" | "On Hold" | "Dropped";
  rating: number;
  coverImage: string;
  myRating?: number;
  year: number;
  studio: string;
  malUrl?: string;
}

export const animeList: Anime[] = [
  {
    id: "a1",
    title: "Attack on Titan",
    description: "Centuries ago, humanity was slaughtered to near extinction by monstrous humanoid creatures called Titans. The last survivors hide inside three giant walls.",
    genre: ["Action", "Drama", "Fantasy"],
    episodes: 87,
    status: "Completed",
    rating: 9.0,
    coverImage: "https://cdn.myanimelist.net/images/anime/1/117905l.jpg",
    myRating: 10,
    year: 2013,
    studio: "Wit Studio / MAPPA",
    malUrl: "https://myanimelist.net/anime/16498",
  },
  {
    id: "a2",
    title: "Demon Slayer",
    description: "A boy raised by boars, who wears a boar's head, boards the Infinity Train on a new mission with the Flame Pillar, Rengoku.",
    genre: ["Action", "Fantasy", "Adventure"],
    episodes: 55,
    status: "Watching",
    rating: 8.7,
    coverImage: "https://cdn.myanimelist.net/images/anime/1/108725l.jpg",
    myRating: 9,
    year: 2019,
    studio: "ufotable",
    malUrl: "https://myanimelist.net/anime/38000",
  },
  {
    id: "a3",
    title: "Fullmetal Alchemist: Brotherhood",
    description: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.",
    genre: ["Action", "Adventure", "Drama"],
    episodes: 64,
    status: "Completed",
    rating: 9.1,
    coverImage: "https://cdn.myanimelist.net/images/anime/1/9408l.jpg",
    myRating: 10,
    year: 2009,
    studio: "Bones",
    malUrl: "https://myanimelist.net/anime/5114",
  },
  {
    id: "a4",
    title: "Jujutsu Kaisen",
    description: "A boy swallows a cursed talisman — the finger of a Demon — and becomes host to a powerful creature.",
    genre: ["Action", "Supernatural", "School"],
    episodes: 47,
    status: "Watching",
    rating: 8.6,
    coverImage: "https://cdn.myanimelist.net/images/anime/1/101336l.jpg",
    myRating: 9,
    year: 2020,
    studio: "MAPPA",
    malUrl: "https://myanimelist.net/anime/40748",
  },
  {
    id: "a5",
    title: "One Piece",
    description: "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.",
    genre: ["Action", "Adventure", "Comedy"],
    episodes: 1100,
    status: "Watching",
    rating: 8.7,
    coverImage: "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
    myRating: 9,
    year: 1999,
    studio: "Toei Animation",
    malUrl: "https://myanimelist.net/anime/21",
  },
  {
    id: "a6",
    title: "Vinland Saga",
    description: "A story of a young Viking warrior who seeks revenge against the man who killed his father.",
    genre: ["Action", "Adventure", "Historical"],
    episodes: 48,
    status: "Completed",
    rating: 8.7,
    coverImage: "https://cdn.myanimelist.net/images/anime/1/77185l.jpg",
    myRating: 9,
    year: 2019,
    studio: "Wit Studio",
    malUrl: "https://myanimelist.net/anime/37521",
  },
];
