// ==========================================================================
// InPunjab News - Editorial Minimalist Client Logic
// Clean, Fast, Supabase-Driven
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initDateTime();
    initTheme();
    loadEditorialArticles();
});

// ── 1. Date & Time Utility ──
function initDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);

    const dateElem = document.getElementById('datetimeDisplay');
    if (dateElem) dateElem.textContent = `📅 ${dateStr}`;

    const headerDate = document.getElementById('headerDateStamp');
    if (headerDate) headerDate.textContent = `${dateStr} • Jalandhar & Punjab Edition`;

    const panchaangDate = document.getElementById('sidebarPanchaangDate');
    if (panchaangDate) panchaangDate.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── 2. Theme Toggle ──
function initTheme() {
    const saved = localStorage.getItem('inpunjab_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeBtnIcon(saved);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('inpunjab_theme', target);
    updateThemeBtnIcon(target);
}

function updateThemeBtnIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function toggleMobileNav() {
    const nav = document.getElementById('primaryNavBar');
    if (nav) {
        nav.classList.toggle('open');
    }
}

// ── 3. Search & Newsletter ──
function doSearch() {
    const query = document.getElementById('globalSearchInput').value.trim();
    if (query) {
        window.location.href = `article.html?search=${encodeURIComponent(query)}`;
    }
}

async function subscribeNewsletter() {
    const input = document.getElementById('newsletterEmailInput');
    const email = input ? input.value.trim() : '';
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        if (typeof supabaseClient !== 'undefined') {
            await supabaseClient.from('subscribers').insert([{ email: email, status: 'active' }]);
        }
        alert('Thank you for subscribing to InPunjab News!');
        if (input) input.value = '';
    } catch (e) {
        console.error('Newsletter error:', e);
        alert('Subscription recorded. Thank you!');
    }
}

// ── 4. Dynamic Supabase Data Fetching ──
async function loadEditorialArticles() {
    if (typeof supabaseClient === 'undefined') {
        console.error('Database client not loaded');
        return;
    }

    try {
        const { data: articles, error } = await supabaseClient
            .from('articles')
            .select('id, title, brief, content, image_url, tag, author, created_at, view_count')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (articles && articles.length > 0) {
            renderLeadHero(articles.slice(0, 8));
            renderPunjabGrid(articles.slice(8, 12).length > 0 ? articles.slice(8, 12) : articles.slice(0, 4));
            renderStreamList(articles.slice(12).length > 0 ? articles.slice(12) : articles.slice(4));
            renderTicker(articles.slice(0, 8));
        }

    } catch (err) {
        console.error('Error fetching articles from Supabase:', err.message);
    }
}

// Helper: Resolve image URLs cleanly
function resolveMediaUrl(url) {
    if (!url) return 'INPUNJABNEWSLOGO.png';
    return url;
}

// Helper: Calculate relative time
function timeAgo(dateString) {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── 5. Render Lead Hero (Aaj Tak 3-Column Layout) ──
function renderLeadHero(articles) {
    const container = document.getElementById('dynamicLeadHero');
    if (!container || articles.length === 0) return;

    const lead = articles[0];
    const sub1 = articles[1] || articles[0];
    const sub2 = articles[2] || articles[0];
    const topUpdates = articles.slice(3, 8);

    const renderMediaTag = (url, alt) => {
        if (url && url.toLowerCase().endsWith('.mp4')) {
            return `<video src="${url}" controls preload="metadata" onclick="event.stopPropagation()"></video>`;
        }
        return `<img src="${resolveMediaUrl(url)}" alt="${escapeHtml(alt)}" onerror="this.src='INPUNJABNEWSLOGO.png'">`;
    };

    // Lead Article HTML
    const leadHtml = `
        <article class="main-lead-card" onclick="window.location.href='article.html?id=${lead.id}'">
            <div class="lead-media-wrap">
                ${renderMediaTag(lead.image_url, lead.title)}
            </div>
            <div class="lead-content">
                <span class="meta-category-badge">${escapeHtml(lead.tag || 'Breaking')}</span>
                <h1 class="lead-headline-title">${escapeHtml(lead.title)}</h1>
                <p class="lead-excerpt">${escapeHtml(lead.brief || 'Read full detailed coverage of this story on InPunjab News.')}</p>
                <div class="lead-meta-footer">
                    <span>✍️ By ${escapeHtml(lead.author || 'vicky suri')}</span>
                    <span>• ${timeAgo(lead.created_at)}</span>
                    <span>• 👁️ ${lead.view_count || 120} views</span>
                </div>
            </div>
        </article>
    `;

    // Sub-Featured Stack HTML
    const subFeaturedHtml = `
        <div class="sub-featured-stack">
            <article class="sub-lead-card" onclick="window.location.href='article.html?id=${sub1.id}'">
                <div class="sub-media-wrap">
                    ${renderMediaTag(sub1.image_url, sub1.title)}
                </div>
                <div class="sub-lead-content">
                    <span style="font-size: 10px; font-weight: 800; color: var(--brand-red); text-transform: uppercase;">${escapeHtml(sub1.tag || 'Punjab')}</span>
                    <h2 class="sub-lead-title">${escapeHtml(sub1.title)}</h2>
                    <div class="sub-lead-meta">${timeAgo(sub1.created_at)} • By ${escapeHtml(sub1.author || 'InPunjab Desk')}</div>
                </div>
            </article>

            <article class="sub-lead-card" onclick="window.location.href='article.html?id=${sub2.id}'">
                <div class="sub-media-wrap">
                    ${renderMediaTag(sub2.image_url, sub2.title)}
                </div>
                <div class="sub-lead-content">
                    <span style="font-size: 10px; font-weight: 800; color: var(--brand-saffron); text-transform: uppercase;">${escapeHtml(sub2.tag || 'Punjab')}</span>
                    <h2 class="sub-lead-title">${escapeHtml(sub2.title)}</h2>
                    <div class="sub-lead-meta">${timeAgo(sub2.created_at)} • By ${escapeHtml(sub2.author || 'InPunjab Desk')}</div>
                </div>
            </article>
        </div>
    `;

    // Top Updates Column ("बड़ी खबरें / ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ" Aaj Tak Ordered List)
    let rankedItemsHtml = '';
    const updatesToShow = topUpdates.length > 0 ? topUpdates : articles.slice(0, 5);
    updatesToShow.forEach((art, idx) => {
        rankedItemsHtml += `
            <div class="ranked-news-item" onclick="window.location.href='article.html?id=${art.id}'">
                <span class="rank-number">${idx + 1}</span>
                <div class="ranked-news-title">${escapeHtml(art.title)}</div>
            </div>
        `;
    });

    const updatesColumnHtml = `
        <div class="top-updates-box">
            <div class="block-title-header">
                <h3><span class="accent-pill"></span> ਬੜੀਆਂ ਖ਼ਬਰਾਂ • Top Stories</h3>
                <span style="font-size: 10px; font-weight: 800; color: var(--brand-red);">LIVE</span>
            </div>
            <div class="top-updates-list">
                ${rankedItemsHtml}
            </div>
        </div>
    `;

    container.innerHTML = leadHtml + subFeaturedHtml + updatesColumnHtml;
}

// ── 6. Render Punjab Regional 4-Card Grid ──
function renderPunjabGrid(articles) {
    const container = document.getElementById('dynamicPunjabGrid');
    if (!container) return;

    let html = '';
    articles.slice(0, 4).forEach(art => {
        html += `
            <article class="news-card-editorial" onclick="window.location.href='article.html?id=${art.id}'">
                <div class="card-img-wrap">
                    <img src="${resolveMediaUrl(art.image_url)}" alt="${escapeHtml(art.title)}" onerror="this.src='INPUNJABNEWSLOGO.png'">
                </div>
                <div class="card-body">
                    <span class="card-tag">${escapeHtml(art.tag || 'Punjab')}</span>
                    <h3 class="card-title">${escapeHtml(art.title)}</h3>
                    <div class="card-footer">
                        <span>${timeAgo(art.created_at)}</span>
                        <span>✍️ ${escapeHtml(art.author || 'vicky suri')}</span>
                    </div>
                </div>
            </article>
        `;
    });

    container.innerHTML = html;
}

// ── 7. Render Stream Feed (Left Column in 2-Col Layout) ──
function renderStreamList(articles) {
    const container = document.getElementById('dynamicStreamList');
    if (!container) return;

    let html = '';
    articles.forEach(art => {
        html += `
            <article class="stream-card" onclick="window.location.href='article.html?id=${art.id}'">
                <div class="stream-thumb">
                    <img src="${resolveMediaUrl(art.image_url)}" alt="${escapeHtml(art.title)}" onerror="this.src='INPUNJABNEWSLOGO.png'">
                </div>
                <div class="stream-info">
                    <div class="stream-tag-row">
                        <span class="stream-tag">${escapeHtml(art.tag || 'Punjab')}</span>
                        <span class="stream-date">• ${timeAgo(art.created_at)}</span>
                    </div>
                    <h3 class="stream-title">${escapeHtml(art.title)}</h3>
                    <p class="stream-brief">${escapeHtml(art.brief || art.title)}</p>
                    <div class="stream-meta">
                        <span>✍️ ${escapeHtml(art.author || 'vicky suri')}</span>
                        <span>👁️ ${art.view_count || 150} views</span>
                    </div>
                </div>
            </article>
        `;
    });

    container.innerHTML = html;
}

// ── 8. Render Breaking News Ticker ──
function renderTicker(articles) {
    const track = document.getElementById('breakingTickerTrack');
    if (!track || articles.length === 0) return;

    let spans = '';
    articles.forEach(a => {
        spans += `<span><a href="article.html?id=${a.id}">${escapeHtml(a.title)}</a></span>`;
    });

    track.innerHTML = spans + spans; // Duplicate for seamless infinite marquee loop
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#39;';
            default: return m;
        }
    });
}
