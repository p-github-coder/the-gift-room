
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X } from 'lucide-react';

function SecretLetter({ onClose, onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="gift-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className="letter-modal"
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close letter"
        >
          <X size={20} />
        </button>

        <p className="letter-eyebrow">
          A LETTER FOR YOU
        </p>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              className="envelope-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <motion.div
                className="envelope"
                whileHover={{ y: -8 }}
                onClick={() => setIsOpen(true)}
              >
                <div className="envelope-paper">
                  <Heart size={25} fill="currentColor" />
                  <p>For you</p>
                </div>

                <div className="envelope-flap"></div>

                <div className="envelope-front">
                  <Heart size={23} fill="currentColor" />
                </div>
              </motion.div>

              <p className="envelope-instruction">
                Tap the envelope to open your letter
              </p>

              <button
                className="note-next"
                onClick={() => setIsOpen(true)}
              >
                Open my letter <Mail size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              className="letter-content"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="letter-paper">
                <p className="letter-greeting">Hey handsome,</p>

                <p>
                  Happy one month to us. ❤️
                </p>

                <p>
                  It is funny how someone can gradually become
                  such a lovely part of your everyday life.
                  Getting to know you has been one of the
                  sweetest parts of these past weeks.
                </p>

                <p>
                  Even with the distance between us, I am
                  happy we get to share this little journey.
                  I appreciate the conversations, the laughs,
                  the learning and all the little moments
                  that make this feel special.
                </p>

                <p>
                  This is only our first month, and I am
                  looking forward to discovering more of
                  what makes you you.
                </p>

                <p className="letter-signoff">
                  With love,
                  <br />
                  Your girl ♡
                </p>
              </div>

              <button
                className="note-next letter-finish"
                onClick={onComplete}
              >
                I've read my letter <Heart size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.div>
  );
}

export default SecretLetter;
