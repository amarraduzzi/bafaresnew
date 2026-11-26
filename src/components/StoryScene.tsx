import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Language } from '../types';
import { HINT, Scene } from '../data/scenes';
import { RainCanvas } from './RainCanvas';

interface Props {
  scene: Scene;
  lang: Language;
}

// Eén schermvullende scène: foto in "story"-formaat, gordijn dat opent,
// zachte parallax en een geel punt dat een kort zinnetje onthult.
export const StoryScene: React.FC<Props> = ({ scene, lang }) => {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section
      id={scene.id}
      ref={ref}
      className="relative h-[100svh] min-h-[520px] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Vervaagde achtergrond zodat het beeld op elk scherm vult */}
      <img src={scene.img} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-30" />

      <div className="relative aspect-[9/16] overflow-hidden" style={{ width: 'min(100vw, 56.25svh)' }}>
        <motion.img
          src={scene.img}
          alt={scene.alt}
          loading="lazy"
          style={{ y }}
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {scene.rain && <RainCanvas />}

        {/* Lichtstreep die langzaam over het marmer glijdt */}
        <div aria-hidden className="light-sweep absolute inset-0 pointer-events-none" />

        {/* Gordijn: opent één keer, met gele rand */}
        <motion.div
          aria-hidden
          initial={{ y: 0 }}
          whileInView={{ y: '-101%' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-black border-b-[6px] border-[#E5BE01] z-20"
        />

        {/* Hoofdstuk-label */}
        <div className="absolute top-20 inset-x-5 z-10 flex items-center gap-3">
          <span className="h-[3px] w-8 bg-[#E5BE01]" />
          <span className="text-[#E5BE01] text-sm font-bold">{scene.chapter[lang]}</span>
        </div>

        {/* Geel punt */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={HINT[lang]}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-full"
          style={{ left: `${scene.spot.x}%`, top: `${scene.spot.y}%` }}
        >
          <span className="absolute w-5 h-5 rounded-full bg-[#E5BE01]/60 animate-ping" />
          <span className="relative w-4 h-4 rounded-full bg-[#E5BE01] ring-2 ring-black/60" />
        </button>

        {/* Hint of zinnetje */}
        <div className="absolute inset-x-4 bottom-5 z-10 min-h-12 flex items-end justify-center">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.p
                key="cap"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-[#E5BE01] text-black font-extrabold text-lg leading-snug px-5 py-3 text-center"
              >
                {scene.caption[lang]}
              </motion.p>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/80 text-sm font-medium"
              >
                {HINT[lang]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
