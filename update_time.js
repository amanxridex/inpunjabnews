const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
    /<div class=\"top-bar-left\">[\s\S]*?<\/div>/,
    `<div class="top-bar-left">
  <span><span class="live-dot"></span> LIVE</span>
  <span id="datetime-display">📅 Loading date...</span>
  <span class="weather-badge" id="weather-chandigarh">🌤️ Chandigarh ...</span>
  <span class="weather-badge" id="weather-jalandhar">🌤️ Jalandhar ...</span>
  <span class="currency-badge" id="rate-usd">💵 USD: Loading...</span>
  <span class="currency-badge" id="rate-gbp">💷 GBP: Loading...</span>
  </div>`
);
fs.writeFileSync('index.html', html, 'utf8');

// 2. Add real-time logic to index.js
let js = fs.readFileSync('index.js', 'utf8');
const scriptToAdd = `
// --- Real-time Date/Time & Weather ---
function updateTime() {
    const timeDisplay = document.getElementById('datetime-display');
    if (!timeDisplay) return;
    
    // IST is UTC+5:30
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
    
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    timeDisplay.innerHTML = '📅 ' + istTime.toLocaleDateString('en-IN', options) + ' (IST)';
}
setInterval(updateTime, 1000);
updateTime();

async function fetchWeather() {
    try {
        // Chandigarh (Lat: 30.7333, Lon: 76.7794)
        const chdRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=30.7333&longitude=76.7794&current_weather=true');
        if (chdRes.ok) {
            const chdData = await chdRes.json();
            const el = document.getElementById('weather-chandigarh');
            if (el) el.innerHTML = '🌤️ Chandigarh ' + Math.round(chdData.current_weather.temperature) + '°C';
        }
        
        // Jalandhar (Lat: 31.3260, Lon: 75.5762)
        const jalRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=31.3260&longitude=75.5762&current_weather=true');
        if (jalRes.ok) {
            const jalData = await jalRes.json();
            const el = document.getElementById('weather-jalandhar');
            if (el) el.innerHTML = '🌤️ Jalandhar ' + Math.round(jalData.current_weather.temperature) + '°C';
        }
    } catch (e) {
        console.error('Weather fetch error:', e);
    }
}
fetchWeather();
// Refresh weather every 30 mins
setInterval(fetchWeather, 30 * 60 * 1000);
// ------------------------------------
`;

if (!js.includes('function updateTime()')) {
    fs.appendFileSync('index.js', '\\n' + scriptToAdd, 'utf8');
}
