const cx = 100, cy = 100, r = 80;
const pts = [ {x: 152, y: 39}, {x: 40, y: 60}, {x: 55, y: 166}, {x: 172, y: 134} ];
const exactPts = pts.map(p => {
  const angle = Math.atan2(p.y - cy, p.x - cx);
  return {
    x: +(cx + r * Math.cos(angle)).toFixed(1),
    y: +(cy + r * Math.sin(angle)).toFixed(1)
  };
});
console.log('Points: ' + exactPts.map(p => p.x + ',' + p.y).join(' '));

const C = exactPts[2];
const D = exactPts[3];
const dx = D.x - C.x;
const dy = D.y - C.y;
const E = { x: +(C.x + dx * 1.4).toFixed(1), y: +(C.y + dy * 1.4).toFixed(1) };
console.log(`Line C-E: x1="${C.x}" y1="${C.y}" x2="${E.x}" y2="${E.y}"`);
