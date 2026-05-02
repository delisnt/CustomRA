import { useEffect } from "react";
import { useStore } from "../store/store";
import { Achievement } from "../types";
import { listen } from "@tauri-apps/api/event";

export function useAchievement() {
  const add = useStore((state) => state.add);
  const pop = useStore((state) => state.pop);
  useEffect(() => {
    listen<Achievement>("achievement-sent", (event) => {
      console.log("evento ricevuto", event.payload);
      add(event.payload);
      handlePop();
    });
  }, []);
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
