import React from "react";

const ScoreBadge = ({ score }) => {
  let badgeClass = "";
  let text = "";

  if (score > 69) {
    badgeClass = "bg-badge-green text-green-600";
    text = "Strong";
  } else if (score > 49) {
    badgeClass = "bg-badge-yellow text-yellow-600";
    text = "Good Start";
  } else {
    badgeClass = "bg-badge-red text-red-600";
    text = "Needs work";
  }

  return (
    <div
      className={`inline-flex items-center rounded-2xl px-3 py-1 text-sm font-medium shadow-sm ${badgeClass}`}
    >
      <p>{text}</p>
    </div>
  );
};

export default ScoreBadge;
