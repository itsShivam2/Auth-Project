import React from 'react';

const ContactDetails = ({ icon, title, details }) => (
  <div className="flex flex-col sm:flex-row items-start gap-4 text-left">
    <div>
      <span className="bg-[#DDD1C1]">{icon}</span>
    </div>
    <div className="flex flex-col items-start gap-2">
      <h2 className="font-[Fahkwang] text-2xl font-semibold">{title}</h2>
      <p className="font-[Montserrat] text-base text-gray-700">{details}</p>
    </div>
  </div>
);

export default ContactDetails;
