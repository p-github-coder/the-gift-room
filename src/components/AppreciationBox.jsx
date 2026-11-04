
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';

const appreciationNotes = [
  {
    number: '01',
    title: 'Your patience',
    message: 'I appreciate the patience and understanding you show me.'
  },
  {
    number: '02',
    title: 'Your mind',
    message: 'I love that there is always something interesting to learn or talk about with you.'
  },
  {
    number: '03',
    title: 'The little things',
    message: 'Sometimes it is the smallest things you do that make me smile the most.'
  },
  {
    number: '04',
    title: 'Being you',
    message: 'I appreciate getting to know the person you are, little by little.'
  },
  {
    number: '05',
    title: 'Us',
    message: 'I am happy we gave this a chance. Here is to getting to know each other even more.'
  }
];

function AppreciationBox({ onClose, onComplete }) {
  const [current, setCurrent] = useState(0);
  const note = appreciationNotes[current];
  const isLast = current === appreciationNotes.length - 1;

  return (
    <motion.div
      className="gift-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className="appreciation-modal"
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.35 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="appreciation-heart">
          <Heart size={27} fill="currentColor" />
        </div>

        <p className="appreciation-eyebrow">
          A LITTLE APPRECIATION
        </p>

        <span className="note-number">
          {note.number} / 05
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="appreciation-message"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2>{note.title}</h2>
            <p>{note.message}</p>
          </motion.div>
        </AnimatePresence>

        <div className="note-progress">
          {appreciationNotes.map((item, index) => (
            <span
              key={item.number}
              className={index <= current ? 'active' : ''}
            />
          ))}
        </div>

        <div className="note-navigation">
          <button
            className="note-back"
            onClick={() => setCurrent((value) => value - 1)}
            disabled={current === 0}
          >
            <ChevronLeft size={17} />
            Back
          </button>

          {isLast ? (
            <button className="note-next" onClick={onComplete}>
              Finish gift <Heart size={15} />
            </button>
          ) : (
            <button
              className="note-next"
              onClick={() => setCurrent((value) => value + 1)}
            >
              Next <ChevronRight size={17} />
            </button>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AppreciationBox;
