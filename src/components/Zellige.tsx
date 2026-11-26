import React from 'react';
import { motion } from 'motion/react';

// Achtpuntige ster (zellige-motief) die zichzelf tekent als je erlangs scrolt.
const STAR = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 === 0 ? 44 : 25;
  const a = ((i * 22.5 - 90) * Math.PI) / 180;
  return `${i === 0 ? 'M' : 'L'}${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
}).join(' ') + ' Z';

export const Zellige: React.FC = () => (
  <div aria-hidden className="bg-black overflow-hidden border-y border-[#E5BE01]/30">
    <svg viewBox="0 0 1600 100" preserveAspectRatio="xMidYMid slice" className="w-full h-16 sm:h-24 block">
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i} transform={`translate(${i * 100 + 50} 50)`}>
          <motion.path
            d={STAR}
            fill="none"
            stroke="#E5BE01"
            strokeWidth={1.6}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, delay: i * 0.07, ease: 'easeInOut' }}
          />
          <motion.circle
            r={7}
            fill="none"
            stroke="#E5BE01"
            strokeWidth={1.6}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.5 + i * 0.07 }}
          />
        </g>
      ))}
    </svg>
  </div>
);
