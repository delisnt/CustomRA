import { create } from "zustand";
import { Achievements, Achievement } from "../types";

export const useStore = create<Achievements>()((set) => ({
  queue: [],
  history: [],
  add: (data: Achievement) =>
    set((state) => ({
      queue: [...state.queue, data],
    })),
  pop: () =>
    set((state) => {
      if (state.queue.length === 0) return state;

      const [next, ...rest] = state.queue;

      return {
        queue: rest,
        history: [...state.history, next],
      };
    }),
}));
