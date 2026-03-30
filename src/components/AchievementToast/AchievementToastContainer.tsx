import React from "react";

function AchievementToastContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="top-10 left-0 bg-black text-white py-2 px-8 flex shadow-md  ">
      {children}
    </div>
  );
}

export default AchievementToastContainer;
