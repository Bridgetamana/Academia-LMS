import React from "react";

const faqs = [
  {
    question: "Can I trust you?",
    answer: "Lorem ipsum dolor",
  },
  {
    question: "Can I trust you?",
    answer: "Lorem ipsum dolor",
  },
];

const FAQs = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-24 pb-52 lg:pb-64 lg:flex">
      <div className="w-full flex flex-col gap-16">
        <span className="text-center flex flex-col gap-6">
          <span>
            <p className="text-[14px] font-bold text-[#1E1C27] uppercase">
              FAQS
            </p>
            <hr className="border-[2px] border-[#00B2A9] w-[40px] mx-auto" />
          </span>

          <p className="text-[#7A8A98] text-[20px] md:text-[32px]">
            Frequently asked Questions.
          </p>
        </span>

        <div className="w-full flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-white shadow-md shadow-[#1A1A1A14] rounded-none text-start p-3"
            >
              <input type="radio" name="my-accordion-2" id={`faq-${index}`} />
              <label
                htmlFor={`faq-${index}`}
                className="collapse-title text-base md:text-[20px] font-medium text-[#1A1A1A]"
              >
                {faq.question}
              </label>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
