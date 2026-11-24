import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[88vh] flex flex-col term-panel rounded-lg font-mono overflow-hidden"
          >
            {/* Title bar */}
            <div className="shrink-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#070b0d]/95 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-xs min-w-0">
                <span className="accent-text font-bold shrink-0">cat</span>
                <span className="text-zinc-400 truncate">./projects/{project.slug}/README.md</span>
              </div>
              <button
                type="button"
                aria-label="Close project modal"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="shrink-0 cursor-pointer flex items-center gap-1.5 text-[11px] text-zinc-300 hover:text-[var(--accent)] px-2.5 py-1 rounded border border-white/15 bg-black/50 hover:border-[var(--accent)] transition-colors"
              >
                <span>ESC</span>
                <X size={13} />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] mb-2">
                  <span className="px-2 py-0.5 rounded bg-[var(--accent-dim)] accent-text border border-[var(--accent-border)] font-semibold">
                    {project.status}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10">
                    {project.category}
                  </span>
                  <span className="text-zinc-400">{project.lang}</span>
                  <span className="text-zinc-500">{project.year}</span>
                  <span className="text-zinc-600 ml-auto hidden sm:inline">{project.permissions}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  {project.name}
                </h2>
                <p className="mt-2 text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded border border-white/10 bg-black/40 px-3.5 py-2.5"
                  >
                    <div className="text-[10px] tracking-widest text-zinc-500">{m.label}</div>
                    <div className="text-sm md:text-base font-bold accent-text mt-0.5 truncate">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Architecture */}
              <div className="rounded border border-white/10 bg-black/50 p-4">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-400 mb-2">
                  <Cpu size={13} className="accent-text" />
                  SYSTEM_PIPELINE
                </div>
                <code className="block text-xs text-zinc-200 leading-relaxed break-words">
                  {project.architecture}
                </code>
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-400 mb-2.5">
                  <Layers size={13} className="accent-text" />
                  KEY_ENGINEERING_HIGHLIGHTS
                </div>
                <ul className="space-y-2 text-xs md:text-[13px] text-zinc-300 leading-relaxed">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="accent-text shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-1">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold bg-[var(--accent)] text-black hover:opacity-90 transition-opacity shadow-[0_0_20px_-6px_var(--accent)]"
                  >
                    <ExternalLink size={14} />
                    LAUNCH_LIVE_APP
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold transition-colors ${
                    project.liveUrl
                      ? 'border border-white/15 bg-white/5 text-zinc-200 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                      : 'bg-[var(--accent)] text-black hover:opacity-90 shadow-[0_0_20px_-6px_var(--accent)]'
                  }`}
                >
                  <Github size={14} />
                  VIEW_ON_GITHUB
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
