import re

file_path = "src/apps/SolidGeometryQuiz.jsx"

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace S_{text{曲}} and S_{text{總}} handling both one and two backslashes
text = re.sub(r'S_{\\\\?text\{曲\}\}', r'\\text{曲面面積}', text)
text = re.sub(r'S_{\\\\?text\{總\}\}', r'\\text{總表面面積}', text)

# Replace 'V =' and 'S =' when starting a line, after a tag, or backtick/quote
text = re.sub(r'([\'"><\$]\s*)V\s*=', r'\g<1>\\text{體積} =', text)
text = re.sub(r'^(\s*)V\s*=', r'\g<1>\\text{體積} =', text, flags=re.MULTILINE)
text = re.sub(r'([\'"><\$]\s*)S\s*=', r'\g<1>\\text{表面面積} =', text)
text = re.sub(r'^(\s*)S\s*=', r'\g<1>\\text{表面面積} =', text, flags=re.MULTILINE)

# Removes
text = text.replace("（不含 π）", "")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Text replaced successfully!")
