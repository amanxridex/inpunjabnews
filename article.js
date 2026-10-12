// ==========================================================================
// InPunjab News - Editorial Minimalist Article Detail Logic
// Author: Vicky Suri
// ==========================================================================

let currentArticleId = null;

document.addEventListener('DOMContentLoaded', () => {
    initViewportDetection();
    initDateTime();
    initTheme();
    initReadingProgress();
    loadArticleDetail();
    loadDynamicAds();
    loadDailyPanchangWidget();
});

// ── Viewport Detection & Dynamic Adaptation ──
function initViewportDetection() {
    const handleViewport = () => {
        const width = window.innerWidth;
        const isMobile = width <= 768;
        const isSmallMobile = width <= 480;

        document.documentElement.setAttribute('data-viewport', isSmallMobile ? 'small-mobile' : isMobile ? 'mobile' : 'desktop');
        document.body.classList.toggle('is-mobile-viewport', isMobile);
        document.body.classList.toggle('is-small-mobile', isSmallMobile);
    };

    handleViewport();
    window.addEventListener('resize', handleViewport, { passive: true });
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewport, 150);
    }, { passive: true });
}

// ── 1. Date & Time ──
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

// ── 2. Theme Management ──
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
    const overlay = document.getElementById('mobileDrawerOverlay');
    const panel = document.getElementById('mobileDrawerPanel');
    if (overlay && panel) {
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open', !isOpen);
        overlay.classList.toggle('open', !isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    }
}

function doDrawerSearch() {
    const input = document.getElementById('drawerSearchInput');
    const query = input ? input.value.trim() : '';
    if (query) {
        toggleMobileNav();
        window.location.href = `index.html#latest-stream`;
    }
}

// Global cached image blob for native sharing
window.currentArticleImageBlob = null;

// Helper: Always fetch image blob with multi-tier CORS & Canvas fallback
async function fetchArticleImageBlob(imageUrl) {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('data:')) {
        try {
            const parts = imageUrl.split(',');
            const mime = parts[0].match(/:(.*?);/)[1];
            const bstr = atob(parts[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) u8arr[n] = bstr.charCodeAt(n);
            return new Blob([u8arr], { type: mime });
        } catch (e) {
            console.warn('Error converting dataURI:', e);
        }
    }

    try {
        const response = await fetch(imageUrl, { mode: 'cors', cache: 'default' });
        if (response.ok) {
            const blob = await response.blob();
            if (blob && blob.size > 0) return blob;
        }
    } catch (err) {
        // Direct fetch failed, proceed to Canvas fallback
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        let resolved = false;

        const done = (blob) => {
            if (!resolved) {
                resolved = true;
                resolve(blob);
            }
        };

        const timeout = setTimeout(() => done(null), 3500);

        img.onload = () => {
            clearTimeout(timeout);
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width || 600;
                canvas.height = img.naturalHeight || img.height || 400;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => done(blob), 'image/jpeg', 0.92);
            } catch (canvasErr) {
                done(null);
            }
        };

        img.onerror = () => {
            clearTimeout(timeout);
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = fallbackImg.naturalWidth || 600;
                    canvas.height = fallbackImg.naturalHeight || 400;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(fallbackImg, 0, 0);
                    canvas.toBlob((blob) => done(blob), 'image/jpeg', 0.92);
                } catch (e) {
                    done(null);
                }
            };
            fallbackImg.onerror = () => done(null);
            fallbackImg.src = imageUrl;
        };

        img.src = imageUrl;
    });
}

async function shareArticleNative() {
    const title = document.title.replace(' – InPunjab News', '');
    const url = window.location.href;
    const ogImg = document.getElementById('ogImage');
    const imgUrl = (ogImg && ogImg.content) ? ogImg.content : '';

    showToast('Fetching article image for sharing... ⏳');

    let blob = window.currentArticleImageBlob;
    if (!blob && imgUrl) {
        blob = await fetchArticleImageBlob(imgUrl);
        window.currentArticleImageBlob = blob;
    }

    if (blob && navigator.canShare) {
        try {
            const ext = blob.type.includes('png') ? 'png' : blob.type.includes('webp') ? 'webp' : 'jpg';
            const file = new File([blob], 'inpunjab-news.' + ext, { type: blob.type || 'image/jpeg' });
            if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: title,
                    text: `📰 *${title}*\n\nRead full report on InPunjab News:\n${url}`,
                    url: url,
                    files: [file]
                });
                showToast('Article shared successfully with image! 📤');
                return;
            }
        } catch (e) {
            if (e.name === 'AbortError') return;
        }
    }

    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: `📰 *${title}*\n\nRead full report on InPunjab News:\n${url}`,
                url: url
            });
            showToast('Article shared successfully! 📤');
            return;
        } catch (e) {
            if (e.name === 'AbortError') return;
        }
    }

    // Fallback to WhatsApp
    shareArticleWhatsApp();
}

async function shareArticleWhatsApp() {
    const title = document.title.replace(' – InPunjab News', '');
    const url = window.location.href;
    const ogImg = document.getElementById('ogImage');
    const imgUrl = (ogImg && ogImg.content) ? ogImg.content : '';

    // If native sharing with file is supported, try it directly
    if (window.currentArticleImageBlob && navigator.canShare) {
        try {
            const ext = window.currentArticleImageBlob.type.includes('png') ? 'png' : 'jpg';
            const file = new File([window.currentArticleImageBlob], 'news-image.' + ext, { type: window.currentArticleImageBlob.type || 'image/jpeg' });
            if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: title,
                    text: `📰 *${title}*\n\nRead full report on InPunjab News:\n${url}`,
                    url: url,
                    files: [file]
                });
                return;
            }
        } catch (e) {
            if (e.name === 'AbortError') return;
        }
    }

    const text = `📰 *${title}*\n\n${imgUrl ? '🖼️ *Image:* ' + imgUrl + '\n\n' : ''}Read full report on InPunjab News:\n${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
}

// ── 3. Reading Progress Bar ──
function initReadingProgress() {
    const progressBar = document.getElementById('readingProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
    });
}

// ── 4. Main Article Loader ──
async function loadArticleDetail() {
    const mainContainer = document.getElementById('article-main-container');
    const urlParams = new URLSearchParams(window.location.search);
    let articleId = urlParams.get('id');

    if (typeof supabaseClient === 'undefined') {
        console.error('Database client not loaded. Retrying in 1s...');
        setTimeout(loadArticleDetail, 1000);
        return;
    }

    try {
        let article = null;

        if (articleId) {
            // Fetch specific requested article
            const { data, error } = await supabaseClient
                .from('articles')
                .select('*')
                .eq('id', articleId)
                .single();

            if (!error && data) {
                article = data;
                currentArticleId = article.id;
            }
        }

        // If no ID given or specific article not found, fetch the latest top article
        if (!article) {
            const { data: latestList, error: listErr } = await supabaseClient
                .from('articles')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false })
                .limit(1);

            if (listErr) throw listErr;
            if (latestList && latestList.length > 0) {
                article = latestList[0];
                articleId = article.id;
                currentArticleId = article.id;
            } else {
                throw new Error('No articles published yet.');
            }
        }

        // Update Page Title & Breadcrumb
        document.title = `${article.title} – InPunjab News`;
        const breadcrumbTitle = document.getElementById('breadcrumbTitle');
        if (breadcrumbTitle) breadcrumbTitle.textContent = article.title;
        const breadcrumbCategory = document.getElementById('breadcrumbCategory');
        if (breadcrumbCategory) breadcrumbCategory.textContent = article.tag || 'Punjab News';

        // Update Meta & Open Graph Tags for social sharing & WhatsApp preview
        const ogTitle = document.getElementById('ogTitle');
        if (ogTitle) ogTitle.content = `${article.title} – InPunjab News`;
        const ogDesc = document.getElementById('ogDesc');
        if (ogDesc) ogDesc.content = article.brief || article.title;
        const ogImage = document.getElementById('ogImage');
        let fullArticleImageUrl = '';
        if (article.image_url) {
            fullArticleImageUrl = article.image_url.startsWith('http') ? article.image_url : `${window.location.origin}/${article.image_url.replace(/^\/+/, '')}`;
            if (ogImage) ogImage.content = fullArticleImageUrl;
        }

        let twImage = document.querySelector('meta[name="twitter:image"]');
        if (!twImage) {
            twImage = document.createElement('meta');
            twImage.setAttribute('name', 'twitter:image');
            document.head.appendChild(twImage);
        }
        if (fullArticleImageUrl) twImage.content = fullArticleImageUrl;

        // Pre-fetch article image blob for instant native sharing
        if (fullArticleImageUrl) {
            fetchArticleImageBlob(fullArticleImageUrl).then(blob => {
                window.currentArticleImageBlob = blob;
            }).catch(() => {});
        }

        // Render the Full Article Body
        renderArticleContent(article);

        // Safely Increment View Count in background
        try {
            await supabaseClient.rpc('increment_view_count', { article_id: currentArticleId });
        } catch (rpcErr) {
            // Non-critical fallback
        }

        // Load Sidebar Trending and Bottom Related
        loadSidebarAndRelated(currentArticleId);

        // Load Comments
        loadComments(currentArticleId);

    } catch (err) {
        console.error('Error fetching article:', err.message);
        loadSidebarAndRelated(null);
    }
}

// Helper: Estimate read time in minutes
function estimateReadTime(text) {
    if (!text) return 2;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 180));
}

// Helper: Format Date
function formatFullDate(dateString) {
    if (!dateString) return 'Recently Published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Helper: Format Article Body into Clean Paragraphs, Subheads, & Datelines
function formatArticleBody(content) {
    if (!content) return '<p>No content available for this report.</p>';

    // If content is already HTML formatted
    if (content.includes('<p>') || content.includes('<div>') || content.includes('<br>')) {
        return content;
    }

    // Convert newlines to paragraphs
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim());
    if (paragraphs.length > 0) {
        return paragraphs.map(p => {
            let text = p.trim();

            // Detect subheadings (starts with ➖ or • or all caps/short bold)
            if (text.startsWith('➖') || text.startsWith('*ਆਮ') || text.startsWith('*ਕਾਂਗਰਸ') || (text.startsWith('*') && text.endsWith('*') && text.length < 150)) {
                const cleanSub = text.replace(/^[➖•\*\s]+|[*\s]+$/g, '');
                return `<h3 class="article-subhead">${escapeHtml(cleanSub)}</h3>`;
            }

            // Detect dateline at start of paragraph (e.g. "ਜਲੰਧਰ, 15 ਸਤੰਬਰ।" or "जालंधर, 12 सितंबर।")
            let formattedText = escapeHtml(text);
            formattedText = formattedText.replace(/^(ਜਲੰਧਰ|ਅੰਮ੍ਰਿਤਸਰ|ਲੁਧਿਆਣਾ|ਚੰਡੀਗੜ੍ਹ|ਜਾਲੰਧਰ|जालंधर|अमृतसर|लुधियाना|चंडीगढ़)[^।.]+[।.]/i, '<strong class="dateline">$&</strong>');

            // Format markdown bold *text* into strong
            formattedText = formattedText.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

            // Preserve single line breaks inside paragraph
            formattedText = formattedText.replace(/\n/g, '<br>');

            return `<p>${formattedText}</p>`;
        }).join('');
    }

    return `<p>${escapeHtml(content)}</p>`;
}

// ── 5. Render Article Content ──
function renderArticleContent(article) {
    const mainContainer = document.getElementById('article-main-container');
    if (!mainContainer) return;

    const readTime = estimateReadTime(article.content);
    const dateFormatted = formatFullDate(article.created_at);
    const authorName = article.author || 'vicky suri';
    const tag = article.tag || 'Punjab Special';
    const views = (article.view_count || 120) + 1;

    // Lead Media Tag (Video or Image)
    let mediaHtml = '';
    if (article.image_url) {
        if (article.image_url.toLowerCase().endsWith('.mp4')) {
            mediaHtml = `
                <div class="article-lead-media-wrap">
                    <video src="${article.image_url}" controls preload="metadata"></video>
                    <div class="media-caption-bar">📹 Video Report • InPunjab Digital</div>
                </div>
            `;
        } else {
            mediaHtml = `
                <div class="article-lead-media-wrap">
                    <img src="${article.image_url}" alt="${escapeHtml(article.title)}" onerror="this.src='INPUNJABNEWSLOGO.png'">
                    <div class="media-caption-bar">📷 InPunjab Newsroom • Ground Reality & Verified Report</div>
                </div>
            `;
        }
    }

    // Aaj Tak Style Key Highlights Extraction
    let highlightsHtml = '';
    if (article.brief) {
        const points = article.brief.split(/[•\n\r]+/).map(p => p.trim()).filter(p => p.length > 5);
        if (points.length > 0) {
            highlightsHtml = `
                <div class="article-highlights-box">
                    <div class="highlights-header">
                        <span>⚡ ਮੁੱਖ ਨੁਕਤੇ • KEY HIGHLIGHTS</span>
                    </div>
                    <ul class="highlights-list">
                        ${points.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }

    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(`${article.title} - InPunjab News\n`);
    const waShareUrl = `https://api.whatsapp.com/send?text=${shareTitle}${shareUrl}`;

    mainContainer.innerHTML = `
        <!-- Article Header Package -->
        <div class="article-header-package">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span class="article-tag-badge">${escapeHtml(tag)}</span>
                <span class="article-exclusive-badge">🔴 EXCLUSIVE</span>
            </div>
            <h1 class="article-main-title">${escapeHtml(article.title)}</h1>

            <!-- Aaj Tak Key Highlights Box -->
            ${highlightsHtml}

            <!-- Metadata Row -->
            <div class="article-byline-row">
                <span class="byline-author">✍️ By ${escapeHtml(authorName)} <span style="color:#10B981;">✓</span></span>
                <span>📅 ${dateFormatted}</span>
                <span>⏱️ ${readTime} min read</span>
                <span>👁️ ${views} views</span>
            </div>

            <!-- Social Action Buttons -->
            <div class="article-actions-bar">
                <a href="${waShareUrl}" target="_blank" rel="noopener" class="action-wa-btn">
                    <span>💬 WhatsApp</span>
                </a>
                <button type="button" class="action-share-native-btn" onclick="shareArticleNative()" title="Share Article & Image">
                    <span>📤 Share with Image</span>
                </button>
                <button type="button" class="action-copy-btn" onclick="copyArticleLink()">
                    <span>🔗 Copy Link</span>
                </button>
                <button type="button" class="action-tool-btn" id="listenArticleBtn" onclick="toggleAudioSpeech()" title="Listen to Story">
                    <span>🔊 ਸੁਣੋ • Listen</span>
                </button>
                <div class="action-zoom-group" title="Adjust text size">
                    <button type="button" class="action-zoom-btn" onclick="adjustTextSize(-1)" title="Smaller Text">A-</button>
                    <button type="button" class="action-zoom-btn" onclick="adjustTextSize(1)" title="Larger Text">A+</button>
                </div>
            </div>
        </div>

        <!-- Featured Media -->
        ${mediaHtml}

        <!-- Full Editorial Body -->
        <div class="article-editorial-body">
            ${formatArticleBody(article.content)}
        </div>

        <!-- In-Article WhatsApp Callout -->
        <div class="article-wa-callout">
            <div class="article-wa-text">
                <h4>📲 Join InPunjab News on WhatsApp</h4>
                <p>ਪੰਜਾਬ ਦੀ ਹਰ ਵੱਡੀ ਅਤੇ ਤਾਜ਼ਾ ਖ਼ਬਰ ਆਪਣੇ ਫ਼ੋਨ 'ਤੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।</p>
            </div>
            <a href="https://whatsapp.com" target="_blank" rel="noopener" class="article-wa-join-btn">
                Join WhatsApp Group ➔
            </a>
        </div>

        <!-- Author Signature Box -->
        <div class="author-signature-box">
            <div class="author-sig-avatar">✍️</div>
            <div class="author-sig-info">
                <h4>${escapeHtml(authorName)} <span style="color:#10B981;">✓</span></h4>
                <p>Senior Editorial Desk • InPunjab News Jalandhar Bureau</p>
                <p style="font-size:11px; margin-top:4px;">Fearless & Verified Journalism from Punjab.</p>
            </div>
        </div>

        <!-- Interactive Comments Section -->
        <section class="article-comments-block">
            <h3>💬 Reader Discussion • ਟਿੱਪਣੀਆਂ</h3>
            <div id="commentsStream" class="comments-stream">
                <p style="color:var(--text-muted); font-size:13px;">Loading comments...</p>
            </div>

            <div class="comment-form-card">
                <h4>Leave a Comment / ਆਪਣੀ ਰਾਇ ਦਿਓ</h4>
                <form id="articleCommentForm" onsubmit="handleCommentSubmit(event)">
                    <div style="margin-bottom: 12px;">
                        <input type="text" id="commentAuthor" class="comment-input" placeholder="Your Full Name *" required>
                    </div>
                    <div style="margin-bottom: 14px;">
                        <textarea id="commentContent" class="comment-textarea" rows="3" placeholder="Write your thoughts or feedback here..." required></textarea>
                    </div>
                    <button type="submit" class="comment-submit-btn">Post Comment</button>
                </form>
            </div>
        </section>
    `;
}

// ── 6. Toolbar Handlers (Copy Link, Text Zoom, Audio Read) ──
function copyArticleLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('✓ Link copied to clipboard!');
    }).catch(() => {
        showToast('Article URL: ' + window.location.href);
    });
}

let currentTextSize = 18;
function adjustTextSize(delta) {
    const body = document.querySelector('.article-editorial-body');
    if (!body) return;
    currentTextSize = Math.min(26, Math.max(14, currentTextSize + delta * 2));
    body.style.fontSize = `${currentTextSize}px`;
    showToast(`Text size: ${currentTextSize}px`);
}

let isSpeaking = false;
function toggleAudioSpeech() {
    if (!('speechSynthesis' in window)) {
        showToast('Speech synthesis is not supported in this browser.');
        return;
    }
    const btn = document.getElementById('listenArticleBtn');
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        if (btn) btn.innerHTML = '<span>🔊 ਸੁਣੋ • Listen</span>';
        showToast('Audio paused.');
        return;
    }

    const title = document.querySelector('.article-main-title')?.innerText || '';
    const brief = document.querySelector('.article-highlights-box')?.innerText || '';
    const body = document.querySelector('.article-editorial-body')?.innerText || '';
    const fullText = `${title}. ${brief}. ${body.slice(0, 1000)}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.95;
    utterance.onend = () => {
        isSpeaking = false;
        if (btn) btn.innerHTML = '<span>🔊 ਸੁਣੋ • Listen</span>';
    };
    utterance.onerror = () => {
        isSpeaking = false;
        if (btn) btn.innerHTML = '<span>🔊 ਸੁਣੋ • Listen</span>';
    };

    window.speechSynthesis.speak(utterance);
    isSpeaking = true;
    if (btn) btn.innerHTML = '<span>⏹️ ਰੋਕੋ • Stop</span>';
    showToast('Reading news story...');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── 7. Sidebar Trending & Related Stories ──
async function loadSidebarAndRelated(currentId) {
    if (typeof supabaseClient === 'undefined') return;

    try {
        const { data: articles, error } = await supabaseClient
            .from('articles')
            .select('id, title, brief, image_url, tag, author, created_at, view_count')
            .eq('is_published', true)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;
        if (!articles || articles.length === 0) return;

        // 1. Render Sidebar Trending (top 5 by view count)
        const trendingContainer = document.getElementById('dynamicSidebarTrending');
        if (trendingContainer) {
            const sortedTrending = [...articles].sort((a, b) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 5);
            let trendHtml = '';
            sortedTrending.forEach((art, idx) => {
                trendHtml += `
                    <div class="trending-item" onclick="window.location.href='article.html?id=${art.id}'">
                        <div class="trending-rank">0${idx + 1}</div>
                        <div class="trending-content">
                            <h5 class="trending-title">${escapeHtml(art.title)}</h5>
                            <div class="trending-meta">${timeAgo(art.created_at)} • 👁️ ${art.view_count || 240} reads</div>
                        </div>
                    </div>
                `;
            });
            trendingContainer.innerHTML = trendHtml;
        }

        // 2. Render Bottom Related Stories (4 stories excluding current)
        const relatedContainer = document.getElementById('dynamicRelatedGrid');
        if (relatedContainer) {
            const related = articles.filter(a => a.id !== currentId).slice(0, 4);
            let relatedHtml = '';
            related.forEach(art => {
                relatedHtml += `
                    <article class="news-card-editorial" onclick="window.location.href='article.html?id=${art.id}'">
                        <div class="card-img-wrap">
                            <img src="${art.image_url || 'INPUNJABNEWSLOGO.png'}" alt="${escapeHtml(art.title)}" onerror="this.src='INPUNJABNEWSLOGO.png'">
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
            relatedContainer.innerHTML = relatedHtml;
        }

    } catch (e) {
        console.error('Error loading related/trending:', e);
    }
}

// ── 8. Comments System ──
async function loadComments(articleId) {
    const stream = document.getElementById('commentsStream');
    if (!stream) return;

    try {
        const { data: comments, error } = await supabaseClient
            .from('comments')
            .select('*')
            .eq('article_id', articleId)
            .eq('status', 'approved')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!comments || comments.length === 0) {
            stream.innerHTML = '<p style="color:var(--text-muted); font-size:13px;">No comments yet. Be the first to share your thoughts!</p>';
            return;
        }

        let html = '';
        comments.forEach(c => {
            html += `
                <div class="comment-card">
                    <div class="comment-header">
                        <span class="comment-author-name">${escapeHtml(c.username || 'Reader')}</span>
                        <span>${timeAgo(c.created_at)}</span>
                    </div>
                    <div class="comment-text">${escapeHtml(c.content)}</div>
                </div>
            `;
        });
        stream.innerHTML = html;

    } catch (err) {
        console.error('Error loading comments:', err);
        stream.innerHTML = '<p style="color:var(--text-muted); font-size:13px;">No comments yet.</p>';
    }
}

async function handleCommentSubmit(event) {
    event.preventDefault();
    const authorInput = document.getElementById('commentAuthor');
    const contentInput = document.getElementById('commentContent');

    const author = authorInput ? authorInput.value.trim() : '';
    const content = contentInput ? contentInput.value.trim() : '';

    if (!author || !content || !currentArticleId) {
        showToast('Please provide both your name and comment.');
        return;
    }

    try {
        const { error } = await supabaseClient
            .from('comments')
            .insert([{
                article_id: currentArticleId,
                username: author,
                content: content,
                status: 'approved'
            }]);

        if (error) throw error;

        showToast('Comment posted successfully!');
        if (authorInput) authorInput.value = '';
        if (contentInput) contentInput.value = '';

        loadComments(currentArticleId);

    } catch (err) {
        console.error('Error posting comment:', err);
        showToast('Thank you! Comment received.');
    }
}

// ── 9. Error State Renderer ──
function renderErrorState(msg) {
    const mainContainer = document.getElementById('article-main-container');
    if (mainContainer) {
        mainContainer.innerHTML = `
            <div class="article-error-card">
                <h3>Story Not Found</h3>
                <p>${msg}</p>
            </div>
        `;
    }
}

// ── 10. Search & Newsletter ──
function doSearch() {
    const query = document.getElementById('globalSearchInput').value.trim();
    if (query) {
        window.location.href = `index.html#latest-stream`;
    }
}

async function subscribeNewsletter() {
    const input = document.getElementById('newsletterEmailInput');
    const email = input ? input.value.trim() : '';
    if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address');
        return;
    }
    showToast('Subscribed to InPunjab News morning digest!');
    if (input) input.value = '';
}

// ── 11. Toast Utility ──
function showToast(msg) {
    let box = document.getElementById('toastBox');
    if (!box) {
        box = document.createElement('div');
        box.id = 'toastBox';
        box.className = 'toast-box';
        document.body.appendChild(box);
    }
    box.textContent = msg;
    box.classList.add('show');
    setTimeout(() => {
        box.classList.remove('show');
    }, 3200);
}

// ── 12. Helper Utilities ──
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

// ── 7. Dynamic Advertisements Sync from Database ──
async function loadDynamicAds() {
    if (typeof supabaseClient === 'undefined') return;
    try {
        const { data: ads, error } = await supabaseClient
            .from('ads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !ads || ads.length === 0) return;

        const liveAds = ads.filter(a => (a.status || 'Live').toLowerCase() === 'live');
        if (liveAds.length === 0) return;

        // Find sidebar ad or first live ad
        const sidebarAd = liveAds.find(a => (a.slot_name || '').toLowerCase().includes('sidebar')) || liveAds[0];
        if (sidebarAd) {
            const adImg = document.getElementById('sidebarAdImg');
            const adLink = document.getElementById('sidebarAdLink');

            let link = sidebarAd.link || '#';
            if (sidebarAd.advertiser && sidebarAd.advertiser.includes('|')) {
                link = sidebarAd.advertiser.split('|')[1].trim();
            }

            const imgVal = sidebarAd.image_url || sidebarAd.image || sidebarAd.size || 'ad5.jpeg';
            if (adImg) adImg.src = imgVal;
            if (adLink && link && link !== '#') {
                adLink.href = link;
                adLink.title = sidebarAd.advertiser ? sidebarAd.advertiser.split('|')[0].trim() : 'Advertisement';
            }
        }
    } catch (e) {
        console.error('Error fetching dynamic ads in article:', e);
    }
}

// ── 8. Daily Panchang Widget Sync from Database ──
async function loadDailyPanchangWidget() {
    if (typeof supabaseClient === 'undefined') return;

    // Get IST today's date YYYY-MM-DD
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + istOffset);
    const todayStr = `${istTime.getFullYear()}-${String(istTime.getMonth() + 1).padStart(2, '0')}-${String(istTime.getDate()).padStart(2, '0')}`;

    try {
        let content = '';
        let brief = '';

        // 1. Try panchang table
        try {
            const { data: pData } = await supabaseClient
                .from('panchang')
                .select('*')
                .eq('date', todayStr)
                .limit(1);
            if (pData && pData.length > 0) {
                content = pData[0].content || '';
                brief = pData[0].brief || '';
            }
        } catch (e) {}

        // 2. Fallback to articles tag = Panchang
        if (!content) {
            const { data: artData } = await supabaseClient
                .from('articles')
                .select('*')
                .eq('tag', 'Panchang')
                .eq('slug', todayStr)
                .limit(1);
            if (artData && artData.length > 0) {
                content = artData[0].content || '';
                brief = artData[0].brief || '';
            }
        }

        if (content || brief) {
            const dateElem = document.getElementById('sidebarPanchaangDate');
            const nakshatraElem = document.getElementById('sidebarPanchaangNakshatra');
            const rahuElem = document.getElementById('sidebarPanchaangRahu');

            if (dateElem) {
                dateElem.textContent = `${istTime.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long' })} • शुभ मुहूर्त`;
            }

            const lines = content.split('\n');
            lines.forEach(line => {
                if (line.includes('नक्षत्र') && nakshatraElem) {
                    nakshatraElem.textContent = line.replace(/^.*?नक्षत्र\s*[-:]?\s*/, '').trim();
                } else if (line.includes('राहुकाल') && rahuElem) {
                    rahuElem.textContent = line.replace(/^.*?राहुकाल\s*[-:]?\s*/, '').trim();
                }
            });
        }
    } catch (e) {
        console.error('Error updating panchang widget in article:', e);
    }
}

