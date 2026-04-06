import os

files = [
    r"c:\Users\Avvari\OneDrive\Desktop\JJK\index.html",
    r"c:\Users\Avvari\OneDrive\Desktop\JJK\main.js"
]

reps = {
    'forest': 'navy',
    'sage': 'ivory',
    'olive': 'mist',
    'cream': 'sand',
    'moss': 'vermilion',
    '#01472e': '#1C2A39',
    '#ccd5ae': '#F3ECE2',
    '#e9edc9': '#A8BBC4',
    '#fefae0': '#F9F6F0',
    '#a3b18a': '#E25238',
    '1, 71, 46': '28, 42, 57',
    '204,213,174': '243, 236, 226'
}

for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    for k, v in reps.items():
        content = content.replace(k, v)
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement complete")
