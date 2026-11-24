import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, RefreshCw, Sliders, X, Sparkles } from 'lucide-react';
import { THEME_PRESETS, ThemePreset } from '../data/portfolio';

export interface CrtConfig {
  scale: number;
  scanlineIntensity: number;
  glitchAmount: number;
  curvature: number;
  brightness: number;
  chromaticAberration: number;
  mouseStrength: number;
}

interface CrtControlsDrawerProps {
  open: boolean;
  onClose: () => void;
  config: CrtConfig;
  setConfig: React.Dispatch<React.SetStateAction<CrtConfig>>;
  isPaused: boolean;
  onTogglePause: () => void;
  onReboot: () => void;
  activeTheme: ThemePreset;
  onSelectTheme: (theme: ThemePreset) => void;
}

export const CrtControlsDrawer: React.FC<CrtControlsDrawerProps> = ({
  open,
  onClose,
  config,
  setConfig,
  isPaused,
  onTogglePause,
  onReboot,
  activeTheme,
  onSelectTheme,
}) => {
  const sliders: {
    key: keyof CrtConfig;
    label: string;
    min: number;
    max: number;
    step: number;
    format: (v: number) => string;
  }[] = [
    { key: 'scale', label: 'GRID SCALE', min: 0.7, max: 3.5, step: 0.1, format: (v) => v.toFixed(1) },
    { key: 'glitchAmount', label: 'GLITCH', min: 0, max: 4.5, step: 0.1, format: (v) => v.toFixed(1) },
    { key: 'curvature', label: 'CRT CURVE', min: 0, max: 0.4, step: 0.01, format: (v) => v.toFixed(2) },
    { key: 'scanlineIntensity', label: 'SCANLINES', min: 0, max: 1.5, step: 0.05, format: (v) => v.toFixed(2) },
    { key: 'chromaticAberration', label: 'CHROMA AB', min: 0, max: 6, step: 0.5, format: (v) => `${v.toFixed(1)}px` },
    { key: 'brightness', label: 'PHOSPHOR', min: 0.25, max: 1.2, step: 0.05, format: (v) => v.toFixed(2) },
  ];

  const applyPresetMode = (mode: 'balanced' | 'overdrive' | 'stealth') => {
    if (mode === 'balanced') {
      setConfig({
        scale: 1.5,
        scanlineIntensity: 0.65,
        glitchAmount: 1.1,
        curvature: 0.12,
        brightness: 0.62,
        chromaticAberration: 1.5,
        mouseStrength: 0.45,
      });
    } else if (mode === 'overdrive') {
      setConfig({
        scale: 2.1,
        scanlineIntensity: 1.15,
        glitchAmount: 3.2,
        curvature: 0.24,
        brightness: 0.9,
        chromaticAberration: 4.0,
        mouseStrength: 0.75,
      });
    } else {
      setConfig({
        scale: 1.2,
        scanlineIntensity: 0.3,
        glitchAmount: 0.3,
        curvature: 0.05,
        brightness: 0.38,
        chromaticAberration: 0.5,
        mouseStrength: 0.25,
      });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, x: 24, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 24, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-20 md:right-6 md:bottom-20 z-40 w-[300px] term-panel rounded-lg p-5 text-xs font-mono shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders size={14} className="accent-text" />
              <span className="uppercase tracking-widest text-zinc-200 font-semibold">
                BACKGROUND EFFECTS
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onTogglePause}
                title={isPaused ? 'Resume WebGL shader' : 'Pause WebGL shader'}
                className="p-1.5 rounded border border-white/10 hover:border-[var(--accent)] text-zinc-300 hover:text-[var(--accent)] transition-colors"
              >
                {isPaused ? <Play size={13} /> : <Pause size={13} />}
              </button>
              <button
                onClick={onReboot}
                title="Replay boot & shader reveal"
                className="p-1.5 rounded border border-white/10 hover:border-[var(--accent)] text-zinc-300 hover:text-[var(--accent)] transition-colors"
              >
                <RefreshCw size={13} />
              </button>
              <button
                onClick={onClose}
                title="Close panel"
                className="p-1.5 rounded border border-white/10 hover:border-red-400/60 text-zinc-400 hover:text-red-300 transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Color Theme Presets */}
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              COLOR THEME
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {THEME_PRESETS.map((theme) => {
                const selected = theme.id === activeTheme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onSelectTheme(theme)}
                    title={theme.description}
                    className={`group flex flex-col items-center gap-1 p-1.5 rounded border transition-all ${
                      selected
                        ? 'border-[var(--accent)] bg-white/10'
                        : 'border-white/10 bg-black/30 hover:border-white/30'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-sm"
                      style={{
                        backgroundColor: theme.accent,
                        boxShadow: selected ? `0 0 10px ${theme.accent}` : 'none',
                      }}
                    />
                    <span className="text-[9px] text-zinc-400 group-hover:text-zinc-200">
                      {theme.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick FX Profiles */}
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-1">
              <Sparkles size={11} className="accent-text" />
              PRESETS
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['stealth', 'balanced', 'overdrive'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => applyPresetMode(mode)}
                  className="py-1.5 px-2 rounded border border-white/10 bg-black/40 hover:border-[var(--accent)] hover:text-[var(--accent)] uppercase text-[10px] tracking-wider text-zinc-300 transition-colors"
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            {sliders.map((s) => (
              <div key={s.key} className="space-y-1">
                <div className="flex items-center justify-between text-[10px] tracking-wider">
                  <span className="text-zinc-400">{s.label}</span>
                  <span className="accent-text tabular-nums">{s.format(config[s.key])}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={config[s.key]}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      [s.key]: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full crt-slider"
                />
              </div>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
