import React, { useRef, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase, FaCloud, FaJava } from "react-icons/fa";
import {
  SiTailwindcss, SiThreedotjs, SiGreensock, SiJavascript, SiTypescript, SiDocker, SiAwsamplify,
  SiPython, SiCplusplus, SiHtml5, SiCss3, SiNextdotjs, SiOracle, SiPostgresql
} from "react-icons/si";
import portfolioData from "../constants/portfolioData";




// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Utility: Map technology string to icon
const techIcons = {
  "React": <FaReact className="text-blue-500" />,
  "Next.js": <SiNextdotjs className="text-black" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  "GSAP": <SiGreensock className="text-green-500" />,
  "Three.js": <SiThreedotjs className="text-gray-800" />,
  "HTML": <SiHtml5 className="text-orange-600" />,
  "CSS": <SiCss3 className="text-blue-500" />,
  "JavaScript": <SiJavascript className="text-yellow-500" />,
  "JavaScript/ES6+": <SiJavascript className="text-yellow-500" />,
  "TypeScript": <SiTypescript className="text-blue-600" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "Java": <FaJava className="text-red-600" />,
  "Python": <SiPython className="text-yellow-600" />,
  "C++": <SiCplusplus className="text-blue-700" />,
  "Database Management (SQL/NoSQL)": <FaDatabase className="text-red-500" />,
  "Oracle SQL": <SiOracle className="text-red-700" />,
  "PostgreSQL": <SiPostgresql className="text-blue-800" />,
  "Docker & Containerization": <SiDocker className="text-blue-400" />,
  "AWS Cloud Services": <SiAwsamplify className="text-orange-500" />,
  "DevOps & CI/CD": <FaCloud className="text-purple-500" />,
  "Express": <FaNodeJs className="text-green-600" />,
  "MongoDB": <FaDatabase className="text-green-700" />,
  "SQL": <FaDatabase className="text-blue-800" />
};

const Projects = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            delay: idx * 0.09,
          }
        );
      }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="projects" className="relative bg-transparent text-white py-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 overflow-hidden">
      <div className="w-full text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#06b6d4] mb-20 font-space tracking-tight uppercase">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10">
          {portfolioData.projects.map((project, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={13}
              tiltMaxAngleY={13}
              glareEnable={true}
              glareMaxOpacity={0.17}
              scale={1.035}
              className="w-full h-full"
            >
              <div
                ref={el => cardsRef.current[index] = el}
                className="relative flex flex-col h-full glass rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 group"
              >
                {/* Project Image */}
                <div className="w-full h-48 sm:h-56 md:h-64 flex items-center justify-center bg-black/5 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Project Info */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 font-fira">{project.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-4 font-ibm-plex leading-relaxed">{project.description.trim()}</p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-white/10 backdrop-blur-sm border border-white/10 p-2 rounded-full flex items-center justify-center text-lg"
                          title={tech}
                        >
                          {techIcons[tech] || tech}
                        </span>
                      ))}
                    </div>
                    {/* Action Buttons: always visible */}
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-200 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        title="GitHub"
                      >
                        <FaGithub size={18} className="mr-1" /> <span className="text-xs">Code</span>
                      </a>
                      {project.live && project.live !== "#" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-200 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt size={16} className="mr-1" /><span className="text-xs">Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
