import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { achievements } from "../../mocks";

function Dashboard() {
  const [gameShown, setGameShown] = useState<string>("");
  const [enableTracking, setEnableTracking] = useState<boolean>(false);
  const simCheevo = () =>
    invoke("simulate_achievement", { cheevo: achievements[0] });
  return (
    <main className="bg-slate-400 min-h-screen flex-col items-center justify-center flex gap-5">
      <span className="font-bold text-4xl">Custom Retro Achievements</span>
      <section>
        <span className="font-extrabold text-xl">
          {gameShown || "No Game Found"}
        </span>
      </section>
      <section>
        <input
          type="checkbox"
          checked={enableTracking}
          onChange={(e) => setEnableTracking(e.target.checked)}
        />
        <label>Enable Tracking</label>
        <button onClick={simCheevo}> Simulate Cheevo Pop</button>
      </section>
    </main>
  );
}

export default Dashboard;
