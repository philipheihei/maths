const fs = require('fs');
let data = fs.readFileSync('c:\\VS code\\maths\\maths\\src\\notes\\F4CompoundInequalitiesNotes.jsx', 'utf8');

data = data.replace(/points=\"564, 554, 554,\"/g, 'points=\"564,95 554,89 554,101\"');
data = data.replace(/points=\"36, 46, 46,\"/g, 'points=\"36,95 46,89 46,101\"');

fs.writeFileSync('c:\\VS code\\maths\\maths\\src\\notes\\F4CompoundInequalitiesNotes.jsx', data);
