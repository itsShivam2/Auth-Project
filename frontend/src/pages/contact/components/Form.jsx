import React from 'react';

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full md:w-1/2 text-left">
      <h3 className="font-[Fahkwang] text-2xl text-left py-2 my-2">
        Got Any Questions?
      </h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="name" className="font-bold text-lg font-[Montserrat]">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="h-12 border-r-sky-800 border-2 px-2 mb-4 font-[Montserrat]"
        />

        <label htmlFor="email" className="font-bold text-lg font-[Montserrat]">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="h-12 border-r-sky-800 border-2 px-2 mb-4 font-[Montserrat]"
        />

        <label
          htmlFor="message"
          className="font-bold text-lg font-[Montserrat]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="h-28 border-r-sky-800 border-2 px-2 mb-4 font-[Montserrat]"
        />

        <button
          type="submit"
          className="border-gray-600 border-2 self-start px-8 py-3 font-[Montserrat] hover:bg-black hover:text-white"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;
