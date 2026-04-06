import os

html_path = r"c:\Users\Avvari\OneDrive\Desktop\JJK\index.html"
js_path = r"c:\Users\Avvari\OneDrive\Desktop\JJK\main.js"

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HARI_NARAYANA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet">
    <script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    termbg: "#0a0a0a",
                    primary: "#33ff00",
                    secondary: "#f59e0b",
                    muted: "#1f521f",
                },
                fontFamily: {
                    mono: ['"JetBrains Mono"', 'monospace'],
                }
            }
        }
    }
    </script>
    <style>
        body {
            background-color: #0a0a0a;
            color: #33ff00;
            font-family: 'JetBrains Mono', monospace;
            text-shadow: 0 0 5px rgba(51, 255, 0, 0.4);
            overflow-x: hidden;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .crt-overlay {
            position: fixed; inset: 0; pointer-events: none; z-index: 1000;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 4px, 3px 100%;
        }

        * { border-radius: 0 !important; }

        .hover-invert:hover {
            background-color: #33ff00; color: #0a0a0a; text-shadow: none;
        }

        .typing-prompt::after {
            content: '█';
            animation: blink 1s step-end infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }
        
        #ar-view {
            position: fixed; inset: 0; z-index: 999;
            background: #0a0a0a; color: #33ff00;
        }
        #ar-video {
            position: absolute; inset: 0; width: 100%; height: 100%;
            object-fit: cover; transform: scaleX(-1); opacity: 0.3;
            filter: grayscale(1) contrast(1.5) hue-rotate(80deg);
        }
        #ar-canvas { position: absolute; inset: 0; width: 100vw; height: 100vh; z-index: 15; transform: scaleX(-1); }
        #fx-canvas { position: absolute; inset: 0; width: 100vw; height: 100vh; z-index: 20; }
        .hud-element { position: absolute; z-index: 30; }
        
        .page-view {
            animation: fade-in 0.3s ease-in;
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body class="selection:bg-primary selection:text-termbg text-sm md:text-base">

<div class="crt-overlay"></div>
<canvas id="terminal-canvas" class="fixed inset-0 w-full h-full z-0 opacity-20 pointer-events-none"></canvas>

<!-- Header -->
<nav class="relative z-50 px-6 py-6 flex flex-col md:flex-row items-center justify-between border-b border-muted bg-termbg/80 backdrop-blur-sm">
    <div class="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
        <div class="font-extrabold text-5xl md:text-6xl tracking-tighter text-primary border border-primary inline-block p-1 shadow-[0_0_10px_rgba(51,255,0,0.4)] cursor-pointer" onclick="window.location.hash='#home'">
            HARI
        </div>
        <div class="text-[10px] text-primary tracking-widest mt-1 uppercase opacity-80">SYS_AUTH: ROOT</div>
    </div>
    
    <div class="flex gap-2 flex-wrap justify-center font-bold text-sm md:text-lg">
        <a href="#home" class="nav-link text-primary hover-invert px-2 py-1 transition-none">[ HOME ]</a>
        <a href="#projects" class="nav-link text-primary hover-invert px-2 py-1 transition-none">[ PROJECTS ]</a>
        <a href="#about" class="nav-link text-primary hover-invert px-2 py-1 transition-none">[ ABOUT ]</a>
        <a href="#contact" class="nav-link text-primary hover-invert px-2 py-1 transition-none">[ CONTACT ]</a>
        <a href="#" id="btn-ar" class="text-secondary border border-secondary hover:bg-secondary hover:text-termbg text-shadow-none px-2 py-1 ml-0 md:ml-4 transition-none">[ DEV_VISION ]</a>
    </div>
</nav>

<!-- AR View Overlay remains completely intact -->
<div id="ar-view" class="hidden">
    <div class="absolute top-0 left-0 w-full p-2 border-b border-primary bg-primary text-termbg font-bold z-50 flex justify-between">
        <span>[ SYSTEM.VISION.ACTIVE ]</span>
        <button id="close-ar" class="hover:bg-termbg hover:text-primary px-2 transition-none">[ KILL ]</button>
    </div>
    <video id="ar-video" autoplay playsinline></video>
    <canvas id="ar-canvas"></canvas>
    <canvas id="fx-canvas"></canvas>
    
    <div class="hud-element top-16 left-4 text-xs font-bold text-primary drop-shadow-md border border-primary p-4 bg-termbg/80">
        <div class="flex items-center gap-2 mb-2">
            <span class="animate-pulse">▶</span>
            <span id="ar-status-text" class="typing-prompt">AWAITING_INPUT</span>
        </div>
    </div>
</div>

<main id="app-container" class="relative z-10 flex-1 px-6 w-full max-w-7xl mx-auto flex flex-col justify-center py-12">
    
    <!-- ================= HOME PAGE ================= -->
    <div id="page-home" class="page-view flex flex-col justify-center">
        <section class="max-w-4xl p-8 border border-muted bg-termbg/80 backdrop-blur-sm shadow-[0_0_20px_rgba(31,82,31,0.2)]">
            <div class="text-secondary font-bold text-sm md:text-xl mb-6">
                user@portfolio:~$ <span class="text-primary typing-prompt">run user_info.sh --all</span>
            </div>

            <h1 class="text-5xl md:text-[6rem] lg:text-[7rem] font-black tracking-tighter leading-none mb-4 text-secondary">
                H.A.R.I.
            </h1>
            <h2 class="text-2xl md:text-5xl font-bold text-primary mb-8 uppercase tracking-widest leading-tight">
                FULL-STACK ARCHITECT
            </h2>
            
            <p class="text-primary opacity-80 md:text-lg lg:text-xl font-bold max-w-3xl mb-12 uppercase leading-tight">
                // BUILD ROBUST DIGITAL INFRASTRUCTURES<br/>
                // LOW-LEVEL EFFICIENCY / HIGH-LEVEL AESTHETICS<br/>
                // SYS.READY = TRUE
            </p>

            <div class="flex gap-4 flex-wrap">
                <a href="#contact" class="border border-primary bg-primary text-termbg hover:bg-termbg hover:text-primary font-bold text-lg px-6 py-4 transition-none inline-block shadow-[0_0_10px_rgba(51,255,0,0.5)]">
                    [ INITIATE_CONTACT ]
                </a>
                <a href="#projects" class="border border-muted text-primary hover-invert font-bold text-lg px-6 py-4 transition-none inline-block">
                    [ VIEW_DATASET ]
                </a>
            </div>
        </section>
    </div>

    <!-- ================= ABOUT PAGE ================= -->
    <div id="page-about" class="page-view hidden flex-col">
        <div class="text-secondary font-bold text-xl mb-6">user@portfolio:~$ <span class="text-primary typing-prompt">cat user_profile.md</span></div>
        
        <div class="border border-muted p-8 bg-termbg/90 shadow-[0_0_20px_rgba(31,82,31,0.2)]">
            <div class="border-b border-dashed border-muted pb-4 mb-6">
                <div class="text-muted text-xs mb-2">OBJECTIVE_SUMMARY</div>
                <p class="text-primary font-bold leading-relaxed text-base uppercase">
                    I am a full-stack architect specializing in high-performance cloud infrastructures and visual neural interfaces. My codebase is driven by the pursuit of low-latency efficiency and brutalist functional aesthetics. I build systems that scale without friction.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div class="text-muted text-xs mb-4">EXP_TIMELINE</div>
                    <div class="border-l-2 border-muted pl-4 ml-2 space-y-6">
                        <div>
                            <div class="text-secondary font-bold">2023-PRESENT: $ ENGINEER_ARCHITECT</div>
                            <div class="text-primary text-xs opacity-70">// HYDERABAD, INDIA</div>
                            <div class="text-primary text-xs mt-2 uppercase leading-relaxed">Lead the execution of core systems and microservices architecture. Rendered immersive interactions and optimized algorithmic payloads.</div>
                        </div>
                        <div>
                            <div class="text-secondary font-bold">2021-2023: $ DEV_OPERATIVE</div>
                            <div class="text-primary text-xs opacity-70">// SOFTWARE_NODE</div>
                            <div class="text-primary text-xs mt-2 uppercase leading-relaxed">System integration, backend routing, and database optimization.</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="text-muted text-xs mb-4">SKILL_MATRIX</div>
                    <div class="space-y-4 font-bold text-sm p-4 border border-muted bg-termbg">
                        <div class="flex justify-between items-center border-b border-muted pb-2">
                            <span class="text-primary">RUST_LANG</span>
                            <span class="text-secondary tracking-[0.1em] md:tracking-[0.2em]">[||||||||||--] 90%</span>
                        </div>
                        <div class="flex justify-between items-center border-b border-muted pb-2">
                            <span class="text-primary">TYPESCRIPT</span>
                            <span class="text-secondary tracking-[0.1em] md:tracking-[0.2em]">[|||||||||---] 85%</span>
                        </div>
                        <div class="flex justify-between items-center border-b border-muted pb-2">
                            <span class="text-primary">KUBERNETES</span>
                            <span class="text-secondary tracking-[0.1em] md:tracking-[0.2em]">[|||||||-----] 70%</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-primary">REACT_WEBGL</span>
                            <span class="text-secondary tracking-[0.1em] md:tracking-[0.2em]">[|||||||||---] 85%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ================= PROJECTS PAGE ================= -->
    <div id="page-projects" class="page-view hidden flex-col">
        <div class="text-secondary font-bold text-xl mb-6">user@portfolio:~$ <span class="text-primary typing-prompt">ls -la ./projects</span></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- P1 -->
            <div class="border border-muted hover:border-primary bg-termbg/80 backdrop-blur p-6 group transition-none">
                <div class="flex justify-between items-baseline border-b border-dashed border-muted pb-2 mb-4">
                    <h3 class="text-secondary font-bold text-lg group-hover:text-termbg group-hover:bg-secondary px-2 transition-none">./DOMAIN_EXPANSION</h3>
                    <span class="text-xs text-muted">SIZE: 4.2MB</span>
                </div>
                <div class="text-center py-6 mb-4">
                    <div class="text-primary opacity-50 mb-2 text-xs">++ ALGORITHM_LOADED ++</div>
                    <div class="text-primary font-bold tracking-[0.3em]">[||||||||||||] 100%</div>
                </div>
                <p class="text-sm text-primary mb-6 uppercase h-20 opacity-80">Vision model integration utilizing MediaPipe hand-tracking algorithms with WebGL 3D projections mapped in real-time.</p>
                <a href="https://github.com/harinarayana1457-cmyk" target="_blank" class="block w-full text-center border border-primary text-primary hover-invert py-2 font-bold transition-none">
                    > COMPILE_AND_VIEW
                </a>
            </div>

            <!-- P2 -->
            <div class="border border-muted hover:border-primary bg-termbg/80 backdrop-blur p-6 group transition-none">
                <div class="flex justify-between items-baseline border-b border-dashed border-muted pb-2 mb-4">
                    <h3 class="text-secondary font-bold text-lg group-hover:text-termbg group-hover:bg-secondary px-2 transition-none">./LIQUID_GLASS_API</h3>
                    <span class="text-xs text-muted">SIZE: 1.8MB</span>
                </div>
                <div class="text-center py-6 mb-4">
                    <div class="text-primary opacity-50 mb-2 text-xs">++ RENDER_STATE ++</div>
                    <div class="text-primary font-bold tracking-[0.3em]">[|||||||.....] 65%</div>
                </div>
                <p class="text-sm text-primary mb-6 uppercase h-20 opacity-80">Custom displacement shaders utilizing SVG feTurbulence for functional UI components and responsive refractive distortion.</p>
                <a href="https://github.com/harinarayana1457-cmyk" target="_blank" class="block w-full text-center border border-primary text-primary hover-invert py-2 font-bold transition-none">
                    > COMPILE_AND_VIEW
                </a>
            </div>
            
            <!-- P3 -->
            <div class="border border-muted hover:border-primary bg-termbg/80 backdrop-blur p-6 group transition-none md:col-span-2">
                <div class="flex justify-between items-baseline border-b border-dashed border-muted pb-2 mb-4">
                    <h3 class="text-secondary font-bold text-lg group-hover:text-termbg group-hover:bg-secondary px-2 transition-none">./WEB_SOCKET_GRID</h3>
                    <span class="text-xs text-muted">SIZE: 8.9MB</span>
                </div>
                <p class="text-sm text-primary mb-6 uppercase opacity-80 max-w-3xl">Distributed system overlay pushing real-time analytics packets across global nodes using secure token validation and raw socket drops.</p>
                <a href="https://github.com/harinarayana1457-cmyk" target="_blank" class="inline-block border border-primary text-primary hover-invert py-2 px-8 font-bold transition-none">
                    > COMPILE_AND_VIEW
                </a>
            </div>
        </div>
    </div>

    <!-- ================= CONTACT PAGE ================= -->
    <div id="page-contact" class="page-view hidden flex-col justify-center items-center">
        <div class="w-full max-w-2xl border border-muted bg-termbg/90 p-8 shadow-[0_0_20px_rgba(31,82,31,0.2)]">
            <div class="text-secondary font-bold mb-8 text-lg">
                user@portfolio:~$ <span class="text-primary typing-prompt">./transmit_payload.sh --secure</span>
            </div>
            
            <form action="mailto:harinarayana1457@gmail.com" method="post" enctype="text/plain" class="space-y-6">
                <div>
                    <div class="text-muted text-xs mb-1">ENV: USER_IDENTIFIER</div>
                    <div class="flex items-center font-bold">
                        <span class="mr-3 text-secondary">></span>
                        <input type="text" placeholder="GUEST_01" class="w-full bg-transparent border-b border-muted text-primary focus:outline-none focus:border-primary focus:shadow-[0_4px_10px_rgba(51,255,0,0.1)] py-2 font-mono caret-primary uppercase">
                    </div>
                </div>
                <div>
                    <div class="text-muted text-xs mb-1">ENV: TARGET_ADDRESS (SENDER)</div>
                    <div class="flex items-center font-bold">
                        <span class="mr-3 text-secondary">></span>
                        <input type="email" placeholder="NULL@DOMAIN.COM" class="w-full bg-transparent border-b border-muted text-primary focus:outline-none focus:border-primary focus:shadow-[0_4px_10px_rgba(51,255,0,0.1)] py-2 font-mono caret-primary uppercase">
                    </div>
                </div>
                <div>
                    <div class="text-muted text-xs mb-1">DATA: PAYLOAD_BUFFER</div>
                    <div class="flex items-start font-bold mt-2">
                        <span class="mr-3 text-secondary">></span>
                        <textarea rows="4" placeholder="ENTER SYSTEM DIRECTIVES..." class="w-full bg-transparent border border-muted text-primary focus:outline-none focus:border-primary focus:shadow-[0_4px_10px_rgba(51,255,0,0.1)] p-3 font-mono caret-primary resize-none uppercase"></textarea>
                    </div>
                </div>
                
                <div class="pt-4 border-t border-dashed border-muted mt-8">
                    <button type="submit" class="w-full border border-primary bg-primary text-termbg px-6 py-4 hover:bg-termbg hover:text-primary transition-none font-bold text-lg uppercase tracking-widest shadow-[0_0_10px_rgba(51,255,0,0.4)]">
                        [ TRANSMIT_PACKET ]
                    </button>
                    <div class="text-center text-muted text-[10px] mt-4">ENCRYPTION: STANDARD // PROTOCOL: HTTP_MAILTO</div>
                </div>
            </form>
        </div>
    </div>

</main>

<!-- Footer -->
<footer class="relative z-10 w-full mt-auto border-t flex flex-col md:flex-row border-muted bg-termbg text-[10px] md:text-xs text-primary font-mono tracking-widest pt-0">
    <div class="p-3 border-b md:border-b-0 md:border-r border-muted flex gap-2 w-full md:w-auto items-center">
        <span class="bg-primary text-termbg px-2 font-bold whitespace-nowrap">CORE</span>
        <span class="whitespace-nowrap uppercase opacity-80">SYS_OPERATIONAL: 8080 : OK</span>
    </div>
    <a href="https://github.com/harinarayana1457-cmyk" target="_blank" class="p-3 border-b md:border-b-0 md:border-r border-muted w-full md:w-auto hover:bg-primary hover:text-termbg transition-none uppercase text-center font-bold">
        GITHUB // HARI_CMYK
    </a>
    <a href="https://www.linkedin.com/in/hari-narayana-035ba1389/?skipRedirect=true" target="_blank" class="p-3 w-full md:w-auto border-b md:border-b-0 border-muted hover:bg-primary hover:text-termbg transition-none uppercase text-center font-bold">
        LINKEDIN // HARI.DEV
    </a>
    <div class="p-3 w-full md:w-auto md:ml-auto opacity-50 uppercase whitespace-nowrap md:border-l border-muted text-center md:text-right">
        BUILD_V2.0 // (C) 2026 SYS.LABS
    </div>
</footer>

<script type="module" src="/main.js"></script>
<script>
    // Pure Vanilla JS Router logic inside index.html for maximum reliability
    function handleRoute() {
        const hash = window.location.hash || '#home';
        const pages = ['#home', '#about', '#projects', '#contact'];
        
        pages.forEach(page => {
            const el = document.getElementById('page-' + page.substring(1));
            // Toggle active classes
            if (el) {
                if (hash === page) {
                    el.classList.remove('hidden');
                    el.classList.add('flex');
                } else {
                    el.classList.remove('flex');
                    el.classList.add('hidden');
                }
            }
        });
        
        // Update Nav Menu active states
        document.querySelectorAll('.nav-link').forEach(link => {
            if(link.getAttribute('href') === hash) {
                link.classList.add('bg-primary', 'text-termbg');
                link.classList.remove('text-primary');
            } else {
                link.classList.remove('bg-primary', 'text-termbg');
                link.classList.add('text-primary');
            }
        });
    }

    window.addEventListener('hashchange', handleRoute);
    document.addEventListener('DOMContentLoaded', handleRoute);
</script>
</body>
</html>
