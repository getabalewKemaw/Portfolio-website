import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCircle } from "react-icons/fa";
import portfolioData from "../constants/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const timelineRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    timelineRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
            delay: i * 0.10,
          }
        );
      }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-transparent text-white py-20 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 overflow-hidden"
    >
      <div className="w-full text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#06b6d4] mb-20 font-space tracking-tight uppercase">
          Journey So Far
        </h2>
        <div className="relative flex flex-col items-center">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500/70 to-blue-700/60 z-0" />
          <div className="w-full flex flex-col gap-16 z-10">
            {portfolioData.experience.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  ref={el => (timelineRef.current[idx] = el)}
                  className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                >
                  {/* Left card */}
                  {isLeft && (
                    <div className="md:w-1/2 w-full pr-0 md:pr-8 flex flex-col items-end">
                      <div className="glass p-6 rounded-2xl text-left w-full max-w-md">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-fira">{exp.role}</h3>
                        <p className="text-gray-300 text-sm sm:text-base whitespace-pre-line font-ibm-plex leading-relaxed">{exp.description.trim()}</p>
                      </div>
                    </div>
                  )}
                  {/* Timeline Dot & Year */}
                  <div className="flex flex-col items-center justify-center mx-4">
                    <span className="flex items-center justify-center w-8 h-8 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/30 border-4 border-black z-10">
                      <FaCircle className="text-white text-lg" />
                    </span>
                    <span className="text-cyan-400 font-bold text-xs sm:text-sm mt-2 md:mt-4 whitespace-nowrap font-fira">
                      {exp.year}
                    </span>
                  </div>
                  {/* Right card */}
                  {!isLeft && (
                    <div className="md:w-1/2 w-full pl-0 md:pl-8 flex flex-col items-start">
                      <div className="glass p-6 rounded-2xl text-left w-full max-w-md">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-fira">{exp.role}</h3>
                        <p className="text-gray-300 text-sm sm:text-base whitespace-pre-line font-ibm-plex leading-relaxed">{exp.description.trim()}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;