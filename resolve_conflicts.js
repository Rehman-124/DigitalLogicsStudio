const fs = require('fs');
const path = require('path');

const files = [
    { file: 'src/components/CircuitModal.jsx', strategy: 'theirs' },
    { file: 'src/pages/Boolforge.jsx', strategy: 'theirs' },
    { file: 'src/App.js', strategy: 'theirs' }
];

files.forEach(({ file, strategy }) => {
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
            } else if (state === 'ours' && strategy === 'ours') {
                newLines.push(line);
            } else if (state === 'theirs' && strategy === 'theirs') {
                newLines.push(line);
            }
        }
    }
    
    fs.writeFileSync(fullPath, newLines.join('\n'));
    console.log(`Resolved ${file} using ${strategy}`);
});
