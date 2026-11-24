import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  visible: boolean;
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: 'HARI_NARAYANA [v3.0] // NODE_ALPHA POST CHECK', status: 'OK', delay: 60 },
  { text: 'INIT WEBGL2 CRT_PIPELINE [OGL_MESH]', status: 'READY', delay: 200 },
  { text: 'MOUNTING /dev/github -> harinarayana1457-cmyk (33 repos)', status: 'MOUNTED', delay: 360 },
  { text: 'LOADING MODULES: mcp_agents, rag_search, git.log, certs', status: '100%', delay: 540 },
  { text: 'SYS_AUTH: ROOT // INTERACTIVE SHELL [zsh 5.9]', status: 'ONLINE', delay: 720 },
];

export const BootSequence: React.FC<BootSequenceProps> = ({ visible, onComplete }) => {
  const [shownCount, setShownCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    setShownCount(0);

    const timers: number[] = [];
    BOOT_LINES.forEach((line, idx) => {
      timers.push(
        window.setTimeout(() => {
          setShownCount(idx + 1);
        }, line.delay)
      );
    });

    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, 1150)
    );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener('keydown', handleKey);
    };
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onComplete}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#040708]/80 backdrop-blur-md cursor-pointer p-4"
        >
          <div className="w-full max-w-xl term-panel rounded-lg p-6 md:p-8 font-mono text-xs md:text-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)]" />
                <span className="tracking-widest uppercase text-[11px] text-zinc-400">
                  SYSTEM BOOTLOADER · NODE // ALPHA
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase">
                [CLICK / ESC TO SKIP]
              </span>
            </div>

            <div className="space-y-2.5 min-h-[150px]">
              {BOOT_LINES.slice(0, shownCount).map((line, idx) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.14 }}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-zinc-300 truncate">
                    <span className="text-zinc-600 mr-2">[{String(idx + 1).padStart(2, '0')}]</span>
                    {line.text}
                  </span>
                  <span className="shrink-0 accent-text font-semibold tracking-wider">
                    [{line.status}]
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.0, ease: 'easeInOut' }}
                  className="h-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
