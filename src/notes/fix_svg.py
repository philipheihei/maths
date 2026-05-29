import re

with open(r'c:\VS code\maths\maths\src\notes\F4CompoundInequalitiesNotes.jsx', 'r', encoding='utf-8') as f:
    data = f.read()

def repl_poly(m):
    tipX = int(m.group(1))
    tipY = int(m.group(2))
    color = m.group(3)
    if tipX > 200:
        return f'<polygon points="{tipX},{tipY} {tipX-10},{tipY-6} {tipX-10},{tipY+6}" fill="#{color}"'
    else:
        return f'<polygon points="{tipX},{tipY} {tipX+10},{tipY-6} {tipX+10},{tipY+6}" fill="#{color}"'

data = re.sub(r'<polygon points="(\d+),(\d+) \d+,\d+ \d+,\d+" fill="#(3b82f6|ef4444)"', repl_poly, data)
data = re.sub(r'x2="564" y2="(\d+)" stroke="#(3b82f6|ef4444)" strokeWidth="4" strokeLinecap="round"', r'x2="554" y2="\1" stroke="#\2" strokeWidth="4" strokeLinecap="round"', data)
data = re.sub(r'x1="36" y1="(\d+)" x2="([^"]+)" y2="\1" stroke="#(3b82f6|ef4444)" strokeWidth="4" strokeLinecap="round"', r'x1="46" y1="\1" x2="\2" y2="\1" stroke="#\3" strokeWidth="4" strokeLinecap="round"', data)

with open(r'c:\VS code\maths\maths\src\notes\F4CompoundInequalitiesNotes.jsx', 'w', encoding='utf-8') as f:
    f.write(data)
