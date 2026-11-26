import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import logo from '../assets/images/bafareslogo.jpg';

export type Phase = 'intro' | 'fly' | 'done';

interface Props {
  phase: Phase;
  anchorRef: React.RefObject<HTMLElement | null>; // plek van het rietje in de hero
  onLanded: () => void;
}

// Het logo staat in de opening in het midden, vliegt daarna naar het rietje en
// wordt daar het gele punt waarmee de kleur begint te stromen.
export const LogoFlight: React.FC<Props> = ({ phase, anchorRef, onLanded }) => {
  const [start] = useState(() => {
    const size = window.innerWidth >= 640 ? 224 : 176;
    return { size, cx: window.innerWidth / 2, cy: window.innerHeight / 2 - 42 };
  });

  const target = useMemo(() => {
    if (phase !== 'fly') return null;
    const r = anchorRef.current?.getBoundingClientRect();
    return r
      ? { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      : { x: window.innerWidth * 0.77, y: window.innerHeight * 0.3 };
  }, [phase, anchorRef]);

  const S = target ? 16 : start.size;
  const c = target ?? { x: start.cx, y: start.cy };

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[101] pointer-events-none"
      initial={{ x: start.cx - start.size / 2, y: start.cy - start.size / 2, width: start.size, height: start.size, opacity: 0 }}
      animate={{ x: c.x - S / 2, y: c.y - S / 2, width: S, height: S, opacity: phase === 'done' ? 0 : 1 }}
      transition={
        phase === 'fly'
          ? { duration: 1.2, ease: [0.7, 0, 0.3, 1] }
          : phase === 'intro'
          ? { duration: 1, delay: 0.4 }
          : { duration: 0.3 }
      }
      onAnimationComplete={() => { if (phase === 'fly') onLanded(); }}
    >
      <div className="relative w-full h-full">
        <svg
          viewBox="0 0 100 100"
          className="absolute -rotate-90"
          style={{ left: -12, top: -12, width: 'calc(100% + 24px)', height: 'calc(100% + 24px)' }}
        >
          <motion.circle
            cx="50" cy="50" r="48" fill="none" stroke="#E5BE01" strokeWidth="1.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, opacity: phase === 'intro' ? 1 : 0 }}
            transition={{ pathLength: { duration: 1.6, ease: 'easeInOut' }, opacity: { duration: 1 } }}
          />
        </svg>
        <img src={logo} alt="" className="w-full h-full rounded-full object-cover" />
      </div>
    </motion.div>
  );
};
