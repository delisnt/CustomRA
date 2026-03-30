import { useStore } from "../store/store";
import { Achievement } from "../types";

export function useAchievement() {
  const add = useStore((state) => state.add);
  const pop = useStore((state) => state.pop);
  function getAchievements(data: Achievement[]) {
    data.forEach((cheevo) => {
      if (useStore.getState().queue.length < 3) {
        add(cheevo);
      }
    });
  }
  function handlePop() {
    setTimeout(() => {
      pop();
    }, 3000);
  }

  return { getAchievements, handlePop };
}
