lines = open('c:/Users/Avvari/OneDrive/Desktop/JJK/main.js', 'r', encoding='utf-8').readlines()
idx = [i for i, l in enumerate(lines) if '// Background Interactive Tubes Initialization' in l][0]
new_lines = ["import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';\n\n"] + lines[idx:]
open('c:/Users/Avvari/OneDrive/Desktop/JJK/main.js', 'w', encoding='utf-8').writelines(new_lines)
