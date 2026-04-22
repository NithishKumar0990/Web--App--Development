import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import BlogPost from "./pages/BlogPost";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import BlogList from './pages/BlogList'

import { cn } from './utils/cn';
import ContactForm from "./components/ContactForm";
import DotMatrixBackground from "./components/DotMatrixBackground";
import { dotMatrixConfig } from "./config/dotMatrixConfig";
import PageTransition from './components/PageTransition';






import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight,
  Database, 
  Code2, 
  LineChart, 
  Cpu, 
  Layers,
  BookOpen,
  Globe,
} from 'lucide-react';
import PageTransition1 from "./components/PageTransition1";






const GitHubIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#1f2937" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedInIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);



const Navbar = () => {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith("/blog");
  
  const allItems = ["Profile", "Skills", "Projects", "Experience", "Education", "Blog", "Contact"];
  const visibleItems = isBlogPage ? ["Profile", "Blog"] : allItems;

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav 
        className={`
          fixed top-0 w-full z-50 transition-all duration-300
          ${isScrolled ? 'bg-slate-500/50 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-glass'}
        `}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Logo/Name - Always visible */}
          <motion.span 
            className="text-sm sm:text-base font-semibold tracking-tight text-slate-900 cursor-pointer hover:scale-105 transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nithish Kumar L
          </motion.span>

          {/* Desktop Nav Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <div className="flex gap-6 lg:gap-8 text-[15px] font-medium text-slate-500">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item) => {
                  const href = item === "Blog"
                    ? "/blog"
                    : item === "Contact"
                      ? "/contact"
                      : `/#${item.toLowerCase()}`;
                  return (
                    <motion.a
                      key={item}
                      href={href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="opacity-70 hover:opacity-100 transform hover:scale-110 hover:text-slate-900 transition-all duration-300 relative group"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300"></span>
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Desktop Profile Image */}
            <motion.img
              src="/images/image 1.png"
              alt="Profile illustration"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-110"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>

            {/* Mobile Profile Image */}
            <motion.img
              src="/images/image 1.png"
              alt="Profile"
              className="w-8 h-8 ml-3 rounded-full shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-110"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-14 sm:top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-100 z-50"
          >
            <div className="max-w-5xl mx-auto px-6 py-6">
              <div className="flex flex-col gap-4 text-lg font-medium text-slate-700">
                {visibleItems.map((item, index) => {
                  const href = item === "Blog"
                    ? "/blog"
                    : item === "Contact"
                      ? "/contact"
                      : `/#${item.toLowerCase()}`;
                  return (
                    <motion.a
                      key={item}
                      href={href}
                      onClick={() => {
                        toggleMenu();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="py-3 px-4 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 border-r-4 border-transparent hover:border-slate-300"
                    >
                      {item}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


// Hero Component
const Hero = () => (
  <section className="pt-28 pb-20 px-6 min-h-[80vh] flex items-center">
   
    
    <div className="max-w-10xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      
      {/* --- LEFT SIDE: Refined Dual Identity --- */}
<motion.div 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="order-2 lg:order-1 max-w-2xl"
>

  {/* Identity Label */}
  <h2 className="text-blue-600 text-xs font-semibold mb-3 tracking-[0.2em] uppercase">
    Artificial Intelligence & Software Engineering
  </h2>

  {/* Main Heading */}
  <h1 className="text-xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-6">
    Engineering Intelligence.
    <br />
    <span className="text-slate-400 font-medium">
      Architecting Systems.
    </span>
  </h1>

  {/* Core Statement */}
  <p className="text-lg text-slate-600 leading-relaxed mb-8">
    I hold a B.Tech in Artificial Intelligence & Data Science, but my professional identity is defined by a deliberate duality.
  </p>

  {/* Dual Expertise Split */}
  <div className="space-y-6 mb-10">

    {/* AI Domain */}
    <div className="border-l-2 border-blue-500 pl-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-2 tracking-wide uppercase">
        Data Science Engineering
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">
        Architecting scalable ETL pipelines in Python, modeling complex relationships in SQL, and deploying machine learning systems that automate decision-making at scale. My discipline lives in statistical modeling, feature engineering, and cloud-native compute environments.
      </p>
    </div>

    {/* Software Domain */}
    <div className="border-l-2 border-slate-900 pl-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-2 tracking-wide uppercase">
        Software Architecture
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">
        Engineering Laravel backends with robust API gateways, building React-driven interfaces, and maintaining production systems with enterprise-grade discipline. My craft lives in service containers, queue workers, Eloquent ORM, and CI/CD pipelines.
      </p>
    </div>

  </div>

  {/* Action + Social */}
  <div className="flex flex-wrap items-center gap-4">
    
    <a
      href="/contact"
      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
    >
      <Mail size={16} />
      Contact Me
    </a>

    <div className="flex items-center gap-4 px-2">
      <a href="https://github.com/Nithishkumar0990" target="_blank" rel="noopener noreferrer" className="p-2.5 text-slate-500 hover:text-slate-900 transition-colors">
        <GitHubIcon size={20} />
      </a>
      <a
        href="https://www.linkedin.com/in/nithish-kumar-l-04a998372/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <LinkedInIcon size={20} />
      </a>
    </div>

    <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500 ml-4">
      <MapPin size={14} />
      Madurai, Tamil Nadu, India
    </div>

  </div>

</motion.div>

      <motion.div 
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.2 }}
  className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-start"
>

  {/* Soft subtle glow behind image */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/20 blur-3xl rounded-full opacity-60" />

  <img 
    src="/images/image 1.png"
    alt="Nithish Kumar L"
    className={`
      relative z-10 
      w-full 
      max-w-[280px] sm:max-w-[340px] lg:max-w-md 
      rounded-2xl 
      shadow-lg shadow-slate-200/80
      object-cover aspect-square 
      transition-all duration-500 ease-out

      /* ✅ Lift image slightly up */
      -translate-y-4 lg:-translate-y-12

      /* Offset only on desktop */
      lg:-translate-x-[70px]

      /* Rotation ONLY on desktop, not mobile */
      lg:rotate-[-3deg] 
      hover:lg:rotate-0 
      hover:scale-[0.97]
    `}
  />
</motion.div>

    </div>
</section>
);

// Section Wrapper
const Section = ({ id, title, children, className }: { id: string; title: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={cn("py-20 px-6", className)}>
        <div className="max-w-10xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <div className="h-px bg-slate-100 flex-grow"></div>
      </div>
      {children}
    </div>
  </section>
);

// Skills Component
const Skills = () => {
    const [hoveredId, 
    setHoveredId] = React.useState<null | number>(null); 
    
    const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const skills = [  
  { 
    id: 1,
    title: 'Core', 
    icon: <Code2 size={20} />, 
    list: 'Python (Pandas, NumPy, scikit-learn), SQL (MySQL)',
    // 👇 Change the string to this JSX block
    description: (
      <div className="space-y-5 text-left">
        <p>
          <motion.div variants={itemVariants}></motion.div>
          <strong className="text-slate-900 block">Pandas & NumPy</strong> 
          Data manipulation, numerical computing, and efficient handling of large datasets.
        </p>
        <p>
          <strong className="text-slate-900 block">Scikit-learn</strong> 
          Building, training, and evaluating machine learning models for real-world tasks.
          <motion.div variants={itemVariants}></motion.div>
        </p>
        <p>
          <strong className="text-slate-900 block">SQL (MySQL)</strong> 
          Database Design & Queries – Creating schemas and writing optimized SQL.
        </p>
        <p>
          <strong className="text-slate-900 block">Integration</strong> 
          Connecting MySQL with applications for seamless data storage and retrieval.
        </p>
      </div>
    )
  },
   { 
    id: 2,
    title: 'Data/DE', 
    icon: <Database size={20} />, 
    list: 'Airflow, dbt, Snowflake, Spark/PySpark',
    description: (
      <div className="space-y-3 text-left">
        <p>
          <strong className="text-slate-900 block">Airflow</strong> 
          Workflow orchestration; scheduling and automating complex data pipelines.
        </p>
        <p>
          <strong className="text-slate-900 block">dbt</strong> 
          SQL‑based data transformation; building modular, version‑controlled analytics workflows.
        </p>
        <p>
          <strong className="text-slate-900 block">Snowflake</strong> 
          Cloud data warehouse; scalable storage, fast querying, and secure data sharing.
        </p>
        <p>
          <strong className="text-slate-900 block">Spark/PySpark</strong> 
          Distributed big‑data processing; handling large datasets with parallel computation.
        </p>
      </div>
    )
  },
    { 
    id: 3,
    title: 'BI/Apps, GIS', 
    icon: <LineChart size={20} />, 
    list: 'Power BI, Streamlit, GIS & Spatial Analytics',
    description: (
      <div className="space-y-3 text-left">
        <p>
          <strong className="text-slate-900 block">Power BI</strong> 
          Designing enterprise-grade interactive dashboards and automated visual reporting.
        </p>
        <p>
          <strong className="text-slate-900 block">Streamlit</strong> 
          Rapidly prototyping data applications and web interfaces directly from Python scripts.
        </p>
        <p>
          <strong className="text-slate-900 block">GIS & Spatial Analytics</strong> 
          Processing coordinate-based data and generating QGIS mapping solutions.
        </p>
      </div>
    )
  },
    { 
    id: 4,
    title: 'ML/CV', 
    icon: <Layers size={20} />, 
    list: 'CNN, YOLO, OpenCV, NLP basics',
    description: (
      <div className="space-y-3 text-left">
        <p>
          <strong className="text-slate-900 block">Computer Vision (CNN / YOLO)</strong> 
          Implementing deep learning models for real-time object detection and classification.
        </p>
        <p>
          <strong className="text-slate-900 block">Image Processing (OpenCV)</strong> 
          Feature extraction, image manipulation, and visual data filtering.
        </p>
        <p>
          <strong className="text-slate-900 block">NLP Basics</strong> 
          Text preprocessing, sentiment scoring, and tokenization techniques.
        </p>
      </div>
    )
  },
    { 
    id: 5,
    title: 'Domain', 
    icon: <Cpu size={20} className="relative -top-1" />,
    list: 'AI & DS, Machine Learning, IoT/Robotics',
    description: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 text-left relative -top-1">
        
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <strong className="text-slate-900 block text-base mb-2">Artificial Intelligence & Data Science</strong>
            <p className="text-slate-600 text-sm leading-relaxed">
              Skilled in data preprocessing, feature engineering, and exploratory data analysis. 
              Experienced with Python libraries (Pandas, NumPy, scikit-learn) for structured data, 
              numerical computations, and building ML workflows.
            </p>
          </div>

          <div>
            <strong className="text-slate-900 block text-base mb-2">Machine Learning</strong>
            <p className="text-slate-600 text-sm leading-relaxed">
              Understanding of supervised and unsupervised learning. Ability to train, evaluate, 
              and fine-tune models using scikit-learn with focus on accuracy, precision, recall, and F1-score.
            </p>
          </div>
        </div>

        {/* Right Column - Deep Learning moved here */}
        <div className="space-y-6">
          <div>
            <strong className="text-slate-900 block text-base mb-2">IoT & Automation</strong>
            <p className="text-slate-600 text-sm leading-relaxed">
              Connecting microcontrollers (ESP32, Arduino) to edge computing hubs (Raspberry Pi).
            </p>
          </div>

          <div>
            <strong className="text-slate-900 block text-base mb-2">Deep Learning</strong>
            <p className="text-slate-600 text-sm leading-relaxed">
              Exposure to deep learning basics (ANN, CNN, RNN) and their applications in computer 
              vision and natural language processing.
            </p>
          </div>
        </div>

      </div>
    )
  },
  
];
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

  return (
    <Section id="skills"
  title="Technical Skills"
  className="text-center mt-0 mb-0 ">
    


        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {skills.map(skill => (
            <div key={skill.id}>
              {/* render skill */}
            </div>
          ))}
        </div>
        <motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
   viewport={{ once: false, amount: 0.2, margin: "0px 0px -200px 0px" }}
>
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
               variants={cardVariants}
              layout // 👈 Senior Tip: This makes the transition smooth for the whole grid
              onMouseEnter={() => setHoveredId(skill.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{
                // ✅ CONDITIONAL SCALE
                scale: skill.id === 5 ? 1.1 : 1.02, // Double size for Domain card (id=5), Normal for others
                zIndex: 50,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 50
                }
              }}
              className={cn(
                "relative bg-white p-6 rounded-xl border flex flex-col",
                "relative bg-white/70 backdrop-blur-md p-6 rounded-xl border transition-all duration-300",
                hoveredId === skill.id
                  ? "shadow-2xl border-blue-400 ring-1 ring-blue-100"
                  : "shadow-sm border-slate-100",
                skill.id === 5 && "md:col-span-2"
              )}
            >
              {/* Icon & Category */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  {skill.icon}
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {skill.title}
                </h3>
              </div>

              {/* Main Skill List */}
              <p className="text-slate-800 font-medium text-sm leading-relaxed">
                {skill.list}
              </p>

              {/* 🔥 Expandable Details */}
              <AnimatePresence>
                {hoveredId === skill.id && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, height: 0, marginTop: 0 },
                      visible: {
                        opacity: 1,
                        height: "auto",
                        marginTop: 16,
                        transition: {
                          height: { duration: 0.3 },
                          staggerChildren: 0.12, // ⏱️ Time between each line appearing (reading speed)
                          delayChildren: 0.15 // ⏱️ Wait for card to expand first
                        }
                      }
                    }}
                    className="pt-4 border-t border-slate-100 overflow-hidden"
                  >
                    {skill.description}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </Section>
  );
};

// Projects Component (FULL FIXED CODE - Syntax Cleaned + Video Added)
const Projects = () => {
  const projects = [
    {
      title: 'Geospatial Analytics Platform',
      subtitle: 'Water Resource Management',
      date: 'Dec 2025',
      tech: 'Python, Streamlit, Plotly, SQL',
      description: [
        'Processed 1.2M+ satellite data points across 108 water bodies to generate seasonal trend insights.',
        'Reduced manual reporting time by 85% (40 hrs/week → 6 hrs/week) using automation and dashboards.',
        'Built an ETL workflow integrating NDVI/SAR indices with temporal analysis.'
      ],
      video: '/images/78198-565144809_medium.mp4'  // 👈 FIXED: Use /path (public folder)
    },
    {
      title: 'Object Detection Platform',
      subtitle: 'YOLOv8 & Computer Vision',
      date: 'Oct 2025',
      tech: 'PyTorch, MLOps, CV',
      description: [
        'Built a pipeline over 5,000+ high-resolution images for multi-class detection; achieved 91% mAP.',
        'Designed as a reusable framework for QC automation, inventory monitoring, and visual search.',
        'Implemented real-time object tracking with OpenCV’s DNN module, achieving stable detection across varied lighting and motion conditions.'

      ],
      video:  '/images/objectdet.mp4' // 👈 FIXED: Forward slashes, /path from public/
    },
    {
      title: 'Autonomous 4WD Robot',  // 👈 FIXED: Merged duplicates (AWD/4WD), removed syntax error
      subtitle: 'Sensor Fusion & Hardware',
      date: '2024',
      tech: 'Arduino, C++, Python',
      description: [
        'Integrated 5 sensor types (ultrasonic, IR, gyro, accelerometer, camera) for obstacle avoidance.',
        'Built modular code for fast feature additions and hardware scalability.',
        'Designed a scalable communication bus (I²C/SPI/UART) to support additional sensors and actuators without major code refactoring.'
      ],
      video: '/images/Robot.mp4'  // 👈 FIXED: Forward slashes, /path from public/
    },
  ];

  return (
    <Section id="projects" title="Key Projects">
      <div className="space-y-16">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{ 
              once: false,
              amount: 0.65
            }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut",
              opacity: { duration: 0.6 }
            }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-8 bg-white"
          >
            
            <div className="md:col-span-4">
              <span className="text-xs font-semibold text-blue-600 mb-2 block uppercase tracking-widest">{project.date}</span>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{project.title}</h3>
              <p className="text-lg font-medium text-slate-500 mb-6">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.split(',').map(t => (
                  <span key={t} className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase tracking-tighter">{t.trim()}</span>
                ))}
              </div>
            </div>

            
            <div className="md:col-span-8 flex flex-col lg:flex-row gap-6 md:gap-8">
              
              {/* DESCRIPTION: Existing UL - Now flex-1 (takes remaining space) */}
              <div className="flex-1">
                <ul className="space-y-4">
                  {project.description.map((point, i) => (
                    <li key={i} className="flex gap-4 text-slate-600 text-sm leading-relaxed">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-100 border border-blue-400 flex-shrink-0"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

             
              {project.video && (
                <div className="video-section flex-shrink-0">
                  
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-[280px] h-[200px] md:w-[320px] md:h-[220px] lg:w-[280px] lg:h-[200px] xl:w-[340px] xl:h-[240px] object-cover rounded-xl shadow-lg border-2 border-slate-200 hover:shadow-xl transition-all"  /* 👈 CHANGE w-/h- for size */
                    style={{  /* 👈 FINE-TUNE POSITION (px values) */
                      minWidth: '280px',      /* 👈 Min width */
                      maxWidth: '340px',      /* 👈 Max width */
                      aspectRatio: '16/9'     /* 👈 Keep 16:9 ratio */
                    }}
                  >
                    <source src={project.video} type="video/mp4" />
                    {/* Fallback text hidden */}
                  </video>
                
                </div>
              )}

            </div>

          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// Experience Component
const Experience = () => (
  <Section id="experience" title="Internships & Training" className="relative bg-transparent py-20 px-10">
    <div className="space-y-8">
      {/* ================= CARD 1 ================= */}
      <motion.div
        className="group relative"
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* hover glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Senior Technical Supervisor & Training Specialist
              </h3>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                Vellora Smart Kid (EduTech)
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-full uppercase tracking-tighter">
              Jul 2024 – May 2025
            </span>
          </div>

          {/* SUMMARY (always visible) */}
          <ul className="space-y-3">
            <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
              Trained 50+ students and educators in STEM and data-driven problem solving, enhancing technical literacy and confidence.
            </li>
          </ul>

          {/* DETAILED VIEW (only on hover) */}
          <div
            className="
              overflow-hidden transition-all duration-300
              max-h-0 opacity-0
              group-hover:max-h-96 group-hover:opacity-100
            "
          >
          <ul className="space-y-3 mt-3">
  <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
    <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
    <p>
      Executed 10+ IoT projects using Arduino and related hardware, showcasing practical applications of automation, sensors, and robotics.
    </p>
  </li>

  <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
    <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
    <p>
      Conducted IoT/STEM workshops in 10+ schools, introducing students to future innovations in education technology and hands-on problem solving.
    </p>
  </li>

  <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
    <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
    <p>
      Developed troubleshooting documentation and IoT learning modules, enabling sustainable knowledge transfer and smoother adoption of new technologies.
    </p>
  </li>

  <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
    <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
    <p>
      Advocated for future-ready innovations in school education, bridging the gap between classroom theory and real-world technology applications.
    </p>
  </li>
</ul>

          </div>
        </div>
      </motion.div>

      {/* ================= CARD 2 ================= */}
      <motion.div
        className="group relative"
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* hover glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Computer Vision & Image Processing Intern
              </h3>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                Zetspire Technologies
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-full uppercase tracking-tighter">
              5-days Program
            </span>
          </div>

          {/* SUMMARY (always visible) */}
          <ul className="space-y-3">
            <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
              Implemented object detection pipelines using Python and OpenCV, applying Canny edge filtering and contour analysis to identify and classify visual features with precision.
            </li>
          </ul>

          {/* DETAILED VIEW (only on hover) */}
          <div
            className="
              overflow-hidden transition-all duration-300
              max-h-0 opacity-0
              group-hover:max-h-96 group-hover:opacity-100
            "
          >
            <div className="mt-3 border-t border-slate-100 pt-3">
              <ul className="space-y-3">
                <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
                  <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  Developed a real-time object tracking system using OpenCV’s DNN module, achieving stable detection across varied lighting and motion conditions.
                </li>
                <li className="flex gap-4 text-sm text-slate-600 leading-relaxed">
                  <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                 Executed 10+ IoT projects using Arduino and related hardware, showcasing practical applications of automation, sensors, and robotics.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

// Education Component


const Education = () => (
  <Section id="education" title="Education">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* --- LEFT COLUMN: B.Tech Card (Slides from LEFT) --- */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.75 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative p-8 bg-slate-900 rounded-3xl text-white overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-300">
          <Code2 size={120} />
        </div>
        <h3 className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-widest">B.Tech - Artificial Intelligence & Data Science</h3>
        <p className="text-xl font-bold mb-1">Sethu Institute of Technology</p>
        <p className="text-sm opacity-60 mb-6"> Tamil Nadu | 2021 – 2025</p>
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 bg-white/70 backdrop-blur-md rounded-full text-sm font-bold">CGPA: 8.0/10</div>
        </div>
      </motion.div>

      {/* --- RIGHT COLUMN: School Info (Slides from RIGHT) --- */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.75 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="space-y-8 flex flex-col justify-center bg-slate-100 backdrop-blur-md p-3 rounded-3xl border border-slate-200 shadow-sm"
      >
        {/* HSC */}
        <div className="flex gap-4">
          <div className="w-1 h-auto bg-slate-100 rounded-full"></div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">HSC - 84%</h3>
            <p className="text-base font-bold text-slate-800">C.S. Ramachary Memorial Matriculation & hr.sec School</p>
            <p className="text-xs text-slate-500">Madurai | 2021</p>
          </div>
        </div>

        {/* SSLC */}
        <div className="flex gap-4">
          <div className="w-1 h-auto bg-slate-200 rounded-full"></div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">SSLC - 80.2%</h3>
            <p className="text-base font-bold text-slate-800">Linga Matriculation School</p>
            <p className="text-xs text-slate-500"> Madurai | 2019</p>
          </div>
        </div>
      </motion.div>

    </div>
  </Section>
);

// Publication & Languages Component
const Publication = () => (
  <section className="relative bg-transparent py-20 px-10">
    <div className="max-w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        
       {/* Publication */}
<div>
  <div className="flex items-center gap-3 text-slate-600 mb-8">
    <BookOpen size={20} className="text-blue-600" />
    <h3 className="font-bold tracking-tight text-lg">Publication</h3>
  </div>
  <a 
    href="https://matjournals.net/engineering/index.php/JoCNSDC/article/view/361" 
    target="_blank" 
    className="group block p-8 bg-slate-100 backdrop-blur-md rounded-3xl hover:bg-white/80 transition-all border border-slate-200/60 hover:animate-shake"
  >
    <p className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
      Journal of Cryptography and Network Security (2024)
    </p>
    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
      <Globe size={14} />
      matjournals.net/engineering/JoCNSDC/361
      <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </a>
</div>


        {/* Languages */}
        <div>
          <div className="flex items-center gap-3 text-slate-900 mb-8">
            <Globe size={20} className="text-blue-600" />
            <h3 className="font-bold tracking-tight text-lg">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { lang: 'English', level: 'Fluent' },
              { lang: 'Tamil', level: 'Native' },
              { lang: 'Kannada', level: 'Conversational' }
            ].map((l, i) => (
              <div key={i} className="px-6 py-4 bg-slate-100 backdrop-blur-md rounded-2xl border border-slate-200/60">
                <p className="text-base font-bold text-slate-900 leading-none mb-2">{l.lang}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">{l.level}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

//footer
const Footer = () => (
  <footer className="border-t border-slate-100 bg-transparent pt-12 pb-12 px-6 mt-auto">
    <div className="max-w-[90%] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-900">Nithish Kumar L</span>
          <span className="text-xs text-slate-400">© {new Date().getFullYear()} AI & Data Science Specialist</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <a href="tel:+916382417367" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium">
            <Phone size={14} /> +91 6382417367
          </a>
          <a href="mailto:nithishkumarl168@gmail.com" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium">
            <Mail size={14} /> nithishkumarl168@gmail.com
          </a>
          <a href="https://github.com/Nithishkumar0990" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium">
            <GitHubIcon size={14} /> GitHub
          </a>
          <a 
            href="/images/resume.pdf"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[13px] font-medium"
          >
            <ExternalLink size={14} /> View Resume
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Routes>
      {/* ✅ YOUR ORIGINAL HOME PAGE */}
      <Route path="/" element={
      <div className="min-h-screen bg-transparent font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased">
           <DotMatrixBackground {...dotMatrixConfig} />
          <Navbar /> {/* 👈 YOUR ORIGINAL HEADER IS BACK */}

          <main className="px-4 sm:px-6 lg:px-8 mx-auto">
            <Hero />
            {/* ... Your Profile Section ... */}
            
            <Skills />
            <Projects />
            <Experience />
            
            <Education />
          </main>
          <Publication />
          <ContactForm />
          <Footer />
          
        </div>
      } />

      {/* ✅ NEW BLOG LIST PAGE */}
      <Route
  path="/blog"
  element={
    <div className="min-h-screen font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased relative">
      
      {/* Background sits behind everything */}
      <div className="fixed inset-0 -z-10">
        <DotMatrixBackground {...dotMatrixConfig} />
      </div>

      <Navbar /> {/* 👈 stays above background */}
       <PageTransition>

      <main className="px-4 sm:px-6 lg:px-8 mx-auto pt-24 bg-white/80 rounded-lg shadow-md relative z-10">
        <BlogList />
      </main>
      </PageTransition>  
      <Footer />
    </div>
  }
/>


      {/* ✅ NEW SINGLE BLOG POST PAGE */}
      <Route path="/blog/:slug" element={
       <div className="min-h-screen bg-transparent font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased">
          <DotMatrixBackground {...dotMatrixConfig} />
          <Navbar /> {/* 👈 YOUR ORIGINAL HEADER */}
          <main className="px-4 sm:px-6 lg:px-8 mx-auto pt-24 bg-transparent rounded-lg shadow-md">
            <BlogPost />
          </main>
          <Footer />
        </div>
      } />

    <Route path="/contact" element={
  <div className="min-h-screen flex flex-col font-sans text-slate-900 antialiased relative bg-white">
    {/* ✅ ADD THIS LINE below (shows dots on contact page too) */}
    
    <Navbar />
     <PageTransition1>
    <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 mx-auto w-full relative z-10">
      <ContactForm />
    </main>
    </PageTransition1>
  <Footer />
</div>

} />
    </Routes>

  );
}