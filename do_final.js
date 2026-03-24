const fs = require('fs');

let content = fs.readFileSync('src/apps/SolidGeometryQuiz.jsx', 'utf8');

content = content.split('S_{\\\\text{曲}}').join('\\\\text{曲面面積}');
content = content.split('S_{\\\\text{總}}').join('\\\\text{總表面面積}');
content = content.split('\`V =').join('\`\\\\text{體積} =');
content = content.split('\\'V =').join('\\'\\\\text{體積} =');
content = content.split('\`A =').join('\`\\\\text{表面面積} =');
content = content.split('\\'A =').join('\\'\\\\text{表面面積} =');
content = content.split('\`S =').join('\`\\\\text{表面面積} =');
content = content.split('\\'S =').join('\\'\\\\text{表面面積} =');

fs.writeFileSync('src/apps/SolidGeometryQuiz.jsx', content);
console.log("Replaced using split and join.");
