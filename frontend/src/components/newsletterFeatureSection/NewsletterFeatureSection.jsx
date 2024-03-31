import React from 'react'
import * as IconsAndImages from "../../Assets/IconsAndImages";
import FeatureCard from './FeatureCard'
import NewsletterSignUp from './NewsletterSignUp'

function NewsletterFeatureSection() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-8 p-8 mt-20 mb-16">
            <FeatureCard
              icon={<IconsAndImages.FaParachuteBox />}
              title="15 DAYS FREE RETURN"
              description="Nisi magna facilisi nulla morbi"
            />
            <FeatureCard
              icon={<IconsAndImages.FaTruck />}
              title="FREE SHIPPING"
              description="Nisi magna facilisi nulla morbi"
            />
            <NewsletterSignUp />
          </div>
  )
}

export default NewsletterFeatureSection