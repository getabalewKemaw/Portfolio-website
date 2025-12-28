import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);

  // Animate when in viewport
  useEffect(() => {
    const triggers = [];
    if (sectionRef.current) {
      triggers.push(
        gsap.fromTo(
          ".contact-title",
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        )
      );
      triggers.push(
        gsap.fromTo(
          ".contact-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        )
      );
    }
    return () => {
      triggers.forEach(t => t.scrollTrigger && t.scrollTrigger.kill());
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const result = await emailjs.sendForm(
        "service_4j068xy",  // replace with your EmailJS Service ID
        "template_79cytt8", // replace with your EmailJS Template ID
        formRef.current,
        "MA39jJ5B6yPXvrcwX"   // replace with your EmailJS Public Key
      );
      if (result.status !== 200) throw new Error("Failed to send message");

      alert("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      alert("Failed to send message. Check your EmailJS configuration or network.", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 bg-transparent overflow-hidden"
    >
      <div className="w-full text-center">
        <h2 className="contact-title text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#06b6d4] mb-20 font-space tracking-tight uppercase">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-12 w-full">
          {/* Contact Info */}
          <div className="space-y-6 contact-card text-left flex flex-col justify-center glass p-6 rounded-2xl w-full">
            <div className="flex items-center gap-4 font-ibm-plex">
              <FaEnvelope className="text-cyan-400 text-2xl" />
              <p className="break-all">gech12kemaw@gmail.com</p>
            </div>
            <div className="flex items-center gap-4 font-ibm-plex">
              <FaPhone className="text-cyan-400 text-2xl" />
              <p>+251 900 000 000</p>
            </div>
            <div className="flex items-center gap-4 font-ibm-plex">
              <FaMapMarkerAlt className="text-cyan-400 text-2xl" />
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-card flex flex-col gap-4 glass p-6 rounded-2xl w-full"
          >
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-cyan-400" />
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                className="w-full py-3 pl-10 pr-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-fira"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-cyan-400" />
              <input
                type="email"
                name="from_email"
                placeholder="Your Email"
                required
                className="w-full py-3 pl-10 pr-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-fira"
              />
            </div>
            <div className="relative">
              <FaPaperPlane className="absolute top-3 left-3 text-cyan-400" />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="5"
                className="w-full py-3 pl-10 pr-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-fira"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-transform hover:scale-105 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;