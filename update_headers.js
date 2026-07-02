const fs = require('fs');

function updateHtml(file) {
    let html = fs.readFileSync(file, 'utf8');
    
    // We want to restructure the header.
    // Replace the main-header block and main-nav block.
    
    const newHeader = `<!-- Main Header -->
<header class="main-header">
    <div class="header-inner">
        <div class="header-top">
            <a href="index.html" class="logo-block" style="text-decoration: none;">
                <img alt="InPunjab News Logo" src="OFFICIAL LOGO.png" style="height: 48px;"/>
            </a>
            
            <div class="header-ad-banner">
                <div class="ad-label">Sponsored</div>
                <div class="ad-content">✦ Punjab Kesari Expo 2026 ✦</div>
            </div>
            
            <div class="header-search">
                <div class="nav-search" style="position: relative;">
                    <input class="search-box" id="searchBox" placeholder="Search news, topics…" type="text"/>
                    <button class="search-btn" onclick="doSearch()">🔍</button>
                </div>
                <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()" title="Toggle Light/Dark Mode">☀️</button>
                <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileMenu()">☰</button>
            </div>
        </div>
        
        <nav class="main-nav">
            <a class="nav-item breaking" onclick="scrollToSection('breaking')">🔴 Breaking</a>
            <a class="nav-item active" onclick="scrollToSection('hero')">Home</a>
            <div class="dropdown">
                <a class="nav-item">Punjab ▾</a>
                <div class="dropdown-content">
                    <a href="#">Chandigarh</a>
                    <a href="#">Amritsar</a>
                    <a href="#">Ludhiana</a>
                    <a href="#">Jalandhar</a>
                </div>
            </div>
            <a class="nav-item">National</a>
            <a class="nav-item">World</a>
            <a class="nav-item">Sports</a>
            <a class="nav-item">Entertainment</a>
            <a class="nav-item">Business</a>
            <a class="nav-item">Education</a>
            <a class="nav-item">NRI</a>
        </nav>
    </div>
</header>`;
    
    // We will extract from '<!-- Main Header -->' to '</header>' and replace it.
    const headerRegex = /<!-- Main Header -->[\s\S]*?<\/header>/;
    
    html = html.replace(headerRegex, newHeader);
    
    fs.writeFileSync(file, html);
    console.log('Updated ' + file);
}

updateHtml('index.html');
updateHtml('article.html');
