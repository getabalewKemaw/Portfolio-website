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
    <section id="projects" className="bg-black text-white py-20 px-2 sm:px-6 md:px-10 w-full">
      <div className="w-full max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-400 mb-12">
          Projects
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
              className="w-full"
            >
              <div
                ref={el => cardsRef.current[index] = el}
                className="relative flex flex-col h-full bg-gray-900 rounded-2xl shadow-lg overflow-hidden 
                  transition-transform duration-300 hover:scale-105 hover:shadow-cyan-600/30 hover:shadow-2xl group"
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 sm:h-48 md:h-52 object-cover"
                  loading="lazy"
                />

                {/* Project Info */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-4">{project.description.trim()}</p>

                  <div className="flex flex-wrap gap-2 mt-auto mb-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-800 p-2 rounded-full flex items-center justify-center text-lg"
                        title={tech}
                      >
                        {techIcons[tech] || tech}
                      </span>
                    ))}
                  </div>
                  {/* Action Buttons: always visible */}
                  <div className="flex items-center gap-4 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-300 bg-gray-800 px-3 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      title="GitHub"
                    >
                      <FaGithub size={18} className="mr-1" /> <span className="text-xs">Code</span>
                    </a>
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-300 bg-gray-800 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt size={16} className="mr-1" /><span className="text-xs">Live</span>
                      </a>
                    )}
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
