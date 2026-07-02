const fs = require('fs');

// 1. Fix index.js
try {
    let indexJs = fs.readFileSync('index.js', 'utf8');
    
    // The previous multi_replace_file_content failed and deleted the theme toggle function in index.js!
    // I need to restore it.
    if (!indexJs.includes('function toggleTheme()')) {
        indexJs += `
// --- THEME TOGGLE LOGIC ---
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
});
`;
    }

    // Fix currency symbols in index.js
    indexJs = indexJs.replace(/dY'[^\s]* USD: [^\d]*\$\{usdRate\}/g, '💵 USD: ₹${usdRate}');
    indexJs = indexJs.replace(/dY'[^\s]* GBP: [^\d]*\$\{gbpRate\}/g, '💷 GBP: ₹${gbpRate}');
    indexJs = indexJs.replace(/dY'[^\s]* USD: [^\d]*83\.45/g, '💵 USD: ₹83.45');
    indexJs = indexJs.replace(/dY'[^\s]* GBP: [^\d]*105\.60/g, '💷 GBP: ₹105.60');
    
    fs.writeFileSync('index.js', indexJs);
    console.log("Fixed index.js");
} catch(e) { console.error(e); }

// 2. Fix article.js
try {
    let articleJs = fs.readFileSync('article.js', 'utf8');
    
    const themeFuncRegex = /\/\/ --- THEME TOGGLE LOGIC ---[\s\S]*?\}\);/m;
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
    
    if (articleJs.match(themeFuncRegex)) {
        articleJs = articleJs.replace(themeFuncRegex, properThemeLogic);
    }
    
    fs.writeFileSync('article.js', articleJs);
    console.log("Fixed article.js");
} catch(e) { console.error(e); }

// 3. Fix article.html 
try {
    let articleHtml = fs.readFileSync('article.html', 'utf8');
    
    // Fix the top bar which has ?? USD and ?? GBP and `n artifacts
    articleHtml = articleHtml.replace(/<span class="weather-badge">[^<]+<\/span>`n<span class="currency-badge">\?\? USD: \?83\.45<\/span>`n<span class="currency-badge">\?\? GBP: \?105\.60<\/span>/, 
    '<span class="weather-badge">🌤️ Chandigarh 34°C</span>\n<span class="currency-badge" id="rate-usd">💵 USD: ₹83.45</span>\n<span class="currency-badge" id="rate-gbp">💷 GBP: ₹105.60</span>');
    
    fs.writeFileSync('article.html', articleHtml);
    console.log("Fixed article.html");
} catch(e) { console.error(e); }
