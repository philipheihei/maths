const fs = require('fs');
let s = fs.readFileSync('src/apps/SolidGeometryQuiz.jsx', 'utf8');

s = s.split('S_{\\\\text{曲}}').join('\\\\text{曲面面積}');
s = s.split('S_{\\\\text{總}}').join('\\\\text{總表面面積}');
s = s.replaceAll('`V =', '`\\\\text{體積} =');
s = s.replaceAll(`'V =`, `'\\\\text{體積} =`);
s = s.replaceAll('`S =', '`\\\\text{表面面積} =');
s = s.replaceAll(`'S =`, `'\\\\text{表面面積} =`);
s = s.replaceAll('`A =', '`\\\\text{表面面積} =');
s = s.replaceAll(`'A =`, `'\\\\text{表面面積} =`);

fs.writeFileSync('src/apps/SolidGeometryQuiz.jsx', s);
console.log("Done");