
import { motion } from 'framer-motion';
import { Lock, Check, ArrowUpRight } from 'lucide-react';

function GiftCard({ gift, index, isLocked, isOpened, onOpen }) {
  const Icon = gift.icon;

  return (
    <motion.button
      className={`gift-card ${gift.color} ${isOpened ? 'opened' : ''}`}
      onClick={onOpen}
      disabled={isLocked}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={!isLocked ? { y: -7, scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
    >
      <div className="gift-card-top">
        <span>{gift.label}</span>

        {isLocked ? (
          <Lock size={17} />
        ) : isOpened ? (
          <Check size={17} />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </div>

      <div className="gift-card-icon">
        <Icon size={35} strokeWidth={1.2} />
      </div>

      <div className="gift-card-bottom">
        <div>
          <h2>{gift.title}</h2>
          <p>{isLocked ? 'Open the first three gifts to unlock' : gift.subtitle}</p>
        </div>

        {isOpened && <span className="opened-label">OPENED</span>}
      </div>

      {isLocked && <div className="locked-overlay"></div>}
    </motion.button>
  );
}

export default GiftCard;
