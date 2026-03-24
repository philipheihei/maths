with open('src/apps/SolidGeometryQuiz.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(r'S_{\\text{曲}}', r'\\text{曲面面積}')
text = text.replace(r'S_{\\text{總}}', r'\\text{總表面面積}')

print("Before V replace length:", len(text))
text = text.replace(r"`V =", r"`\\text{體積} =")
text = text.replace(r"'V =", r"'\\text{體積} =")
text = text.replace(r"`A =", r"`\\text{表面面積} =")
text = text.replace(r"'A =", r"'\\text{表面面積} =")
text = text.replace(r"`S =", r"`\\text{表面面積} =")
text = text.replace(r"'S =", r"'\\text{表面面積} =")
print("After V replace length:", len(text))

with open('src/apps/SolidGeometryQuiz.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
