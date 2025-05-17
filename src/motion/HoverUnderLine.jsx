import { motion } from 'framer-motion';
import { Link } from "react-router";

export default function HoverUnderLine({ to, children }) {
  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      initial="initial"
      whileHover="hover"
    >
      <Link to={to} className="relative z-10 inline-block px-1">
        {children}
      </Link>
      <motion.div
        className="absolute left-0 right-0 h-1 -bottom-1 bg-orange-300 origin-left z-0"
        variants={{
          initial: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
}