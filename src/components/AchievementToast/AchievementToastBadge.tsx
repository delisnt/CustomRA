import { Achievement } from "../../types";
import cheevoBadge from "../../assets/cheevo.png";

type AchievementBadge = Pick<Achievement, "badge">;

function AchievementToastBadge({ badge }: AchievementBadge) {
  return (
    <div className="flex items-center justify-center px-4">
      <img src={badge || cheevoBadge} alt="cheevo badge" />
    </div>
  );
}

export default AchievementToastBadge;
