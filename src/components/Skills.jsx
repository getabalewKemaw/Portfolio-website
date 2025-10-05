import React, { useRef, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "../constants/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef([]);

  useEffect(() => {
    skillsRef.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            delay: idx * 0.08, // subtle stagger as you scroll
          }
        );
      }
    });
    // cleanup: kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative bg-black text-white py-20 px-0 w-full"
    >
      <div className="w-full mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-400 mb-12 text-center">
          My Skills
        </h2>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10 px-4 sm:px-8 md:px-16">
          {portfolioData.skills.map((skill, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.05}
            >
              <div
                ref={(el) => (skillsRef.current[index] = el)}
                className="flex flex-col items-center justify-center glass p-6 rounded-2xl cursor-pointer 
                           transform transition-transform duration-300 hover:scale-110 w-full"
              >
                <div className="text-4xl sm:text-5xl mb-2">{skill.icon}</div>
                <h3 className="text-base sm:text-xl font-semibold mb-1">{skill.name}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{skill.proficiency}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;