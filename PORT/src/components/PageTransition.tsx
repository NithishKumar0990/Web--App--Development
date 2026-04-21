import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: {
    opacity: 0,
    y: -45,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
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