import Navbar from "./components/NavBar";
import HeroSection from "./components/Hero";
import About from "./components/About";

import Button from "./components/Button";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Testimonial from "./components/Testimonial";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import BackgroundBubbles from "./components/BackgroundBubbles";
import AnimatedDivider from "./components/AnimatedDivider";



function App() {
  return (
    <div className="font-sans relative">
      <BackgroundBubbles />
      <Navbar />

      <HeroSection />
      <AnimatedDivider />
      <About />
      <AnimatedDivider />
      <Skills />
      <AnimatedDivider />
      <Projects />
      <AnimatedDivider />
      <Experience />
      <AnimatedDivider />
      <Testimonial />
      <AnimatedDivider />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
