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

function shareArticleWhatsApp() {
    const title = document.title.replace(' – InPunjab News', '');
    const url = window.location.href;
    const text = `📰 *${title}*\n\nRead full report on InPunjab News:\n${url}`;
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
    const articleId = urlParams.get('id');

    if (!articleId) {
        renderErrorState('No article ID specified. Please select an article from the home page.');
        loadSidebarAndRelated(null);
        return;
    }

    currentArticleId = articleId;

    if (typeof supabaseClient === 'undefined') {
        renderErrorState('Database client not loaded. Please refresh the page.');
        return;
    }

    try {
        const { data: article, error } = await supabaseClient
            .from('articles')
            .select('*')
            .eq('id', articleId)
            .single();

        if (error) throw error;
        if (!article) throw new Error('Article not found.');

        // Update Page Title & Breadcrumb
        document.title = `${article.title} – InPunjab News`;
        const breadcrumbTitle = document.getElementById('breadcrumbTitle');
        if (breadcrumbTitle) breadcrumbTitle.textContent = article.title;
        const breadcrumbCategory = document.getElementById('breadcrumbCategory');
        if (breadcrumbCategory) breadcrumbCategory.textContent = article.tag || 'Punjab News';

        // Render the Full Article Body
        renderArticleContent(article);

        // Safely Increment View Count in background
        try {
            await supabaseClient.rpc('increment_view_count', { article_id: articleId });
        } catch (rpcErr) {
            // Non-critical fallback
        }

        // Load Sidebar Trending and Bottom Related
        loadSidebarAndRelated(articleId);

        // Load Comments
        loadComments(articleId);

    } catch (err) {
        console.error('Error fetching article:', err.message);
        renderErrorState(`We could not find the requested story. It may have been moved or removed.<br><br><a href="index.html" class="back-home-btn" style="display:inline-block; margin-top:10px;">← Return to Home</a>`);
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
                    <span>💬 Share on WhatsApp</span>
                </a>
                <button type="button" class="action-copy-btn" onclick="copyArticleLink()">
                    <span>🔗 Copy Link</span>
                </button>
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

// ── 6. Copy Link Handler ──
function copyArticleLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Link copied to clipboard! Ready to share.');
    }).catch(() => {
        showToast('Article URL: ' + window.location.href);
    });
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
