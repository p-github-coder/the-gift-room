
import { motion } from 'framer-motion';

function ProgressBar({ progress }) {
  return (
    <div className="progress-track">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}

export default ProgressBar;
