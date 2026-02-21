with open('src/apps/AngleMasterQuiz.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('src/apps/AngleMasterQuiz.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines[:2157] + lines[2767:])
