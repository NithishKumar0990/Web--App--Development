import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.92, y: 25 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 65, damping: 18, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -20,
    transition: { duration: 0.45, ease: "easeIn" },
  },
};

const PageTransition = ({ children }) => {
  const location = useLocation(); // ✅ Proper way to track route changes

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname} // ✅ Reacts correctly to route changes
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
