import re

with open(r'c:\VS code\maths\maths\src\notes\F4CompoundInequalitiesNotes.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Fix colored arrows:
# Right: 564,y 556,y1 556,y2 -> 564,y 554,y1 554,y2
text = re.sub(r'<polygon points="564,(\d+) 556,(\d+) 556,(\d+)"', r'<polygon points="564,\1 554,\2 554,\3"', text)
text = re.sub(r'x2="556"([^>]*stroke="#(?:3b82f6|ef4444|10b981|f59e0b)")', r'x2="554"\1', text)
text = re.sub(r'x2="556"([^>]*stroke="[^"]+")', r'x2="554"\1', text)

# Left: 36,y 44,y1 44,y2 -> 36,y 46,y1 46,y2
text = re.sub(r'<polygon points="36,(\d+) 44,(\d+) 44,(\d+)"', r'<polygon points="36,\1 46,\2 46,\3"', text)
text = re.sub(r'x1="44"([^>]*stroke="#(?:3b82f6|ef4444|10b981|f59e0b)")', r'x1="46"\1', text)
text = re.sub(r'x1="44"([^>]*stroke="[^"]+")', r'x1="46"\1', text)


lines = text.split('\n')
out_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    if '<line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />' in line:
        out_lines.append(line)
        # Skip over any existing black polygons or texts that are part of the base line
        j = i + 1
        while j < len(lines) and (
            '<polygon points="36,140' in lines[j] or 
            '<polygon points="564,140' in lines[j] or 
            '<text x="579"' in lines[j] or
            '<text x="580"' in lines[j]
        ):
            j += 1
        out_lines.append('    <polygon points="36,140 46,134 46,146" fill="#374151" />')
        out_lines.append('    <polygon points="564,140 554,134 554,146" fill="#374151" />')
        out_lines.append('    <text x="579" y="145" fontSize="16" fill="#374151" fontWeight="500" fontStyle="italic">x</text>')
        i = j - 1
    elif '<line x1="36" y1="110" x2="564" y2="110" stroke="#374151" strokeWidth="2" />' in line:
        out_lines.append(line)
        # Skip over any existing black polygons or texts that are part of the base line
        j = i + 1
        while j < len(lines) and (
            '<polygon points="36,110' in lines[j] or 
            '<polygon points="564,110' in lines[j] or 
            '<text x="579"' in lines[j] or
            '<text x="580"' in lines[j]
        ):
            j += 1
        out_lines.append('    <polygon points="36,110 46,104 46,116" fill="#374151" />')
        out_lines.append('    <polygon points="564,110 554,104 554,116" fill="#374151" />')
        out_lines.append('    <text x="579" y="115" fontSize="16" fill="#374151" fontWeight="500" fontStyle="italic">x</text>')
        i = j - 1
    else:
        out_lines.append(line)
    i += 1

text = '\n'.join(out_lines)

with open(r'c:\VS code\maths\maths\src\notes\F4CompoundInequalitiesNotes.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
print("Done")
