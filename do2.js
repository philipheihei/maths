const fs = require('fs');
let s = fs.readFileSync('src/apps/SolidGeometryQuiz.jsx', 'utf8');

s = s.replace(/S_\{\\+text\{曲\}\}/g, '\\text{曲面面積}');
s = s.replace(/S_\{\\+text\{總\}\}/g, '\\text{總表面面積}');
s = s.replace(/([`'"])V =/g, '$1\\\\text{體積} =');
s = s.replace(/([`'"])S =/g, '$1\\\\text{表面面積} =');
s = s.replace(/([`'"])A =/g, '$1\\\\text{表面面積} =');
s = s.replace(/（不含 π）/g, '');

fs.writeFileSync('src/apps/SolidGeometryQuiz.jsx', s);
console.log("Done regex replace");