"use client";

import React from "react";

const Contact = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-24 lg:flex">
      <div className="w-full grid md:grid-cols-2 gap-6 text-black text-[18px]">
        <div className="font-medium flex flex-col gap-3">
          <p className="font-bold text-[24px]">Can&apos;t wait?</p>
          <p>Send us a message and we will get back to you ASAP!</p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <span className="flex flex-col gap-2">
            <label htmlFor="name">
              Name<span className="text-red-500 text-2xl">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full p-3 text-gray-500 border rounded-md outline-none bg-white focus:border-black"
            />
          </span>
          <span className="flex flex-col gap-2">
            <label htmlFor="email">
              Email<span className="text-red-500 text-2xl">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full p-3 text-gray-500 border rounded-md outline-none bg-white focus:border-black"
            />
          </span>
          <span className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full p-3 text-gray-500 border rounded-md outline-none bg-white focus:border-black"
            />
          </span>
          <span className="flex flex-col gap-2">
            <label htmlFor="message">
              Message<span className="text-red-500 text-2xl">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="w-full min-h-16 h-36 p-3 text-gray-500 border rounded-md outline-none bg-white focus:border-black"
            />
          </span>
          <p className="text-[14px]">
            You agree to receive email communication from us by submitting this
            form and understand that your contact information will be stored
            with us.
          </p>
          <span className="pt-4">
            <button
              type="submit"
              className="uppercase text-white text-[18px] btn btn-ghost bg-gray-700 hover:bg-ypfagege-dark duration-150 w-max rounded-full px-6 py-3"
            >
              Submit
            </button>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Contact;
