// src/components/NavBar.jsx
import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import portfolioData from "../constants/portfolioData";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleNavClick = (id) => {
    if (!isHomePage) {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Handle scroll after navigating home
  useEffect(() => {
    if (isHomePage && location.state?.scrollTo) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear state
      window.history.replaceState({}, document.title);
    }
  }, [isHomePage, location]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-4 flex justify-between items-center">
        <RouterLink to="/" className="text-2xl font-bold text-white tracking-widest cursor-pointer hover:text-cyan-400 transition-colors duration-300 font-space">
          GK<span className="text-cyan-400">.</span>
        </RouterLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-3 lg:gap-6 text-white text-[11px] lg:text-sm font-semibold font-fira tracking-wider uppercase">
          {portfolioData.navLinks.map((link) => (
            <li key={link.id} className="nav-item">
              {isHomePage ? (
                <ScrollLink
                  to={link.id}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  className="cursor-pointer relative group transition-colors duration-300 px-2 py-1 rounded-xl hover:bg-white/5"
                >
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </ScrollLink>
              ) : (
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="cursor-pointer relative group transition-colors duration-300 px-2 py-1 rounded-xl hover:bg-white/5 uppercase"
                >
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              )}
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
              {isHomePage ? (
                <ScrollLink
                  to={link.id}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg cursor-pointer relative group px-3 py-2 rounded-xl hover:bg-white/5"
                >
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </ScrollLink>
              ) : (
                <button
                  onClick={() => {
                    handleNavClick(link.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-lg cursor-pointer relative group px-3 py-2 rounded-xl hover:bg-white/5 uppercase"
                >
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
