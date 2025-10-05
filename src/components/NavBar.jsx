// src/components/NavBar.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import portfolioData from "../constants/portfolioData";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       
        <div className="text-2xl font-bold text-white tracking-wide cursor-pointer hover:text-cyan-400 transition-colors duration-300">
          GK<span className="text-cyan-400">.</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-white text-sm font-medium">
          {portfolioData.navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              <Link
                to={link.id}
                smooth={true}
                duration={600}
                offset={-80}
                className="cursor-pointer relative group transition-colors duration-300 px-2 py-1 rounded-xl hover:bg-white/5"
              >
                {link.title}
                {/* Hover underline effect */}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-2xl px-6 py-8 space-y-6 text-center text-white font-medium border-t border-white/10">
          {portfolioData.navLinks.map((link) => (
            <div key={link.id} className="nav-item">
              <Link
                to={link.id}
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block text-lg cursor-pointer relative group px-3 py-2 rounded-xl hover:bg-white/5"
              >
                {link.title}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
