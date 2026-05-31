const cx = 100, cy = 100, r = 80;
const angleA = 250, angleB = 190;
const angleC = angleA - 180, angleD = angleB - 180;
function t(v) { return +v.toFixed(1); }
function pt(a) { let rd = a * Math.PI/180; return {x: t(cx + r*Math.cos(rd)), y: t(cy + r*Math.sin(rd))}; }
const A=pt(angleA), B=pt(angleB), C=pt(angleC), D=pt(angleD);
const mAB={x:(A.x+B.x)/2, y:(A.y+B.y)/2};
const mCD={x:(C.x+D.x)/2, y:(C.y+D.y)/2};
function getN(p1, p2, len) { let d=Math.hypot(p2.x-p1.x, p2.y-p1.y); return {x: -(p2.y-p1.y)/d*len, y: (p2.x-p1.x)/d*len}; }
const nAB=getN(A,B,5), nCD=getN(C,D,5);
const dAB={x: (B.x-A.x)/Math.hypot(B.x-A.x)*2.5, y: (B.y-A.y)/Math.hypot(B.x-A.x)*2.5};
const dCD={x: (D.x-C.x)/Math.hypot(D.x-C.x)*2.5, y: (D.y-C.y)/Math.hypot(D.x-C.x)*2.5};

const tAB1={x1: t(mAB.x-nAB.x-dAB.x), y1: t(mAB.y-nAB.y-dAB.y), x2: t(mAB.x+nAB.x-dAB.x), y2: t(mAB.y+nAB.y-dAB.y)};
const tAB2={x1: t(mAB.x-nAB.x+dAB.x), y1: t(mAB.y-nAB.y+dAB.y), x2: t(mAB.x+nAB.x+dAB.x), y2: t(mAB.y+nAB.y+dAB.y)};
const tCD1={x1: t(mCD.x-nCD.x-dCD.x), y1: t(mCD.y-nCD.y-dCD.y), x2: t(mCD.x+nCD.x-dCD.x), y2: t(mCD.y+nCD.y-dCD.y)};
const tCD2={x1: t(mCD.x-nCD.x+dCD.x), y1: t(mCD.y-nCD.y+dCD.y), x2: t(mCD.x+nCD.x+dCD.x), y2: t(mCD.y+nCD.y+dCD.y)};

const mArcAB = pt(220); const mArcCD = pt(40);
const nArcA = {x: (cx-mArcAB.x)/r*5, y: (cy-mArcAB.y)/r*5};
const nArcC = {x: (cx-mArcCD.x)/r*5, y: (cy-mArcCD.y)/r*5};
const aAB={x1:t(mArcAB.x-nArcA.x), y1:t(mArcAB.y-nArcA.y), x2:t(mArcAB.x+nArcA.x), y2:t(mArcAB.y+nArcA.y)};
const aCD={x1:t(mArcCD.x-nArcC.x), y1:t(mArcCD.y-nArcC.y), x2:t(mArcCD.x+nArcC.x), y2:t(mArcCD.y+nArcC.y)};

console.log('<path d=\x22M '+A.x+' '+A.y+' A 80 80 0 0 0 '+B.x+' '+B.y+'\x22 fill=\x22none\x22 stroke=\x22#f97316\x22 strokeWidth=\x222\x22 />');
console.log('<path d=\x22M '+C.x+' '+C.y+' A 80 80 0 0 0 '+D.x+' '+D.y+'\x22 fill=\x22none\x22 stroke=\x22#f97316\x22 strokeWidth=\x222\x22 />');
console.log('<line x1=\x22100\x22 y1=\x22100\x22 x2=\x22'+A.x+'\x22 y2=\x22'+A.y+'\x22 stroke=\x22#334155\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22100\x22 y1=\x22100\x22 x2=\x22'+B.x+'\x22 y2=\x22'+B.y+'\x22 stroke=\x22#334155\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22100\x22 y1=\x22100\x22 x2=\x22'+C.x+'\x22 y2=\x22'+C.y+'\x22 stroke=\x22#334155\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22100\x22 y1=\x22100\x22 x2=\x22'+D.x+'\x22 y2=\x22'+D.y+'\x22 stroke=\x22#334155\x22 strokeWidth=\x221.5\x22 />');

console.log('<line x1=\x22'+A.x+'\x22 y1=\x22'+A.y+'\x22 x2=\x22'+B.x+'\x22 y2=\x22'+B.y+'\x22 stroke=\x22#22c55e\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22'+C.x+'\x22 y1=\x22'+C.y+'\x22 x2=\x22'+D.x+'\x22 y2=\x22'+D.y+'\x22 stroke=\x22#22c55e\x22 strokeWidth=\x221.5\x22 />');

console.log('<line x1=\x22'+tAB1.x1+'\x22 y1=\x22'+tAB1.y1+'\x22 x2=\x22'+tAB1.x2+'\x22 y2=\x22'+tAB1.y2+'\x22 stroke=\x22#22c55e\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22'+tAB2.x1+'\x22 y1=\x22'+tAB2.y1+'\x22 x2=\x22'+tAB2.x2+'\x22 y2=\x22'+tAB2.y2+'\x22 stroke=\x22#22c55e\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22'+tCD1.x1+'\x22 y1=\x22'+tCD1.y1+'\x22 x2=\x22'+tCD1.x2+'\x22 y2=\x22'+tCD1.y2+'\x22 stroke=\x22#22c55e\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22'+tCD2.x1+'\x22 y1=\x22'+tCD2.y1+'\x22 x2=\x22'+tCD2.x2+'\x22 y2=\x22'+tCD2.y2+'\x22 stroke=\x22#22c55e\x22 strokeWidth=\x221.5\x22 />');

console.log('<line x1=\x22'+aAB.x1+'\x22 y1=\x22'+aAB.y1+'\x22 x2=\x22'+aAB.x2+'\x22 y2=\x22'+aAB.y2+'\x22 stroke=\x22#f97316\x22 strokeWidth=\x221.5\x22 />');
console.log('<line x1=\x22'+aCD.x1+'\x22 y1=\x22'+aCD.y1+'\x22 x2=\x22'+aCD.x2+'\x22 y2=\x22'+aCD.y2+'\x22 stroke=\x22#f97316\x22 strokeWidth=\x221.5\x22 />');

