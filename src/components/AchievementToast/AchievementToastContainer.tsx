import { motion } from "framer-motion";

function AchievementToastContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  function handleAnimations(animation: string) {
    if (animation === "initial" || animation == "exit") {
      return { x: -400 };
    } else if (animation === "duration") {
      return { duration: 0.5 };
    } else if (animation === "animate") {
      return { x: 0 };
    }
  }

  return (
    <motion.div
      initial={handleAnimations("initial")}
      animate={handleAnimations("animate")}
      exit={handleAnimations("exit")}
      transition={handleAnimations("duration")}
      className="top-10 left-0 bg-black text-white flex shadow-[9px_8px_9px_-7px_rgba(0,_0,_0,_0.8)] h-16 w-96 gap-3"
    >
      {children}
    </motion.div>
  );
}

export default AchievementToastContainer;
