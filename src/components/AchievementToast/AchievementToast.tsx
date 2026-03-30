import AchievementToastBody from "./AchievementToastBody";
import AchievementToastContainer from "./AchievementToastContainer";
import AchievementToastBadge from "./AchievementToastBadge";
import { AchievementToastProps } from "../../types";

function AchievementToast({
  title,
  description,
  points,
  badge,
}: AchievementToastProps) {
  return (
    <AchievementToastContainer>
      <AchievementToastBadge badge={badge} />
      <AchievementToastBody
        title={title}
        description={description}
        points={points}
      />
    </AchievementToastContainer>
  );
}

export default AchievementToast;
