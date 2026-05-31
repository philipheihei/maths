const fs = require('fs');
let content = fs.readFileSync('src/notes/F5Notes.jsx', 'utf8');

// For 弦 ticks, they have x1="39.2" etc.
const chordTicks = [
    '<line x1="39.2" y1="50.6" x2="44.8" y2="55.2" stroke="#0ea5e9" strokeWidth="1.5" />',
    '<line x1="41.2" y1="48.1" x2="46.8" y2="52.7" stroke="#0ea5e9" strokeWidth="1.5" />',
    '<line x1="152.4" y1="146.3" x2="160.0" y2="152.7" stroke="#0ea5e9" strokeWidth="1.5" />',
    '<line x1="155.0" y1="143.3" x2="162.6" y2="149.7" stroke="#0ea5e9" strokeWidth="1.5" />'
];

// For arc ticks, they have x1="34.9" etc.
const arcTicks = [
    '<line x1="34.9" y1="45.6" x2="42.5" y2="52.0" stroke="#0ea5e9" strokeWidth="1.5" />',
    '<line x1="157.5" y1="148.0" x2="165.1" y2="154.4" stroke="#0ea5e9" strokeWidth="1.5" />'
];

chordTicks.forEach(tick => {
    let newTick = tick.replace('#0ea5e9', '#22c55e');
    // replace all occurrences of `tick` in `content`
    content = content.split(tick).join(newTick);
});

arcTicks.forEach(tick => {
    let newTick = tick.replace('#0ea5e9', '#f97316');
    content = content.split(tick).join(newTick);
});

fs.writeFileSync('src/notes/F5Notes.jsx', content);
console.log('Fixed tick marks');
