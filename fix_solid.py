import re

with open('src/apps/SolidGeometryQuiz.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(r'S_{\\text{曲}}', r'\text{曲面面積}')
text = text.replace(r'S_{\\text{總}}', r'\text{總表面面積}')

text = re.sub(r'([`\'"])V =', r'\1\\text{體積} =', text)
text = re.sub(r'([`\'"])S =', r'\1\\text{表面面積} =', text)
text = re.sub(r'([`\'"])A =', r'\1\\text{表面面積} =', text)
text = text.replace('（不含 π）', '')

with open('src/apps/SolidGeometryQuiz.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replacement complete.")
