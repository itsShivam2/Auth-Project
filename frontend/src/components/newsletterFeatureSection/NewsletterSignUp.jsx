import React from 'react';

const NewsletterSignUp = () => {
  return (
    <div className="w-full md:w-3/5 flex flex-col gap-2 justify-start text-left">
      <h3 className="font-[Fahkwang] text-3xl mb-4">Newsletter Sign Up</h3>
      <div className="w-full flex flex-col sm:flex-row items-center gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full sm:w-[70%] font-[Montserrat] border-r-gray-600 border-2 px-2 py-3"
        />
        <button className="w-full sm:w-[30%] font-[Montserrat] border-gray-200 border-2 px-4 py-3 hover:bg-black hover:text-white">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default NewsletterSignUp;
