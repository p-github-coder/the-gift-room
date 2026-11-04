
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Mail, Sparkles, Heart } from 'lucide-react';

import GiftCard from '../components/GiftCard';
import ProgressBar from '../components/ProgressBar';
import AppreciationBox from '../components/AppreciationBox';
import SecretLetter from '../components/SecretLetter';
import ScratchCard from '../components/ScratchCard';
import FinalGift from '../components/FinalGift';

import '../styles/giftroom.css';

const gifts = [
  {
    id: 1,
    title: 'The Little Box',
    subtitle: 'A few things I adore about you',
    label: 'A LITTLE APPRECIATION',
    icon: Gift,
    color: 'pink',
  },
  {
    id: 2,
    title: 'Open When You’re Ready',
    subtitle: 'Something I want you to read',
    label: 'A LETTER FOR YOU',
    icon: Mail,
    color: 'white',
  },
  {
    id: 3,
    title: 'A Little Secret',
    subtitle: 'There’s something underneath',
    label: 'SCRATCH TO REVEAL',
    icon: Sparkles,
    color: 'pink',
  },
  {
    id: 4,
    title: 'The Final Present',
    subtitle: 'One last thing, handsome',
    label: 'YOUR FINAL SURPRISE',
    icon: Heart,
    color: 'dark',
  },
];

function GiftRoom() {
  const [openedGifts, setOpenedGifts] = useState(() => {
    try {
      const savedGifts = localStorage.getItem('giftRoomProgress');
      return savedGifts ? JSON.parse(savedGifts) : [];
    } catch {
      return [];
    }
  });

  const [selectedGift, setSelectedGift] = useState(null);

  const completed = openedGifts.length;

  function handleOpenGift(id) {
    setSelectedGift(id);
  }

  function completeGift(id) {
    setOpenedGifts((previous) => {
      const updatedGifts = previous.includes(id)
        ? previous
        : [...previous, id];

      localStorage.setItem(
        'giftRoomProgress',
        JSON.stringify(updatedGifts)
      );

      return updatedGifts;
    });

    setSelectedGift(null);
  }

  function closeGift() {
    setSelectedGift(null);
  }

  return (
    <main className="gift-room">
      <header className="gift-header">
        <div className="gift-logo">
          <Gift size={20} />
          <span>THE GIFT ROOM</span>
        </div>

        <div className="header-anniversary">
          <Heart size={14} fill="currentColor" />
          <span>OUR FIRST MONTH</span>
        </div>
      </header>

      <section className="gift-intro">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          A COLLECTION OF LITTLE SURPRISES
        </motion.p>

        <h1>
          Made just <span>for you.</span>
        </h1>

        <p className="gift-intro-description">
          I put together a few things for you. Take your time,
          open each gift and enjoy.
        </p>
      </section>

      <section className="gift-progress">
        <div className="progress-heading">
          <span>YOUR SURPRISES</span>
          <span>{completed} / 4 OPENED</span>
        </div>

        <ProgressBar progress={(completed / 4) * 100} />
      </section>

      <section className="gift-grid">
        {gifts.map((gift, index) => {
          const isLocked = gift.id === 4 && completed < 3;

          return (
            <GiftCard
              key={gift.id}
              gift={gift}
              index={index}
              isLocked={isLocked}
              isOpened={openedGifts.includes(gift.id)}
              onOpen={() => handleOpenGift(gift.id)}
            />
          );
        })}
      </section>

      <AnimatePresence mode="wait">
        {selectedGift === 1 && (
          <AppreciationBox
            onClose={closeGift}
            onComplete={() => completeGift(1)}
          />
        )}

        {selectedGift === 2 && (
          <SecretLetter
            onClose={closeGift}
            onComplete={() => completeGift(2)}
          />
        )}

        {selectedGift === 3 && (
          <ScratchCard
            onClose={closeGift}
            onComplete={() => completeGift(3)}
          />
        )}

        {selectedGift === 4 && (
          <FinalGift
            onClose={closeGift}
            onComplete={() => completeGift(4)}
          />
        )}
      </AnimatePresence>

      <footer className="gift-footer">
        <Heart size={13} fill="currentColor" />
        <span>A LITTLE PIECE OF MY HEART, JUST FOR YOU</span>
      </footer>
    </main>
  );
}

export default GiftRoom;
