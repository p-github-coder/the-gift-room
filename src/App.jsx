
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './pages/Welcome';
import GiftRoom from './pages/GiftRoom';

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {entered ? (
        <motion.div
          key="gift-room"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <GiftRoom />
        </motion.div>
      ) : (
        <motion.div
          key="welcome"
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6 }}
        >
          <Welcome onEnter={() => setEntered(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
