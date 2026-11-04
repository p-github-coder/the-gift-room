
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X, Sparkles } from 'lucide-react';

function ScratchCard({ onClose, onComplete }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);

    // Glossy pink scratch surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#f9d6e3');
    gradient.addColorStop(0.5, '#e98bb3');
    gradient.addColorStop(1, '#f5bdd2');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Decorative stars
    ctx.fillStyle = '#ffffffaa';
    ctx.font = '22px serif';
    ctx.fillText('✦', 30, 40);
    ctx.fillText('✧', rect.width - 50, 65);
    ctx.fillText('✦', rect.width / 2, rect.height - 25);

    ctx.fillStyle = '#66334b';
    ctx.textAlign = 'center';
    ctx.font = '600 12px sans-serif';
    ctx.fillText('SCRATCH HERE', rect.width / 2, rect.height / 2);

    ctx.font = '25px serif';
    ctx.fillText('♡', rect.width / 2, rect.height / 2 + 35);
  }, []);

  function getPosition(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function startScratch(event) {
    if (revealed) return;

    isDrawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);

    scratch(event);
  }

  function scratch(event) {
    if (!isDrawing.current || revealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPosition(event);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  }

  function stopScratch() {
    isDrawing.current = false;
  }

  function checkProgress() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    let transparentPixels = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 50) {
        transparentPixels++;
      }
    }

    const percentage =
      transparentPixels / (canvas.width * canvas.height);

    if (percentage > 0.45) {
      setRevealed(true);
      canvas.style.transition = 'opacity 0.5s ease';
      canvas.style.opacity = '0';
    }
  }

  function finishScratch() {
    setCompleted(true);
    onComplete();
  }

  return (
    <motion.div
      className="gift-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className="scratch-modal"
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close scratch card"
        >
          <X size={20} />
        </button>

        <div className="appreciation-heart">
          <Sparkles size={27} />
        </div>

        <p className="appreciation-eyebrow">
          A LITTLE SECRET
        </p>

        <h2 className="scratch-title">
          There's something for you...
        </h2>

        <div className="scratch-card">
          <div className="scratch-message">
            <Heart size={27} fill="currentColor" />
            <h3>My favourite notification?</h3>
            <p>Yours, of course. ♡</p>
          </div>

          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onPointerDown={startScratch}
            onPointerMove={scratch}
            onPointerUp={stopScratch}
            onPointerCancel={stopScratch}
            onPointerLeave={stopScratch}
          />
        </div>

        {!revealed ? (
          <p className="scratch-instruction">
            Use your finger or mouse to scratch the card
          </p>
        ) : (
          <motion.button
            className="note-next"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={finishScratch}
          >
            Reveal complete <Heart size={15} />
          </motion.button>
        )}
      </motion.section>
    </motion.div>
  );
}

export default ScratchCard;
