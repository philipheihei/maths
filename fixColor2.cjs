const fs = require('fs');
let content = fs.readFileSync('src/notes/F5Notes.jsx', 'utf8');

const targetTitles = [
    '等弧對等角 (圓心)',
    '等弦對等角 (圓心)'
];

const arcAB = '<path d="M 60 31 A 80 80 0 0 0 25 73" fill="none" stroke="#f97316" strokeWidth="2" />';
const arcCD = '<path d="M 140 169 A 80 80 0 0 0 175 127" fill="none" stroke="#f97316" strokeWidth="2" />';
const arcMarkup = '\n                {/* 橙色弧 AB 和 CD */}\n                ' + arcAB + '\n                ' + arcCD;

const oldChordAB = '<line x1="60" y1="31" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />';
const oldChordCD = '<line x1="140" y1="169" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />';

const newChordAB = '<line x1="60" y1="31" x2="25" y2="73" stroke="#22c55e" strokeWidth="1.5" />';
const newChordCD = '<line x1="140" y1="169" x2="175" y2="127" stroke="#22c55e" strokeWidth="1.5" />';

// Function to inject arcs into a SVG block handling cards for AB and CD
function updateSVGBlock(block) {
    if(!block.includes('橙色弧 AB 和 CD')) {
        let newBlock = block.replace(
            '<circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />',
            '<circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />' + arcMarkup
        );
        block = newBlock;
    }

    if (block.includes(oldChordAB)) {
        block = block.replace(oldChordAB, newChordAB);
    }
    if (block.includes(oldChordCD)) {
        block = block.replace(oldChordCD, newChordCD);
    }
    
    block = block.replace(/\/\* 弦 AB 和 CD 的雙藍色相等標記 \*\//g, '/* 弦 AB 和 CD 的雙綠色相等標記 */');
    block = block.replace(/<line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#0ea5e9" strokeWidth="1.5" \/>\n\s*<line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#0ea5e9" strokeWidth="1.5" \/>/g, '<line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#22c55e" strokeWidth="1.5" />\n                <line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#22c55e" strokeWidth="1.5" />');
    
    block = block.replace(/<line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#0ea5e9" strokeWidth="1.5" \/>\n\s*<line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#0ea5e9" strokeWidth="1.5" \/>/g, '<line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#22c55e" strokeWidth="1.5" />\n                <line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#22c55e" strokeWidth="1.5" />');

    block = block.replace(/\/\* 弧 AB 和 CD 的單劃藍色相等標記 \*\//g, '/* 弧 AB 和 CD 的單劃橙色相等標記 */');
    block = block.replace(/<line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#0ea5e9" strokeWidth="1.5" \/>/g, '<line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#f97316" strokeWidth="1.5" />');
    block = block.replace(/<line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#0ea5e9" strokeWidth="1.5" \/>/g, '<line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#f97316" strokeWidth="1.5" />');

    return block;
}

targetTitles.forEach(title => {
    // simpler split approach
    const prefix = `title="${title}"`;
    if(content.includes(prefix)) {
        const parts = content.split(prefix);
        const cardEnd = parts[1].indexOf('/>', parts[1].indexOf('</svg>')) + 2;
        let cardText = prefix + parts[1].substring(0, cardEnd);
        let newCardText = updateSVGBlock(cardText);
        content = parts[0] + newCardText + parts[1].substring(cardEnd);
        console.log("Updated " + title);
    }
});

fs.writeFileSync('src/notes/F5Notes.jsx', content);
