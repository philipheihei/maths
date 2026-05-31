const fs = require('fs');
let content = fs.readFileSync('src/notes/F5Notes.jsx', 'utf8');

const arcAB = '<path d="M 60 31 A 80 80 0 0 0 25 73" fill="none" stroke="#f97316" strokeWidth="2" />';
const arcCD = '<path d="M 140 169 A 80 80 0 0 0 175 127" fill="none" stroke="#f97316" strokeWidth="2" />';
const arcMarkup = '\n                {/* 橙色弧 AB 和 CD */}\n                ' + arcAB + '\n                ' + arcCD;

const oldChordAB = '<line x1="60" y1="31" x2="25" y2="73" stroke="#334155" strokeWidth="1.5" />';
const oldChordCD = '<line x1="140" y1="169" x2="175" y2="127" stroke="#334155" strokeWidth="1.5" />';

const newChordAB = '<line x1="60" y1="31" x2="25" y2="73" stroke="#22c55e" strokeWidth="1.5" />';
const newChordCD = '<line x1="140" y1="169" x2="175" y2="127" stroke="#22c55e" strokeWidth="1.5" />';

// Function to inject arcs into a SVG block handling cards for AB and CD
function updateSVGBlock(block) {
    // Check if it's one of the 6 theorems
    if (!block.includes('stroke="#334155" strokeWidth="1.5" />\n                <line x1="100" y1="100" x2="60" y2="31"')) {
        // Just checking for radius lines OA, OB, OC, OD
    }

    // Add orange arcs right after the grey circle
    let newBlock = block.replace(
        '<circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />',
        '<circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="1" />' + arcMarkup
    );

    // Replace grey chords with green chords if they exist
    if (newBlock.includes(oldChordAB)) {
        newBlock = newBlock.replace(oldChordAB, newChordAB);
    }
    if (newBlock.includes(oldChordCD)) {
        newBlock = newBlock.replace(oldChordCD, newChordCD);
    }

    return newBlock;
}

// target titles
const targetTitles = [
    '等弦對等弧',
    '等弧對等弦',
    '等弧對等角 (圓心)',
    '等角對等弧',
    '等弦對等角 (圓心)',
    '等角對等弦'
];

targetTitles.forEach(title => {
    // regex to extract the PropertyCard 
    const regex = new RegExp(`(<PropertyCard\\s*title="${title.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\$&')}"[\\s\\S]*?svg=\\{\\(\\) => \\([\\s\\S]*?)\\)(?:\\s*\\})?\\s*/>`);
    const match = content.match(regex);
    if(match) {
        let cardText = match[0];
        let newCardText = updateSVGBlock(cardText);
        // Also update the colors of the tick marks from blue to green/orange?
        // the tick marks on the chords are currently #0ea5e9 (blue)
        // chord tick marks should match chord color (green)
        // arc tick marks should match arc color (orange)
        
        // Chord ticks:
        newCardText = newCardText.replace(/\/\* 弦 AB 和 CD 的雙藍色相等標記 \*\//g, '/* 弦 AB 和 CD 的雙綠色相等標記 */');
        newCardText = newCardText.replace(/<line x1="39.2".*?stroke="#0ea5e9".*?\/>\n\s*<line x1="41.2".*?stroke="#0ea5e9".*?\/>/g, '<line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#22c55e" strokeWidth="1.5" />\n                <line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#22c55e" strokeWidth="1.5" />');
        
        newCardText = newCardText.replace(/<line x1="152.4".*?stroke="#0ea5e9".*?\/>\n\s*<line x1="155.0".*?stroke="#0ea5e9".*?\/>/g, '<line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#22c55e" strokeWidth="1.5" />\n                <line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#22c55e" strokeWidth="1.5" />');

        // Arc ticks:
        newCardText = newCardText.replace(/\/\* 弧 AB 和 CD 的單劃藍色相等標記 \*\//g, '/* 弧 AB 和 CD 的單劃橙色相等標記 */');
        newCardText = newCardText.replace(/<line x1="34.9".*?stroke="#0ea5e9".*?\/>/g, '<line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#f97316" strokeWidth="1.5" />');
        newCardText = newCardText.replace(/<line x1="157.5".*?stroke="#0ea5e9".*?\/>/g, '<line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#f97316" strokeWidth="1.5" />');

        content = content.replace(cardText, newCardText);
        console.log(`Updated ${title}`);
    }
});

fs.writeFileSync('src/notes/F5Notes.jsx', content);
