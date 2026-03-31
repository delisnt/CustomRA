import { AnimatePresence } from "framer-motion";
import { useStore } from "../../store/store";
import AchievementToast from "../AchievementToast/AchievementToast";

function ToastQueue() {
  const queue = useStore((state) => state.queue);
  return (
    <div className="flex flex-col gap-2 my-24 fixed">
      <AnimatePresence>
        {queue.map(({ id, title, description, points }) => (
          <AchievementToast
            key={id}
            title={title}
            description={description}
            points={points}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastQueue;
