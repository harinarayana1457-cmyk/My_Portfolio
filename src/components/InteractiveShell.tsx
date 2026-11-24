import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';
import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  THEME_PRESETS,
  ThemePreset,
} from '../data/portfolio';

export type TabId = 'overview' | 'projects' | 'stack' | 'experience' | 'contact' | 'shell';

export interface ShellEntry {
  id: number;
  command?: string;
  lines: { text: string; tone?: 'normal' | 'accent' | 'muted' | 'error' | 'warn' }[];
}

interface InteractiveShellProps {
  entries: ShellEntry[];
  onExecute: (raw: string) => void;
  commandHistory: string[];
}

export const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'neofetch',
  'ls',
  'projects',
  'open',
  'skills',
  'experience',
  'education',
  'certs',
  'github',
  'contact',
  'theme',
  'crt',
  'sudo hire',
  'date',
  'echo',
  'clear',
  'reboot',
];

const QUICK_CHIPS = [
  'help',
  'neofetch',
  'ls projects',
  'certs',
  'education',
  'theme cyan',
  'theme amber',
  'sudo hire',
  'clear',
];

export function buildWelcomeEntry(): ShellEntry {
  return {
    id: 1,
    lines: [
      {
        text: `Welcome to HARI_NARAYANA [${PROFILE.version}] — NODE // ALPHA (WebGL2 CRT)`,
        tone: 'accent',
      },
      {
        text: `Type 'help' to list commands, 'ls projects' to browse GitHub builds, or TAB to autocomplete.`,
        tone: 'muted',
      },
    ],
  };
}

export function runShellCommand(
  raw: string,
  actions: {
    setTab: (tab: TabId) => void;
    openProjectByIndex: (idx: number) => boolean;
    setThemeById: (id: ThemePreset['id']) => boolean;
    setCrtPreset: (mode: 'pause' | 'play' | 'glitch' | 'calm') => void;
    clear: () => void;
    reboot: () => void;
  }
): ShellEntry['lines'] | null {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  const lower = trimmed.toLowerCase();
  const [cmd, ...args] = trimmed.split(/\s+/);
  const cmdLower = cmd.toLowerCase();
  const argStr = args.join(' ').toLowerCase();

  if (cmdLower === 'clear' || cmdLower === 'cls') {
    actions.clear();
    return null;
  }

  if (cmdLower === 'reboot') {
    actions.reboot();
    return [{ text: 'Initiating cold reboot sequence...', tone: 'warn' }];
  }

  if (cmdLower === 'help' || cmdLower === '?') {
    return [
      { text: 'AVAILABLE COMMANDS:', tone: 'accent' },
      { text: '  whoami                 Display Hari Narayana profile & status', tone: 'normal' },
      { text: '  neofetch               Print system + developer specs', tone: 'normal' },
      { text: '  ls [projects]          List curated GitHub repositories', tone: 'normal' },
      { text: `  open <01-${String(PROJECTS.length).padStart(2, '0')}>           Inspect project README modal`, tone: 'normal' },
      { text: '  cd <section>           Jump to overview|projects|stack|experience|contact', tone: 'normal' },
      { text: '  skills                 Output technical capability matrix', tone: 'normal' },
      { text: '  experience             Print git-style career commit log', tone: 'normal' },
      { text: '  education              Print VIT degree & specialization', tone: 'normal' },
      { text: '  certs                  List certifications, fellowships & honors', tone: 'normal' },
      { text: '  github                 Print GitHub profile & flagship repo links', tone: 'normal' },
      { text: '  contact                Show direct email, GitHub & LinkedIn', tone: 'normal' },
      { text: '  theme <name>           Switch phosphor: emerald|cyan|amber|violet|mono', tone: 'normal' },
      { text: '  crt <mode>             Control shader: pause|play|glitch|calm', tone: 'normal' },
      { text: '  sudo hire              Run priority recruitment handshake', tone: 'normal' },
      { text: '  clear / reboot         Clear buffer or replay CRT boot', tone: 'normal' },
    ];
  }

  if (cmdLower === 'whoami') {
    return [
      { text: `${PROFILE.fullName} — ${PROFILE.role}`, tone: 'accent' },
      { text: PROFILE.headline, tone: 'normal' },
      { text: `Education : ${EDUCATION.institution} (${EDUCATION.period})`, tone: 'muted' },
      { text: `Location  : ${PROFILE.location}`, tone: 'muted' },
      { text: `Status    : ${PROFILE.status}`, tone: 'accent' },
    ];
  }

  if (cmdLower === 'neofetch') {
    return [
      { text: ` _   _    _    ____  ___    ${PROFILE.handle}@${PROFILE.host} [${PROFILE.version}]`, tone: 'accent' },
      { text: `| | | |  / \\  |  _ \\|_ _|   ------------------------------`, tone: 'accent' },
      { text: `| |_| | / _ \\ | |_) || |    USER   : ${PROFILE.specs[0].value}`, tone: 'normal' },
      { text: `|  _  |/ ___ \\|  _ < | |    NODE   : ${PROFILE.specs[1].value}`, tone: 'normal' },
      { text: `|_| |_/_/   \\_\\_| \\_\\___|   ROLE   : ${PROFILE.specs[2].value}`, tone: 'normal' },
      { text: `                            CORE   : ${PROFILE.specs[3].value}`, tone: 'normal' },
      { text: `                            AI_OPS : ${PROFILE.specs[4].value}`, tone: 'normal' },
      { text: `                            GITHUB : ${PROFILE.github}`, tone: 'muted' },
    ];
  }

  if (cmdLower === 'ls' || cmdLower === 'projects') {
    if (cmdLower === 'ls' && !argStr) {
      return [
        { text: 'drwxr-xr-x  overview/     drwxr-xr-x  projects/  (12 curated / 33+ GitHub)', tone: 'accent' },
        { text: 'drwxr-xr-x  stack/        drwxr-xr-x  experience/', tone: 'accent' },
        { text: 'drwxr-xr-x  certs/        -rw-r--r--  bio.md', tone: 'normal' },
        { text: `Tip: run 'ls projects' or 'open 1' to inspect CartWeave.`, tone: 'muted' },
      ];
    }
    return [
      { text: `total ${PROJECTS.length} curated repos (${PROFILE.github}):`, tone: 'muted' },
      ...PROJECTS.map((p) => ({
        text: `[${p.id}] ${p.name.padEnd(20)} (${p.status.padEnd(8)}) ${p.tagline}`,
        tone: p.featured ? ('accent' as const) : ('normal' as const),
      })),
      { text: `Run 'open 1' .. 'open ${PROJECTS.length}' to inspect README.md`, tone: 'accent' },
    ];
  }

  if (cmdLower === 'cat') {
    if (argStr.includes('bio')) {
      return [
        { text: `# ${PROFILE.name} // BIO.MD`, tone: 'accent' },
        ...PROFILE.bio.map((b) => ({ text: b, tone: 'normal' as const })),
      ];
    }
    return [{ text: `cat: ${args[0] || '(missing file)'}: try 'cat bio.md'`, tone: 'error' }];
  }

  if (cmdLower === 'open') {
    const num = parseInt(args[0] || '', 10);
    if (!Number.isNaN(num) && actions.openProjectByIndex(num - 1)) {
      return [
        {
          text: `Opening README.md for [${String(num).padStart(2, '0')}] ${PROJECTS[num - 1].name}...`,
          tone: 'accent',
        },
      ];
    }
    return [{ text: `Usage: open <1-${PROJECTS.length}>`, tone: 'error' }];
  }

  if (cmdLower === 'cd') {
    const target = argStr.replace(/^\.?\//, '').replace(/\/$/, '');
    const map: Record<string, TabId> = {
      '~': 'overview',
      home: 'overview',
      overview: 'overview',
      projects: 'projects',
      work: 'projects',
      stack: 'stack',
      skills: 'stack',
      experience: 'experience',
      log: 'experience',
      certs: 'experience',
      contact: 'contact',
      shell: 'shell',
    };
    if (map[target]) {
      actions.setTab(map[target]);
      return [{ text: `Switched workspace -> ~/${map[target]}`, tone: 'accent' }];
    }
    return [
      {
        text: `cd: no such directory: '${target || ''}'. Try overview, projects, stack, experience, contact.`,
        tone: 'error',
      },
    ];
  }

  if (cmdLower === 'skills' || cmdLower === 'stack') {
    const out: ShellEntry['lines'] = [];
    SKILL_GROUPS.forEach((g) => {
      out.push({ text: `[${g.label}]`, tone: 'accent' });
      g.items.forEach((item) => {
        const blocks = Math.round(item.level / 10);
        const bar = '█'.repeat(blocks) + '░'.repeat(10 - blocks);
        out.push({
          text: `  ${item.name.padEnd(24)} [${bar}] ${item.level}%`,
          tone: 'normal',
        });
      });
    });
    return out;
  }

  if (cmdLower === 'experience' || cmdLower === 'git') {
    return EXPERIENCE.map((e) => ({
      text: `* ${e.hash} (${e.period}) ${e.role} @ ${e.company}`,
      tone: 'normal',
    }));
  }

  if (cmdLower === 'education' || cmdLower === 'edu') {
    return [
      { text: `${EDUCATION.institution}`, tone: 'accent' },
      { text: `Degree         : ${EDUCATION.degree}`, tone: 'normal' },
      { text: `Specialization : ${EDUCATION.specialization}`, tone: 'normal' },
      { text: `Timeline       : ${EDUCATION.period}`, tone: 'muted' },
    ];
  }

  if (cmdLower === 'certs' || cmdLower === 'achievements') {
    return [
      { text: `ACHIEVEMENTS & CERTIFICATIONS (${ACHIEVEMENTS.length}):`, tone: 'accent' },
      ...ACHIEVEMENTS.map((a) => ({
        text: `  [${a.tag.padEnd(10)}] ${a.title} — ${a.issuer}`,
        tone: 'normal' as const,
      })),
    ];
  }

  if (cmdLower === 'github') {
    return [
      { text: `GITHUB PROFILE -> ${PROFILE.github} (33+ public repositories)`, tone: 'accent' },
      ...PROJECTS.slice(0, 6).map((p) => ({
        text: `  ${p.name.padEnd(20)} ${p.repoUrl}`,
        tone: 'normal' as const,
      })),
    ];
  }

  if (cmdLower === 'contact') {
    return [
      { text: 'DIRECT ENDPOINTS:', tone: 'accent' },
      { text: `  EMAIL    -> ${PROFILE.email}`, tone: 'normal' },
      { text: `  GITHUB   -> ${PROFILE.github}`, tone: 'normal' },
      { text: `  LINKEDIN -> ${PROFILE.linkedin}`, tone: 'normal' },
      { text: `Tip: run 'cd contact' to send a message packet.`, tone: 'muted' },
    ];
  }

  if (cmdLower === 'theme') {
    const chosen = argStr as ThemePreset['id'];
    if (actions.setThemeById(chosen)) {
      return [{ text: `Phosphor CRT theme switched to [${chosen.toUpperCase()}].`, tone: 'accent' }];
    }
    return [
      {
        text: `Available themes: ${THEME_PRESETS.map((t) => t.id).join(' | ')}`,
        tone: 'warn',
      },
    ];
  }

  if (cmdLower === 'crt') {
    if (argStr === 'pause' || argStr === 'play' || argStr === 'glitch' || argStr === 'calm') {
      actions.setCrtPreset(argStr);
      return [{ text: `CRT shader mode -> ${argStr.toUpperCase()}`, tone: 'accent' }];
    }
    return [{ text: 'Usage: crt <pause|play|glitch|calm>', tone: 'warn' }];
  }

  if (lower === 'sudo hire' || lower === 'sudo hire hari') {
    actions.setTab('contact');
    return [
      { text: '[sudo] access granted: PRIORITY_RECRUITER_CHANNEL unlocked.', tone: 'accent' },
      { text: `Routing to ./send-packet.sh (${PROFILE.email})...`, tone: 'normal' },
    ];
  }

  if (cmdLower === 'date') {
    return [{ text: new Date().toString(), tone: 'normal' }];
  }

  if (cmdLower === 'echo') {
    return [{ text: args.join(' '), tone: 'normal' }];
  }

  return [
    {
      text: `zsh: command not found: ${cmd}. Type 'help' to see available commands.`,
      tone: 'error',
    },
  ];
}

export const InteractiveShell: React.FC<InteractiveShellProps> = ({
  entries,
  onExecute,
  commandHistory,
}) => {
  const [input, setInput] = useState('');
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onExecute(input);
    setInput('');
    setHistIdx(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const next = histIdx < commandHistory.length - 1 ? histIdx + 1 : histIdx;
      setHistIdx(next);
      setInput(commandHistory[commandHistory.length - 1 - next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInput('');
      } else {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(commandHistory[commandHistory.length - 1 - next] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (!val) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(val));
      if (match) setInput(match);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-col h-full min-h-[460px] cursor-text"
    >
      {/* Quick command chips */}
      <div className="flex flex-wrap items-center gap-1.5 pb-3 mb-4 border-b border-white/10">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 mr-1 flex items-center gap-1">
          <Terminal size={12} className="accent-text" />
          RUN:
        </span>
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExecute(chip);
            }}
            className="text-[11px] px-2.5 py-1 rounded border border-white/10 bg-black/40 text-zinc-300 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Scrollable output */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs md:text-[13px] leading-relaxed">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.command && (
              <div className="flex items-center gap-2">
                <span className="accent-text font-semibold">
                  {PROFILE.handle}@{PROFILE.host}:~$
                </span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            <div className="space-y-0.5 pl-0 md:pl-2">
              {entry.lines.map((line, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap font-mono ${
                    line.tone === 'accent'
                      ? 'accent-text'
                      : line.tone === 'error'
                        ? 'text-rose-400'
                        : line.tone === 'warn'
                          ? 'text-amber-300'
                          : line.tone === 'muted'
                            ? 'text-zinc-500'
                            : 'text-zinc-200'
                  }`}
                >
                  {line.text}
                </pre>
              ))}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Prompt input */}
      <form
        onSubmit={submit}
        className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs md:text-sm"
      >
        <span className="accent-text font-semibold shrink-0">
          {PROFILE.handle}@{PROFILE.host}:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          placeholder="type 'help', 'neofetch', 'certs', 'theme cyan', 'open 1'..."
          className="w-full bg-transparent text-white placeholder:text-zinc-600 focus:outline-none"
        />
      </form>
    </div>
  );
};
