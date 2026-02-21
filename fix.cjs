const fs = require('fs');
const path = 'C:/VS code/maths/src/apps/AngleMasterQuiz.jsx';
const content = fs.readFileSync(path, 'utf-8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);
// Lines are 1-indexed. In 0-indexed array:
//   index 2157 = line 2158 = "    }," (first F3-25 close WITH comma) -> replace with "    }"
//   indices 2158-2766 = lines 2159-2767 = duplicate F3-04 to F3-25 -> DELETE
//   index 2767 = line 2768 = "  ]," -> KEEP
const newLines = [...lines.slice(0, 2157), '    }', ...lines.slice(2767)];
console.log('New total lines:', newLines.length);
fs.writeFileSync(path, newLines.join('\n'));
console.log('Done');
