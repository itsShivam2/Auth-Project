import React from "react";

function BestFeatureSectionGroup({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center">
      {icon &&
        React.cloneElement(icon, {
          className: "text-5xl text-cyan-800",
        })}
      <h5 className="font-[Fahkwang] font-semibold text-2xl text-center">{title}</h5>
      <p className="font-[Montserrat] text-lg text-center">{description}</p>
    </div>
  );
}

export default BestFeatureSectionGroup;
