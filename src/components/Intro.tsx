import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import logo from '../assets/images/bafareslogo.jpg';

interface Props {
  onDone: () => void;
}

// Opening: zwart scherm, het logo verschijnt in een gele ring, daarna schuift
// het gordijn omhoog en begint het verhaal. Klik = overslaan.
export const Intro: React.FC<Props> = ({ onDone }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(onDone, 3200);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <motion.div
      role="presentation"
      onClick={onDone}
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer border-b-[8px] border-[#E5BE01]"
    >
      <div className="relative w-44 h-44 sm:w-56 sm:h-56">
        <svg viewBox="0 0 100 100" className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] -rotate-90" aria-hidden>
          <motion.circle
            cx="50" cy="50" r="48" fill="none" stroke="#E5BE01" strokeWidth="1.2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </svg>
        <motion.img
          src={logo}
          alt="Ba Fares"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-8 text-white text-xl font-bold tracking-wide"
      >
        Depuis 1957
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="mt-1 text-white/60 text-sm"
      >
        Diour Jamaa, Rabat
      </motion.p>
    </motion.div>
  );
};
