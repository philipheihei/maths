// Comprehensive angle verification and fix generator
const fs = require('fs');
const path = require('path');

// Convert SVG coordinates to angle (SVG: 0=right, 90=down, 180=left, 270=up)
function angleBetween(cx, cy, px, py) {
  // atan2 returns angle in standard math coords
  // SVG: y is flipped, so use (py-cy) directly since SVG has y-down
  const rad = Math.atan2(py - cy, px - cx);
  let deg = rad * 180 / Math.PI;
  if (deg < 0) deg += 360;
  return deg;
}

// Compute the angle span from startAngle to endAngle going clockwise (increasing)
function arcSpan(start, end) {
  let span = end - start;
  if (span < 0) span += 360;
  return span;
}

console.log("=== DETAILED ANGLE VERIFICATION ===\n");

// ===== F1-05 =====
{
  // Lines: AB from (60,60) to (260,160), CD from (60,160) to (260,60)
  // Intersection O at (160, 110)
  const cx = 160, cy = 110;
  const aDir = angleBetween(cx, cy, 60, 60);
  const bDir = angleBetween(cx, cy, 260, 160);
  const cDir = angleBetween(cx, cy, 60, 160);
  const dDir = angleBetween(cx, cy, 260, 60);
  const angAOC = arcSpan(cDir, aDir);
  console.log(`F1-05: Vert. opp. angles`);
  console.log(`  A dir=${aDir.toFixed(1)}, B dir=${bDir.toFixed(1)}, C dir=${cDir.toFixed(1)}, D dir=${dDir.toFixed(1)}`);
  console.log(`  ∠AOC = ${angAOC.toFixed(1)}° (stated 55°, answer 55°)`);
  console.log(`  Arc: start=153 end=207, span=54° (should be ~${angAOC.toFixed(1)})`);
  console.log();
}

// ===== F1-06 =====
{
  // Parallel lines at y=80 and y=160  
  // Transversal PQ: from (120,30) to (200,200)
  // Intersection M at (143.5, 80)
  const mx = 143.5, my = 80;
  const aDir = angleBetween(mx, my, 40, 80); // toward A (left)
  const pDir = angleBetween(mx, my, 120, 30); // toward P (upper)
  const angAMP = arcSpan(aDir, pDir);
  const angAMP2 = 360 - angAMP; // the "other" angle
  console.log(`F1-06: Corr. angles, stated ∠AMP = 120°`);
  console.log(`  A dir=${aDir.toFixed(1)}, P dir=${pDir.toFixed(1)}`);
  console.log(`  ∠AMP (CW from A to P) = ${angAMP.toFixed(1)}° or ${angAMP2.toFixed(1)}°`);
  console.log(`  Arc: start=180 end=245, span=65°`);
  
  // For 120° angle: need transversal direction at angle (180+120) = 300° from M
  const targetDir = 180 + 120; // 300°
  const targetRad = targetDir * Math.PI / 180;
  const dx = Math.cos(targetRad), dy = Math.sin(targetRad);
  // From M(143.5, 80), go upward to P
  const tP = (30 - 80) / dy;
  const pxNew = 143.5 + tP * dx;
  // go downward to Q
  const tQ = (200 - 80) / dy;
  const qxNew = 143.5 + tQ * dx;
  // N at y=160
  const tN = (160 - 80) / dy;
  const nxNew = 143.5 + tN * dx;
  console.log(`  FIX: P=(${pxNew.toFixed(1)}, 30), Q=(${qxNew.toFixed(1)}, 200), N=(${nxNew.toFixed(1)}, 160)`);
  console.log(`  Arc should be: start=180 end=${targetDir} span=${targetDir-180}°`);
  console.log();
}

// ===== F1-07 =====
{
  // Transversal from (100,40) to (220,200)
  // M at (130, 80)
  const mx = 130, my = 80;
  const bDir = angleBetween(mx, my, 280, 80); // toward B (right)
  const mDir = angleBetween(mx, my, 100, 40); // toward P (upper)
  const nDir = angleBetween(mx, my, 220, 200); // toward Q (lower)
  const angBMN = arcSpan(nDir, bDir);
  const angBMQ = arcSpan(bDir, nDir);
  console.log(`F1-07: Co-interior angles, stated ∠BMN = 75°`);
  console.log(`  B dir=${bDir.toFixed(1)}, N(Q) dir=${nDir.toFixed(1)}`);
  console.log(`  ∠BMN (from B to Q CW)= ${angBMQ.toFixed(1)}° or ${angBMN.toFixed(1)}°`);
  console.log(`  Arc: start=0 end=53, span=53° (should be 75°)`);
  
  // Need transversal at 75° from horizontal right
  // ∠BMN = 75° means from ray MB (0°) going CW by 75° reaches MN direction = 75°
  const targetNDir = 0 + 75; //75°
  const rad = targetNDir * Math.PI / 180;
  const dx = Math.cos(rad), dy = Math.sin(rad);
  // From M(130, 80), N at y=160
  const tN = (160 - 80) / dy;
  const nxNew = 130 + tN * dx;
  // P at y=40
  const tP = (40 - 80) / dy;
  const pxNew = 130 + tP * dx;
  // Q at y=200
  const tQ = (200 - 80) / dy;
  const qxNew = 130 + tQ * dx;
  console.log(`  FIX: P=(${pxNew.toFixed(1)}, 40), Q=(${qxNew.toFixed(1)}, 200), N=(${nxNew.toFixed(1)}, 160)`);
  console.log(`  Arc: start=0 end=75 for ∠BMN`);
  console.log();
}

// ===== F1-10 =====
{
  // Same geometry as F1-06 (from (120,30) to (200,200))
  // ∠AMP = 100°
  const mx = 143.5, my = 80;
  const aDir = angleBetween(mx, my, 40, 80); // 180°
  const pDir = angleBetween(mx, my, 120, 30); // ~245°
  console.log(`F1-10: Stated ∠AMP = 100°, actual ~${arcSpan(aDir, pDir).toFixed(1)}°`);
  
  const targetDir = 180 + 100; // 280°
  const rad = targetDir * Math.PI / 180;
  const dx = Math.cos(rad), dy = Math.sin(rad);
  const tP = (30 - 80) / dy;
  const pxNew = mx + tP * dx;
  const tQ = (200 - 80) / dy;
  const qxNew = mx + tQ * dx;
  const tN = (160 - 80) / dy;
  const nxNew = mx + tN * dx;
  console.log(`  FIX(at M=${mx}): P=(${pxNew.toFixed(1)}, 30), Q=(${qxNew.toFixed(1)}, 200), N=(${nxNew.toFixed(1)}, 160)`);
  console.log(`  Arc: start=180 end=280`);
  console.log();
}

// ===== F1-11 =====
{
  // Transversal from (180,30) to (100,200)
  // M at (156.5, 80), stated ∠BMQ = 115°
  const mx = 156.5, my = 80;
  const bDir = angleBetween(mx, my, 280, 80); // 0°
  const qDir = angleBetween(mx, my, 100, 200); // toward Q (lower-left)
  const angBMQ = arcSpan(bDir, qDir);
  console.log(`F1-11: Stated ∠BMQ = 115°, actual = ${angBMQ.toFixed(1)}°`);
  console.log(`  Arc: start=0 end=115, span=115°`);
  console.log();
}

// ===== F1-12 =====
{
  // ∠AMN = 54° — the angle on the left side between ray MA and ray MN (downward)
  // Transversal from (100,30) to (200,200)
  // M at (129.4, 80)
  const mx = 129.4, my = 80;
  const aDir = angleBetween(mx, my, 40, 80); // 180°
  const qDir = angleBetween(mx, my, 200, 200); // toward Q (lower-right)
  const angAMQ = arcSpan(aDir, qDir);
  console.log(`F1-12: Stated ∠AMN = 54°`);
  console.log(`  A dir=${aDir.toFixed(1)}, Q dir=${qDir.toFixed(1)}`);
  console.log(`  CW from A to Q = ${angAMQ.toFixed(1)}° (arc shows start=60 end=180 span=120°!)`);
  
  // ∠AMN is measured from MA going to MN (downward direction)
  // For ∠AMN = 54°: the downward ray should be at 180+54 = 234° from M
  // But the arc is start=60 end=180 which is ABOVE the line, not below
  // This means the arc is marking ∠PMN or ∠AMP, not ∠AMN
  // Actually looking at the text: "∠AMN = 54°" and in diagram M is on AB, N is below on CD
  // ∠AMN = angle at M from ray MA to ray MN. Since A is left and N is below-right,
  // this should be a downward angle.
  // The arc start=60 end=180 marks the angle ABOVE = ∠AMP which would be 180-54=126° ≠ 120°
  // This is doubly wrong: wrong angle marked AND wrong span
  
  // Let's compute what the diagram should look like for ∠AMN = 54°
  // MN direction should be 180+54 = 234° (below-left)
  const targetDir = 180 + 54; // 234°
  const rad = targetDir * Math.PI / 180;
  const dx = Math.cos(rad), dy = Math.sin(rad);
  const tN = (160 - 80) / dy;
  const nxNew = mx + tN * dx;
  const tP = (30 - 80) / dy;
  const pxNew = mx + tP * dx;
  const tQ = (200 - 80) / dy;
  const qxNew = mx + tQ * dx;
  console.log(`  FIX: P=(${pxNew.toFixed(1)}, 30), Q=(${qxNew.toFixed(1)}, 200), N=(${nxNew.toFixed(1)}, 160)`);
  console.log(`  Arc: start=180 end=234 for ∠AMN=54°`);
  console.log();
}

// ===== F1-13 =====
{
  // ∠ABC = 45° and ∠CEF = 35°
  // B=(200,50), C=(140,110), E=(200,170)
  const bx = 200, by = 50;
  const cAngle = angleBetween(bx, by, 140, 110); // toward C
  const aAngle = angleBetween(bx, by, 40, 50);  // toward A (left)
  const angABC = arcSpan(cAngle, aAngle);
  
  const ex = 200, ey = 170;
  const cAngle2 = angleBetween(ex, ey, 140, 110);
  const fAngle = angleBetween(ex, ey, 40, 170);
  const angCEF = arcSpan(fAngle, cAngle2);
  
  console.log(`F1-13: stated ∠ABC=45° ∠CEF=35°`);
  console.log(`  B: Cdir=${cAngle.toFixed(1)}, Adir=${aAngle.toFixed(1)}, ∠ABC=${angABC.toFixed(1)}° (or ${(360-angABC).toFixed(1)})`);
  console.log(`  E: Cdir=${cAngle2.toFixed(1)}, Fdir=${fAngle.toFixed(1)}, ∠CEF=${angCEF.toFixed(1)}° (or ${(360-angCEF).toFixed(1)})`);
  console.log(`  Arc at B: start=135 end=180, span=45° (stated 45° ✓)`);
  console.log(`  Arc at E: start=180 end=225, span=45° (stated 35° ✗)`);
  console.log();
}

// ===== F1-14 =====
{
  // Triangle: A(160,40), B(80,160), C(240,160)
  const ax = 160, ay = 40;
  const bx = 80, by = 160;
  const cx = 240, cy = 160;
  
  const bFromA = angleBetween(ax, ay, bx, by);
  const cFromA = angleBetween(ax, ay, cx, cy);
  const aSpan = arcSpan(bFromA, cFromA);
  
  const aFromB = angleBetween(bx, by, ax, ay);
  const cFromB = angleBetween(bx, by, cx, cy);
  const bSpan = arcSpan(cFromB, aFromB);
  
  const aFromC = angleBetween(cx, cy, ax, ay);
  const bFromC = angleBetween(cx, cy, bx, by);
  const cSpan = arcSpan(aFromC, bFromC);
  
  console.log(`F1-14: Triangle ∠A=65° ∠B=50° ∠C=65°`);
  console.log(`  A: B-dir=${bFromA.toFixed(1)}, C-dir=${cFromA.toFixed(1)}, ∠A=${aSpan.toFixed(1)}° or ${(360-aSpan).toFixed(1)}°`);
  console.log(`  B: A-dir=${aFromB.toFixed(1)}, C-dir=${cFromB.toFixed(1)}, ∠B=${bSpan.toFixed(1)}° or ${(360-bSpan).toFixed(1)}°`);
  console.log(`  C: A-dir=${aFromC.toFixed(1)}, B-dir=${bFromC.toFixed(1)}, ∠C=${cSpan.toFixed(1)}° or ${(360-cSpan).toFixed(1)}°`);
  console.log(`  Arc at A: start=56 end=124, span=68° (stated 65°)`);
  console.log(`  Arc at B: start=304 end=360, span=56° (stated 50°)`);
  console.log();
}

// ===== F1-22 =====
{
  // A=(100,50), E=(160,110), C=(100,170)
  const ax = 100, ay = 50, ex = 160, ey = 110, cx = 100, cy = 170;
  const eFromA = angleBetween(ax, ay, ex, ey);
  const rightFromA = angleBetween(ax, ay, 240, 50);
  const angEAB = arcSpan(rightFromA, eFromA);
  
  const eFromC = angleBetween(cx, cy, ex, ey);
  const rightFromC = angleBetween(cx, cy, 240, 170);
  const angECD = arcSpan(eFromC, rightFromC);
  
  console.log(`F1-22: stated ∠EAB=40° ∠ECD=50°`);
  console.log(`  A: E-dir=${eFromA.toFixed(1)}, B-dir(right)=${rightFromA.toFixed(1)}, ∠EAB=${angEAB.toFixed(1)}° or ${(360-angEAB).toFixed(1)}°`);
  console.log(`  C: E-dir=${eFromC.toFixed(1)}, D-dir(right)=${rightFromC.toFixed(1)}, ∠ECD=${angECD.toFixed(1)}° or ${(360-angECD).toFixed(1)}°`);
  console.log(`  Arc at A: start=0 end=45, span=45° (stated 40°)`);
  console.log(`  Arc at C: start=315 end=360, span=45° (stated 50°)`);
  console.log();
}

// ===== F3-18 =====
{
  // Rhombus PQRS: P(160,52.3), Q(60,110), R(160,167.7), S(260,110)
  // ∠QSR = 80°
  const sx = 260, sy = 110;
  const qDir = angleBetween(sx, sy, 60, 110); // toward Q = 180°
  const rDir = angleBetween(sx, sy, 160, 167.7); // toward R
  const pDir = angleBetween(sx, sy, 160, 52.3); // toward P
  console.log(`F3-18: stated ∠QSR=80°`);
  console.log(`  S: Q-dir=${qDir.toFixed(1)}, R-dir=${rDir.toFixed(1)}, P-dir=${pDir.toFixed(1)}`);
  const angQSR = arcSpan(rDir, qDir);
  const angQSR2 = arcSpan(qDir, rDir);
  console.log(`  ∠QSR = ${angQSR.toFixed(1)}° or ${angQSR2.toFixed(1)}°`);
  console.log(`  Arc: start=150 end=180, span=30° (stated 80° !!)`);
  
  // The rhombus at S: angle QSR should be half of angle QSR (∠QSR)
  // Actually ∠QSR is the whole angle at S in the rhombus
  // But the problem says ∠QSR = 80°, and the arc marks from R to Q going through the upper half
  // The actual geometry: T is the intersection of diagonals at (160, 110)
  // Wait, T is explicitly the intersection. The diagonal QS is from Q(60,110) to S(260,110) = horizontal
  // The diagonal PR is from P(160,52.3) to R(160,167.7) = vertical
  // So these diagonals are perpendicular. The angle at S between diagonal and side SR:
  // S(260,110) to R(160,167.7): direction = atan2(57.7, -100) = 180-30° = 150° in SVG
  const tDir = angleBetween(sx, sy, 160, 110); // center = 180°
  console.log(`  Diag center dir from S = ${tDir.toFixed(1)}`);
  console.log(`  ∠TSR = arcSpan(rDir, tDir) = ${arcSpan(rDir, tDir).toFixed(1)} or ${arcSpan(tDir, rDir).toFixed(1)}`);
  // The diagonal PR bisects angle QPR and QSR
  // Since diagonals are ⊥, ∠QST = ∠RST should each be half of ∠QSR
  // Actual ∠RST = angle from S to T to S has directions tDir=180 and rDir
  const angRST = arcSpan(rDir, tDir);
  console.log(`  ∠RST (half of QSR) = ${angRST.toFixed(1)}° → ∠QSR = ${(2*angRST).toFixed(1)}° (stated 80°)`);
  console.log();
}

// ===== S-07 =====
{
  // O(160,100), A(160,160), B(212,70)
  // ∠OAB = 25°
  const ax = 160, ay = 160;
  const oDir = angleBetween(ax, ay, 160, 100); // straight up = 270°
  const bDir = angleBetween(ax, ay, 212, 70); // toward B
  const angOAB = arcSpan(oDir, bDir);
  console.log(`S-07: stated ∠OAB=25°`);
  console.log(`  A: O-dir=${oDir.toFixed(1)}, B-dir=${bDir.toFixed(1)}`);
  console.log(`  ∠OAB = ${angOAB.toFixed(1)}° or ${(360-angOAB).toFixed(1)}°`);
  console.log(`  Arc: start=300 end=360, span=60° (stated 25° !!)`);
  console.log();
}

// ===== S-13 =====
{
  // A(160,160), B(110,66.8), C(212,70)
  // ∠TAC = 75°, ∠BAC = 35°
  const ax = 160, ay = 160;
  const bDir = angleBetween(ax, ay, 110, 66.8);
  const cDir = angleBetween(ax, ay, 212, 70);
  const tDir = 180; // T is to the left
  const angTAC = arcSpan(tDir, cDir);
  const angTAB = arcSpan(tDir, bDir);
  const angBAC = arcSpan(bDir, cDir);
  console.log(`S-13: stated ∠TAC=75° ∠BAC=35°`);
  console.log(`  A: T-dir=180, B-dir=${bDir.toFixed(1)}, C-dir=${cDir.toFixed(1)}`);
  console.log(`  ∠TAC = ${angTAC.toFixed(1)}° or ${(360-angTAC).toFixed(1)}°`);
  console.log(`  ∠TAB = ${angTAB.toFixed(1)}°`);
  console.log(`  ∠BAC = ${angBAC.toFixed(1)}°`);
  console.log(`  Arc TAC: start=180 end=300, span=120° (stated 75°)`);
  console.log(`  Arc BAC: start=240 end=300, span=60° (stated 35°)`);
  console.log();
}

// ===== S-22 =====
{
  // Chords: AB from (100,74) to (220,146), CD from (100,146) to (220,74)
  // Also AC from (100,74) to (100,146) (vertical)
  // ∠CAB = 30° at A(100,74), ∠ACD = 50° at C(100,146)
  const ax = 100, ay = 74;
  const cFromA = angleBetween(ax, ay, 100, 146); // straight down = 90°
  const bFromA = angleBetween(ax, ay, 220, 146); // toward B
  const angCAB = arcSpan(cFromA, bFromA);
  
  const cx = 100, cy = 146;
  const aFromC = angleBetween(cx, cy, 100, 74); // straight up = 270°
  const dFromC = angleBetween(cx, cy, 220, 74); // toward D
  const angACD = arcSpan(aFromC, dFromC);
  
  console.log(`S-22: stated ∠CAB=30° ∠ACD=50°`);
  console.log(`  A: C-dir=${cFromA.toFixed(1)}(90°), B-dir=${bFromA.toFixed(1)}`);
  console.log(`  ∠CAB = ${angCAB.toFixed(1)}° or ${(360-angCAB).toFixed(1)}°`);
  console.log(`  C: A-dir=${aFromC.toFixed(1)}(270°), D-dir=${dFromC.toFixed(1)}`);
  console.log(`  ∠ACD = ${angACD.toFixed(1)}° or ${(360-angACD).toFixed(1)}°`);
  console.log(`  Arc ∠CAB: start=31 end=90, span=59° (stated 30°)`);
  console.log(`  Arc ∠ACD: start=270 end=329, span=59° (stated 50°)`);
  console.log();
}

// ===== S-25 =====
{
  // ABCD cyclic quad: A(100,74), B(220,74), C(200,167.4), D(120,167.4)
  // ∠DAB = 100°
  const ax = 100, ay = 74;
  const bDir = angleBetween(ax, ay, 220, 74); // right = 0°
  const dDir = angleBetween(ax, ay, 120, 167.4);
  const angDAB = arcSpan(bDir, dDir);
  console.log(`S-25: stated ∠DAB=100°`);
  console.log(`  A: B-dir=${bDir.toFixed(1)}, D-dir=${dDir.toFixed(1)}`);
  console.log(`  ∠DAB (CW from B to D) = ${angDAB.toFixed(1)}° or ${(360-angDAB).toFixed(1)}°`);
  console.log(`  Arc: start=0 end=78, span=78° (stated 100°)`);
  console.log();
}

// ===== F2-27 =====
{
  // Triangle A(140,40), B(60,160), C(180,160), D(260,160)
  // ∠A = 55°, ∠ACD = 120°  
  const ax = 140, ay = 40;
  const bFromA = angleBetween(ax, ay, 60, 160);
  const cFromA = angleBetween(ax, ay, 180, 160);
  const spanA = arcSpan(bFromA, cFromA);
  
  const cx = 180, cy = 160;
  const aFromC = angleBetween(cx, cy, 140, 40);
  const bFromC = angleBetween(cx, cy, 60, 160);
  const dFromC = angleBetween(cx, cy, 260, 160);
  const angACD = arcSpan(aFromC, dFromC);
  
  console.log(`F2-27: stated ∠A=55° ∠ACD=120°`);
  console.log(`  A: B-dir=${bFromA.toFixed(1)}, C-dir=${cFromA.toFixed(1)}, ∠A=${spanA.toFixed(1)}° or ${(360-spanA).toFixed(1)}°`);
  console.log(`  C: A-dir=${aFromC.toFixed(1)}, D-dir=${dFromC.toFixed(1)}, ∠ACD=${angACD.toFixed(1)}° or ${(360-angACD).toFixed(1)}°`);
  console.log(`  Arc at C: start=252 end=360, span=108° (stated 120°)`);
  console.log();
}

// ===== F2-28 =====
{
  // Same triangle as F2-27 but ∠B = 45°, ∠ACD = 110°
  const bx = 60, by = 160;
  const aFromB = angleBetween(bx, by, 140, 40);
  const cFromB = angleBetween(bx, by, 180, 160);
  const spanB = arcSpan(cFromB, aFromB);
  console.log(`F2-28: stated ∠B=45°`);
  console.log(`  B: A-dir=${aFromB.toFixed(1)}, C-dir=${cFromB.toFixed(1)}, ∠B=${spanB.toFixed(1)}° or ${(360-spanB).toFixed(1)}°`);
  console.log(`  Arc: start=304 end=360, span=56° (stated 45°)`);
  console.log();
}

// ===== S-12 =====
{
  // ABCD: A(160,40), B(100,144), C(160,180), D(220,144)
  // ∠BCD = 110°
  const cx = 160, cy = 180;
  const bDir = angleBetween(cx, cy, 100, 144);
  const dDir = angleBetween(cx, cy, 220, 144);
  const angBCD = arcSpan(dDir, bDir);
  console.log(`S-12: stated ∠BCD=110°`);
  console.log(`  C: B-dir=${bDir.toFixed(1)}, D-dir=${dDir.toFixed(1)}`);
  console.log(`  ∠BCD (CW from D to B) = ${angBCD.toFixed(1)}° or ${(360-angBCD).toFixed(1)}°`);
  console.log(`  Arc: start=210 end=330, span=120° (stated 110°)`);
  console.log();
}

// ===== F3-02 =====
{
  // Rhombus: A(160,30), B(240,110), C(160,190), D(80,110)
  // ∠DAC = 35° at A(160,30)
  const ax = 160, ay = 30;
  const dDir = angleBetween(ax, ay, 80, 110);
  const cDir = angleBetween(ax, ay, 160, 190); // straight down = 90°
  const angDAC = arcSpan(cDir, dDir);
  console.log(`F3-02: stated ∠DAC=35°`);
  console.log(`  A(160,30): D-dir=${dDir.toFixed(1)}, C-dir=${cDir.toFixed(1)}`);
  console.log(`  ∠DAC = ${angDAC.toFixed(1)}° or ${(360-angDAC).toFixed(1)}°`);
  console.log(`  Arc: start=90 end=135, span=45° (stated 35°)`);
  console.log();
}

// ===== S-26 =====
{
  // T(60,160), A(170,58), B(145,134), C(260,110)
  // ∠ATB = 40°
  const tx = 60, ty = 160;
  const aDir = angleBetween(tx, ty, 170, 58);
  const bDir = angleBetween(tx, ty, 260, 110);
  const angATB = arcSpan(aDir, bDir);
  console.log(`S-26: stated ∠ATB=40°`);
  console.log(`  T: A-dir=${aDir.toFixed(1)}, C-dir(=B secant)=${bDir.toFixed(1)}`);
  console.log(`  ∠ATC = ${angATB.toFixed(1)}° or ${(360-angATB).toFixed(1)}°`);
  console.log(`  Arc: start=317 end=346, span=29° (stated 40°)`);
  console.log();
}
