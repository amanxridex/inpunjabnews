const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');
const navStyle = `
/* ── NAV ── */
.main-nav {
    display: flex;
    justify-content: center;
    gap: 4px;
    overflow: visible;
    flex-wrap: wrap;
    padding-bottom: 8px;
    align-items: center;
}

.main-nav::-webkit-scrollbar {
    display: none;
}
`;
if (!css.includes('justify-content: center;\\n    gap: 4px;')) {
    css = css.replace(/\.nav-item\s*\{/, navStyle + '\n$&');
    fs.writeFileSync('index.css', css);
}
