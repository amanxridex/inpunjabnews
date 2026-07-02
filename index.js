
        // ── POLL ──
        let voted = false;
        function vote(el, pct) {
            if (voted) return;
            voted = true;
            const options = document.querySelectorAll('.poll-option');
            const percents = [42, 28, 19, 11];
            options.forEach((opt, i) => {
                opt.classList.add('voted');
                opt.querySelector('.poll-bar').style.width = percents[i] + '%';
                opt.style.cursor = 'default';
            });
            el.style.borderColor = 'var(--saffron)';
            document.getElementById('pollTotal').textContent = '4,822 votes cast • Thank you for voting!';
            showToast('✅ Vote Cast', 'Your vote has been recorded successfully.');
        }

        // ── LIKE ──
        function likeCard(btn) {
            btn.textContent = btn.textContent === '🤍' ? '🧡' : '🤍';
            if (btn.textContent === '🧡') {
                btn.style.transform = 'scale(1.4)';
                setTimeout(() => btn.style.transform = '', 300);
                showToast('❤️ Liked', 'Story added to your saved articles.');
            }
        }

        // ── TOAST ──
        function showToast(title, body, delay = 0) {
            setTimeout(() => {
                const container = document.getElementById('toastContainer');
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `<div class="toast-icon">📰</div><div class="toast-content"><div class="toast-title">${title}</div><div class="toast-body">${body}</div></div>`;
                container.appendChild(toast);
                toast.addEventListener('click', () => removeToast(toast));
                setTimeout(() => removeToast(toast), 5000);
            }, delay);
        }
        function removeToast(toast) {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }

        // ── SUBSCRIBE ──
        async function subscribeEmail() {
            const input = document.querySelector('.subscribe-input');
            if (!input) return;
            const email = input.value.trim();
            if (!email || !email.includes('@')) {
                showToast('⚠️ Invalid Email', 'Please enter a valid email address.');
                return;
            }
            try {
                if (typeof supabaseClient === 'undefined') {
                    showToast('🎉 Subscribed!', 'Welcome to InPunjab News. Check your inbox for confirmation.');
                    input.value = '';
                    return;
                }
                const { error } = await supabaseClient
                    .from('subscribers')
                    .insert([{ email: email, source: 'Homepage Form', region: 'Punjab', status: 'active' }]);
                if (error) {
                    if (error.code === '23505') {
                        showToast('📬 Already Subscribed', 'This email is already registered.');
                    } else {
                        throw error;
                    }
                } else {
                    showToast('🎉 Subscribed!', 'Welcome to InPunjab News.');
                    input.value = '';
                }
            } catch (err) {
                console.error('Subscription error:', err.message);
                showToast('❌ Subscription Failed', 'Please try again later.');
            }
        }

        // ── SEARCH ──
        function doSearch() {
            const q = document.getElementById('searchBox').value.trim();
            if (!q) return;
            showToast('🔍 Searching', `Finding stories about "${q}"...`);
            document.getElementById('searchBox').value = '';
        }
        document.getElementById('searchBox').addEventListener('keydown', e => {
            if (e.key === 'Enter') doSearch();
        });

        // ── SCROLL NAV ──
        function scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // ── READING PROGRESS ──
        window.addEventListener('scroll', () => {
            const total = document.body.scrollHeight - window.innerHeight;
            const pct = (window.scrollY / total) * 100;
            document.getElementById('readingProgress').style.width = pct + '%';
            const btn = document.getElementById('back-top');
            btn.classList.toggle('show', window.scrollY > 400);
        });

        // ── FADE IN SCROLL ──
        const fadeEls = document.querySelectorAll('.fade-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        fadeEls.forEach(el => observer.observe(el));

        // ── WELCOME TOASTS ──
        showToast('👋 Welcome!', 'You\'re reading InPunjab News — ਪੰਜਾਬ ਦੀ ਆਵਾਜ਼', 1000);
        showToast('🔴 Breaking', 'PBKS vs CSK Live — Punjab Kings need 46 off 24 balls!', 3500);
        showToast('⚡ Alert', 'Heavy rain warning for Ludhiana, Jalandhar tonight', 6000);

// ── MOBILE MENU ──
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if(nav) {
        nav.classList.toggle('show-menu');
    }
}
// --- SPLASH SCREEN LOGIC ---
document.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('splash-screen');
    
    if (!sessionStorage.getItem('splashShown')) {
        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => {
                splash.remove();
            }, 600);
        }, 1800);
        sessionStorage.setItem('splashShown', 'true');
    } else {
        splash.style.display = 'none';
        splash.remove();
    }
});

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
// --- SHORTS LOGIC ---
function openShorts() {
    const shortsContainer = document.getElementById('shorts-container');
    shortsContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
// --- DYNAMIC DATA FETCHING (SUPABASE) ---
document.addEventListener('DOMContentLoaded', async function() {
    if (typeof supabaseClient === 'undefined') return;

    try {
        // Fetch Articles
        const { data: articles, error } = await supabaseClient
            .from('articles')
            .select('*, categories(name, slug)')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (articles && articles.length > 0) {
            renderHero(articles.slice(0, 3));
            renderGrids(articles.slice(3));
            renderShorts(articles);
        }

        // Fetch Tickers
        const { data: tickers, error: tickerError } = await supabaseClient
            .from('tickers')
            .select('text');

        if (!tickerError && tickers && tickers.length > 0) {
            renderTicker(tickers);
        }
    } catch (err) {
        console.error('Error fetching data from Supabase:', err.message);
    }
});

function renderTicker(tickers) {
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    let spans = '';
    tickers.forEach(t => {
        spans += `<span>${t.text}</span>`;
    });
    track.innerHTML = spans + spans; // duplicate for seamless scrolling marquee
}

function renderHero(heroArticles) {
    const heroContainer = document.getElementById('dynamic-hero');
    if (!heroContainer || heroArticles.length === 0) return;

    const mainArt = heroArticles[0];
    const catName = mainArt.categories ? mainArt.categories.name : 'News';
    const tag = mainArt.tag || catName;

    let html = `
        <div class="hero-main" style="cursor: pointer;" onclick="window.location.href='article.html?id=${mainArt.id}'">
            <img src="${mainArt.image_url}" alt="${mainArt.title}">
            <div class="hero-overlay">
                <span class="hero-category">Punjab • ${catName}</span>
                <div class="hero-title">${mainArt.title}</div>
                <div class="hero-meta">
                    <span class="author">By ${mainArt.author || 'InPunjab Desk'}</span>
                    <span>Just now</span>
                    <span>👁 ${mainArt.view_count || 100} views</span>
                    <span>💬 ${mainArt.comment_count || 0} comments</span>
                </div>
            </div>
        </div>
        <div class="hero-side">
    `;

    for (let i = 1; i < heroArticles.length; i++) {
        const art = heroArticles[i];
        const artCat = art.categories ? art.categories.name : 'News';
        html += `
            <div class="side-card" style="cursor: pointer;" onclick="window.location.href='article.html?id=${art.id}'">
                <img src="${art.image_url}" alt="${art.title}">
                <div class="side-card-body">
                    <div class="side-cat">${artCat}</div>
                    <div class="side-title">${art.title}</div>
                    <div class="side-meta">Just now • ${art.view_count || 100} views</div>
                </div>
            </div>
        `;
    }

    html += '</div>';
    heroContainer.innerHTML = html;
}

function renderGrids(articles) {
    if (!articles || articles.length === 0) return;
    
    // Select all cards that can be populated dynamically
    const cards = document.querySelectorAll('.news-card:not(.hero-main):not(.side-card), .list-card');
    
    let artIdx = 0;
    
    cards.forEach(card => {
        if (artIdx >= articles.length) artIdx = 0; // Wrap around if not enough articles
        const art = articles[artIdx];
        const artCat = art.categories ? art.categories.name : 'News';
        
        // Make the card clickable
        card.style.cursor = 'pointer';
        card.onclick = (e) => {
            // Don't trigger if they clicked an action button (like, share, comment)
            if (e.target.closest('.action-btn')) return;
            window.location.href = `article.html?id=${art.id}`;
        };
        
        // Populate Image
        const img = card.querySelector('img');
        if (img) img.src = art.image_url;
        
        // Populate Title
        const titleEl = card.querySelector('.news-card-title, .list-card-title');
        if (titleEl) titleEl.textContent = art.title;
        
        // Populate Category
        const catEl = card.querySelector('.news-card-cat, .list-card-cat, .cat-pill');
        if (catEl) {
            // If it's a list card category, it usually has formatting "Education • Punjab", preserve structure if needed, or replace
            if (catEl.classList.contains('cat-pill')) {
                catEl.textContent = artCat;
            } else {
                // Determine if breaking
                const isBreaking = catEl.textContent.includes('🔴');
                catEl.textContent = (isBreaking ? '🔴 ' : '') + artCat + ' • Punjab';
            }
        }
        
        // Populate Excerpt
        const excerptEl = card.querySelector('.news-card-excerpt');
        if (excerptEl) excerptEl.textContent = art.brief || art.title;
        
        artIdx++;
    });
}

function renderShorts(articles) {
    const shortsWrapper = document.getElementById('shortsWrapper');
    if (!shortsWrapper) return;

    let htmlContent = '';
    
    for (let i = 0; i < articles.length; i++) {
        const art = articles[i];
        const artCat = art.categories ? art.categories.name : 'News';
        const views = art.view_count || Math.floor(Math.random() * 500) + 10;
        const comments = art.comment_count || Math.floor(Math.random() * 200) + 5;

        htmlContent += `
            <div class="short-slide">
                <div class="short-bg" style="background-image: url('${art.image_url}');"></div>
                <div class="short-content">
                    <div class="short-tag">${art.tag || artCat}</div>
                    <h2 class="short-headline">${art.title}</h2>
                    <p class="short-brief">${art.brief || art.title}</p>
                    <div class="short-actions">
                        <div class="short-action-btn btn-views">
                            <span class="icon">👁️</span>
                            <span class="count">${views}K</span>
                        </div>
                        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(art.title + ' - Read more on InPunjab News! ' + window.location.origin + window.location.pathname.replace('index.html', '') + 'article.html?id=' + art.id)}" target="_blank" class="short-action-btn btn-whatsapp">
                            <span class="icon">💬</span>
                            <span class="count">Share</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    shortsWrapper.innerHTML = htmlContent;
}

function openShorts() {
    const shortsContainer = document.getElementById('shorts-container');
    shortsContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeShorts() {
    const shortsContainer = document.getElementById('shorts-container');
    shortsContainer.classList.add('hidden');
    document.body.style.overflow = '';
}
        // 💵 CURRENCY FETCH
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
        
        if (usdEl) usdEl.innerHTML = `💵 USD: ₹${usdRate}`;
        if (gbpEl) gbpEl.innerHTML = `💷 GBP: ₹${gbpRate}`;
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
});
