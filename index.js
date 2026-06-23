
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
        function subscribeEmail() {
            const input = document.querySelector('.subscribe-input');
            if (!input.value || !input.value.includes('@')) {
                showToast('⚠️ Invalid Email', 'Please enter a valid email address.');
                return;
            }
            showToast('🎉 Subscribed!', 'Welcome to InPunjab News. Check your inbox for confirmation.');
            input.value = '';
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
        // Switch to Dark
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = '☀️';
    } else {
        // Switch to Light
        htmlEl.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = '🌙';
    }
}

// Set initial button icon based on saved theme (default is light)
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        if (savedTheme === 'dark') {
            toggleBtn.textContent = '☀️';
        } else {
            toggleBtn.textContent = '🌙';
            // Also ensure the data attribute is set if they haven't explicitly set it yet
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
    } catch (err) {
        console.error('Error fetching data from Supabase:', err.message);
    }
});

function renderHero(heroArticles) {
    const heroContainer = document.getElementById('dynamic-hero');
    if (!heroContainer || heroArticles.length === 0) return;

    const mainArt = heroArticles[0];
    const catName = mainArt.categories ? mainArt.categories.name : 'News';
    const tag = mainArt.tag || catName;

    let html = `
        <div class="hero-main">
            <img src="${mainArt.image_url}" alt="${mainArt.title}">
            <div class="hero-overlay">
                <span class="hero-category">Punjab • ${catName}</span>
                <div class="hero-title">${mainArt.title}</div>
                <div class="hero-meta">
                    <span class="author">By InPunjab Desk</span>
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
            <div class="side-card">
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
    // Distribute remaining articles across the empty grid containers
    const categoriesToPopulate = ['punjab', 'regions', 'national', 'politics', 'business', 'sports', 'entertainment'];
    
    let artIdx = 0;
    
    for (const cat of categoriesToPopulate) {
        let gridIdx = 0;
        while (true) {
            const gridContainer = document.getElementById(`dynamic-grid-${cat}-${gridIdx}`);
            if (!gridContainer) break;

            let gridHtml = '';
            for (let i = 0; i < 4; i++) {
                if (artIdx >= articles.length) artIdx = 0; // Wrap around for demo
                const art = articles[artIdx];
                const artCat = art.categories ? art.categories.name : 'News';
                const pillClass = `cat-pill cat-${artCat.toLowerCase()}`;

                gridHtml += `
                    <div class="news-card">
                        <img class="news-card-img" src="${art.image_url}" alt="${art.title}">
                        <div class="news-card-body">
                            <span class="${pillClass}">${artCat}</span>
                            <div class="news-card-title">${art.title}</div>
                            <div class="news-card-meta">Just now</div>
                        </div>
                    </div>
                `;
                artIdx++;
            }
            gridContainer.innerHTML = gridHtml;
            gridIdx++;
        }
    }
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
                        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(art.title + ' - Read more on InPunjab News!')}" target="_blank" class="short-action-btn btn-whatsapp">
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
