import React from 'react';

const AngleArc = ({ cx, cy, r, startAngle, endAngle, label, labelOffset = 15, isHighlighted = false }) => {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  
  let diff = endAngle - startAngle;
  if (diff < 0) diff += 360;
  const largeArcFlag = diff > 180 ? 1 : 0;
  
  const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  const arcPathData = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

  const midAngle = startAngle + diff / 2;
  const midRad = (midAngle * Math.PI) / 180;
  const lx = cx + (r + labelOffset) * Math.cos(midRad);
  const ly = cy + (r + labelOffset) * Math.sin(midRad);

  return (
    <g>
      {isHighlighted && (
        <path d={pathData} fill="rgba(255, 255, 0, 0.5)" stroke="none" />
      )}
      <path d={arcPathData} fill="none" stroke="black" strokeWidth="1.5" />
      {label && (
        <text x={lx} y={ly} fontSize="14" textAnchor="middle" dominantBaseline="middle" fill="black">
          {label}
        </text>
      )}
    </g>
  );
};

export default AngleArc;
