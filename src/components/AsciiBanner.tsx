import React, { useCallback, useEffect, useRef, useState } from 'react';

const ASCII_ART = `██╗  ██╗ █████╗ ██████╗ ██╗    ███╗   ██╗ █████╗ ██████╗  █████╗ ██╗   ██╗ █████╗ ███╗   ██╗ █████╗ 
██║  ██║██╔══██╗██╔══██╗██║    ████╗  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║██╔══██╗
███████║███████║██████╔╝██║    ██╔██╗ ██║███████║██████╔╝███████║ ╚████╔╝ ███████║██╔██╗ ██║███████║
██╔══██║██╔══██║██╔══██╗██║    ██║╚██╗██║██╔══██║██╔══██╗██╔══██║  ╚██╔╝  ██╔══██║██║╚██╗██║██╔══██║
██║  ██║██║  ██║██║  ██║██║    ██║ ╚████║██║  ██║██║  ██║██║  ██║   ██║   ██║  ██║██║ ╚████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝    ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝`;

const GLYPHS = '░▒▓█╬╠╣╗╝╚╔═║#@$%*01';

interface AsciiBannerProps {
  name: string;
  version: string;
}

export const AsciiBanner: React.FC<AsciiBannerProps> = ({ name, version }) => {
  const [rendered, setRendered] = useState(ASCII_ART);
  const [glitching, setGlitching] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, active: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const runDecodeEffect = useCallback((durationMs = 750) => {
    cancelAnimationFrame(rafRef.current);
    setGlitching(true);
    const lines = ASCII_ART.split('\n');
    const maxLen = Math.max(...lines.map((l) => l.length));
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const revealCol = progress * (maxLen + 14);

      const next = lines
        .map((line) => {
          let out = '';
          for (let c = 0; c < line.length; c++) {
            const ch = line[c];
            if (ch === ' ') {
              out += ' ';
            } else if (c < revealCol - 10) {
              out += ch;
            } else if (c < revealCol) {
              out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            } else {
              out += Math.random() < 0.25 ? '░' : ' ';
            }
          }
          return out;
        })
        .join('\n');

      setRendered(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setRendered(ASCII_ART);
        setGlitching(false);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Decode on mount
  useEffect(() => {
    runDecodeEffect(850);
    return () => cancelAnimationFrame(rafRef.current);
  }, [runDecodeEffect]);

  // Subtle periodic micro-glitch pulse
  useEffect(() => {
    const id = window.setInterval(() => {
      setGlitching(true);
      window.setTimeout(() => setGlitching(false), 180);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y, active: true });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos((p) => ({ ...p, active: false }))}
      onClick={() => runDecodeEffect(600)}
      title="Click to replay ASCII decode effect"
      className="relative pb-4 border-b border-white/10 cursor-pointer select-none overflow-hidden group"
    >
      {/* Desktop ASCII Art with RGB chromatic split + scan sweep + spotlight */}
      <div className="hidden lg:block relative py-1">
        {/* Cyan chromatic ghost */}
        <pre
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 py-1 text-[8px] xl:text-[9.5px] leading-[1.15] text-cyan-400/70 transition-transform duration-100 ${
            glitching ? 'ascii-glitch-a opacity-80' : 'opacity-0 group-hover:opacity-60'
          }`}
          style={{
            transform: mousePos.active
              ? `translate(${((mousePos.x - 50) / 50) * 2.5}px, ${((mousePos.y - 50) / 50) * 1}px)`
              : undefined,
          }}
        >
          {rendered}
        </pre>

        {/* Magenta chromatic ghost */}
        <pre
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 py-1 text-[8px] xl:text-[9.5px] leading-[1.15] text-rose-500/70 transition-transform duration-100 ${
            glitching ? 'ascii-glitch-b opacity-80' : 'opacity-0 group-hover:opacity-55'
          }`}
          style={{
            transform: mousePos.active
              ? `translate(${-((mousePos.x - 50) / 50) * 2.5}px, ${-((mousePos.y - 50) / 50) * 1}px)`
              : undefined,
          }}
        >
          {rendered}
        </pre>

        {/* Primary glowing phosphor ASCII layer */}
        <pre className="relative text-[8px] xl:text-[9.5px] leading-[1.15] accent-text accent-glow ascii-flicker">
          {rendered}
        </pre>

        {/* Interactive cursor phosphor spotlight */}
        {mousePos.active && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(220px circle at ${mousePos.x}% ${mousePos.y}%, rgba(var(--accent-rgb), 0.22), transparent 68%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Sweeping phosphor laser scan beam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-24 ascii-scan-beam"
        />
      </div>

      {/* Mobile / Tablet Kinetic Display Title */}
      <div className="lg:hidden flex flex-wrap items-baseline justify-between gap-2 relative">
        <h1
          data-text={name}
          className={`glitch-title text-3xl sm:text-4xl font-extrabold tracking-tight text-white accent-glow ${
            glitching ? 'ascii-flicker' : ''
          }`}
        >
          {name}
        </h1>
        <span className="text-xs accent-text font-bold tracking-widest">[{version}]</span>
      </div>
    </div>
  );
};
