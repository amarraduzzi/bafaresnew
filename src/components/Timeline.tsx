import React, { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { YEAR_NOW, YEAR_START } from '../data/scenes';

// Dun gele voortgangsbalk bovenin en een jaartal dat meetelt van 1957 naar nu.
export const Timeline: React.FC = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > window.innerHeight * 0.8));
  const year = useTransform(scrollYProgress, [0, 0.85], [YEAR_START, YEAR_NOW], { clamp: true });
  const [y, setY] = useState(YEAR_START);
  useMotionValueEvent(year, 'change', (v) => setY(Math.round(v)));

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        className="fixed top-0 inset-x-0 h-[3px] bg-[#E5BE01] z-50"
      />
      <div
        aria-hidden
        className={`fixed bottom-4 left-4 z-40 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'} bg-[#E5BE01] text-black font-black text-lg tabular-nums px-3 py-1 shadow-[0_0_0_2px_#000]`}
      >
        {y}
      </div>
    </>
  );
};
