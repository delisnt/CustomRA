import bronzeTrophy from "./assets/bronze.png";
import silverTrophy from "./assets/silver.png";
import goldTrophy from "./assets/gold.png";

export function checkTrophy(points: number) {
  if (points <= 10) {
    return bronzeTrophy;
  } else if (points > 10 && points <= 20) {
    return silverTrophy;
  } else {
    return goldTrophy;
  }
}
