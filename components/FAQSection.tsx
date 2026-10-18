"use client";

import React, { useState } from "react";
import type { Dictionary } from "../lib/dictionaries";

/** Expandable FAQ questions with answers for both supported languages. */
export default function FAQSection({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.faq;
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestions((open) => open.includes(index) ? open.filter((item) => item !== index) : [...open, index]);
  };

  return (
    <section
      aria-labelledby="faq-title"
      className="relative isolate overflow-hidden bg-transparent px-5 pb-16 pt-12 text-white sm:px-8 sm:pb-[104px] sm:pt-[54px]"
    >
      <div className="relative mx-auto max-w-[1140px]">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/[0.025] px-3 py-[6px] text-[14px] font-medium leading-5">
            {copy.badge}
          </span>
          <h2 id="faq-title" className="mt-6 text-[clamp(2.2rem,3.5vw,3.2rem)] font-bold leading-[1.14] tracking-[-0.035em]">
            {copy.title} <span className="gold-highlight">{copy.highlight}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-6 text-white/95 sm:text-[16px]">
            {copy.description}
          </p>
        </div>

        <ul className="mt-10 flex flex-col gap-4 sm:mt-11 sm:gap-5">
          {copy.questions.map((question, index) => {
            const isOpen = openQuestions.includes(index);
            const answerId = `faq-answer-${index}`;

            return (
            <li key={question} style={{ animationDelay: `${index * 70}ms` }} className="faq-item overflow-hidden rounded-[12px] border border-white/[0.1] bg-[#111111]">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleQuestion(index)}
                className="flex min-h-[66px] w-full items-center justify-between gap-4 px-4 py-4 text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white sm:px-4"
              >
                <span className="text-[17px] font-bold leading-6 tracking-[-0.015em] sm:text-[23px]">{question}</span>
                <span aria-hidden="true" data-open={isOpen} className="faq-chevron relative h-6 w-6 shrink-0">
                  <span className="absolute left-1/2 top-1/2 h-[2px] w-[18px] -translate-x-1/2 -translate-y-1/2 bg-white" />
                  {!isOpen && <span className="absolute left-1/2 top-1/2 h-[18px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white" />}
                </span>
              </button>
              <div id={answerId} aria-hidden={!isOpen} data-open={isOpen} className="faq-answer">
                <div className="px-4 pb-5 text-[15px] leading-[1.7] text-white/70 sm:px-5 sm:text-[16px]">
                  {copy.answers[index]}
                </div>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
