export type Achievement = {
  id: number;
  title: string;
  description: string;
  type: string;
  points: number;
  badge?: string;
};

export type Achievements = {
  history: Achievement[];
  queue: Achievement[];
  add: (cheevo: Achievement) => void;
  pop: () => void;
};

export type AchievementToastProps = Pick<
  Achievement,
  "title" | "description" | "points" | "badge"
>;
