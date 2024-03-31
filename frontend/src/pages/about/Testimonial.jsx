import React from 'react';

function Testimonial({ content, userImage, userName }) {
  return (
    <div>
      <p className="font-[Montserrat] text-xl font-semibold text-left mb-4">
        {content}
      </p>
      <div className="flex items-center gap-4">
        <img src={userImage} className="h-20 w-20 rounded-full" alt={userName} />
        <h5 className="font-[Montserrat] text-lg text-left">{userName}</h5>
      </div>
    </div>
  );
}

export default Testimonial;
