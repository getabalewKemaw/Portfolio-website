import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import portfolioData from "../constants/portfolioData";
import { FaDownload } from "react-icons/fa";
import Button from "./Button";

const About = () => {
  const aboutRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { title, description, resumeLink } = portfolioData.about;

  // Short, professional summary text (replace with your own if needed)
  const shortDescription = description;


  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".about-title",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(
          ".about-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, stagger: 0.1, ease: "power3.out" }
        );
        gsap.fromTo(
          ".about-btn",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
        );
        gsap.fromTo(
          ".about-img",
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1, delay: 0.4, ease: "power3.out" }
        );
      }, aboutRef);
      return () => ctx.revert();
    }
  }, [inView]);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 bg-transparent text-white overflow-hidden w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16"
    >
      {/* IMAGE LEFT on large screens, ABOVE on small screens */}
      <div className="flex-1 flex justify-center mb-8 md:mb-0 md:mr-8">
        <img
          src="/images/hero-visual.jpg"
          alt="Profile"
          className="about-img w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-full border-4 border-cyan-500 shadow-lg shadow-cyan-500/30"
        />
      </div>

      {/* TEXT RIGHT on large screens, BELOW on small screens */}
      <div className="flex-1 flex flex-col items-center md:items-start space-y-6 font-sans">
        <h2 className="about-title text-2xl sm:text-3xl md:text-5xl font-bold font-space text-cyan-400 text-center md:text-center w-full tracking-wider uppercase">
          {title}
        </h2>
        <div className="about-text text-gray-300 text-base sm:text-lg md:text-[1.1rem] leading-relaxed text-center md:text-left max-w-lg font-ibm-plex">
          {shortDescription}
        </div>
        <div className="pt-3">
          <Button
            text="Download Resume"
            icon={<FaDownload />}
            onClick={() => window.open(resumeLink, "_blank")}
            className="about-btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-medium shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default About;