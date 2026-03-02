import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";

import Button from "./components/Button";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Testimonial from "./components/Testimonial";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certification from "./components/Certification";
import GithubStats from "./components/GithubStats";
import Modern3DBackground from "./components/Modern3DBackground";
import AnimatedDivider from "./components/AnimatedDivider";


import { Routes, Route } from 'react-router-dom';
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import AdminBlog from "./components/AdminBlog";
import ScrollToTop from "./components/ScrollToTop";
import FocusPhilosophy from "./components/FocusPhilosophy";

function App() {
  return (
    <div className="font-ibm-plex relative bg-[#030712] text-white">
      <ScrollToTop />
      <Modern3DBackground />
      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <AnimatedDivider />
            <About />
            <AnimatedDivider />
            <Skills />
            <AnimatedDivider />
            <GithubStats />
            <AnimatedDivider />
            <FocusPhilosophy />
            <AnimatedDivider />
            <Projects />
            <AnimatedDivider />
            <Experience />
            <AnimatedDivider />
            <Certification />
            <AnimatedDivider />
            <div id="blog">
              <Blog featuredOnly={true} />
            </div>
            <AnimatedDivider />
            <Testimonial />
            <AnimatedDivider />
            <Contact />
          </>
        } />
        <Route path="/blog" element={
          <div className="pt-24 min-h-screen bg-[#030712]">
            <Blog featuredOnly={false} />
          </div>
        } />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<AdminBlog />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
