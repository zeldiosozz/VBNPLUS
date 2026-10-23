import type { Dictionary } from "../lib/dictionaries";
import LazyDotLottie from "./LazyDotLottie";

const stepIcons = ["analyze", "Search for value", "Money"];
// const stepIcons = ["puzzle", "gear", "trophy"];

// function ProcessIcon({ type }: { type: string }) {
//   const gradientId = `process-${type}-gradient`;
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 112 112"
//       className="h-[94px] w-[94px] drop-shadow-[0_12px_12px_rgba(93,38,224,.22)] sm:h-[100px] sm:w-[100px]"
//       fill="none"
//     >
//       <defs>
//         <linearGradient id={gradientId} x1="18" y1="14" x2="91" y2="100" gradientUnits="userSpaceOnUse">
//           <stop stopColor="#FFE16A" />
//           <stop offset=".38" stopColor="#FF75A9" />
//           <stop offset=".72" stopColor="#9C4BEE" />
//           <stop offset="1" stopColor="#4321D8" />
//         </linearGradient>
//         <linearGradient id={`${gradientId}-side`} x1="28" y1="60" x2="91" y2="103" gradientUnits="userSpaceOnUse">
//           <stop stopColor="#EA4CB2" />
//           <stop offset="1" stopColor="#3614CB" />
//         </linearGradient>
//       </defs>
//       {type === "puzzle" && (
//         <>
//           <path d="M25 24c0-6 5-11 11-11 5 0 9 4 10 9h10c1-7 6-12 13-12 8 0 14 6 14 14v9h8c8 0 14 6 14 14 0 7-5 13-12 14v12H78c-1-7-6-12-13-12-8 0-14 6-14 14 0 3 1 6 3 8H25V68c-7-1-12-7-12-14s5-13 12-14V24Z" fill={`url(#${gradientId})`} />
//           <path d="M25 68c-7-1-12-7-12-14s5-13 12-14v28Zm29 29H25V68l27 14c-1 5 0 11 2 15Z" fill={`url(#${gradientId}-side)`} opacity=".9" />
//           <path d="M27 27c0-6 5-11 11-11 5 0 8 3 9 8h10" stroke="#FFF2BB" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
//         </>
//       )}
//       {type === "gear" && (
//         <>
//           <path d="m47 8 18 0 3 10a34 34 0 0 1 7 4l10-3 9 16-7 8a33 33 0 0 1 0 9l7 8-9 16-10-3a34 34 0 0 1-7 4l-3 10H47l-3-10a34 34 0 0 1-7-4l-10 3-9-16 7-8a33 33 0 0 1 0-9l-7-8 9-16 10 3a34 34 0 0 1 7-4l3-10Z" transform="translate(0 4)" fill={`url(#${gradientId})`} />
//           <circle cx="56" cy="56" r="18" fill="#100D22" />
//           <circle cx="56" cy="56" r="18" stroke="#F8A3C6" strokeOpacity=".4" strokeWidth="2" />
//           <path d="M42 25c4-3 8-5 13-6" stroke="#FFF2BB" strokeOpacity=".48" strokeWidth="3" strokeLinecap="round" />
//         </>
//       )}
//       {type === "trophy" && (
//         <>
//           <path d="M35 17h42v18c0 18-8 30-21 34-13-4-21-16-21-34V17Z" fill={`url(#${gradientId})`} />
//           <path d="M35 24H22v9c0 13 8 21 22 22M77 24h13v9c0 13-8 21-22 22" stroke={`url(#${gradientId})`} strokeWidth="9" strokeLinecap="round" />
//           <path d="M56 69v17m-16 8h32M47 87h18" stroke={`url(#${gradientId}-side)`} strokeWidth="9" strokeLinecap="round" />
//           <path d="M45 23h23" stroke="#FFF1B0" strokeOpacity=".52" strokeWidth="3" strokeLinecap="round" />
//           <path d="M43 31c0 11 4 20 13 26" stroke="#FFF0B8" strokeOpacity=".18" strokeWidth="5" strokeLinecap="round" />
//         </>
//       )}
//       {type === "analyze" && (
//               <img width={112} height={112} src="/images/training.gif" className=""/>
//       )}
//     </svg>
//   );
// }
function ProccessIconn({type}:{type:string}){
  return <LazyDotLottie src={`/images/${type}.lottie`} />;
}

/** Three-step process section, designed to sit between other page sections. */
export default function ProcessSection({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.process;
  return (
    <section
      aria-labelledby="process-title"
      className="relative isolate overflow-hidden bg-transparent px-5 pb-16 pt-8 text-white sm:px-8 sm:pb-20 sm:pt-9"
    >
      <div className="relative mx-auto max-w-[1140px]">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/[0.025] px-3 py-[6px] text-[14px] font-medium leading-5">
            {copy.badge}
          </span>
          <h2 id="process-title" className="mt-6 text-[clamp(2.25rem,3.55vw,3.25rem)] font-bold leading-[1.14] tracking-[-0.035em]">
            {copy.title} <span className="gold-highlight">{copy.highlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[1.7] text-white/95 sm:text-[16px]">
            {copy.description}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {copy.steps.map((step, index) => (
            <article
              key={step.title}
              className="flex min-h-[330px] flex-col rounded-[13px] border border-white/[0.12] backdrop-blur-md bg-black/10 p-6 sm:min-h-[344px] sm:p-6"
            >
              <ProccessIconn type={stepIcons[index]} 
              />
            <h3 className="mt-9 text-[21px] font-bold leading-[1.25] tracking-[-0.025em] sm:text-[23px]">
                {step.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.72] text-white/95 sm:text-[16px]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
