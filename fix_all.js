const fs = require('fs');

function fixHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix currency badges
        content = content.replace(/<span class="currency-badge" id="rate-usd">[^<]+<\/span>/, '<span class="currency-badge" id="rate-usd">💵 USD: Loading...</span>');
        content = content.replace(/<span class="currency-badge" id="rate-gbp">[^<]+<\/span>/, '<span class="currency-badge" id="rate-gbp">💷 GBP: Loading...</span>');
        
        // Fix weather badge
        content = content.replace(/<span class="weather-badge">[^<]+<\/span>/, '<span class="weather-badge">🌤️ Chandigarh 34°C</span>');
        
        // Fix theme toggle
        content = content.replace(/<button class="theme-toggle" id="themeToggle"[^>]+>[^<]+<\/button>/, '<button class="theme-toggle" id="themeToggle" onclick="toggleTheme()" title="Toggle Light/Dark Mode">☀️</button>');

        // Fix mobile menu btn
        content = content.replace(/<button class="mobile-menu-btn" id="mobileMenuBtn"[^>]+>[^<]+<\/button>/, '<button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileMenu()">☰</button>');

        // Fix calendar
        content = content.replace(/<span>[^<]*Tuesday, June 23, 2026<\/span>/, '<span>📅 Tuesday, June 23, 2026</span>');

        // Fix article.html specific glitch
        content = content.replace(/<\/span>`n<span class="currency-badge">\?\? USD:/g, '</span>\n<span class="currency-badge" id="rate-usd">💵 USD:');
        content = content.replace(/<\/span>`n<span class="currency-badge">\?\? GBP:/g, '</span>\n<span class="currency-badge" id="rate-gbp">💷 GBP:');
        
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${filePath}`);
    } catch(e) {
        console.error(`Error fixing ${filePath}:`, e);
    }
}

function fixJsFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix theme toggle text content
        content = content.replace(/toggleBtn\.textContent = '[^']+'/g, (match) => {
            if (match.includes('?')) return "toggleBtn.textContent = '🌙'"; // Defaulting to one, we will fix properly below
            if (match.includes('dYOT') || match.includes('☀️')) return "toggleBtn.textContent = '☀️'";
            if (match.includes('🌙')) return "toggleBtn.textContent = '🌙'";
            return match;
        });

        const properThemeLogic = `// --- THEME TOGGLE LOGIC ---
function toggleTheme() {
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute('data-theme');
    const toggleBtn = document.getElementById('themeToggle');
    if (currentTheme === 'light') {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        if(toggleBtn) toggleBtn.textContent = '☀️';
    } else {
        htmlEl.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if(toggleBtn) toggleBtn.textContent = '🌙';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        if (savedTheme === 'dark') {
            toggleBtn.textContent = '☀️';
        } else {
            toggleBtn.textContent = '🌙';
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
});`;
        
        const themeFuncRegex = /\/\/ --- THEME TOGGLE LOGIC ---[\s\S]*?\}\);/m;
        if (content.match(themeFuncRegex)) {
            content = content.replace(themeFuncRegex, properThemeLogic);
        }
        
        // Fix fetchCurrencyRates in index.js (article.js doesn't have it natively, but if it does, fix it)
        const fetchFuncRegex = /\/\/ \?\? CURRENCY FETCH[\s\S]*?\}\);/m;
        const properFetchLogic = `// 💵 CURRENCY FETCH
async function fetchCurrencyRates() {
    try {
        const usdRes = await fetch('https://open.er-api.com/v6/latest/USD');
        const usdData = await usdRes.json();
        const usdRate = usdData.rates.INR.toFixed(2);
        
        const gbpRes = await fetch('https://open.er-api.com/v6/latest/GBP');
        const gbpData = await gbpRes.json();
        const gbpRate = gbpData.rates.INR.toFixed(2);
        
        const usdEl = document.getElementById('rate-usd');
        const gbpEl = document.getElementById('rate-gbp');
        
        if (usdEl) usdEl.innerHTML = \`💵 USD: ₹\${usdRate}\`;
        if (gbpEl) gbpEl.innerHTML = \`💷 GBP: ₹\${gbpRate}\`;
    } catch (error) {
        console.error('Failed to fetch currency rates:', error);
        const usdEl = document.getElementById('rate-usd');
        const gbpEl = document.getElementById('rate-gbp');
        if (usdEl) usdEl.innerHTML = '💵 USD: ₹83.45';
        if (gbpEl) gbpEl.innerHTML = '💷 GBP: ₹105.60';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCurrencyRates();
});`;
        if (content.match(fetchFuncRegex)) {
            content = content.replace(fetchFuncRegex, properFetchLogic);
        } else if (filePath.includes('index.js')) {
            // Append if it doesn't exist
            content += '\n' + properFetchLogic + '\n';
        }

        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${filePath}`);
    } catch(e) {
        console.error(`Error fixing ${filePath}:`, e);
    }
}

fixHtmlFile('index.html');
fixHtmlFile('article.html');
fixJsFile('index.js');
fixJsFile('article.js');
