import { Achievement } from "../../types";

import { checkTrophy } from "../../utils";

type AchievementBody = Pick<Achievement, "title" | "description" | "points">;

function AchievementToastBody({ title, description, points }: AchievementBody) {
  const trophy = checkTrophy(points);
  return (
    <div className="flex flex-col">
      <span>{title}</span>
      <div className="flex flex-col">
        <span>{description}</span>
        <div className="flex items-center ">
          <span>
            <img src={trophy} height={10} width={15} alt="trophy" />
          </span>
          <span>{points}</span>
        </div>
      </div>
    </div>
  );
}

export default AchievementToastBody;
