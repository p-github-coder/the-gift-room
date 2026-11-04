
import { motion } from 'framer-motion';
import { Heart, Sparkles, X, Infinity } from 'lucide-react';

function FinalGift({ onClose, onComplete }) {
  const thingsToLookForwardTo = [
    'The day distance is no longer part of our story.',
    'Our first proper hug and all the ones after it.',
    'Random dates, silly adventures and making memories.',
    'More conversations, more laughter and more of us.',
  ];

  return (
    <motion.div
      className="gift-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className="final-gift-modal"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.4 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close final gift"
        >
          <X size={20} />
        </button>

        <div className="final-gift-content">
          <motion.div
            className="final-gift-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Heart size={30} fill="currentColor" />
          </motion.div>

          <p className="final-gift-eyebrow">
            OCTOBER 06 — NOVEMBER 06, 2026
          </p>

          <h2>
            One month of <span>us.</span>
          </h2>

          <div className="final-gift-divider">
            <span />
            <Sparkles size={15} />
            <span />
          </div>

          <p className="final-gift-letter">
            Hey handsome,
            <br /><br />
            So, we made it to one month. One whole month of
            getting to know each other in a different way,
            learning little things about one another and
            creating something that is ours.
            <br /><br />
            I know distance means we don't get to do all the
            little things we'd love to do together just yet,
            but I hope you know that I genuinely appreciate
            having you in my life.
            <br /><br />
            I love that we get to learn each other, share
            our random thoughts, laugh at the most unserious
            things and slowly build something meaningful.
            <br /><br />
            This is only our first month, and I hope it is
            the beginning of so many more beautiful ones.
            I can't wait for all the memories we haven't
            made yet.
            <br /><br />
            Happy one month to us, handsome. Here's to
            choosing each other, growing together and
            enjoying every little part of this journey.
            <br /><br />
            With love,
            <br />
            Your girl. ♡
          </p>

          <div className="future-section">
            <p className="future-eyebrow">
              A FEW THINGS ON MY WISHLIST
            </p>

            <h3>Our little someday list.</h3>

            <div className="future-list">
              {thingsToLookForwardTo.map((item, index) => (
                <motion.div
                  className="future-item"
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                >
                  <span className="future-number">
                    0{index + 1}
                  </span>
                  <p>{item}</p>
                  <Heart size={14} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="final-gift-ending">
            <Infinity size={27} strokeWidth={1.3} />
            <p>One month down. So many more to go.</p>
            <span>♡</span>
          </div>

          <button
            className="final-complete-button"
            onClick={onComplete}
          >
            Keep this little memory
            <Heart size={16} fill="currentColor" />
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default FinalGift;
