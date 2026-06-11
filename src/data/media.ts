export type Photo = {
  slug: string;
  title: string;
  date: string;
  location: string;
  camera: string;
  image: string;
  alt: string;
  tags: string[];
  mood: string;
  featured: boolean;
  story: string;
  aspect: "wide" | "portrait" | "square";
};

export type Track = {
  slug: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  mood: string;
  context: string;
  tags: string[];
};

export type Mix = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  tracks: Track[];
  context: string;
};

export const photos: Photo[] = [
  {
    slug: "morning-studio-desk",
    title: "Morning studio desk",
    date: "2026-05-18",
    location: "Nanjing studio",
    camera: "Generated / warm lens",
    image: "/assets/morning-studio-desk.png",
    alt: "Notebook, coffee, and keyboard on a warm studio desk.",
    tags: ["Studio", "Writing", "Warmth"],
    mood: "Quiet focus",
    featured: true,
    story:
      "The desk before the day becomes loud: notes open, keyboard ready, coffee still warm.",
    aspect: "wide",
  },
  {
    slug: "code-window-after-rain",
    title: "Code window after rain",
    date: "2026-04-27",
    location: "Late desk",
    camera: "35mm digital",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=82",
    alt: "A laptop with code on screen in a dim workspace.",
    tags: ["Code", "Night", "Tools"],
    mood: "Debugging calm",
    featured: false,
    story:
      "A small reminder that code can feel tactile when the surrounding system is quiet enough.",
    aspect: "wide",
  },
  {
    slug: "atelier-wall",
    title: "Atelier wall",
    date: "2026-03-16",
    location: "Design review",
    camera: "Generated / product board",
    image: "/assets/lumen-design-system.png",
    alt: "Design system screens and interface cards arranged on a studio wall.",
    tags: ["Design", "System", "Review"],
    mood: "System thinking",
    featured: true,
    story:
      "A visual checkpoint for component language: enough structure to repeat, enough warmth to read.",
    aspect: "square",
  },
  {
    slug: "workshop-light",
    title: "Workshop light",
    date: "2026-02-08",
    location: "Prototype table",
    camera: "50mm digital",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
    alt: "A bright creative workspace with tables and soft daylight.",
    tags: ["Prototype", "Space", "Light"],
    mood: "Open loop",
    featured: false,
    story:
      "The kind of room where a fuzzy product idea becomes a diagram, then a component, then a habit.",
    aspect: "wide",
  },
  {
    slug: "listening-corner",
    title: "Listening corner",
    date: "2026-01-22",
    location: "Evening studio",
    camera: "35mm digital",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=82",
    alt: "Music equipment in a warm room prepared for listening.",
    tags: ["Music", "Evening", "Focus"],
    mood: "Low tempo",
    featured: false,
    story:
      "A small listening ritual for the part of the day when implementation starts to slow down.",
    aspect: "portrait",
  },
  {
    slug: "city-shadow-note",
    title: "City shadow note",
    date: "2025-12-13",
    location: "Walking note",
    camera: "Phone",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
    alt: "Warm architectural light and shadows near a quiet interior.",
    tags: ["Observation", "Texture", "Travel"],
    mood: "Collected",
    featured: false,
    story:
      "Not every reference starts in software. Some of the best interface decisions begin as light, rhythm, and edges.",
    aspect: "portrait",
  },
];

export const tracks: Track[] = [
  {
    slug: "atelier-late-night",
    title: "Atelier - late night",
    artist: "Ray Studio",
    album: "Focus loops",
    duration: 184,
    cover: "/assets/morning-studio-desk.png",
    mood: "Warm",
    context: "Writing draft",
    tags: ["Focus", "Warm", "Loop"],
  },
  {
    slug: "quiet-refactor",
    title: "Quiet refactor",
    artist: "Ray Studio",
    album: "Focus loops",
    duration: 212,
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=82",
    mood: "Precise",
    context: "Code review",
    tags: ["Code", "Review", "Deep work"],
  },
  {
    slug: "window-state",
    title: "Window state",
    artist: "Ray Studio",
    album: "Studio states",
    duration: 167,
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=82",
    mood: "Dim",
    context: "Debugging",
    tags: ["Night", "Debug", "Ambient"],
  },
  {
    slug: "small-systems",
    title: "Small systems",
    artist: "Ray Studio",
    album: "Studio states",
    duration: 198,
    cover: "/assets/lumen-design-system.png",
    mood: "Clear",
    context: "Design system pass",
    tags: ["Design", "Tokens", "System"],
  },
];

export const currentMix: Mix = {
  slug: "studio-mix-06",
  title: "Studio mix 06",
  description:
    "A quiet set for writing, refactoring, and slow design review. Mock audio state today; real audio can come later without changing the component contract.",
  cover: "/assets/morning-studio-desk.png",
  tracks,
  context: "Now playing in the studio",
};

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = String(seconds % 60).padStart(2, "0");

  return `${minutes}:${remaining}`;
}
