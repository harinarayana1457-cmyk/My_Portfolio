import os

files = [
    r"c:\Users\Avvari\OneDrive\Desktop\JJK\index.html",
    r"c:\Users\Avvari\OneDrive\Desktop\JJK\main.js"
]

reps = {
    'navy': 'black',
    'ivory': 'yellow',
    'mist': 'mint',
    'sand': 'chalk',
    'vermilion': 'tangerine',
    '#1C2A39': '#111111',
    '#F3ECE2': '#FFE600',
    '#A8BBC4': '#C4FF00',
    '#F9F6F0': '#FAFAFA',
    '#E25238': '#FF4500',
    '17, 17, 17': '17, 17, 17', # To avoid issues if it was run back to back
    '28, 42, 57': '17, 17, 17',
    '243, 236, 226': '255, 230, 0'
}

for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    for k, v in reps.items():
        content = content.replace(k, v)
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)

# Specific Hero text tweak & Nav brand tweak
html_file = r"c:\Users\Avvari\OneDrive\Desktop\JJK\index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# The hero h1 previously had text-navy, now text-black because of the loop above
target_h1 = '<h1 class="font-display text-black flex flex-col items-center justify-center tracking-tighter" style="mix-blend-mode: soft-light; line-height: 0.8;">'
new_h1 = '<h1 class="font-display text-tangerine flex flex-col items-center justify-center tracking-tighter" style="line-height: 0.8; z-index: 40; filter: drop-shadow(0 4px 12px rgba(255,69,0,0.3));">'
content = content.replace(target_h1, new_h1)

target_nav = '<div class="font-body font-bold text-xs uppercase tracking-widest text-black">\n            - HARI NARAYANA\n        </div>'
new_nav = '<div class="font-body font-bold text-xs uppercase tracking-widest text-tangerine">\n            - HARI NARAYANA\n        </div>'
content = content.replace(target_nav, new_nav)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete")
