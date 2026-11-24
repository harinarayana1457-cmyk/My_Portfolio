import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  FolderGit2,
  GitBranch,
  GitCommitHorizontal,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Search,
  Send,
  Terminal,
  Zap,
} from 'lucide-react';
import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  SKILL_GROUPS,
  TOOLBELT,
} from '../data/portfolio';
import { TabId } from './InteractiveShell';
import { AsciiBanner } from './AsciiBanner';

/* ============================================================================
   01. OVERVIEW PANE (neofetch + hero + telemetry + flagship repos)
   ============================================================================ */
export const OverviewPane: React.FC<{
  onNavigate: (tab: TabId) => void;
  onInspectProject: (p: ProjectItem) => void;
  onCopyEmail: () => void;
  copiedEmail: boolean;
}> = ({ onNavigate, onInspectProject, onCopyEmail, copiedEmail }) => {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-6">
      {/* Command header */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
        <div>
          <span className="accent-text font-semibold">
            {PROFILE.handle}@{PROFILE.host}:~$
          </span>{' '}
          <span className="text-zinc-200">run user_info.sh --all</span>
        </div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[var(--accent-border)] bg-[var(--accent-dim)] text-[10px] tracking-widest accent-text font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
          {PROFILE.status}
        </div>
      </div>

      {/* Full-Width Hero */}
      <div className="term-card rounded-lg p-5 sm:p-6 md:p-8 space-y-5">
        <AsciiBanner name={PROFILE.name} version={PROFILE.version} />

        <div className="space-y-3 max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
            <span className="inline-flex items-center gap-1.5 accent-text font-semibold tracking-wider uppercase">
              <ChevronRight size={14} />
              {PROFILE.role}
            </span>
          </div>

          <h2
            data-text={PROFILE.headline}
            className="glitch-title text-xl sm:text-2xl md:text-[26px] font-display font-bold text-white leading-snug tracking-tight"
          >
            {PROFILE.headline}
          </h2>

          <div className="space-y-2 text-xs md:text-[13px] text-zinc-300 leading-relaxed max-w-3xl">
            {PROFILE.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* Action CLI buttons + Direct Social Links */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold bg-[var(--accent)] text-black hover:opacity-90 transition-all shadow-[0_0_24px_-6px_var(--accent)]"
            >
              <FolderGit2 size={14} />
              ./projects.sh ({PROJECTS.length})
              <ArrowUpRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('shell')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold border border-[var(--accent-border)] bg-[var(--accent-dim)] accent-text hover:bg-[var(--accent)] hover:text-black transition-all"
            >
              <Terminal size={14} />
              open_shell
            </button>

            <button
              type="button"
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded text-xs font-medium border border-white/15 bg-black/40 text-zinc-200 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {copiedEmail ? <Check size={14} className="accent-text" /> : <Copy size={14} />}
              {copiedEmail ? 'COPIED_EMAIL' : PROFILE.email}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-white/10 bg-black/40 text-zinc-300 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-white/10 bg-black/40 text-zinc-300 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-white/10 bg-black/40 text-zinc-300 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <Mail size={14} />
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Telemetry Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PROFILE.telemetry.map((t) => (
          <div key={t.label} className="term-card rounded-lg px-4 py-3.5">
            <div className="text-[10px] tracking-widest text-zinc-500 uppercase">{t.label}</div>
            <div className="text-xl md:text-2xl font-bold accent-text accent-glow mt-1 tabular-nums">
              {t.value}
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">{t.sub}</div>
          </div>
        ))}
      </div>

      {/* Flagship Resume Projects Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Zap size={13} className="accent-text" />
            <span className="uppercase tracking-widest font-semibold text-zinc-300">
              FLAGSHIP_SYSTEMS
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-[11px] accent-text hover:underline flex items-center gap-1"
          >
            ls -la ./projects ({PROJECTS.length}) <ChevronRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onInspectProject(proj)}
              className="text-left term-card rounded-lg p-4 group cursor-pointer"
            >
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-zinc-500">
                  [{proj.id}] {proj.category} · {proj.year}
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--accent-dim)] accent-text border border-[var(--accent-border)] text-[10px] font-semibold">
                  {proj.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                  {proj.name}
                </h3>
                <ArrowUpRight
                  size={15}
                  className="text-zinc-500 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {proj.tagline}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] accent-text hover:underline inline-flex items-center gap-1"
                    >
                      LIVE <ExternalLink size={10} />
                    </a>
                  )}
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] text-zinc-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <Github size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   02. PROJECTS PANE (ls -la ./projects + grep search + GitHub profile banner)
   ============================================================================ */
const CATEGORIES: ('ALL' | ProjectCategory)[] = [
  'ALL',
  'AI & AGENTS',
  'APIs & DATA',
  'SYSTEMS & CLI',
  'WEB & EXT',
];

export const ProjectsPane: React.FC<{
  onInspectProject: (p: ProjectItem) => void;
}> = ({ onInspectProject }) => {
  const [filter, setFilter] = useState<'ALL' | ProjectCategory>('ALL');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    return PROJECTS.filter((p) => {
      const catMatch = filter === 'ALL' || p.category === filter;
      const q = query.trim().toLowerCase();
      if (!q) return catMatch;
      const hay = `${p.name} ${p.tagline} ${p.stack.join(' ')} ${p.category} ${p.lang}`.toLowerCase();
      return catMatch && hay.includes(q);
    });
  }, [filter, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="text-xs text-zinc-400">
          <span className="accent-text font-semibold">
            {PROFILE.handle}@{PROFILE.host}:~/projects$
          </span>{' '}
          <span className="text-zinc-200">
            ls -la {filter !== 'ALL' ? `--cat="${filter.toLowerCase()}"` : ''}{' '}
            {query.trim() ? `| grep -i "${query.trim()}"` : ''}
          </span>
        </div>

        {/* Search + CLI Flag Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="grep stack/name..."
              className="pl-7 pr-2.5 py-1 rounded border border-white/15 bg-black/50 text-[11px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)] w-44"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                    active
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-black font-bold'
                      : 'border-white/10 bg-black/40 text-zinc-400 hover:text-zinc-200 hover:border-white/25'
                  }`}
                >
                  --{cat.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-')}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      {visible.length === 0 ? (
        <div className="term-card rounded-lg p-8 text-center text-xs text-zinc-400">
          No repositories matched <span className="accent-text">&quot;{query}&quot;</span>. Try
          clearing the grep filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: Math.min(idx * 0.03, 0.2) }}
              onClick={() => onInspectProject(proj)}
              className="term-card rounded-lg p-5 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-3 mb-3 border-b border-white/10">
                  <span className="truncate">
                    {proj.permissions} &nbsp; {proj.lang} &nbsp; {proj.year}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--accent-dim)] accent-text border border-[var(--accent-border)] text-[10px] font-semibold shrink-0">
                    {proj.status}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest accent-text">
                      [{proj.id}] // {proj.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors mt-0.5">
                      {proj.name}
                    </h3>
                  </div>
                  <ArrowUpRight
                    size={17}
                    className="text-zinc-500 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                  />
                </div>

                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">{proj.tagline}</p>

                {/* Inline metrics */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {proj.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded bg-black/45 border border-white/5 px-2.5 py-2"
                    >
                      <div className="text-[9px] text-zinc-500 tracking-wider truncate">
                        {m.label}
                      </div>
                      <div className="text-xs font-bold text-zinc-100 mt-0.5 truncate">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] accent-text font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      LIVE <ExternalLink size={10} />
                    </a>
                  )}
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] text-zinc-300 hover:text-[var(--accent)] inline-flex items-center gap-1"
                  >
                    <Github size={12} />
                    CODE
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Full GitHub Archive CTA */}
      <a
        href={`${PROFILE.github}?tab=repositories`}
        target="_blank"
        rel="noreferrer"
        className="term-card rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-[var(--accent-dim)] border border-[var(--accent-border)] flex items-center justify-center accent-text shrink-0">
            <Github size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-[var(--accent)] transition-colors">
              EXPLORE ALL 33+ PUBLIC REPOSITORIES ON GITHUB
            </div>
            <div className="text-[11px] text-zinc-400">
              {PROFILE.github} — including Headsetter IoT/Bluetooth security, CineKeep, NutriPulse & more
            </div>
          </div>
        </div>
        <span className="text-xs accent-text font-semibold inline-flex items-center gap-1 shrink-0">
          git remote -v <ArrowUpRight size={14} />
        </span>
      </a>
    </div>
  );
};

/* ============================================================================
   03. STACK PANE (htop / system monitor)
   ============================================================================ */
export const StackPane: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
        <div>
          <span className="accent-text font-semibold">
            {PROFILE.handle}@{PROFILE.host}:~/stack$
          </span>{' '}
          <span className="text-zinc-200">htop --modules=all --sort=proficiency</span>
        </div>
        <div className="text-[11px] text-zinc-500">
          MODULES: <span className="accent-text">20 loaded</span> // RUNTIME:{' '}
          <span className="text-zinc-300">Python · TS · Cloud</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SKILL_GROUPS.map((group) => (
          <div key={group.id} className="term-card rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs">
              <span className="accent-text font-bold tracking-wider">{group.label}</span>
              <span className="text-[10px] text-zinc-500">{group.pid}</span>
            </div>

            <div className="space-y-4">
              {group.items.map((item) => {
                const segments = 16;
                const filled = Math.round((item.level / 100) * segments);
                return (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="text-zinc-100 font-semibold">{item.name}</span>
                      <span className="text-[11px] text-zinc-500 truncate hidden sm:inline">
                        {item.note}
                      </span>
                      <span className="accent-text font-bold tabular-nums shrink-0">
                        {item.level}%
                      </span>
                    </div>

                    {/* Segmented htop LED bar */}
                    <div
                      className="grid gap-1"
                      style={{ gridTemplateColumns: `repeat(${segments}, minmax(0, 1fr))` }}
                    >
                      {Array.from({ length: segments }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-[1px] transition-all ${
                            i < filled
                              ? 'bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]'
                              : 'bg-white/10'
                          }`}
                          style={{
                            opacity: i < filled ? 0.55 + (i / segments) * 0.45 : 1,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Toolbelt */}
      <div className="term-card rounded-lg p-5">
        <div className="text-[11px] uppercase tracking-widest text-zinc-400 mb-3">
          PRODUCTION_ECOSYSTEM_&_TOOLBELT
        </div>
        <div className="flex flex-wrap gap-2">
          {TOOLBELT.map((tool) => (
            <span
              key={tool}
              className="text-xs px-3 py-1.5 rounded border border-white/10 bg-black/45 text-zinc-200 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   04. EXPERIENCE PANE (Education + git log --graph + Achievements & Certs)
   ============================================================================ */
export const ExperiencePane: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-xs text-zinc-400">
        <span className="accent-text font-semibold">
          {PROFILE.handle}@{PROFILE.host}:~/experience$
        </span>{' '}
        <span className="text-zinc-200">git log --graph --decorate && ls -la ./certs</span>
      </div>

      {/* Education Banner */}
      <div className="term-card rounded-lg p-5 border-l-2 border-l-[var(--accent)]">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] mb-1.5">
          <span className="inline-flex items-center gap-1.5 accent-text font-bold uppercase tracking-wider">
            <GraduationCap size={14} />
            EDUCATION // ACTIVE DEGREE
          </span>
          <span className="text-zinc-400">{EDUCATION.period}</span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-white">{EDUCATION.institution}</h3>
        <div className="text-xs md:text-sm text-zinc-200 mt-0.5">{EDUCATION.degree}</div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
          <span>
            Specialization: <span className="accent-text">{EDUCATION.specialization}</span>
          </span>
          {EDUCATION.location && <span>{EDUCATION.location}</span>}
        </div>
      </div>

      {/* Experience Git Log */}
      <div className="relative pl-6 md:pl-8 space-y-4">
        <div
          className="absolute left-2.5 md:left-3.5 top-2 bottom-2 w-[2px]"
          style={{
            background:
              'linear-gradient(to bottom, var(--accent), rgba(var(--accent-rgb), 0.25) 85%, transparent)',
          }}
        />

        {EXPERIENCE.map((item, idx) => (
          <motion.div
            key={item.hash}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="relative term-card rounded-lg p-5"
          >
            <span className="absolute -left-[22px] md:-left-[26px] top-6 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[#06090b] shadow-[0_0_12px_var(--accent)]" />

            <div className="flex flex-wrap items-center gap-2 text-[11px] mb-2">
              <span className="inline-flex items-center gap-1 accent-text font-bold">
                <GitCommitHorizontal size={14} />
                {item.hash}
              </span>
              {item.branch && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--accent-dim)] accent-text border border-[var(--accent-border)] text-[10px]">
                  <GitBranch size={11} />
                  {item.branch}
                </span>
              )}
              <span className="text-zinc-400 ml-auto">{item.period}</span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base md:text-lg font-bold text-white">{item.role}</h3>
              <span className="text-xs accent-text font-semibold">
                @{item.company} ·{' '}
                <span className="text-zinc-400 font-normal">{item.location}</span>
              </span>
            </div>

            <p className="mt-2 text-xs md:text-[13px] text-zinc-300 leading-relaxed">
              {item.summary}
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-zinc-400 leading-relaxed">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="accent-text mt-0.5">+</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements & Certifications */}
      <div className="pt-2">
        <div className="flex items-center gap-2 text-xs text-zinc-300 uppercase tracking-widest font-semibold mb-3">
          <Award size={14} className="accent-text" />
          ACHIEVEMENTS_&_CERTIFICATIONS ({ACHIEVEMENTS.length})
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((ach) => (
            <div key={ach.id} className="term-card rounded-lg p-4 space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-[10px]">
                <span className="text-zinc-500">[{ach.id}] {ach.issuer}</span>
                <span className="px-2 py-0.5 rounded bg-[var(--accent-dim)] accent-text border border-[var(--accent-border)] font-semibold">
                  {ach.tag}
                </span>
              </div>
              <div className="text-xs md:text-[13px] font-bold text-white">{ach.title}</div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">{ach.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   05. CONTACT PANE (./send-packet.sh)
   ============================================================================ */
export const ContactPane: React.FC<{
  onCopyEmail: () => void;
  copiedEmail: boolean;
}> = ({ onCopyEmail, copiedEmail }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PROFILE.email
  )}&su=${encodeURIComponent(`[Portfolio] Message from ${name || 'Visitor'}`)}&body=${encodeURIComponent(
    `From: ${name} (${email})\n\n${message}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _subject: `[Portfolio] New message from ${name.trim()}`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success !== 'false' && data?.success !== false) {
        setStatus('sent');
      } else {
        setErrorMsg(
          data?.message || 'Could not deliver via FormSubmit. Use the direct Gmail link below.'
        );
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error sending message. Use the direct Gmail link below.');
      setStatus('error');
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-xs text-zinc-400">
        <span className="accent-text font-semibold">
          {PROFILE.handle}@{PROFILE.host}:~/contact$
        </span>{' '}
        <span className="text-zinc-200">./send-message.sh --to=&quot;{PROFILE.email}&quot;</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Direct Channels */}
        <div className="lg:col-span-5 term-card rounded-lg p-5 flex flex-col justify-between space-y-5">
          <div>
            <div className="text-[11px] uppercase tracking-widest accent-text font-semibold mb-2">
              OPEN_CHANNEL
            </div>
            <h3 className="text-xl font-bold text-white">Let&apos;s build something sharp.</h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Open to AI Engineering / Full-Stack internships, LLM agent collaborations, hackathons,
              and open-source builds. Reach out directly or send a message here.
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <button
              type="button"
              onClick={onCopyEmail}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded border border-white/10 bg-black/45 hover:border-[var(--accent)] transition-colors text-left"
            >
              <span className="flex items-center gap-2.5 text-zinc-200 truncate">
                <Mail size={15} className="accent-text shrink-0" />
                <span className="truncate">{PROFILE.email}</span>
              </span>
              <span className="text-[10px] accent-text uppercase tracking-wider shrink-0 ml-2">
                {copiedEmail ? 'COPIED!' : 'COPY'}
              </span>
            </button>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-3 rounded border border-white/10 bg-black/45 hover:border-[var(--accent)] transition-colors"
            >
              <span className="flex items-center gap-2.5 text-zinc-200 truncate">
                <Github size={15} className="accent-text shrink-0" />
                <span className="truncate">github.com/{PROFILE.githubUsername}</span>
              </span>
              <ArrowUpRight size={14} className="text-zinc-500 shrink-0" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-3 rounded border border-white/10 bg-black/45 hover:border-[var(--accent)] transition-colors"
            >
              <span className="flex items-center gap-2.5 text-zinc-200 truncate">
                <Linkedin size={15} className="accent-text shrink-0" />
                <span className="truncate">linkedin.com/in/hari-narayana</span>
              </span>
              <ArrowUpRight size={14} className="text-zinc-500 shrink-0" />
            </a>
          </div>
        </div>

        {/* Interactive Message Form */}
        <div className="lg:col-span-7 term-card rounded-lg p-5">
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full min-h-[280px] flex flex-col items-center justify-center text-center space-y-3 p-4"
            >
              <div className="h-11 w-11 rounded-full bg-[var(--accent-dim)] border border-[var(--accent)] flex items-center justify-center accent-text shadow-[0_0_24px_var(--accent-glow)]">
                <Check size={20} />
              </div>
              <div className="text-sm font-bold text-white tracking-wide">
                MESSAGE DELIVERED // 200 OK
              </div>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                Thanks, <span className="text-zinc-200">{name}</span>. Your message was sent to{' '}
                <span className="accent-text">{PROFILE.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setEmail('');
                  setMessage('');
                  setStatus('idle');
                }}
                className="mt-2 px-4 py-2 rounded border border-white/15 text-xs text-zinc-200 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                SEND ANOTHER MESSAGE
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full rounded border border-white/15 bg-black/55 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">
                    YOUR EMAIL *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full rounded border border-white/15 bg-black/55 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the AI role, project, or collaboration..."
                  className="w-full rounded border border-white/15 bg-black/55 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)] resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="rounded border border-rose-500/40 bg-rose-500/10 px-3.5 py-2.5 text-[11px] text-rose-300 flex flex-wrap items-center justify-between gap-2">
                  <span>{errorMsg}</span>
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-semibold text-white hover:text-[var(--accent)]"
                  >
                    Open in Gmail →
                  </a>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-zinc-400 hover:text-[var(--accent)] transition-colors"
                >
                  Or compose directly in Gmail →
                </a>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--accent)] text-black font-bold hover:opacity-90 disabled:opacity-60 transition-all shadow-[0_0_24px_-6px_var(--accent)]"
                >
                  <Send size={13} />
                  {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
