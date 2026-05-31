const fs = require('fs');
const tempContent = fs.readFileSync('src/notes/tmpCH19Locus.jsx', 'utf-8');
const f5Content = fs.readFileSync('src/notes/F5Notes.jsx', 'utf-8');

const updatedContent = f5Content + '\n\n' + tempContent;
fs.writeFileSync('src/notes/F5Notes.jsx', updatedContent);
