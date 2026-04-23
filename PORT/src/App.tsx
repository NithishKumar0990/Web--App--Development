import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogPost from "./pages/BlogPost";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import BlogList from "./pages/BlogList";

import { cn } from "./utils/cn";
import ContactForm from "./components/ContactForm";
import DotMatrixBackground from "./components/DotMatrixBackground";
import { dotMatrixConfig } from "./config/dotMatrixConfig";
import PageTransition from "./components/PageTransition";

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
} from "lucide-react";
import PageTransition1 from "./components/PageTransition1";
import { div } from "framer-motion/m";

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
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "border-b border-slate-100 bg-slate-500/50 shadow-sm backdrop-blur-md" : "bg-glass"} `}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          {/* Logo/Name - Always visible */}
          <motion.span
            className="cursor-pointer text-sm font-semibold tracking-tight text-slate-900 transition-transform hover:scale-105 sm:text-base"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nithish Kumar L
          </motion.span>

          {/* Desktop Nav Links - Hidden on mobile */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <div className="flex gap-6 text-[15px] font-medium text-slate-500 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item) => {
                  const href =
                    item === "Blog"
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
                      className="group relative transform opacity-70 transition-all duration-300 hover:scale-110 hover:text-slate-900 hover:opacity-100"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Desktop Profile Image */}
            <motion.img
              src="/images/image 1.png"
              alt="Profile illustration"
              className="h-10 w-10 cursor-pointer rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl lg:h-12 lg:w-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-slate-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>

            {/* Mobile Profile Image */}
            <motion.img
              src="/images/image 1.png"
              alt="Profile"
              className="ml-3 h-8 w-8 cursor-pointer rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
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
            className="fixed left-0 top-14 z-50 w-full border-b border-slate-100 bg-white/95 shadow-xl backdrop-blur-md sm:top-16 md:hidden"
          >
            <div className="mx-auto max-w-5xl px-6 py-6">
              <div className="flex flex-col gap-4 text-lg font-medium text-slate-700">
                {visibleItems.map((item, index) => {
                  const href =
                    item === "Blog"
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
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="rounded-xl border-r-4 border-transparent px-4 py-3 transition-all duration-300 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
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
  <section className="flex min-h-[80vh] items-center px-6 pb-20 pt-28">
    <div className="max-w-10xl mx-auto grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
      {/* --- LEFT SIDE: Refined Dual Identity --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="order-2 max-w-2xl lg:order-1"
      >
        {/* Identity Label */}
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
          Artificial Intelligence & Software Engineering
        </h2>

        {/* Main Heading */}
        <h1 className="mb-6 flex flex-col text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-7xl">
          {/* LINE 1: Fades in smoothly */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }} // Premium cubic-bezier ease
            className="relative z-10"
          >
            Engineering Intelligence
          </motion.span>

          {/* LINE 2: The Mask Wrapper */}
          <span className="relative block overflow-hidden">
            {/* The Text that slides out from the mask */}
            <motion.span
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="block font-medium text-slate-400"
            >
              Architecting Systems...
            </motion.span>
          </span>
        </h1>

        {/* Core Statement */}
        <p className="mb-8 text-lg leading-relaxed text-slate-600">
          I hold a B.Tech in Artificial Intelligence & Data Science, but my professional identity is
          defined by a deliberate duality.
        </p>

        {/* Dual Expertise Split */}
        <div className="mb-10 space-y-6">
          {/* AI Domain */}
          <div className="border-l-2 border-blue-500 pl-4">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Data Science Engineering
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Architecting scalable ETL pipelines in Python, modeling complex relationships in SQL,
              and deploying machine learning systems that automate decision-making at scale. My
              discipline lives in statistical modeling, feature engineering, and cloud-native
              compute environments.
            </p>
          </div>

          {/* Software Domain */}
          <div className="border-l-2 border-slate-900 pl-4">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Software Architecture
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Engineering Laravel backends with robust API gateways, building React-driven
              interfaces, and maintaining production systems with enterprise-grade discipline. My
              craft lives in service containers, queue workers, Eloquent ORM, and CI/CD pipelines.
            </p>
          </div>
        </div>

        {/* Action + Social */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800"
          >
            <Mail size={16} />
            Contact Me
          </a>

          <div className="flex items-center gap-4 px-2">
            <a
              href="https://github.com/Nithishkumar0990"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-500 transition-colors hover:text-slate-900"
            >
              <GitHubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/nithish-kumar-l-04a998372/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-500 transition-colors hover:text-slate-900"
            >
              <LinkedInIcon size={20} />
            </a>
          </div>

          <div className="ml-4 hidden items-center gap-1.5 text-xs font-medium text-slate-500 sm:flex">
            <MapPin size={14} />
            Madurai, Tamil Nadu, India
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative order-1 flex items-start justify-center lg:order-2 lg:justify-end"
      >
        {/* Soft subtle glow behind image */}
        <div className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 opacity-60 blur-3xl" />

        <img
          src="/images/image 1.png"
          alt="Nithish Kumar L"
          className={`/* ✅ Lift image slightly up */ /* Offset only on desktop */ /* Rotation ONLY on desktop, not mobile */ relative z-10 aspect-square w-full max-w-[280px] -translate-y-4 rounded-2xl object-cover shadow-lg shadow-slate-200/80 transition-all duration-500 ease-out hover:scale-[0.97] sm:max-w-[340px] lg:max-w-md lg:-translate-x-[70px] lg:-translate-y-12 lg:rotate-[-3deg] hover:lg:rotate-0`}
        />
      </motion.div>
    </div>
  </section>
);

// Section Wrapper
const Section = ({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={cn("px-6 py-20", className)}>
    <div className="max-w-10xl mx-auto px-4">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        <div className="h-px flex-grow bg-slate-100"></div>
      </div>
      {children}
    </div>
  </section>
);

// Skills Component
const Skills = () => {
  const [hoveredId, setHoveredId] = React.useState<null | number>(null);

  const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
  const skills = [
    {
      id: 1,
      title: "Core",
      icon: <Code2 size={20} />,
      list: "Python (Pandas, NumPy, scikit-learn), SQL (MySQL)",
      // 👇 Change the string to this JSX block
      description: (
        <div className="space-y-5 text-left">
          <p>
            <motion.div variants={itemVariants}></motion.div>
            <strong className="block text-slate-900">Pandas & NumPy</strong>
            Data manipulation, numerical computing, and efficient handling of large datasets.
          </p>
          <p>
            <strong className="block text-slate-900">Scikit-learn</strong>
            Building, training, and evaluating machine learning models for real-world tasks.
            <motion.div variants={itemVariants}></motion.div>
          </p>
          <p>
            <strong className="block text-slate-900">SQL (MySQL)</strong>
            Database Design & Queries – Creating schemas and writing optimized SQL.
          </p>
          <p>
            <strong className="block text-slate-900">Integration</strong>
            Connecting MySQL with applications for seamless data storage and retrieval.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Data/DE",
      icon: <Database size={20} />,
      list: "Airflow, dbt, Snowflake, Spark/PySpark",
      description: (
        <div className="space-y-3 text-left">
          <p>
            <strong className="block text-slate-900">Airflow</strong>
            Workflow orchestration; scheduling and automating complex data pipelines.
          </p>
          <p>
            <strong className="block text-slate-900">dbt</strong>
            SQL‑based data transformation; building modular, version‑controlled analytics workflows.
          </p>
          <p>
            <strong className="block text-slate-900">Snowflake</strong>
            Cloud data warehouse; scalable storage, fast querying, and secure data sharing.
          </p>
          <p>
            <strong className="block text-slate-900">Spark/PySpark</strong>
            Distributed big‑data processing; handling large datasets with parallel computation.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "BI/Apps, GIS",
      icon: <LineChart size={20} />,
      list: "Power BI, Streamlit, GIS & Spatial Analytics",
      description: (
        <div className="space-y-3 text-left">
          <p>
            <strong className="block text-slate-900">Power BI</strong>
            Designing enterprise-grade interactive dashboards and automated visual reporting.
          </p>
          <p>
            <strong className="block text-slate-900">Streamlit</strong>
            Rapidly prototyping data applications and web interfaces directly from Python scripts.
          </p>
          <p>
            <strong className="block text-slate-900">GIS & Spatial Analytics</strong>
            Processing coordinate-based data and generating QGIS mapping solutions.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "ML/CV",
      icon: <Layers size={20} />,
      list: "CNN, YOLO, OpenCV, NLP basics",
      description: (
        <div className="space-y-3 text-left">
          <p>
            <strong className="block text-slate-900">Computer Vision (CNN / YOLO)</strong>
            Implementing deep learning models for real-time object detection and classification.
          </p>
          <p>
            <strong className="block text-slate-900">Image Processing (OpenCV)</strong>
            Feature extraction, image manipulation, and visual data filtering.
          </p>
          <p>
            <strong className="block text-slate-900">NLP Basics</strong>
            Text preprocessing, sentiment scoring, and tokenization techniques.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "Domain",
      icon: <Cpu size={20} className="relative -top-1" />,
      list: "AI & DS, Machine Learning, IoT/Robotics",
      description: (
        <div className="relative -top-1 grid grid-cols-1 gap-x-10 gap-y-8 text-left lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <strong className="mb-2 block text-base text-slate-900">
                Artificial Intelligence & Data Science
              </strong>
              <p className="text-sm leading-relaxed text-slate-600">
                Skilled in data preprocessing, feature engineering, and exploratory data analysis.
                Experienced with Python libraries (Pandas, NumPy, scikit-learn) for structured data,
                numerical computations, and building ML workflows.
              </p>
            </div>

            <div>
              <strong className="mb-2 block text-base text-slate-900">Machine Learning</strong>
              <p className="text-sm leading-relaxed text-slate-600">
                Understanding of supervised and unsupervised learning. Ability to train, evaluate,
                and fine-tune models using scikit-learn with focus on accuracy, precision, recall,
                and F1-score.
              </p>
            </div>
          </div>

          {/* Right Column - Deep Learning moved here */}
          <div className="space-y-6">
            <div>
              <strong className="mb-2 block text-base text-slate-900">IoT & Automation</strong>
              <p className="text-sm leading-relaxed text-slate-600">
                Connecting microcontrollers (ESP32, Arduino) to edge computing hubs (Raspberry Pi).
              </p>
            </div>

            <div>
              <strong className="mb-2 block text-base text-slate-900">Deep Learning</strong>
              <p className="text-sm leading-relaxed text-slate-600">
                Exposure to deep learning basics (ANN, CNN, RNN) and their applications in computer
                vision and natural language processing.
              </p>
            </div>
          </div>
        </div>
      ),
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
    <Section id="skills" title="Technical Skills" className="mb-0 mt-0 text-center">
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.id}>{/* render skill */}</div>
        ))}
      </div>
      <motion.div
        className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                damping: 50,
              },
            }}
            className={cn(
              "relative flex flex-col rounded-xl border bg-white p-6",
              "relative rounded-xl border bg-white/70 p-6 backdrop-blur-md transition-all duration-300",
              hoveredId === skill.id
                ? "border-blue-400 shadow-2xl ring-1 ring-blue-100"
                : "border-slate-100 shadow-sm",
              skill.id === 5 && "md:col-span-2"
            )}
          >
            {/* Icon & Category */}
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{skill.icon}</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {skill.title}
              </h3>
            </div>

            {/* Main Skill List */}
            <p className="text-sm font-medium leading-relaxed text-slate-800">{skill.list}</p>

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
                        delayChildren: 0.15, // ⏱️ Wait for card to expand first
                      },
                    },
                  }}
                  className="overflow-hidden border-t border-slate-100 pt-4"
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
      title: "Geospatial Analytics Platform",
      subtitle: "Water Resource Management",
      date: "Dec 2025",
      tech: "Python, Streamlit, Plotly, SQL",
      description: [
        "Processed 1.2M+ satellite data points across 108 water bodies to generate seasonal trend insights.",
        "Reduced manual reporting time by 85% (40 hrs/week → 6 hrs/week) using automation and dashboards.",
        "Built an ETL workflow integrating NDVI/SAR indices with temporal analysis.",
      ],
      video: "/images/78198-565144809_medium.mp4", // 👈 FIXED: Use /path (public folder)
    },
    {
      title: "Object Detection Platform",
      subtitle: "YOLOv8 & Computer Vision",
      date: "Oct 2025",
      tech: "PyTorch, MLOps, CV",
      description: [
        "Built a pipeline over 5,000+ high-resolution images for multi-class detection; achieved 91% mAP.",
        "Designed as a reusable framework for QC automation, inventory monitoring, and visual search.",
        "Implemented real-time object tracking with OpenCV’s DNN module, achieving stable detection across varied lighting and motion conditions.",
      ],
      video: "/images/objectdet.mp4", // 👈 FIXED: Forward slashes, /path from public/
    },
    {
      title: "Autonomous 4WD Robot", // 👈 FIXED: Merged duplicates (AWD/4WD), removed syntax error
      subtitle: "Sensor Fusion & Hardware",
      date: "2024",
      tech: "Arduino, C++, Python",
      description: [
        "Integrated 5 sensor types (ultrasonic, IR, gyro, accelerometer, camera) for obstacle avoidance.",
        "Built modular code for fast feature additions and hardware scalability.",
        "Designed a scalable communication bus (I²C/SPI/UART) to support additional sensors and actuators without major code refactoring.",
      ],
      video: "/images/Robot.mp4", // 👈 FIXED: Forward slashes, /path from public/
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
              x: index % 2 === 0 ? -100 : 100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.65,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              opacity: { duration: 0.6 },
            }}
            className="group grid grid-cols-1 gap-8 bg-white md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-blue-600">
                {project.date}
              </span>
              <h3 className="mb-2 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                {project.title}
              </h3>
              <p className="mb-6 text-lg font-medium text-slate-500">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.split(",").map((t) => (
                  <span
                    key={t}
                    className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-slate-600"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 md:col-span-8 md:gap-8 lg:flex-row">
              {/* DESCRIPTION: Existing UL - Now flex-1 (takes remaining space) */}
              <div className="flex-1">
                <ul className="space-y-4">
                  {project.description.map((point, i) => (
                    <li key={i} className="flex gap-4 text-sm leading-relaxed text-slate-600">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full border border-blue-400 bg-blue-100"></div>
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
                    className="h-[200px] w-[280px] rounded-xl border-2 border-slate-200 object-cover shadow-lg transition-all hover:shadow-xl md:h-[220px] md:w-[320px] lg:h-[200px] lg:w-[280px] xl:h-[240px] xl:w-[340px]" /* 👈 CHANGE w-/h- for size */
                    style={{
                      /* 👈 FINE-TUNE POSITION (px values) */ minWidth: "280px" /* 👈 Min width */,
                      maxWidth: "340px" /* 👈 Max width */,
                      aspectRatio: "16/9" /* 👈 Keep 16:9 ratio */,
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
  <Section
    id="experience"
    title="Internships & Training"
    className="relative bg-transparent px-10 py-20"
  >
    <div className="space-y-8">
      {/* ================= CARD 1 ================= */}
      <motion.div
        className="group relative"
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {/* ========== CARD ========== */}
        <div className="duration-800 relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all group-hover:shadow-lg">
          {/* ========== RIGHT INSIDE GRADIENT ENTRY ========== */}
          <div className="duration-900 pointer-events-none absolute inset-y-0 left-0 z-0 w-[85%] -translate-x-10 opacity-0 transition-all ease-out group-hover:translate-x-0 group-hover:opacity-100">
            {/* main gradient wash from right */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/80 via-cyan-100/80 to-transparent" />

            {/* soft blue blob */}
            <div className="absolute left-0 top-0 h-72 w-80 rounded-full bg-blue-300/45 blur-3xl" />

            {/* soft cyan blob */}
            <div className="w-70 absolute bottom-0 left-20 h-56 rounded-full bg-cyan-200/35 blur-3xl" />
          </div>

          {/* 
  ========== OPTIONAL FULL-CARD LIGHT WASH ==========
  <div
    className="
      pointer-events-none absolute inset-0 z-0
      opacity-0 group-hover:opacity-100
      transition-opacity duration-700
      bg-gradient-to-r from-blue-200/60 via-cyan-50/30 to-transparent
    "
  />
*/}

          {/* ========== GIF LAYER ========== */}
          <img
            src="/images/Video.gif"
            alt=""
            className="pointer-events-none absolute bottom-4 right-4 z-[1] h-[80%] w-auto max-w-[45%] translate-x-24 object-contain opacity-0 mix-blend-multiply transition-all duration-700 ease-out group-hover:translate-x-5 group-hover:opacity-100"
          />

          {/* ========== TEXT SAFETY FADE ========== */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-l from-white via-white/50 to-transparent" />

          {/* ========== CONTENT ========== */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Web-Developer Trainee</h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  ICEICO TECHNOLOGIES PVT LTD
                </p>
              </div>
              <span className="bg-white-50 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tighter text-slate-400">
                April 2026 - Till Date | Nagpur
              </span>
            </div>

            {/* SUMMARY */}
            <ul className="space-y-3">
              <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                Developed a decoupled full-stack application using Laravel and React.js, ensuring
                high performance and a modern user interface through RESTful API integration.
              </li>
            </ul>

            {/* DETAILED VIEW */}
            <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-96 group-hover:opacity-100">
              <ul className="mt-3 space-y-3">
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Architected relational database schemas using Laravel Migrations and Eloquent
                    ORM, maintaining data integrity and efficient query performance for complex data
                    sets.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Optimized local development workflows by migrating legacy XAMPP environments to
                    Laravel Herd, leveraging isolated PHP binaries to streamline environment
                    management and site speed.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Implemented secure backend logic including custom Request Validation and
                    Middleware, ensuring that all incoming data from the React frontend is sanitized
                    and secure.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Configured automated mail services and SMTP protocols to handle real-time user
                    communications, focusing on reliable delivery and backend troubleshooting.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Adopted clean-code principles within the MVC architecture, writing modular,
                    reusable code to ensure the long-term scalability of the application.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= CARD 2 ================= */}
      <motion.div
        className="group relative"
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* ========== CARD ========== */}
        <div className="duration-800 relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all group-hover:shadow-lg">
          {/* ========== RIGHT INSIDE GRADIENT ENTRY ========== */}
          <div className="duration-900 pointer-events-none absolute inset-y-0 left-0 z-0 w-[85%] -translate-x-10 opacity-0 transition-all ease-out group-hover:translate-x-0 group-hover:opacity-100">
            {/* main gradient wash from right */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/80 via-cyan-100/80 to-transparent" />

            {/* soft blue blob */}
            <div className="absolute left-0 top-0 h-72 w-80 rounded-full bg-blue-300/45 blur-3xl" />

            {/* soft cyan blob */}
            <div className="w-70 absolute bottom-0 left-20 h-56 rounded-full bg-cyan-200/35 blur-3xl" />
          </div>

          {/* 
  ========== OPTIONAL FULL-CARD LIGHT WASH ==========
  <div
    className="
      pointer-events-none absolute inset-0 z-0
      opacity-0 group-hover:opacity-100
      transition-opacity duration-700
      bg-gradient-to-r from-blue-200/60 via-cyan-50/30 to-transparent
    "
  />
*/}

          {/* ========== GIF LAYER ========== */}
          <img
            src="/images/Video Project 2.gif"
            alt=""
            className="opacity-1 pointer-events-none absolute bottom-4 right-4 z-[1] h-[80%] w-auto max-w-[45%] translate-x-24 border-0 object-contain outline-none ring-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-50"
          />

          {/* ========== CONTENT ========== */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Senior Technical Supervisor & Training Specialist
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Vellora Smart Kid (EduTech)
                </p>
              </div>
              <span className="bg-white-50 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tighter text-slate-400">
                Jul 2024 – May 2025 | Madurai
              </span>
            </div>

            {/* SUMMARY */}
            <ul className="space-y-3">
              <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                Trained 50+ students and educators in STEM and data-driven problem solving,
                enhancing technical literacy and confidence.
              </li>
            </ul>

            {/* DETAILED VIEW */}
            <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-96 group-hover:opacity-100">
              <ul className="mt-3 space-y-3">
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Executed 15+ IoT projects using Arduino and related hardware, showcasing
                    practical applications of automation, sensors, and robotics.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Conducted IoT/STEM workshops in 10+ schools, introducing students to future
                    innovations in education technology and hands-on problem solving.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Developed troubleshooting documentation and IoT learning modules, enabling
                    sustainable knowledge transfer and smoother adoption of new technologies.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Advocated for future-ready innovations in school education, bridging the gap
                    between classroom theory and real-world technology applications.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="group relative"
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* ========== CARD ========== */}
        <div className="duration-800 relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all group-hover:shadow-lg">
          {/* ========== RIGHT INSIDE GRADIENT ENTRY ========== */}
          <div className="duration-900 pointer-events-none absolute inset-y-0 left-0 z-0 w-[85%] -translate-x-10 opacity-0 transition-all ease-out group-hover:translate-x-0 group-hover:opacity-100">
            {/* main gradient wash from right */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/80 via-cyan-100/80 to-transparent" />

            {/* soft blue blob */}
            <div className="absolute left-0 top-0 h-72 w-80 rounded-full bg-blue-300/45 blur-3xl" />

            {/* soft cyan blob */}
            <div className="w-70 absolute bottom-0 left-20 h-56 rounded-full bg-cyan-200/35 blur-3xl" />
          </div>

          {/* ========== OPTIONAL FULL-CARD LIGHT WASH ========== */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-blue-200/60 via-cyan-50/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* ========== GIF LAYER ========== */}
          <img
            src="/images/Video Project 3.gif"
            alt=""
            className="pointer-events-none absolute bottom-4 right-4 z-[1] h-[80%] w-auto max-w-[45%] translate-x-24 object-contain opacity-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-50"
          />

          {/* ========== TEXT SAFETY FADE ========== */}
          {/* <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-l from-white via-white/70 to-transparent" /> */}

          {/* ========== CONTENT ========== */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Computer Vision & Image Processing Intern
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Zetspire Technologies
                </p>
              </div>
              <span className="bg-white-50 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-tighter text-slate-400">
                5-days Program - (2023) | Madurai
              </span>
            </div>

            {/* SUMMARY */}
            <ul className="space-y-3">
              <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                Implemented object detection pipelines using Python and OpenCV, applying Canny edge
                filtering and contour analysis to identify and classify visual features with
                precision.
              </li>
            </ul>

            {/* DETAILED VIEW */}
            <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-96 group-hover:opacity-100">
              <ul className="mt-3 space-y-3">
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Developed a real-time object tracking system using OpenCV’s DNN module,
                    achieving stable detection across varied lighting and motion conditions.
                  </p>
                </li>
                <li className="flex gap-4 text-sm leading-relaxed text-slate-600">
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  <p>
                    Executed 5+ IoT projects using Arduino and related hardware, showcasing
                    practical applications of automation, sensors, and robotics.
                  </p>
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
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      {/* --- LEFT COLUMN: B.Tech Card (Slides from LEFT) --- */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.75 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white"
      >
        <div className="absolute right-0 top-0 p-8 opacity-10 transition-transform duration-300 group-hover:scale-110">
          <Code2 size={120} />
        </div>
        <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-400">
          B.Tech - Artificial Intelligence & Data Science
        </h3>
        <p className="mb-1 text-xl font-bold">Sethu Institute of Technology</p>
        <p className="mb-6 text-sm opacity-60"> Tamil Nadu | 2021 – 2025</p>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/70 px-4 py-1.5 text-sm font-bold backdrop-blur-md">
            CGPA: 8.0/10
          </div>
        </div>
      </motion.div>

      {/* --- RIGHT COLUMN: School Info (Slides from RIGHT) --- */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.75 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col justify-center space-y-8 rounded-3xl border border-slate-200 bg-slate-100 p-3 shadow-sm backdrop-blur-md"
      >
        {/* HSC */}
        <div className="flex gap-4">
          <div className="h-auto w-1 rounded-full bg-slate-100"></div>
          <div>
            <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              HSC - 84%
            </h3>
            <p className="text-base font-bold text-slate-800">
              C.S. Ramachary Memorial Matriculation & hr.sec School
            </p>
            <p className="text-xs text-slate-500">Madurai | 2021</p>
          </div>
        </div>

        {/* SSLC */}
        <div className="flex gap-4">
          <div className="h-auto w-1 rounded-full bg-slate-200"></div>
          <div>
            <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              SSLC - 80.2%
            </h3>
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
  <section className="relative bg-transparent px-10 py-20">
    <div className="mx-auto max-w-[90%]">
      <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Publication */}
        <div>
          <div className="mb-8 flex items-center gap-3 text-slate-600">
            <BookOpen size={20} className="text-blue-600" />
            <h3 className="text-lg font-bold tracking-tight">Publication</h3>
          </div>
          <a
            href="https://matjournals.net/engineering/index.php/JoCNSDC/article/view/361"
            target="_blank"
            className="hover:animate-shake group block rounded-3xl border border-slate-200/60 bg-slate-100 p-8 backdrop-blur-md transition-all hover:bg-white/80"
          >
            <p className="mb-3 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              Journal of Cryptography and Network Security (2024)
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Globe size={14} />
              matjournals.net/engineering/JoCNSDC/361
              <ExternalLink
                size={14}
                className="ml-1 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
          </a>
        </div>

        {/* Languages */}
        <div>
          <div className="mb-8 flex items-center gap-3 text-slate-900">
            <Globe size={20} className="text-blue-600" />
            <h3 className="text-lg font-bold tracking-tight">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { lang: "English", level: "Fluent" },
              { lang: "Tamil", level: "Native" },
              { lang: "Kannada", level: "Conversational" },
            ].map((l, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/60 bg-slate-100 px-6 py-4 backdrop-blur-md"
              >
                <p className="mb-2 text-base font-bold leading-none text-slate-900">{l.lang}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {l.level}
                </p>
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
  <footer className="mt-auto border-t border-slate-100 bg-transparent px-6 pb-12 pt-12">
    <div className="mx-auto max-w-[90%]">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-900">Nithish Kumar L</span>
          <span className="text-xs text-slate-400">
            © {new Date().getFullYear()} AI & Data Science Specialist
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <a
            href="tel:+916382417367"
            className="flex items-center gap-2 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-900"
          >
            <Phone size={14} /> +91 6382417367
          </a>
          <a
            href="mailto:nithishkumarl168@gmail.com"
            className="flex items-center gap-2 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-900"
          >
            <Mail size={14} /> nithishkumarl168@gmail.com
          </a>
          <a
            href="https://github.com/Nithishkumar0990"
            className="flex items-center gap-2 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-900"
          >
            <GitHubIcon size={14} /> GitHub
          </a>
          <a
            href="/images/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-900"
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
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-transparent font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
            <DotMatrixBackground {...dotMatrixConfig} />
            <Navbar /> {/* 👈 YOUR ORIGINAL HEADER IS BACK */}
            <main className="mx-auto px-4 sm:px-6 lg:px-8">
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
        }
      />

      {/* ✅ NEW BLOG LIST PAGE */}
      <Route
        path="/blog"
        element={
          <div className="relative min-h-screen font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
            {/* Background sits behind everything */}
            <div className="fixed inset-0 -z-10">
              <DotMatrixBackground {...dotMatrixConfig} />
            </div>
            <Navbar /> {/* 👈 stays above background */}
            <PageTransition>
              <main className="relative z-10 mx-auto rounded-lg bg-white/80 px-4 pt-24 shadow-md sm:px-6 lg:px-8">
                <BlogList />
              </main>
            </PageTransition>
            <Footer />
          </div>
        }
      />

      {/* ✅ NEW SINGLE BLOG POST PAGE */}
      <Route
        path="/blog/:slug"
        element={
          <div className="min-h-screen bg-transparent font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
            <DotMatrixBackground {...dotMatrixConfig} />
            <Navbar /> {/* 👈 YOUR ORIGINAL HEADER */}
            <main className="mx-auto rounded-lg bg-transparent px-4 pt-24 shadow-md sm:px-6 lg:px-8">
              <BlogPost />
            </main>
            <Footer />
          </div>
        }
      />

      <Route
        path="/contact"
        element={
          <div className="relative flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased">
            {/* ✅ ADD THIS LINE below (shows dots on contact page too) */}

            <Navbar />
            <PageTransition1>
              <main className="relative z-10 mx-auto w-full flex-1 px-4 pt-24 sm:px-6 lg:px-8">
                <ContactForm />
              </main>
            </PageTransition1>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}
