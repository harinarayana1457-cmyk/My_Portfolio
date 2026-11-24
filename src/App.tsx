import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Cpu,
  FolderGit2,
  GitBranch,
  Mail,
  Pause,
  Play,
  RefreshCw,
  Sliders,
  Terminal as TerminalIcon,
  User,
} from 'lucide-react';
import { FaultyTerminalBackground } from './components/FaultyTerminalBackground';
import { CrtConfig, CrtControlsDrawer } from './components/CrtControlsDrawer';
import {
  InteractiveShell,
  ShellEntry,
  TabId,
  buildWelcomeEntry,
  runShellCommand,
} from './components/InteractiveShell';
import { ProjectModal } from './components/ProjectModal';
import {
  ContactPane,
  ExperiencePane,
  OverviewPane,
  ProjectsPane,
  StackPane,
} from './components/Sections';
import { PROFILE, PROJECTS, ProjectItem, THEME_PRESETS, ThemePreset } from './data/portfolio';

const NAV_ITEMS: { id: TabId; prefix?: string; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'overview', icon: <User size={13} /> },
  { id: 'projects', label: 'projects', icon: <FolderGit2 size={13} /> },
  { id: 'stack', label: 'stack', icon: <Cpu size={13} /> },
  { id: 'experience', label: 'experience', icon: <GitBranch size={13} /> },
  { id: 'contact', label: 'contact', icon: <Mail size={13} /> },
  { id: 'shell', prefix: '>_', label: 'shell', icon: <TerminalIcon size={13} /> },
];

export default function App() {
  const [shaderKey, setShaderKey] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  // Quick command dock input
  const [dockCmd, setDockCmd] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const dockInputRef = useRef<HTMLInputElement>(null);

  // Interactive shell state
  const [shellEntries, setShellEntries] = useState<ShellEntry[]>([buildWelcomeEntry()]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  // FaultyTerminalBackground live shader parameters
  const [crtConfig, setCrtConfig] = useState<CrtConfig>({
    scale: 1.5,
    scanlineIntensity: 0.65,
    glitchAmount: 1.15,
    curvature: 0.12,
    brightness: 0.62,
    chromaticAberration: 1.5,
    mouseStrength: 0.45,
  });

  // Sync CSS custom properties to the selected phosphor theme
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', activeTheme.accent);
    root.style.setProperty('--accent-rgb', activeTheme.accentRgb);
    root.style.setProperty('--accent-dim', `rgba(${activeTheme.accentRgb}, 0.14)`);
    root.style.setProperty('--accent-border', `rgba(${activeTheme.accentRgb}, 0.36)`);
    root.style.setProperty('--accent-glow', `rgba(${activeTheme.accentRgb}, 0.5)`);
  }, [activeTheme]);

  // Live clock
  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2400);
  }, []);

  const handleReboot = useCallback(() => {
    setShaderKey((k) => k + 1);
    flashToast('Replaying background animation');
  }, [flashToast]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
    setCopiedEmail(true);
    flashToast(`Copied ${PROFILE.email} to clipboard`);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  }, [flashToast]);

  const executeCommand = useCallback(
    (raw: string, openShellOnOutput = false) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      setCommandHistory((prev) => [...prev.slice(-30), trimmed]);

      const lines = runShellCommand(trimmed, {
        setTab: (tab) => setActiveTab(tab),
        openProjectByIndex: (idx) => {
          const found = PROJECTS[idx];
          if (!found) return false;
          setInspectedProject(found);
          return true;
        },
        setThemeById: (id) => {
          const found = THEME_PRESETS.find((t) => t.id === id);
          if (!found) return false;
          setActiveTheme(found);
          flashToast(`Phosphor theme -> ${found.label}`);
          return true;
        },
        setCrtPreset: (mode) => {
          if (mode === 'pause') setIsPaused(true);
          if (mode === 'play') setIsPaused(false);
          if (mode === 'glitch') {
            setCrtConfig((c) => ({ ...c, glitchAmount: 3.4, chromaticAberration: 4.0, brightness: 0.85 }));
          }
          if (mode === 'calm') {
            setCrtConfig((c) => ({ ...c, glitchAmount: 0.4, chromaticAberration: 0.5, brightness: 0.45 }));
          }
          flashToast(`CRT shader -> ${mode.toUpperCase()}`);
        },
        clear: () => setShellEntries([buildWelcomeEntry()]),
        reboot: handleReboot,
      });

      if (lines !== null) {
        setShellEntries((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), command: trimmed, lines },
        ]);
        const cmdWord = trimmed.split(/\s+/)[0].toLowerCase();
        if (
          openShellOnOutput &&
          !['cd', 'open', 'theme', 'crt', 'reboot'].includes(cmdWord) &&
          !trimmed.toLowerCase().startsWith('sudo hire')
        ) {
          setActiveTab('shell');
        }
      }
    },
    [flashToast, handleReboot]
  );

  // Global keyboard shortcuts (1-6 switch tabs, / focuses command dock)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA';
      if (inspectedProject) return;

      if (e.key === '/' && !inInput) {
        e.preventDefault();
        dockInputRef.current?.focus();
        return;
      }

      if (!inInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx >= 0 && idx < NAV_ITEMS.length) {
          setActiveTab(NAV_ITEMS[idx].id);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inspectedProject]);

  const cycleTheme = () => {
    const idx = THEME_PRESETS.findIndex((t) => t.id === activeTheme.id);
    const next = THEME_PRESETS[(idx + 1) % THEME_PRESETS.length];
    setActiveTheme(next);
    flashToast(`Theme -> ${next.label}`);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050709] text-zinc-100 overflow-x-hidden flex flex-col">
      {/* WebGL FaultyTerminalBackground (fixed full-bleed) */}
      <div className="fixed inset-0 z-0">
        <FaultyTerminalBackground
          key={shaderKey}
          scale={crtConfig.scale}
          gridMul={[2, 1]}
          digitSize={1.25}
          timeScale={0.85}
          pause={isPaused}
          scanlineIntensity={crtConfig.scanlineIntensity}
          glitchAmount={crtConfig.glitchAmount}
          flickerAmount={0.85}
          noiseAmp={1}
          chromaticAberration={crtConfig.chromaticAberration}
          dither={0.1}
          curvature={crtConfig.curvature}
          tint={activeTheme.tint}
          mouseReact={true}
          mouseStrength={crtConfig.mouseStrength}
          pageLoadAnimation={true}
          brightness={crtConfig.brightness}
          className="w-full h-full"
        />
        {/* Subtle readability vignette & micro-scanlines */}
        <div className="pointer-events-none absolute inset-0 vignette-overlay" />
        <div className="pointer-events-none absolute inset-0 scanline-overlay opacity-35" />
      </div>

      {/* Top OS / tmux Status Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#05080a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-3 md:px-6 h-12 flex items-center justify-between gap-3 text-xs">
          {/* Brand / Live Node */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2 shrink-0 group min-w-0"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] animate-pulse shrink-0" />
            <span className="font-bold tracking-wider text-white group-hover:text-[var(--accent)] transition-colors">
              {PROFILE.handle}@{PROFILE.host}
            </span>
            <span className="hidden xl:inline text-zinc-500">
              :~/{activeTab === 'overview' ? '' : activeTab}
            </span>
          </button>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-1.5 rounded text-xs flex items-center gap-1.5 ${
                    active
                      ? 'text-black bg-[var(--accent)] font-bold shadow-[0_0_16px_-4px_var(--accent)]'
                      : 'text-zinc-400 font-medium hover:text-white hover:bg-white/5 transition-colors duration-100'
                  }`}
                >
                  {item.prefix && (
                    <span className={active ? 'text-black/75' : 'text-zinc-500'}>{item.prefix}</span>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Telemetry & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={cycleTheme}
              title="Switch color theme"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-black/40 hover:border-[var(--accent)] text-[11px] text-zinc-300 transition-colors"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: activeTheme.accent,
                  boxShadow: `0 0 8px ${activeTheme.accent}`,
                }}
              />
              <span>Theme: {activeTheme.label}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowControls((s) => !s)}
              title="Customize background effects"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors ${
                showControls
                  ? 'border-[var(--accent)] bg-[var(--accent-dim)] accent-text'
                  : 'border-white/10 bg-black/40 text-zinc-300 hover:border-[var(--accent)]'
              }`}
            >
              <Sliders size={12} />
              <span>Effects</span>
            </button>

            <span className="hidden xl:inline-block text-[11px] text-zinc-500 tabular-nums pl-1">
              {clock}
            </span>
          </div>
        </div>

        {/* Mobile & Tablet Tab Rail */}
        <div className="lg:hidden border-t border-white/5 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`shrink-0 px-2.5 py-1 rounded text-[11px] flex items-center gap-1.5 ${
                  active
                    ? 'bg-[var(--accent)] text-black font-bold'
                    : 'text-zinc-400 bg-white/5 hover:text-zinc-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Terminal Window Stage */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-3 md:px-6 py-5 md:py-8 flex flex-col">
        <div className="term-panel rounded-xl overflow-hidden flex flex-col flex-1">
          {/* Terminal Window Chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/55 border-b border-white/10 text-[11px]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="ml-2 text-zinc-400 hidden sm:inline">
                zsh — HARI_NARAYANA [{PROFILE.version}] — <span className="accent-text">{activeTab}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px] text-zinc-500">
              <span className="hidden md:inline">KEYS: [1-6] TABS · [/] CMD</span>
              <button
                onClick={() => setIsPaused((p) => !p)}
                title={isPaused ? 'Resume shader' : 'Pause shader'}
                className="inline-flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
              >
                {isPaused ? <Play size={11} /> : <Pause size={11} />}
                <span>{isPaused ? 'PAUSED' : '60FPS'}</span>
              </button>
              <button
                onClick={handleReboot}
                title="Replay boot & shader reveal"
                className="inline-flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
              >
                <RefreshCw size={11} />
                <span className="hidden sm:inline">REBOOT</span>
              </button>
            </div>
          </div>

          {/* Active Section Content */}
          <div className="p-4 sm:p-6 md:p-7 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="h-full"
              >
                {activeTab === 'overview' && (
                  <OverviewPane
                    onNavigate={setActiveTab}
                    onInspectProject={setInspectedProject}
                    onCopyEmail={handleCopyEmail}
                    copiedEmail={copiedEmail}
                  />
                )}
                {activeTab === 'projects' && (
                  <ProjectsPane onInspectProject={setInspectedProject} />
                )}
                {activeTab === 'stack' && <StackPane />}
                {activeTab === 'experience' && <ExperiencePane />}
                {activeTab === 'contact' && (
                  <ContactPane onCopyEmail={handleCopyEmail} copiedEmail={copiedEmail} />
                )}
                {activeTab === 'shell' && (
                  <InteractiveShell
                    entries={shellEntries}
                    onExecute={(cmd) => executeCommand(cmd, false)}
                    commandHistory={commandHistory}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Persistent Quick Command Dock (shown on non-shell tabs) */}
          {activeTab !== 'shell' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!dockCmd.trim()) return;
                executeCommand(dockCmd, true);
                setDockCmd('');
              }}
              className="px-4 py-2.5 bg-black/65 border-t border-white/10 flex items-center gap-2 text-xs"
            >
              <span className="accent-text font-bold shrink-0">
                {PROFILE.handle}@{PROFILE.host}:~$
              </span>
              <input
                ref={dockInputRef}
                type="text"
                value={dockCmd}
                onChange={(e) => setDockCmd(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                placeholder="Type a command (help, certs, education, theme cyan, open 1, sudo hire) or press / ..."
                className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-[10px] px-2.5 py-1 rounded border border-white/15 text-zinc-400 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                EXEC ↵
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Collapsible CRT Shader Controls Drawer */}
      <CrtControlsDrawer
        open={showControls}
        onClose={() => setShowControls(false)}
        config={crtConfig}
        setConfig={setCrtConfig}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((p) => !p)}
        onReboot={handleReboot}
        activeTheme={activeTheme}
        onSelectTheme={(t) => {
          setActiveTheme(t);
          flashToast(`Phosphor theme -> ${t.label}`);
        }}
      />

      {/* Project README Inspector Modal */}
      <ProjectModal
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
      />

      {/* Subtle Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 px-4 py-2 rounded border border-[var(--accent)] bg-[#060b0d]/95 text-xs accent-text shadow-[0_0_25px_-5px_var(--accent)]"
          >
            &gt; {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
