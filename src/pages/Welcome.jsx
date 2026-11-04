
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import '../styles/welcome.css';

function Welcome({ onEnter }) {
  return (
    <main className="welcome-page">

      <div className="welcome-glow glow-one"></div>
      <div className="welcome-glow glow-two"></div>

      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="welcome-icon"
          animate={{ y: [0, -9, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Gift size={32} strokeWidth={1.3} />
          <Sparkles className="sparkle-icon" size={17} />
        </motion.div>

        <p className="welcome-eyebrow">
          A LITTLE SOMETHING FOR YOU
        </p>

        <h1>
          Hey <span>handsome.</span>
        </h1>

        <p className="welcome-description">
          One month of us, one little collection of surprises,
          and a whole lot of reasons to smile.
        </p>

        <div className="welcome-divider">
          <span></span>
          <Heart size={15} fill="currentColor" />
          <span></span>
        </div>

        <p className="welcome-date">
          OCTOBER 06 — NOVEMBER 06, 2026
        </p>

        <motion.button
          className="enter-button"
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Enter the Gift Room
          <span>→</span>
        </motion.button>

        <p className="welcome-footer">
          MADE WITH LOVE, JUST FOR YOU
        </p>
      </motion.div>

    </main>
  );
}

export default Welcome;
