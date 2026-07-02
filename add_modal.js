const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('id="bday-modal"')) {
    const modalHTML = `
<!-- Birthday Modal -->
<div class="bday-modal-overlay" id="bday-modal-overlay">
    <div class="bday-modal" id="bday-modal">
        <button class="bday-close" onclick="closeBdayModal()">✕</button>
        <img src="hbd.png" alt="Happy Birthday" class="bday-img">
        <div class="bday-text">Happy birthday to our chief editor!</div>
    </div>
</div>
`;
    // Insert before closing body tag
    html = html.replace('</body>', modalHTML + '\\n</body>');
    fs.writeFileSync('index.html', html, 'utf8');
}

// 2. Update index.css
let css = fs.readFileSync('index.css', 'utf8');
if (!css.includes('.bday-modal-overlay')) {
    const modalCSS = `
/* Birthday Modal */
.bday-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(5px);
}
.bday-modal-overlay.show {
    opacity: 1;
    pointer-events: auto;
}
.bday-modal {
    background: var(--card-bg);
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    position: relative;
    max-width: 90%;
    width: 400px;
    text-align: center;
    transform: translateY(20px);
    transition: transform 0.3s ease;
    border: 1px solid var(--card-border);
}
.bday-modal-overlay.show .bday-modal {
    transform: translateY(0);
}
.bday-close {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--saffron);
    color: #fff;
    border: 2px solid #fff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s;
}
.bday-close:hover {
    transform: scale(1.1);
    background: #d85c00;
}
.bday-img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
    object-fit: contain;
    max-height: 300px;
}
.bday-text {
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
    background: linear-gradient(90deg, var(--saffron), #e11d48);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px 0;
}
`;
    fs.appendFileSync('index.css', '\\n' + modalCSS, 'utf8');
}

// 3. Update index.js
let js = fs.readFileSync('index.js', 'utf8');
if (!js.includes('function closeBdayModal()')) {
    const modalJS = `
// --- Birthday Modal Logic ---
function closeBdayModal() {
    const overlay = document.getElementById('bday-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        // Optional: save to session storage so it doesn't show again on reload
        sessionStorage.setItem('bdayModalSeen', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Show modal if not seen in this session
    if (!sessionStorage.getItem('bdayModalSeen')) {
        setTimeout(() => {
            const overlay = document.getElementById('bday-modal-overlay');
            if (overlay) {
                overlay.classList.add('show');
            }
        }, 800); // slight delay for dramatic effect
    }
});
// ----------------------------
`;
    fs.appendFileSync('index.js', '\\n' + modalJS, 'utf8');
}
