const fs = require('fs');
const path = require('path');

const files = [
    'src/App.js',
    'src/components/CircuitModal.jsx',
    'src/index.js',
    'src/pages/Boolforge.jsx',
    'src/pages/BooleanAlgebra/BooleanAlgebraOverview.jsx',
    'src/pages/EncoderAndDecoder/decoder/DecoderPage.jsx',
    'src/pages/Home/Footer.jsx',
    'src/pages/KmapGenerator.jsx',
    'src/pages/RegistersAndTransfers/RegLayout.jsx',
    'src/pages/SequentialCircuits/SeqLayout.jsx',
    'src/pages/Home/HomeData.js'
];

files.forEach((file) => {
    const fullPath = path.join('c:/Users/Delll/OneDrive/Desktop/DigitalLogicsStudio', file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    const lines = content.split(/\r?\n/);
    const newLines = [];
    let state = 'normal'; // 'normal', 'ours', 'theirs'
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('<<<<<<< HEAD')) {
            state = 'ours';
        } else if (line.startsWith('=======')) {
            state = 'theirs';
        } else if (line.startsWith('>>>>>>> ')) {
            state = 'normal';
        } else {
            if (state === 'normal') {
                newLines.push(line);
            } else if (state === 'ours' && false) {
                // Ignore ours
                newLines.push(line);
            } else if (state === 'theirs' && true) {
                // Keep theirs
                newLines.push(line);
            }
        }
    }
    
    fs.writeFileSync(fullPath, newLines.join('\n'));
    console.log(`Resolved ${file} using theirs`);
});
