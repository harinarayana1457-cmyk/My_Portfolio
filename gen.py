import os

html_path = r"c:\Users\Avvari\OneDrive\Desktop\JJK\index.html"
js_path = r"c:\Users\Avvari\OneDrive\Desktop\JJK\main.js"

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>root@hari_narayana:~#</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet"/>
<script>
tailwind.config = {
    theme: {
        extend: {
            colors: {
                termbg: "#0a0a0a",
                primary: "#33ff00",
                secondary: "#ffb000",
                muted: "#1f521f",
                error: "#ff3333"
            },
            fontFamily: {
                mono: ["Fira Code", "monospace"],
            }
        }
    }
}
</script>
<style>
    body {
        background-color: #0a0a0a;
        color: #33ff00;
        font-family: "Fira Code", monospace;
        overflow-x: hidden;
        text-shadow: 0 0 5px rgba(51, 255, 0, 0.4);
    }
    
    .crt-overlay {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 1000;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 4px, 3px 100%;
    }

    * { border-radius: 0 !important; }

    .typing-demo {
        animation: typing 2s steps(40, end), blink-caret .75s step-end infinite;
        white-space: nowrap;
        overflow: hidden;
        border-right: 0.15em solid #33ff00;
    }

    @keyframes typing { from { width: 0 } to { width: 100% } }
    @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: #33ff00; }
    }

    .hover-invert:hover {
        background-color: #33ff00; color: #0a0a0a; text-shadow: none;
    }
    .hover-invert-sec:hover {
        background-color: #ffb000; color: #0a0a0a; text-shadow: none;
    }

    #ar-view {
        position: fixed; inset: 0; z-index: 999;
        background: #0a0a0a; color: #33ff00; border: 2px solid #33ff00;
    }
    #ar-video {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; transform: scaleX(-1); opacity: 0.4;
        filter: grayscale(1) contrast(1.5) sepia(1) hue-rotate(80deg);
    }
    #ar-canvas { position: absolute; inset: 0; width: 100vw; height: 100vh; z-index: 15; transform: scaleX(-1); }
    #fx-canvas { position: absolute; inset: 0; width: 100vw; height: 100vh; z-index: 20; }
    .hud-element { position: absolute; z-index: 30; }
</style>
</head>
<body class="selection:bg-primary selection:text-termbg text-sm md:text-base">

<div class="crt-overlay"></div>
<canvas id="terminal-canvas" class="fixed inset-0 w-full h-full z-0 opacity-20 pointer-events-none"></canvas>

<nav class="fixed top-0 left-0 w-full z-50 p-4 border-b border-muted bg-termbg/90 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between" id="top-nav">
    <div class="font-bold">>_ HARI_NARAYANA [v1.0.0]</div>
    <div class="flex gap-4 mt-2 md:mt-0 font-bold">
        <a href="#projects" class="text-muted hover-invert px-2 py-0.5 cursor-pointer transition-none">[ PROJECTS_DIR ]</a>
        <a href="#" class="text-primary hover-invert px-2 py-0.5 cursor-pointer transition-none" id="btn-ar">[ INIT_AR_VISION ]</a>
    </div>
</nav>

<div id="ar-view" class="hidden">
    <div class="absolute top-0 left-0 w-full p-2 border-b border-primary bg-primary text-termbg font-bold z-50 flex justify-between">
        <span>[ SYSTEM.VISION.ACTIVE ]</span>
        <button id="close-ar" class="hover:bg-termbg hover:text-primary px-2 transition-none">[ KILL_PROC ]</button>
    </div>
    <video id="ar-video" autoplay playsinline></video>
    <canvas id="ar-canvas"></canvas>
    <canvas id="fx-canvas"></canvas>
    
    <div class="hud-element top-16 left-4 text-xs font-bold text-primary drop-shadow-md border border-primary p-4 bg-termbg/80">
        <div class="flex items-center gap-2 mb-2">
            <span class="animate-pulse">▶</span>
            <span id="ar-status-text">INIT_HAND_TRACKING...</span>
        </div>
        <div class="h-px w-full bg-primary mb-2 opacity-50"></div>
        <div id="active-technique" class="text-2xl text-secondary mt-2 opacity-0"></div>
    </div>
    
    <div class="hud-element bottom-8 left-1/2 -translate-x-1/2 border border-primary bg-termbg/90 p-4 flex gap-6 text-primary whitespace-nowrap shadow-[0_0_15px_rgba(51,255,0,0.2)]">
        <div class="text-center group"><div class="mb-1 text-secondary">✊</div><div class="text-[10px]">>_ FLASH</div></div>
        <div class="text-center"><div class="mb-1 text-secondary">🖐️</div><div class="text-[10px]">>_ VOID</div></div>
        <div class="text-center"><div class="mb-1 text-secondary">☝️</div><div class="text-[10px]">>_ BLUE</div></div>
        <div class="text-center"><div class="mb-1 text-secondary">🤟</div><div class="text-[10px]">>_ PURPLE</div></div>
    </div>
</div>

<main class="relative z-10 pt-24 px-4 w-full max-w-[1200px] mx-auto min-h-screen flex flex-col">
    <section id="hero-section" class="border border-muted p-6 mb-8 mt-12 shadow-[0_0_15px_rgba(31,82,31,0.2)] bg-termbg/80 backdrop-blur-sm">
        <h1 class="mb-8">
            <div class="typing-demo font-bold text-lg md:text-2xl">>_ init_portfolio.sh</div>
        </h1>
        <pre class="text-[10px] md:text-[14px] leading-tight text-primary font-bold overflow-hidden border-b border-dashed border-muted pb-4 mb-4">
 _   _    _    ____  ___   _   _    _    ____    _ __   __   _    _   _    _    
| | | |  / \  |  _ \|_ _| | \ | |  / \  |  _ \  / \\ \ / /  / \  | \ | |  / \   
| |_| | / _ \ | |_) || |  |  \| | / _ \ | |_) |/ _ \\ V /  / _ \ |  \| | / _ \  
|  _  |/ ___ \|  _ < | |  | |\  |/ ___ \|  _ </ ___ \| |  / ___ \| |\  |/ ___ \ 
|_| |_/_/   \_\_| \_\___| |_| \_/_/   \_\_| \_\_/   \_\_| /_/   \_\_| \_/_/   \_\
        </pre>
        <div class="flex flex-col gap-2 text-muted uppercase text-xs md:text-sm">
            <div><span class="text-primary">></span> STATUS: <span class="text-primary">[ ONLINE ]</span></div>
            <div><span class="text-primary">></span> DOMAIN: <span class="text-secondary">DIGITAL_INTERFACE && ALGORITHMS</span></div>
            <div><span class="text-primary">></span> LOAD:   <span class="text-primary">[||||||||--] 80%</span></div>
        </div>
    </section>

    <section id="projects" class="mb-12">
        <div class="border border-muted border-b-0 p-2 bg-muted text-termbg font-bold flex justify-between">
            <span>+-- ls ./projects --+</span>
            <span><span class="animate-pulse">_</span></span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border border-muted bg-termbg/80 backdrop-blur">
            <div class="border-b md:border-b-0 md:border-r border-muted p-6 flex flex-col group">
                <div class="flex justify-between items-center border-b border-dashed border-muted pb-2 mb-4">
                    <span class="text-secondary">./eco_store</span>
                    <span class="text-[10px]">[E-COMMERCE]</span>
                </div>
                <div class="text-center py-8 mb-6 font-bold text-muted group-hover:text-primary transition-colors duration-300">
                    <div class="opacity-50 mb-2">++ DATA MAPPED ++</div>
                    [||||||||..] 80%
                </div>
                <button class="w-full border border-primary text-primary hover-invert py-2 mt-auto font-bold transition-none">
                    > EXECUTE_VIEW
                </button>
            </div>
            <div class="border-b md:border-b-0 md:border-r border-muted p-6 flex flex-col group">
                <div class="flex justify-between items-center border-b border-dashed border-muted pb-2 mb-4">
                    <span class="text-secondary">./lens_logic</span>
                    <span class="text-[10px]">[PHOTOGRAPHY]</span>
                </div>
                <div class="text-center py-8 mb-6 font-bold text-muted group-hover:text-primary transition-colors duration-300">
                    <div class="opacity-50 mb-2">++ RENDERING ++</div>
                    [|||||.....] 50%
                </div>
                <button class="w-full border border-primary text-primary hover-invert py-2 mt-auto font-bold transition-none">
                    > EXECUTE_VIEW
                </button>
            </div>
            <div class="p-6 flex flex-col group">
                <div class="flex justify-between items-center border-b border-dashed border-muted pb-2 mb-4">
                    <span class="text-secondary">./motion_ui</span>
                    <span class="text-[10px]">[FRONTEND]</span>
                </div>
                <div class="text-center py-8 mb-6 font-bold text-muted group-hover:text-primary transition-colors duration-300">
                    <div class="opacity-50 mb-2">++ COMPILED ++</div>
                    [||||||||||] 100%
                </div>
                <button class="w-full border border-primary text-primary hover-invert py-2 mt-auto font-bold transition-none">
                    > EXECUTE_VIEW
                </button>
            </div>
        </div>
    </section>

    <footer id="footer-section" class="mt-auto border border-primary p-4 bg-termbg/90 mb-8 border-dashed flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[inset_0_0_20px_rgba(51,255,0,0.1)]">
        <div class="w-full md:w-1/2 border border-muted p-4">
            <h4 class="text-secondary mb-4">> ./contact --input mailto</h4>
            <div class="flex flex-col gap-2">
                <div><span class="text-muted">user@node:~$ </span><a href="mailto:harinarayana1457@gmail.com" class="text-primary hover-invert transition-none">SEND_SIGNAL</a></div>
            </div>
        </div>
        <div class="w-full md:w-1/2 grid grid-cols-2 gap-4 text-xs font-bold uppercase">
            <a href="https://www.linkedin.com/in/hari-narayana-035ba1389/?skipRedirect=true" target="_blank" rel="noopener noreferrer" class="border border-muted text-center py-2 hover-invert transition-none">> LinkedIn</a>
            <a href="https://github.com/harinarayana1457-cmyk" target="_blank" rel="noopener noreferrer" class="border border-muted text-center py-2 hover-invert transition-none">> GitHub</a>
            <div class="col-span-2 text-center text-[10px] mt-4 text-muted border-t border-muted border-dashed pt-4">
                SYS.COPYRIGHT © 2026<br/>ALL AUTH GRANTED.
            </div>
        </div>
    </footer>
</main>

<script type="module" src="/main.js"></script>
</body>
</html>"""

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

# Update main.js
with open(js_path, 'r', encoding='utf-8') as f:
    js_text = f.read()

# 1. We remove `#footer-section` since we changed the terminal backrop to screen.
js_text = js_text.replace(
    "const footerSection = document.getElementById('footer-section');",
    "const footerSection = document.body;"
)

js_text = js_text.replace(
    "const tColor = hexToRgb('#FFE600');",
    "const tColor = hexToRgb('#33ff00');"
)
js_text = js_text.replace(
    "const tColor = hexToRgb('#F3ECE2');",
    "const tColor = hexToRgb('#33ff00');"
)
js_text = js_text.replace(
    "const tColor = hexToRgb('#ccd5ae');",
    "const tColor = hexToRgb('#33ff00');"
)
js_text = js_text.replace(
    "footerSection.offsetWidth",
    "window.innerWidth"
)
js_text = js_text.replace(
    "footerSection.offsetHeight",
    "window.innerHeight"
)

# Replace drawing colors for AR:
js_text = js_text.replace('"#81ecff"', '"#33ff00"')
js_text = js_text.replace('"#b884ff"', '"#ffb000"')

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_text)

print("done")
