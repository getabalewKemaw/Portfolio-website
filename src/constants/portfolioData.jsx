// src/portfolioData.js
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaReact, FaNodeJs, FaDatabase, FaCloud , FaJava} from "react-icons/fa";
//import { SiTailwindcss, SiThreedotjs, SiGreensock, SiJavascript, SiTypescript, SiDocker, SiAwsamplify  } from "react-icons/si";
import { 
  SiTailwindcss, 
  SiThreedotjs, 
  SiGreensock, 
  SiJavascript, 
  SiTypescript, 
  SiDocker, 
  SiAwsamplify, 
  SiPython, 
  SiCplusplus, 

  SiHtml5, 
  SiCss3, 
  SiNextdotjs, 
  SiOracle, 
  SiPostgresql 
} from "react-icons/si";

//import { FaReact, FaNodeJs, FaDatabase, FaCloud } from "react-icons/fa";


const portfolioData = {
  // ---------------- NAVBAR ----------------
  navLinks: [
    { id: "home", title: "Home" },
    { id: "about", title: "About" },
    { id: "projects", title: "Projects" },
    { id: "skills", title: "Skills" },
    { id: "experience", title: "Experience" }, // Added for professionalism: Include work history
    { id: "contact", title: "Contact" },
  ],

  // ---------------- HERO SECTION ----------------
  hero: {
    name: "Getabalew Kemaw",
    tagline: "Software Engineer specializing in immersive web applications.  and mobile appilications I craft high-performance, interactive  experiences using Javascript , Three.js, GSAP, and Tailwind CSS to deliver scalable, user-centric solutions.",
    cta: "Explore My Portfolio",
    socialLinks: [
      { icon: <FaGithub />, url: "https://github.com/getabalewKemaw" }, 
      { icon: <FaLinkedin />, url: "https://linkedin.com/in/getabalewKemaw" }, 
      { icon: <FaTwitter />, url: "https://twitter.com/getabalewKemaw" }, 
      { icon: <FaEnvelope />, url: "mailto:getabalewkemaw@gmail.com" }, 
    ],
  },

  // ---------------- ABOUT SECTION ----------------
  about: {
    title: "About Me",
    description: `
I am a Full-Stack and Mobile App Software Engineer with 2 years of professional experience, specializing in building responsive, interactive web applications using React, Tailwind CSS, Next.js, Node.js, Express, MongoDB, Python, and PostgreSQL. I have hands-on expertise in full-stack development, applying best practices including state management, code optimization, and seamless API integration.

With a collaborative mindset and a passion for innovation, I actively contribute to open-source projects and engage with tech communities. Based in Debre Berhan, Ethiopia, I stay up-to-date with the latest technologies, continuously enhancing my skills to deliver high-quality, scalable, and user-centric solutions.    `,
    resumeLink: "https://drive.google.com/file/d/1CUybI8k8qmM3iOSqoeSX5Q6VixoykJr8/view?usp=drive_link", // Place your professional resume PDF in /public; ensure it highlights education, certifications, and achievements
  },

  // ---------------- PROJECTS SECTION ----------------
// ---------------- PROJECTS SECTION ----------------
projects: [
  {
    title: "Megezez Food Delivery Website",
    description: `
      A professional front-end food delivery website built with HTML, CSS, and JavaScript. 
      This project highlights my ability to design visually appealing and user-friendly web interfaces, 
      with a strong focus on responsive layouts, interactive elements, and smooth animations. 
      It demonstrates my skills in front-end development and creating seamless user experiences.
    `,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80", 
    github: "https://github.com/getabalewKemaw/Megezez-Resturant-Food-Delivery-System",
    live: "#",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "University Complaint Tracker Desktop App",
    description: `
      A desktop application for managing university complaints. Students can submit complaints, 
      admins resolve them, and students receive notifications on resolution status. 
      Built with Python and SQL, the project emphasizes backend logic, database integration, 
      and a clean workflow for communication between students and administrators.
    `,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80", 
    github: "https://github.com/getabalewKemaw/Universty-Complint-tracker-Desktop-App",
    live: "#",
    technologies: ["Python", "SQL"],
  },
  {
    title: "JobConnect Ethiopia",
    description: `
      A C++ project connected to a PostgreSQL database that facilitates job postings and matches 
      job seekers with employers. This system implements core data structures and algorithms while 
      also handling efficient database operations. It demonstrates problem-solving, 
      database integration, and backend development skills.
    `,
    image: "https://media.istockphoto.com/id/2169789592/photo/digital-marketing-targeting-concept-businessman-with-marketing-icons-represent-targeting.jpg?s=612x612&w=is&k=20&c=9khmf-LXutefkrCTlmct7-TxgPS2zZxk9w2LsUTYRz4=",
    github: "https://github.com/getabalewKemaw/JobConnectEthiopia",
    live: "#",
    technologies: ["C++", "PostgreSQL"],
  },
  {
    title: "Internship Control Platform",
    description: `
      A web platform for managing internships between students, companies, and universities. 
      Built with HTML, CSS, and JavaScript, it allows companies to post internships, 
      students to apply, and administrators to track progress. 
      The project demonstrates full-stack thinking with a focus on clean UI, local storage handling, 
      and role-based access.
    `,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/getabalewKemaw/Intershipcontrolplatform",
    live: "#",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Movie App",
    description: `
      A full-stack movie application where users can browse, search, and save their favorite movies. 
      Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. 
      Features include authentication, responsive design, API integration for fetching movie data, 
      and a modern user interface. This project demonstrates both frontend and backend expertise 
      along with database management.
    `,
    image:"public/images/movie.png",
    github: "https://github.com/getabalewKemaw/movie-app",
    live: "https://cinisphere.vercel.app/",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Portfolio Website",
    description: `
      A modern personal portfolio website built with React, Tailwind CSS, Framer Motion, and GSAP. 
      Showcases personal projects, animations, and interactive UI elements. Highlights frontend skills, 
      responsive design, and user experience best practices.
    `,
    image: "public/images/portifolio.png",
    github: "https://github.com/getabalewKemaw/Portfolio-website",
    live: "https://getabalewkemaw.vercel.app",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    title: "SkillShare Hub",
    description: `
      A mini course-sharing platform built with Next.js, Prisma, and PostgreSQL. 
      Includes separate dashboards for students and instructors, course management, and enrollment features. 
      Demonstrates full-stack capabilities, database integration, and responsive design.
    `,
    image: "public/images/skillsharehub.png",
    github: "https://github.com/getabalewKemaw/SkillshareHub-",
    live: "https://skillshare-hub.vercel.app/",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "Customer AI Assistant",
    description: `
      An AI-powered customer assistant built with MERN Stack and Gemini API. 
      Provides instant intelligent answers to user queries, with authentication and responsive design. 
      Demonstrates integration of AI APIs with full-stack applications.
    `,
    image: "public/images/ai.png",
    github: "https://github.com/getabalewKemaw/Customer-Ai-Assistant",
    live: "https://supportlyai.vercel.app/",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Gemini API", "Tailwind CSS"],
  },
  {
    title: "ShopifyX",
    description: `
      A mini e-commerce platform built with Spring Boot, Next.js, PostgreSQL, and Tailwind CSS. 
      Includes admin and user dashboards, product listings, authentication, and order management. 
      Demonstrates backend logic, full-stack integration, and responsive frontend design.
    `,
    image: "public/images/sopifyx.png",
    github: "https://github.com/getabalewKemaw/shopifyFrontEnd",
    live: "#",
    technologies: ["Spring Boot", "Next.js", "PostgreSQL", "Tailwind CSS"],
  },
],


  // ---------------- SKILLS SECTION ----------------


  skills: [
  // Frontend
  { name: "React", icon: <FaReact className="text-blue-500" />, proficiency: "Expert" },
  { name: "Next.js", icon: <SiNextdotjs className="text-black" />, proficiency: "Advanced" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, proficiency: "Advanced" },
  { name: "GSAP", icon: <SiGreensock className="text-green-500" />, proficiency: "Expert" },
  { name: "Three.js", icon: <SiThreedotjs className="text-gray-800" />, proficiency: "Advanced" },
  { name: "HTML", icon: <SiHtml5 className="text-orange-600" />, proficiency: "Expert" },
  { name: "CSS", icon: <SiCss3 className="text-blue-500" />, proficiency: "Expert" },
  { name: "JavaScript/ES6+", icon: <SiJavascript className="text-yellow-500" />, proficiency: "Expert" },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, proficiency: "Advanced" },

  // Backend
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, proficiency: "Intermediate" },
  { name: "Java", icon: < FaJava className="text-red-600" />, proficiency: "Intermediate" },
  { name: "Python", icon: <SiPython className="text-yellow-600" />, proficiency: "Advanced" },
  { name: "C++", icon: <SiCplusplus className="text-blue-700" />, proficiency: "Advanced" },

  // Database
  { name: "Database Management (SQL/NoSQL)", icon: <FaDatabase className="text-red-500" />, proficiency: "Intermediate" },
  { name: "Oracle SQL", icon: <SiOracle className="text-red-700" />, proficiency: "Intermediate" },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-800" />, proficiency: "Intermediate" },

  // DevOps & Cloud
  { name: "Docker & Containerization", icon: <SiDocker className="text-blue-400" />, proficiency: "Intermediate" },
  { name: "AWS Cloud Services", icon: <SiAwsamplify className="text-orange-500" />, proficiency: "Beginner" },
  { name: "DevOps & CI/CD", icon: <FaCloud className="text-purple-500" />, proficiency: "Intermediate" },                 
  ],
  // ---------------- EXPERIENCE SECTION (Added for Professionalism) ----------------
 experience: [
  {
    year: "2023 - 2024",
    role: "Software Engineering Student",
    description: `
      Started my journey in software engineering, gaining a strong foundation
      in programming, algorithms, and system design. Built small academic projects
      that sharpened my problem-solving skills.
    `,
  },
    {
    year: "2024 - 2025",
    role: "Frontend Developer",
    description: `
      Specialized in building responsive and user-friendly interfaces using 
      React, Tailwind CSS, and modern frontend tools. Collaborated on team projects, 
      participated in hackathons, and contributed to open-source.
    `,
  },
  {
    year: "2025 - September 2025",
    role: "Full-Stack Developer",
    description: `
      Expanded into backend technologies like Node.js, Express, and databases 
      (MongoDB & PostgreSQL), delivering complete end-to-end solutions. 
      Worked on a Movie App project with React, Tailwind, Node, and MongoDB.
    `,
  },
  {
    year: "2025 - Present",
    role: "Mobile App Developer",
    description: `
      Currently exploring mobile application development with React Native. 
      Building cross-platform apps and integrating APIs for real-world use cases. 
      Active in tech communities and continuously learning emerging technologies.
    `,
  },
  {
    year: "Future Goals",
    role: "Tech Innovator & Open Source Contributor",
    description: `
      Aim to contribute to impactful open-source projects, mentor junior developers, 
      and build scalable applications that solve real-world problems.
    `,
  },
],


  
  
  //he development of client-facing web applications using React and Three.js, resulting in a 30% improvement in user engagement. Collaborated with cross-functional teams to integrate GSAP animations and optimize performance, reducing load times by 40%. Managed deployment pipelines on Vercel and AWS.
   // ---------------- CONTACT SECTION ----------------
  contact: {
    email: "getabalewkemaw@gmail.com", // Replace with your professional email
    phone: "+251 944 46 31 98", // Replace with your actual phone
    address: "Addis Ababa, Ethiopia",
    formFields: { // Added for enhanced contact form professionalism
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
    },
  },
};

export default portfolioData;