const fs = require('fs');

// 1. Fix Modal Logic in index.js
let js = fs.readFileSync('index.js', 'utf8');
// Remove the DOMContentLoaded wrapper for the modal
js = js.replace(
    /document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{\s*setTimeout\(\(\)\s*=>\s*\{/g,
    '// Modal initialized immediately\\nsetTimeout(() => {'
);
// And the closing brace we removed earlier, wait, if we replace the opening, we need to remove the closing.
// Actually, earlier I removed the extra brace, so right now it looks like:
/*
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
            const overlay = document.getElementById('bday-modal-overlay');
            if (overlay) {
                overlay.classList.add('show');
            }
        }, 800); // slight delay for dramatic effect
});
*/
js = js.replace(
    /document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{[\s\n]*setTimeout\(\(\)\s*=>\s*\{([\s\S]*?)\},\s*800\);[\s\n\/\w]*\}\);/m,
    `// Modal initialized immediately\\nsetTimeout(() => {$1}, 800);`
);
fs.writeFileSync('index.js', js, 'utf8');

// 2. Fix Mobile CSS in index.css
let css = fs.readFileSync('index.css', 'utf8');
const mobileCssFix = `
/* --- MOBILE HEADER FIXES --- */
@media (max-width: 768px) {
    /* Top Bar scrolling for long items */
    .top-bar-inner {
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 5px 0;
    }
    .top-bar-left {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        width: 100%;
        padding-bottom: 5px;
        -webkit-overflow-scrolling: touch;
        justify-content: flex-start;
        gap: 15px;
    }
    .top-bar-left::-webkit-scrollbar {
        display: none;
    }
    .top-bar-left span {
        flex-shrink: 0;
    }
    .top-bar-right {
        justify-content: center;
        width: 100%;
    }
    
    /* Header Top Logo & Search */
    .header-top {
        flex-direction: column;
        gap: 15px;
        padding: 10px 5px;
    }
    .header-search {
        width: 100%;
        justify-content: center;
    }
    .nav-search {
        width: 100%;
        max-width: 300px;
    }
    .header-ad-banner {
        display: none; /* Hide on mobile to save space */
    }
    .logo-block img {
        height: 40px;
    }
}
`;
if (!css.includes('/* --- MOBILE HEADER FIXES --- */')) {
    fs.appendFileSync('index.css', '\\n' + mobileCssFix, 'utf8');
}
