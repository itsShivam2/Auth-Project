import React from "react";
import BestFeatureSectionGroup from "./BestFeatureSectionGroup";
import * as IconsAndImages from "../../Assets/IconsAndImages";

function BestFeatureSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 my-16">
      <BestFeatureSectionGroup
        icon={<IconsAndImages.MdAssuredWorkload />}
        title="Best Quality"
        description="Nam nec tellus a odio tincidunt auctor a ornare odio sed non mauris."
      />
      <BestFeatureSectionGroup
        icon={<IconsAndImages.BiSolidOffer />}
        title="Best Offers"
        description="Nam nec tellus a odio tincidunt auctor a ornare odio sed non mauris."
      />
      <BestFeatureSectionGroup
        icon={<IconsAndImages.MdPayments />}
        title="Secure Payments"
        description="Nam nec tellus a odio tincidunt auctor a ornare odio sed non mauris."
      />
    </div>
  );
}

export default BestFeatureSection;
