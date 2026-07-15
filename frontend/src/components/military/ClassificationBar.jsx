import React from "react";

export const ClassificationBar = ({ position = "top", text = "SECRET//NOFORN", testId }) => {
  const isTop = position === "top";
  return (
    <div
      data-testid={testId}
      className={`w-full flex items-center justify-center px-4 py-1 mil-heading text-[11px] tracking-[0.3em] text-black classified-bar ${
        isTop ? "bg-mil-danger" : "bg-mil-warning"
      }`}
      style={{ letterSpacing: "0.32em" }}
    >
      <span className="mr-3 mono opacity-70">◆</span>
      <span>{text}</span>
      <span className="ml-3 mono opacity-70">◆</span>
    </div>
  );
};

export default ClassificationBar;
