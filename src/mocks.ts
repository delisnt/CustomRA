import { Achievement } from "./types";

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Blood",
    description: "Defeat your first enemy",
    points: 10,
    type: "progression",
    badge: undefined,
  },
  {
    id: 2,
    title: "Speed Runner",
    description: "Complete World 1 under 5 minutes",
    points: 25,
    type: "progression",
    badge: undefined,
  },
  {
    id: 3,
    title: "Untouchable",
    description: "Finish a stage without taking damage",
    points: 100,
    type: "missable",
    badge: undefined,
  },
];
