const fs = require('fs');
let css = fs.readFileSync('c:/Users/91836/PERSONAL/INPUNJABMASTER/main/index.css', 'utf8');

// The corrupted string
const regex = /-html, body \{ background: var\(--deep-navy\); color: var\(--text-primary\); font-family: 'Inter', sans-serif; overflow-x: hidden; width: 100%; max-width: 100vw; position: relative; margin: 0; padding: 0; \}/g;

let matchCount = 0;
css = css.replace(regex, () => {
    matchCount++;
    return '-body';
});

// There is one more edge case: the original `html, body` rule itself might have been duplicated or something, but we only target `-html, body`.

fs.writeFileSync('c:/Users/91836/PERSONAL/INPUNJABMASTER/main/index.css', css);
console.log(`Fixed ${matchCount} occurrences!`);
