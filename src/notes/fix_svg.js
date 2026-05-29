const fs = require('fs');
const path = 'c:\\VS code\\maths\\maths\\src\\notes\\F4CompoundInequalitiesNotes.jsx';
let text = fs.readFileSync(path, 'utf8');

// 1. Fix colored arrows width by making x coordinates wider:
// Right: 564,y 556,y1 556,y2 -> 564,y 554,y1 554,y2
text = text.replace(/<polygon points="564,(\d+) 556,(\d+) 556,(\d+)"/g, '<polygon points="564,$1 554,$2 554,$3"');
text = text.replace(/x2="556"([^>]*stroke="#(?:3b82f6|ef4444|10b981|f59e0b|8b5cf6)")/g, 'x2="554"$1');

// Left: 36,y 44,y1 44,y2 -> 36,y 46,y1 46,y2
text = text.replace(/<polygon points="36,(\d+) 44,(\d+) 44,(\d+)"/g, '<polygon points="36,$1 46,$2 46,$3"');
text = text.replace(/x1="44"([^>]*stroke="#(?:3b82f6|ef4444|10b981|f59e0b|8b5cf6)")/g, 'x1="46"$1');

// 2. Add both black arrows and 'x' text to the base number line lines
const lines = text.split('\n');
const outLines = [];
let i = 0;
while (i < lines.length) {
    const line = lines[i];
    if (line.includes('<line x1="36" y1="140" x2="564" y2="140" stroke="#374151" strokeWidth="2" />') ||
        line.includes('<line x1="36" y1="110" x2="564" y2="110" stroke="#374151" strokeWidth="2" />') ||
        line.includes('<line x1="36" y1="130" x2="564" y2="130" stroke="#374151" strokeWidth="2" />')) {
        
        const y = line.match(/y1="(\d+)"/)[1];
        outLines.push(line);
        
        let j = i + 1;
        while (j < lines.length && (
            lines[j].includes(`<polygon points="36,${y}`) ||
            lines[j].includes(`<polygon points="564,${y}`) ||
            lines[j].includes('<text x="579"') ||
            lines[j].includes('<text x="580"') ||
            lines[j].trim() === '' // Also maybe skip empty lines between them? No, didn't do this before. Just leave it.
        )) {
            j++;
        }
        
        const yNum = parseInt(y);
        outLines.push(`    <polygon points="36,${y} 46,${yNum-6} 46,${yNum+6}" fill="#374151" />`);
        outLines.push(`    <polygon points="564,${y} 554,${yNum-6} 554,${yNum+6}" fill="#374151" />`);
        outLines.push(`    <text x="579" y="${yNum+5}" fontSize="16" fill="#374151" fontWeight="500" fontStyle="italic">x</text>`);
        
        i = j - 1;
    } else {
        outLines.push(line);
    }
    i++;
}

fs.writeFileSync(path, outLines.join('\n'), 'utf8');
console.log('Fixed SVG file successfully.');