import React, { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Use free Unsplash/Pexels images for better quality and variety
const testimonialData = [
  {
    name: "Altaseb  Cherent",
    role: "Full stack  Developer",
    image: "https://avatars.githubusercontent.com/u/185071027?v=4",
    text: "Getabalew is a highly skilled developer! His React and collaboration  skills made our project come alive. Truly professional and punctual.",
  },
  {
    name: "Leta kasahun",
    role: "Full stack developer",
    image: "https://avatars.githubusercontent.com/u/193022391?v=4",
    text: "Working with Getabalew was seamless. His backend  skills elevated our app, making it both intuitive and visually stunning.",
  },
  {
    name: "Getahun Mengste",
    role: "Front end Developer",
    image: "images/gech.png",
    text: "Getabalew’s attention to detail and coding skills are exceptional. He turned our concepts into interactive experiences effortlessly.",
  },
];

const Testimonial = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    cardsRef.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
            delay: idx * 0.12,
          }
        );
      }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      id="testimonial"
      ref={sectionRef}
      className="relative bg-black text-white py-20 w-full px-2 sm:px-6 md:px-14"
    >
      <div className="w-full max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-400 mb-12">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 w-full">
          {testimonialData.map((item, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.13}
              scale={1.04}
              className="w-full"
            >
              <div
                ref={el => (cardsRef.current[index] = el)}
                className="glass p-7 rounded-2xl flex flex-col items-center text-center w-full h-full
                  hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-cyan-400/60 shadow-lg shadow-cyan-400/30 transition-all duration-300"
                  loading="lazy"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-1">{item.name}</h3>
                <p className="text-cyan-400 text-xs sm:text-sm mb-3">{item.role}</p>
                <p className="text-gray-300 text-sm sm:text-base">{item.text}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
