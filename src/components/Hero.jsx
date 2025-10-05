import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ReactTyped } from "react-typed";
import portfolioData from "../constants/portfolioData";
import Button from "./Button";
import { FaDownload, FaFolderOpen } from "react-icons/fa";
import HeroTorus from "./HeroTorus";

const Hero = () => {
  const heroRef = useRef(null);
  const { name, socialLinks } = portfolioData.hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-typed",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.5 }
      );
      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-social",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, stagger: 0.15, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-img",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Responsive layout: image above on small screens
  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-6 md:px-20 relative text-white my-12 mx-0 left-0 right-0"
    >
      {/* Background image from Unsplash with overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.6)),url('https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=2060&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Left: Text */}
      <div className="z-10 flex-1 flex flex-col justify-center space-y-6 mx-0 w-full max-w-2xl">
        <h1 className="hero-title text-4xl md:text-6xl font-extrabold leading-tight font-poppins text-shadow">
          Hi, I'm{" "}
          <span className="text-cyan-400 drop-shadow-lg">
            {name.split(" ")[0]}
          </span>{" "}
          {name.split(" ").slice(1).join(" ")}
        </h1>

        {/* Typed Animation */}
        <h2 className="hero-typed text-2xl md:text-3xl font-bold" style={{ color: "#06b6d4" }}>
          <ReactTyped
            strings={[
              "FullStack Developer",
              "JavaScript Developer",
              "UI/UX Designer",
              "Mobile Application Developer",
            ]}
            typeSpeed={60}
            backSpeed={40}
            backDelay={1500}
            loop
          />
        </h2>

        {/* Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-2">
          <Button
            text="View Projects"
            icon={<FaFolderOpen />}
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-cyan-500 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-300"
          />
          <Button
            text="Download CV"
            icon={<FaDownload />}
            onClick={() => window.open("/files/Getabalew_Kemaw_CV.pdf", "_blank")}
            className="bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Social Links */}
        <nav className="flex gap-6 pt-2" aria-label="Social media">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social text-2xl hover:text-cyan-400 focus:text-cyan-300 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label={social.name || `Social link ${index + 1}`}
            >
              {social.icon}
            </a>
          ))}
        </nav>
      </div>

      {/* Right: 3D Torus */}
      <div className="z-10 flex-1 flex justify-center items-center w-full">
        <div className="w-full max-w-xl glass rounded-3xl p-2">
          <HeroTorus />
        </div>
      </div>
    </section>
  );
};

export default Hero;