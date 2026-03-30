import { useEffect } from "react";
import ToastQueue from "./components/ToastQueue/ToastQueue";
import { useAchievement } from "./hooks/useAchievements";
import { achievements } from "./mocks";

function App() {
  const { getAchievements } = useAchievement();
  useEffect(() => {
    getAchievements(achievements);
  }, []);

  return (
    <div>
      <ToastQueue />
    </div>
  );
}

export default App;
