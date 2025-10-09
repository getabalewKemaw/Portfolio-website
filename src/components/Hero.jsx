

import { ReactTyped } from "react-typed";
import portfolioData from "../constants/portfolioData";
import { FaDownload, FaFolderOpen } from "react-icons/fa";
import CanvasScene from "./CanvasScene";

const Hero = () => {
  const { name, socialLinks } = portfolioData.hero;

  return (
    <section className="relative w-full h-screen bg-black text-gray-100 flex items-center justify-center overflow-hidden ">
      {/* Background Layer 1 - Base gradient waves */}
      <div
        className="absolute inset-0 opacity-40 animate-pulse"
        style={{
          backgroundImage: "url(/images/hero-bg-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      />

      {/* Background Layer 2 - Geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/images/hero-bg-2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Background Layer 3 - Light rays and particles */}
      <div
        className="absolute inset-0 opacity-30 animate-pulse"
        style={{
          backgroundImage: "url(/images/hero-bg-3.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "lighten",
          animationDuration: "4s",
          animationDelay: "1s",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#06b6d4]/20 via-transparent to-black/60" />

      {/* Canvas behind content */}
      <div className="absolute inset-0 z-0">
        <CanvasScene />
      </div>

      <div className="z-10 text-center px-6 py-10 max-w-4xl relative">
        <h1 className="text-5xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="text-white drop-shadow-2xl">Hi, I'm </span>
          <span className="text-[#06b6d4] drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
            {name.split(" ")[0]} {name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <h2 className="text-4xl md:text-6xl font-bold mb-10" style={{ color: "#06b6d4" }}>
          <ReactTyped
            strings={[
              "FullStack Developer.",
              "JavaScript Developer.",
              "UI/UX Designer .",
              "Mobile Application Developer .",
            ]}
            typeSpeed={80}
            backSpeed={40}
            backDelay={1500}
            loop
          />
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] text-white px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <FaFolderOpen /> View Projects
          </button>

          <button
            onClick={() => window.open("/files/Getabalew_Kemaw_CV.pdf", "_blank")}
            className="text-gray-200 px-6 py-4 rounded-xl border-2 border-gray-600 hover:border-[#06b6d4] hover:text-[#06b6d4] hover:bg-[#06b6d4]/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 font-semibold text-lg backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <FaDownload /> Download CV
          </button>
        </div>

        <nav className="flex gap-6 justify-center" aria-label="Social media">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#06b6d4] focus:text-[#06b6d4] transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#06b6d4] rounded"
              aria-label={social.name || `Social link ${index + 1}`}
            >
              {social.icon}
            </a>
          ))}
        </nav>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/40" />
    </section>
  );
};

export default Hero;