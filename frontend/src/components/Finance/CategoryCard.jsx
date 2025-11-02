import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CategoryCard = ({ title, value, color, tooltip }) => {
  return (
    <div
      data-tooltip-id={title}
      data-tooltip-content={tooltip || ""}
      className={`p-4 bg-white shadow rounded-xl ${color} relative cursor-pointer`}
    >
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>

      {tooltip && <ReactTooltip id={title} place="top" effect="solid" />}
    </div>
  );
};

export default CategoryCard;
