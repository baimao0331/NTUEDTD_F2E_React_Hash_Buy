import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleX, CircleCheckBig } from "lucide-react";

export default function Toast({ message, type }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[9999]"
        >
          <div className={`bg-stone-700/50 text-white px-8 py-4 rounded-lg shadow-lg min-w-[200px] text-center flex gap-2 backdrop-blur-xl border-2 ${ type=='success'? ("border-success"):("border-error")}`}>
           {type=='success'? (<CircleCheckBig/>):(<MessageCircleX/>)} <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
