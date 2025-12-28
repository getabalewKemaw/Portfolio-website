import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { gsap } from "gsap";
import portfolioData from "../constants/portfolioData";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="bg-transparent text-white py-16 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto text-center footer-content space-y-6">
        {/* Logo / Name */}
        <h2 className="text-3xl font-bold text-cyan-400 font-space tracking-tight">
          {portfolioData.hero.name}
        </h2>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-2xl">
          {portfolioData.hero.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center gap-6 text-gray-400 text-sm">
          <p>Email: {portfolioData.contact.email}</p>
          <p>Phone: {portfolioData.contact.phone}</p>
          <p>Location: {portfolioData.contact.address}</p>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full transition-transform hover:scale-110 inline-flex items-center justify-center"
          title="Back to Top"
        >
          <FaArrowUp />
        </button>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-4 font-fira">
          &copy; {currentYear} {portfolioData.hero.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
