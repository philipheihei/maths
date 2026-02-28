const fs = require('fs');
const path = require('path');

const dataDir = 'src/apps/data';
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('angleMaster_'));

let issues = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  
  // Split by question blocks using 'id:' pattern
  const blocks = content.split(/\n\s*id:\s*'/);
  
  blocks.forEach((block, idx) => {
    if (idx === 0) return;
    const idMatch = block.match(/^([^']+)/);
    const qId = idMatch ? idMatch[1] : 'unknown';
    
    // Find all AngleArc usages
    const arcRegex = /AngleArc\s+cx=\{([\d.]+)\}\s+cy=\{([\d.]+)\}\s+r=\{([\d.]+)\}\s+startAngle=\{([\d.]+)\}\s+endAngle=\{([\d.]+)\}\s+label="([^"]*)"/g;
    
    let arcMatch;
    while ((arcMatch = arcRegex.exec(block)) !== null) {
      const cx = parseFloat(arcMatch[1]);
      const cy = parseFloat(arcMatch[2]);
      const r = parseFloat(arcMatch[3]);
      const startAngle = parseFloat(arcMatch[4]);
      const endAngle = parseFloat(arcMatch[5]);
      const label = arcMatch[6];
      
      let span = endAngle - startAngle;
      if (span < 0) span += 360;
      
      // Check numeric labels like "65°"
      const numMatch = label.match(/^(\d+)°$/);
      if (numMatch) {
        const stated = parseInt(numMatch[1]);
        const diff = Math.abs(span - stated);
        if (diff > 3) {
          issues.push({
            qId, label, startAngle, endAngle,
            visualSpan: span.toFixed(1),
            stated,
            diff: diff.toFixed(1),
            file
          });
        }
      }
    }
  });
});

console.log('=== Angle Arc Mismatches (visual span vs stated label, tolerance > 3 deg) ===\n');
if (issues.length === 0) {
  console.log('No issues found!');
} else {
  issues.forEach(i => {
    console.log(`${i.qId}: label="${i.label}" arc=${i.startAngle}->${i.endAngle} visual=${i.visualSpan} stated=${i.stated} diff=${i.diff} [${i.file}]`);
  });
}
console.log('\nTotal mismatches:', issues.length);
