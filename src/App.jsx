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



function App() {
  return (
    <div className="font-sans">
     <Navbar/>
     
      <HeroSection/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Testimonial/>
      <Contact/>
      <Footer/>
    
     

    </div>
  );
}

export default App;
