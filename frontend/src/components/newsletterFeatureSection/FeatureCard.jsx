import React from 'react';
import * as IconsAndImages from '../../Assets/IconsAndImages';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-2 justify-start text-left">
      {React.cloneElement(icon, { className: "text-3xl text-cyan-800" })}
      <h3 className="font-[Fahkwang] text-lg">{title}</h3>
      <h5 className="font-[Montserrat] text-base">{description}</h5>
    </div>
  );
};

export default FeatureCard;
