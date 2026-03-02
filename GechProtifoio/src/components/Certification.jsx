import React, { useRef, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "../constants/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const Certification = () => {
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
                        delay: idx * 0.1,
                    }
                );
            }
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section
            id="certification"
            className="relative bg-transparent text-white py-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 overflow-hidden"
        >
            <div className="w-full text-center">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#06b6d4] mb-20 font-space tracking-tight uppercase">
                    Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {portfolioData.certifications.map((cert, index) => (
                        <Tilt
                            key={index}
                            tiltMaxAngleX={10}
                            tiltMaxAngleY={10}
                            glareEnable={true}
                            glareMaxOpacity={0.1}
                            scale={1.05}
                            className="w-full"
                        >
                            <div
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="relative flex flex-col h-full glass rounded-3xl overflow-hidden group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] p-4"
                            >
                                {/* Image Container - Full display */}
                                <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden bg-black/10 rounded-2xl">
                                    <img
                                        src={cert.image}
                                        alt={cert.title || "Certification"}
                                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certification;
