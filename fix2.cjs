const fs = require('fs');
const content = fs.readFileSync('src/notes/F5Notes.jsx', 'utf8');

const missing1 = \          <PropertyCard
            title="圓內接四邊形對角"
            condition={<>若 <Latex math="ABCD" inline /> 為圓內接四邊形，</>}
            conclusion="\\\\begin{aligned} \\\\angle ABC + \\\\angle ADC &= 180^\\\\circ \\\\\\\\ \\\\angle BAD + \\\\angle BCD &= 180^\\\\circ \\\\end{aligned}"
            svg={() => (
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <polygon points="151.8,39.1 33.4,55.6 54.9,166.1 172.3,134.1" fill="none" stroke="#334155" strokeWidth="1.5" />
                <text x="160" y="32" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="15" y="50" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="40" y="180" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="180" y="145" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
              </svg>
            )}
          />\;

const missing2 = \          <PropertyCard
            title="圓內接四邊形外角"
            condition={<>若 <Latex math="ABCD" inline /> 為圓內接四邊形，</>}
            conclusion="\\\\angle ABC = \\\\angle ADE"
            svg={() => (
              <svg viewBox="0 0 240 200" className="w-full max-w-[240px]">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />
                <polygon points="151.8,39.1 33.4,55.6 54.9,166.1 172.3,134.1" fill="none" stroke="#334155" strokeWidth="1.5" />
                <line x1="54.9" y1="166.1" x2="219.3" y2="121.3" stroke="#334155" strokeWidth="1.5" />
                <text x="160" y="32" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>A</text>
                <text x="15" y="50" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>B</text>
                <text x="40" y="180" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>C</text>
                <text x="168" y="152" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>D</text>
                <text x="225" y="115" fill="#475569" fontSize="12" style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>E</text>
              </svg>
            )}
          />\;

const cardBlockMatch = content.match(/<CollapsibleSection id="circle-theorems"[\\s\\S]*?<div className="grid grid-cols-1 md:grid-cols-2 gap-6">([\\s\\S]*?)<\\/div>\\s*<\\/CollapsibleSection>/);

if (!cardBlockMatch) { console.error('Could not find block'); process.exit(1); }
const oldGridContent = cardBlockMatch[1];

// Split by <PropertyCard to ensure we don't bleed across cards
const rawPieces = oldGridContent.split('          <PropertyCard');
const cards = [];
for (let i = 1; i < rawPieces.length; i++) {
  // Add back the split string
  let c = '          <PropertyCard' + rawPieces[i];
  // Remove everything after the matching />
  // Since we know the layout, we can just find the LAST /> in the piece, because it might trail off spacing before next card.
  // Wait, split already broke it exactly at the start of each card.
  // We just need to trim the end so it ends exactly at '/>'
  const endIdx = c.lastIndexOf('/>');
  c = c.substring(0, endIdx + 2);
  cards.push(c);
}

const map = {};
cards.forEach(c => {
  const tMatch = c.match(/title="([^"]+)"/);
  if (tMatch) map[tMatch[1]] = c;
});

map['圓內接四邊形對角'] = missing1;
map['圓內接四邊形外角'] = missing2;

const sequence = [
  '圓心角兩倍於圓周角',
  '同弓形內的圓周角', '半圓上的圓周角',
  '等弦對等弧', '等弧對等弦',
  '等弧對等角 (圓心)', '等角對等弧',
  '等弦對等角 (圓心)', '等角對等弦',
  '弧與圓心角成比例', '弧與圓周角成比例',
  '切線 ⊥ 半徑', '切線 ⊥ 半徑 逆定理',
  '切線性質'
];

let newGridContent = '\\n';
sequence.forEach(title => {
  if (map[title]) {
    newGridContent += map[title] + '\\n\\n';
  } else {
    console.error('Missing from map: ' + title);
  }
});
newGridContent += '          {/* Spacer: keep row 8 right side empty on desktop so next two cards become row 9 */}\\n';
newGridContent += '          <div className="hidden md:block" aria-hidden="true"></div>\\n\\n';
newGridContent += missing1 + '\\n\\n' + missing2 + '\\n        ';

const newContent = content.replace(oldGridContent, newGridContent);
fs.writeFileSync('src/notes/F5Notes.jsx', newContent);
console.log('Successfully reordered F5Notes.jsx');
