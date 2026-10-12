// ==========================================================================
// InPunjab News - Mobile Admin Application Logic
// Author: Vicky Suri
// ==========================================================================

let uploadedImages = []; // Array of base64 data URIs
let allArticles = [];
let pendingDeleteId = null;

// Advertisements & Panchang state
let allAds = [];
let allPanchangs = [];
let pendingDeleteAdId = null;
let pendingDeletePanchangId = null;
let editingPanchangId = null;
let panchangDbTable = 'articles'; // 'panchang' or 'articles'

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

// ── Authentication Gate (Username: vicky / Password: 1234567) ──
function checkAuth() {
    const isAuth = localStorage.getItem('inpunjab_admin_auth') === 'true';
    const loginScreen = document.getElementById('loginScreen');
    const appContainer = document.getElementById('adminAppContainer');

    if (isAuth) {
        if (loginScreen) loginScreen.style.display = 'none';
        if (appContainer) appContainer.style.display = 'flex';
        initAdminApp();
    } else {
        if (loginScreen) loginScreen.style.display = 'flex';
        if (appContainer) appContainer.style.display = 'none';
    }
}

function handleLoginSubmit(event) {
    if (event && event.preventDefault) event.preventDefault();

    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const errorMsg = document.getElementById('loginErrorMsg');

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    // Required credentials: username "vicky", password "1234567"
    if (username === 'vicky' && password === '1234567') {
        localStorage.setItem('inpunjab_admin_auth', 'true');
        if (errorMsg) errorMsg.style.display = 'none';

        const loginScreen = document.getElementById('loginScreen');
        const appContainer = document.getElementById('adminAppContainer');

        if (loginScreen) loginScreen.style.display = 'none';
        if (appContainer) appContainer.style.display = 'flex';

        showToast('👋 Welcome back, Vicky Suri!');
        initAdminApp();
    } else {
        if (errorMsg) {
            errorMsg.style.display = 'flex';
            errorMsg.textContent = '⚠️ Incorrect username or password. Please try again.';
        }
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
        showToast('❌ Invalid credentials');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to log out of InPunjab Admin?')) {
        localStorage.removeItem('inpunjab_admin_auth');
        const loginScreen = document.getElementById('loginScreen');
        const appContainer = document.getElementById('adminAppContainer');
        const passwordInput = document.getElementById('loginPassword');

        if (passwordInput) passwordInput.value = '';
        if (appContainer) appContainer.style.display = 'none';
        if (loginScreen) loginScreen.style.display = 'flex';
        showToast('Logged out successfully');
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleBtn = document.querySelector('.pwd-toggle-btn');
    if (!passwordInput) return;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (toggleBtn) toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        if (toggleBtn) toggleBtn.textContent = '👁️';
    }
}

let isAppInitialized = false;
function initAdminApp() {
    if (isAppInitialized) return;
    isAppInitialized = true;
    initTabs();
    initImageUploader();
    initTags();
    initForm();
    initPanchangDefaults();
    loadArticles();
    loadAds();
    loadPanchangEntries();
}

// ── Tab Navigation ──
function initTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabId}`);
    });

    if (tabId === 'news') {
        loadArticles();
    } else if (tabId === 'ads') {
        loadAds();
    } else if (tabId === 'panchang') {
        loadPanchangEntries();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Tag Pills ──
function initTags() {
    const pills = document.querySelectorAll('.tag-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            document.getElementById('selectedTag').value = pill.getAttribute('data-val');
        });
    });
}

// ── Image Upload & Canvas Compression ──
function initImageUploader() {
    const fileInput = document.getElementById('imageFileInput');
    const uploadZone = document.getElementById('uploadZone');

    fileInput.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        await processFiles(files);
        fileInput.value = ''; // Reset file input
    });

    // Drag & Drop
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
        });
    });

    uploadZone.addEventListener('drop', async (e) => {
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if (files.length > 0) {
            await processFiles(files);
        }
    });
}

async function processFiles(files) {
    showToast('Processing photo(s)...');
    for (const file of files) {
        try {
            const compressed = await compressImage(file, 1200, 0.82);
            uploadedImages.push(compressed);
        } catch (err) {
            console.error('Error compressing image:', err);
            showToast('Error processing image: ' + file.name);
        }
    }
    renderImagePreviews();
}

// Compress image on client via HTML5 Canvas
function compressImage(file, maxDimension = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxDimension || height > maxDimension) {
                    if (width > height) {
                        height = Math.round((height * maxDimension) / width);
                        width = maxDimension;
                    } else {
                        width = Math.round((width * maxDimension) / height);
                        height = maxDimension;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Render previews (Primary Card + Secondary Thumbnails)
function renderImagePreviews() {
    const previewContainer = document.getElementById('imagePreviewContainer');
    const primaryImg = document.getElementById('primaryPreviewImg');
    const thumbnailsTray = document.getElementById('thumbnailsTray');

    if (uploadedImages.length === 0) {
        previewContainer.style.display = 'none';
        return;
    }

    previewContainer.style.display = 'flex';
    primaryImg.src = uploadedImages[0];

    thumbnailsTray.innerHTML = '';
    if (uploadedImages.length > 1) {
        for (let i = 1; i < uploadedImages.length; i++) {
            const thumb = document.createElement('div');
            thumb.className = 'thumb-item';
            thumb.innerHTML = `
                <img src="${uploadedImages[i]}" alt="Additional photo ${i}">
                <button type="button" class="thumb-remove" onclick="removeImage(${i})">✕</button>
            `;
            thumbnailsTray.appendChild(thumb);
        }
        thumbnailsTray.style.display = 'flex';
    } else {
        thumbnailsTray.style.display = 'none';
    }
}

function removePrimaryImage() {
    if (uploadedImages.length > 0) {
        uploadedImages.shift();
        renderImagePreviews();
    }
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    renderImagePreviews();
}

// ── Form Submission & Supabase Article Publishing ──
function initForm() {
    const form = document.getElementById('newPostForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await publishNews();
    });
}

async function publishNews() {
    const title = document.getElementById('postTitle').value.trim();
    const contentText = document.getElementById('postContent').value.trim();
    const author = document.getElementById('postAuthor').value.trim() || 'vicky suri';
    const tag = document.getElementById('selectedTag').value || 'Punjab';
    const submitBtn = document.getElementById('publishBtn');

    if (!title) {
        showToast('⚠️ Please enter a headline');
        document.getElementById('postTitle').focus();
        return;
    }

    if (!contentText) {
        showToast('⚠️ Please write the news description');
        document.getElementById('postContent').focus();
        return;
    }

    // Prepare Primary Image
    const primaryImageUrl = uploadedImages.length > 0 ? uploadedImages[0] : 'INPUNJABNEWSLOGO.png';

    // Format HTML content
    let formattedContent = '';
    const paragraphs = contentText.split('\n\n').filter(p => p.trim());
    paragraphs.forEach(p => {
        const cleaned = p.trim().replace(/\n/g, '<br>');
        formattedContent += `<p>${cleaned}</p>\n`;
    });

    // Embed secondary images in the content body if present
    if (uploadedImages.length > 1) {
        for (let i = 1; i < uploadedImages.length; i++) {
            formattedContent += `<p><img src="${uploadedImages[i]}" alt="${title.replace(/"/g, '&quot;')}" style="max-width:100%;height:auto;margin-top:15px;border-radius:12px;"></p>\n`;
        }
    }

    // Derive a brief for summary cards
    const plainFirstPara = paragraphs[0] || title;
    const brief = plainFirstPara.length > 180 ? plainFirstPara.substring(0, 180) + '...' : plainFirstPara;

    const payload = {
        title: title,
        brief: brief,
        content: formattedContent,
        author: author,
        image_url: primaryImageUrl,
        tag: tag,
        region: 'Punjab',
        is_published: true,
        view_count: 0,
        comment_count: 0
    };

    // UI Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="spinner"></div> Publishing...`;

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const { data, error } = await supabaseClient
            .from('articles')
            .insert([payload])
            .select();

        if (error) throw error;

        showToast('🎉 News published successfully!');

        // Reset form
        document.getElementById('newPostForm').reset();
        document.getElementById('postAuthor').value = 'vicky suri';
        uploadedImages = [];
        renderImagePreviews();

        // Switch to News tab to show the published article
        setTimeout(() => {
            switchTab('news');
        }, 500);

    } catch (err) {
        console.error('Publish error:', err);
        showToast('❌ Failed to publish: ' + (err.message || 'Error'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Publish News</span> <span>🚀</span>`;
    }
}

// ── Fetch & Display News List ──
function resolveImageUrl(url) {
    const fallback = window.location.pathname.includes('/admin') && !window.location.pathname.endsWith('admin.html') ? '../INPUNJABNEWSLOGO.png' : 'INPUNJABNEWSLOGO.png';
    if (!url) return fallback;
    if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (window.location.pathname.includes('/admin') && !window.location.pathname.endsWith('admin.html')) {
        return '../' + url;
    }
    return url;
}

async function loadArticles() {
    const listContainer = document.getElementById('newsListContainer');
    const countBadge = document.getElementById('newsNavBadge');
    const statsTotal = document.getElementById('newsCountDisplay');

    listContainer.innerHTML = `
        <div class="empty-state">
            <div class="spinner" style="border-top-color: var(--brand-primary); margin: 0 auto 10px;"></div>
            <p>Loading stories...</p>
        </div>
    `;

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const { data, error } = await supabaseClient
            .from('articles')
            .select('id, title, brief, content, author, image_url, tag, created_at, view_count')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allArticles = data || [];
        if (countBadge) countBadge.textContent = allArticles.length;
        if (statsTotal) statsTotal.textContent = `${allArticles.length} Stories Live`;

        renderArticles(allArticles);

    } catch (err) {
        console.error('Error loading articles:', err);
        listContainer.innerHTML = `
            <div class="empty-state">
                <p>Failed to load news: ${err.message}</p>
                <button class="modal-btn-cancel" style="margin-top: 10px; display: inline-block; width: auto; padding: 6px 14px;" onclick="loadArticles()">Retry</button>
            </div>
        `;
    }
}

function renderArticles(articles) {
    const listContainer = document.getElementById('newsListContainer');
    if (!articles || articles.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <p>No news articles found.</p>
            </div>
        `;
        return;
    }

    let html = '';
    const fallbackLogo = resolveImageUrl('');
    articles.forEach(item => {
        const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
        const imageSrc = resolveImageUrl(item.image_url);
        const tag = item.tag || 'Punjab';

        html += `
            <div class="news-item-card" id="art-${item.id}" onclick="openArticleModal('${item.id}')">
                <div class="news-thumb">
                    <img src="${imageSrc}" alt="Thumbnail" onerror="this.src='${fallbackLogo}'">
                </div>
                <div class="news-details">
                    <div class="news-badge-row">
                        <span class="news-badge">${escapeHtml(tag)}</span>
                        <span class="news-date">• ${dateStr}</span>
                    </div>
                    <div class="news-card-title">${escapeHtml(item.title)}</div>
                    <div class="news-meta">
                        <span>✍️ ${escapeHtml(item.author || 'vicky suri')}</span>
                        <span>👁️ ${item.view_count || 0}</span>
                    </div>
                </div>
                <div class="news-item-actions">
                    <button type="button" class="news-share-btn" id="share-btn-${item.id}" title="Share Article & Image" onclick="event.stopPropagation(); shareNewsArticle('${item.id}')">
                        📤
                    </button>
                    <button type="button" class="news-delete-btn" title="Delete News" onclick="event.stopPropagation(); promptDelete('${item.id}', '${escapeHtml(item.title).replace(/'/g, "\\'")}')">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

let currentModalArticleId = null;

// ── Open News Article Preview Modal ──
function openArticleModal(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;
    currentModalArticleId = id;

    const modal = document.getElementById('articleDetailModal');
    const modalImg = document.getElementById('modalArticleImg');
    const modalBadge = document.getElementById('modalArticleBadge');
    const modalTitle = document.getElementById('modalArticleTitle');
    const modalMeta = document.getElementById('modalArticleMeta');
    const modalBody = document.getElementById('modalArticleBody');

    const imageSrc = resolveImageUrl(article.image_url);
    const dateStr = article.created_at ? new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent';

    modalImg.src = imageSrc;
    modalBadge.textContent = article.tag || 'Punjab';
    modalTitle.textContent = article.title;
    modalMeta.innerHTML = `
        <span>✍️ ${escapeHtml(article.author || 'vicky suri')}</span>
        <span>📅 ${dateStr}</span>
        <span>👁️ ${article.view_count || 0} views</span>
    `;

    // Format content if not wrapped in paragraphs
    let contentHtml = article.content || `<p>${article.brief || ''}</p>`;
    if (!contentHtml.includes('<p>')) {
        contentHtml = contentHtml.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
    }
    modalBody.innerHTML = contentHtml;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
    const modal = document.getElementById('articleDetailModal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
}

function shareCurrentModalArticle() {
    if (currentModalArticleId) {
        shareNewsArticle(currentModalArticleId);
    }
}

// ── News Article Sharing System (Always Fetches & Shares Image) ──
let activeShareData = null;

async function shareNewsArticle(id) {
    const shareBtn = document.getElementById(`share-btn-${id}`);
    const originalContent = shareBtn ? shareBtn.innerHTML : '📤';
    if (shareBtn) {
        shareBtn.innerHTML = '⏳';
        shareBtn.classList.add('is-loading');
    }

    try {
        let item = allArticles.find(a => String(a.id) === String(id));
        if (!item && typeof supabaseClient !== 'undefined') {
            const { data } = await supabaseClient.from('articles').select('*').eq('id', id).single();
            if (data) item = data;
        }

        if (!item) {
            showToast('Article not found to share', 'error');
            return;
        }

        // Determine public article URL
        const origin = window.location.origin;
        let basePath = window.location.pathname.replace(/\/admin(\/.*)?$/i, '').replace(/\/admin\.html$/i, '').replace(/\/index\.html$/i, '');
        if (basePath.endsWith('/')) basePath = basePath.slice(0, -1);
        const articleUrl = `${origin}${basePath}/article.html?id=${encodeURIComponent(item.id)}`;

        // Determine resolved absolute image URL
        let rawImageUrl = item.image_url || 'OFFICIAL LOGO.png';
        let absoluteImageUrl = resolveImageUrl(rawImageUrl);
        if (!/^https?:\/\//i.test(absoluteImageUrl) && !absoluteImageUrl.startsWith('data:')) {
            const cleanPath = absoluteImageUrl.replace(/^\.?\/+/, '');
            absoluteImageUrl = `${origin}${basePath ? basePath + '/' : '/'}${cleanPath}`;
        }

        showToast('Fetching article image... ⏳');

        // Always fetch the article image
        const imageBlob = await fetchArticleImageBlob(absoluteImageUrl);
        let imageFile = null;
        if (imageBlob) {
            const mimeType = imageBlob.type || 'image/jpeg';
            let ext = 'jpg';
            if (mimeType.includes('png')) ext = 'png';
            else if (mimeType.includes('webp')) ext = 'webp';
            else if (mimeType.includes('gif')) ext = 'gif';

            const safeTitle = (item.title || 'inpunjab-news')
                .substring(0, 30)
                .replace(/[^a-zA-Z0-9_-]/g, '_');
            imageFile = new File([imageBlob], `${safeTitle}.${ext}`, { type: mimeType });
        }

        const shareTitle = item.title || 'InPunjab News';
        const shareText = `📰 *${shareTitle}*\n\n${item.brief ? item.brief + '\n\n' : ''}ਪੜ੍ਹੋ ਪੂਰੀ ਖ਼ਬਰ InPunjab News 'ਤੇ:\n${articleUrl}`;

        // 1. If Web Share API supports file sharing, invoke it immediately
        if (imageFile && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: articleUrl,
                    files: [imageFile]
                });
                showToast('Shared successfully with image! 📤', 'success');
                return;
            } catch (shareErr) {
                if (shareErr.name === 'AbortError') return;
                console.warn('Native share with file rejected, opening share modal:', shareErr);
            }
        }

        // 2. If Web Share API supports url/text sharing
        if (!imageFile && navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: articleUrl
                });
                showToast('Article shared successfully! 📤', 'success');
                return;
            } catch (shareErr) {
                if (shareErr.name === 'AbortError') return;
            }
        }

        // 3. Fallback: Open rich Share Modal Sheet
        openShareArticleModal(item, articleUrl, absoluteImageUrl, imageBlob, imageFile);

    } catch (err) {
        console.error('Error sharing article:', err);
        showToast('Could not share article: ' + (err.message || 'Error'), 'error');
    } finally {
        if (shareBtn) {
            shareBtn.innerHTML = originalContent;
            shareBtn.classList.remove('is-loading');
        }
    }
}

// Helper: Convert Data URI to Blob
function dataUriToBlob(dataURI) {
    const parts = dataURI.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const byteString = atob(parts[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
}

// Helper: Convert Blob to PNG (required for ClipboardItem on many browsers)
function convertBlobToPng(blob) {
    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || 600;
            canvas.height = img.naturalHeight || 400;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            canvas.toBlob((pngBlob) => {
                resolve(pngBlob);
            }, 'image/png');
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(null);
        };
        img.src = url;
    });
}

// Helper: Always fetch article image with multi-tier CORS & Canvas fallback
async function fetchArticleImageBlob(imageUrl) {
    if (!imageUrl) return null;

    if (imageUrl.startsWith('data:')) {
        try {
            return dataUriToBlob(imageUrl);
        } catch (e) {
            console.warn('Error decoding dataURI:', e);
        }
    }

    // 1. Direct fetch
    try {
        const response = await fetch(imageUrl, { mode: 'cors', cache: 'default' });
        if (response.ok) {
            const blob = await response.blob();
            if (blob && blob.size > 0) return blob;
        }
    } catch (fetchErr) {
        console.warn('Direct fetch failed, falling back to Canvas draw:', fetchErr.message);
    }

    // 2. Offscreen Canvas fallback
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
                console.warn('Canvas export error:', canvasErr);
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

// ── Share Article Modal Sheet Controllers ──
function openShareArticleModal(article, articleUrl, imageUrl, imageBlob, imageFile) {
    activeShareData = {
        id: article.id,
        title: article.title,
        brief: article.brief,
        url: articleUrl,
        imageUrl: imageUrl,
        blob: imageBlob,
        file: imageFile
    };

    const modal = document.getElementById('shareArticleModal');
    if (!modal) return;

    const imgElem = document.getElementById('shareModalImg');
    const badgeElem = document.getElementById('shareModalBadge');
    const titleElem = document.getElementById('shareModalTitle');
    const urlElem = document.getElementById('shareModalUrl');
    const statusElem = document.getElementById('shareImgStatus');
    const copyImgBtn = document.getElementById('shareCopyImageBtn');
    const nativeBtn = document.getElementById('shareNativeTriggerBtn');

    if (imgElem) imgElem.src = imageUrl || 'OFFICIAL LOGO.png';
    if (badgeElem) badgeElem.textContent = article.tag || 'Punjab';
    if (titleElem) titleElem.textContent = article.title;
    if (urlElem) urlElem.textContent = articleUrl;

    if (statusElem) {
        if (imageBlob) {
            statusElem.textContent = `✓ Image Ready (${Math.round(imageBlob.size / 1024)} KB)`;
            statusElem.style.background = 'rgba(16, 185, 129, 0.12)';
            statusElem.style.color = '#059669';
        } else {
            statusElem.textContent = '🖼️ Image Linked';
            statusElem.style.background = 'rgba(59, 130, 246, 0.12)';
            statusElem.style.color = '#2563EB';
        }
    }

    if (copyImgBtn) {
        copyImgBtn.style.display = (imageBlob && navigator.clipboard && window.ClipboardItem) ? 'flex' : 'none';
    }

    if (nativeBtn) {
        const canNative = !!(navigator.share || (imageFile && navigator.canShare && navigator.canShare({ files: [imageFile] })));
        nativeBtn.style.display = canNative ? 'flex' : 'none';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeShareArticleModal() {
    const modal = document.getElementById('shareArticleModal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
}

async function triggerNativeShare() {
    if (!activeShareData) return;
    const { title, url, file, brief } = activeShareData;
    const shareText = `📰 *${title}*\n\n${brief ? brief + '\n\n' : ''}ਪੜ੍ਹੋ ਪੂਰੀ ਖ਼ਬਰ InPunjab News 'ਤੇ:\n${url}`;

    try {
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: title,
                text: shareText,
                url: url,
                files: [file]
            });
            showToast('Shared successfully with image! 📤', 'success');
            closeShareArticleModal();
            return;
        }

        if (navigator.share) {
            await navigator.share({
                title: title,
                text: shareText,
                url: url
            });
            showToast('Shared successfully! 📤', 'success');
            closeShareArticleModal();
        } else {
            showToast('System share not supported on this browser', 'info');
        }
    } catch (e) {
        if (e.name !== 'AbortError') {
            console.warn('Native share error:', e);
        }
    }
}

function handleShareToWhatsApp() {
    if (!activeShareData) return;
    const { title, url, imageUrl, brief } = activeShareData;
    const text = `📰 *${title}*\n\n${brief ? brief + '\n\n' : ''}🖼️ *ਤਸਵੀਰ / Image:* ${imageUrl}\n\n🔗 *ਪੜ੍ਹੋ ਪੂਰੀ ਖ਼ਬਰ:* ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
}

function handleShareToTwitter() {
    if (!activeShareData) return;
    const { title, url } = activeShareData;
    const tweetText = `${title}\n\nVia @InPunjabNews`;
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;
    window.open(twUrl, '_blank');
}

function handleShareToTelegram() {
    if (!activeShareData) return;
    const { title, url } = activeShareData;
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(tgUrl, '_blank');
}

async function handleCopyArticleLink() {
    if (!activeShareData) return;
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(activeShareData.url);
        } else {
            const ta = document.createElement('textarea');
            ta.value = activeShareData.url;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        showToast('Article link copied to clipboard! 📋', 'success');
    } catch (e) {
        showToast('Could not copy link', 'error');
    }
}

async function handleCopyArticleImage() {
    if (!activeShareData || !activeShareData.blob) {
        showToast('No image available to copy', 'warning');
        return;
    }
    try {
        if (navigator.clipboard && window.ClipboardItem) {
            let blobToCopy = activeShareData.blob;
            if (blobToCopy.type !== 'image/png') {
                blobToCopy = await convertBlobToPng(blobToCopy);
            }
            if (blobToCopy) {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blobToCopy })
                ]);
                showToast('Article image copied to clipboard! 🖼️', 'success');
                return;
            }
        }
        showToast('Direct image copying not supported on this browser', 'info');
    } catch (err) {
        console.warn('Clipboard image copy error:', err);
        showToast('Could not copy image: ' + err.message, 'error');
    }
}

function handleDownloadArticleImage() {
    if (!activeShareData) return;
    if (activeShareData.blob) {
        const url = URL.createObjectURL(activeShareData.blob);
        const a = document.createElement('a');
        a.href = url;
        const ext = activeShareData.blob.type && activeShareData.blob.type.includes('png') ? 'png' : 'jpg';
        a.download = `inpunjab-news-${activeShareData.id || 'article'}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        showToast('Article image saved! ⬇️', 'success');
    } else if (activeShareData.imageUrl) {
        window.open(activeShareData.imageUrl, '_blank');
    }
}

// ── Delete Article Modal Confirmation ──
function promptDelete(id, title) {
    pendingDeleteId = id;
    const modal = document.getElementById('deleteModal');
    const msg = document.getElementById('deleteModalMsg');
    msg.innerHTML = `Are you sure you want to permanently delete: <br><strong>"${title}"</strong>?`;
    modal.classList.add('open');
}

function closeDeleteModal() {
    pendingDeleteId = null;
    document.getElementById('deleteModal').classList.remove('open');
}

async function confirmDelete() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    closeDeleteModal();

    showToast('Deleting article...');

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const { error } = await supabaseClient
            .from('articles')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // If open in preview modal, close it
        closeArticleModal();

        // Remove card from UI with smooth transition
        const card = document.getElementById(`art-${id}`);
        if (card) {
            card.style.transition = 'all 0.2s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => card.remove(), 200);
        }

        allArticles = allArticles.filter(a => a.id !== id);
        const countBadge = document.getElementById('newsNavBadge');
        const statsTotal = document.getElementById('newsCountDisplay');
        if (countBadge) countBadge.textContent = allArticles.length;
        if (statsTotal) statsTotal.textContent = `${allArticles.length} Stories Live`;

        showToast('🗑️ Article deleted successfully');

    } catch (err) {
        console.error('Delete error:', err);
        showToast('❌ Failed to delete: ' + (err.message || 'Error'));
    }
}

// ── Toast Utility ──
let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById('toastBox');
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
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

// ==========================================================================
// ── ADVERTISEMENTS MANAGEMENT LOGIC ──
// ==========================================================================

function toggleNewAdForm() {
    const card = document.getElementById('newAdCard');
    const btn = document.getElementById('toggleNewAdBtn');
    if (!card) return;
    const isHidden = card.style.display === 'none' || !card.style.display;
    card.style.display = isHidden ? 'block' : 'none';
    if (btn) btn.textContent = isHidden ? '✕ Close Form' : '➕ Add New Ad';
    if (isHidden) {
        card.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleSlotChange(selectElem, customWrapId) {
    const customWrap = document.getElementById(customWrapId);
    if (!customWrap) return;
    if (selectElem.value === 'custom') {
        customWrap.style.display = 'flex';
        const input = customWrap.querySelector('input');
        if (input) input.focus();
    } else {
        customWrap.style.display = 'none';
    }
}

function switchAdImageTab(tabType, formMode) {
    const prefix = formMode === 'edit' ? 'edit' : 'new';
    ['upload', 'presets', 'url'].forEach(t => {
        const btn = document.getElementById(`tabBtn-${t}-${prefix}`);
        const panel = document.getElementById(`${prefix}AdImagePanel-${t}`);
        if (btn) btn.classList.toggle('active', t === tabType);
        if (panel) panel.style.display = t === tabType ? (t === 'presets' ? 'grid' : 'block') : 'none';
    });
}

async function handleAdFileUpload(event, formMode) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    showToast('Compressing ad photo...');
    try {
        const compressed = await compressImage(file, 1200, 0.85);
        setAdImageValue(compressed, formMode);
        showToast('✓ Photo ready');
    } catch (err) {
        console.error('Ad image compress error:', err);
        showToast('Failed to process image');
    }
}

function selectPresetAdImage(imgSrc, formMode) {
    setAdImageValue(imgSrc, formMode);
    const prefix = formMode === 'edit' ? 'edit' : 'new';
    const panel = document.getElementById(`${prefix}AdImagePanel-presets`);
    if (panel) {
        panel.querySelectorAll('.preset-img-item').forEach(el => {
            const img = el.querySelector('img');
            const matches = img && (img.getAttribute('src') === imgSrc || imgSrc.endsWith(img.getAttribute('src')));
            el.classList.toggle('selected', matches);
        });
    }
    showToast(`✓ Selected preset: ${imgSrc.replace(/^.*[\\\/]/, '')}`);
}

function handleAdUrlInput(url, formMode) {
    const trimmed = (url || '').trim();
    if (trimmed) {
        setAdImageValue(trimmed, formMode);
    }
}

function setAdImageValue(imgVal, formMode) {
    const prefix = formMode === 'edit' ? 'edit' : 'new';
    const hiddenInput = document.getElementById(`${prefix}AdImageUrl`);
    const previewContainer = document.getElementById(`${prefix}AdPreviewContainer`);
    const previewImg = document.getElementById(`${prefix}AdPreviewImg`);

    if (hiddenInput) hiddenInput.value = imgVal;
    if (previewImg) previewImg.src = resolveAdImage(imgVal);
    if (previewContainer) previewContainer.style.display = 'flex';
}

function clearAdImagePreview(formMode) {
    const prefix = formMode === 'edit' ? 'edit' : 'new';
    const hiddenInput = document.getElementById(`${prefix}AdImageUrl`);
    const previewContainer = document.getElementById(`${prefix}AdPreviewContainer`);
    const fileInput = document.getElementById(`${prefix}AdFileInput`);
    const urlInput = document.getElementById(`${prefix}AdUrlInput`);

    if (hiddenInput) hiddenInput.value = '';
    if (previewContainer) previewContainer.style.display = 'none';
    if (fileInput) fileInput.value = '';
    if (urlInput) urlInput.value = '';
}

function resolveAdImage(val) {
    if (!val) {
        const isSubdir = window.location.pathname.includes('/admin') && !window.location.pathname.endsWith('admin.html');
        return isSubdir ? '../AD1.jpeg' : 'AD1.jpeg';
    }
    if (val.startsWith('data:') || val.startsWith('http://') || val.startsWith('https://')) {
        return val;
    }
    const isSubdir = window.location.pathname.includes('/admin') && !window.location.pathname.endsWith('admin.html');
    if (isSubdir && !val.startsWith('../')) {
        return `../${val}`;
    }
    return val;
}

// ── Load & Display Advertisements ──
async function loadAds() {
    const countDisplay = document.getElementById('adsCountDisplay');
    const navBadge = document.getElementById('adsNavBadge');
    if (countDisplay) countDisplay.textContent = 'Refreshing ads...';

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const { data, error } = await supabaseClient
            .from('ads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allAds = data || [];

        if (countDisplay) {
            const liveCount = allAds.filter(a => (a.status || 'Live').toLowerCase() === 'live').length;
            countDisplay.textContent = `${allAds.length} Ads Total (${liveCount} Live)`;
        }
        if (navBadge) navBadge.textContent = allAds.length;

        renderAdsList(allAds);
    } catch (err) {
        console.error('Error loading ads:', err);
        if (countDisplay) countDisplay.textContent = 'Error loading ads';
        showToast('⚠️ Could not load ads: ' + (err.message || 'Error'));
    }
}

function renderAdsList(ads) {
    const container = document.getElementById('adsListContainer');
    if (!container) return;

    if (!ads || ads.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted); background: white; border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
                <div style="font-size: 36px; margin-bottom: 8px;">📢</div>
                <div style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No Advertisements Found</div>
                <div style="font-size: 12px;">Tap "+ Add New Ad" above to create your first ad slot.</div>
            </div>
        `;
        return;
    }

    container.innerHTML = ads.map(ad => {
        const slot = ad.slot_name || ad.slot || 'Banner Slot';
        let client = ad.client || '';
        let link = ad.link || '';
        if (ad.advertiser) {
            if (ad.advertiser.includes('|')) {
                const parts = ad.advertiser.split('|');
                client = client || parts[0].trim();
                link = link || parts[1].trim();
            } else {
                client = client || ad.advertiser;
            }
        }
        client = client || 'Sponsored Partner';
        const imageSrc = resolveAdImage(ad.image_url || ad.image || ad.size);
        const status = (ad.status || 'Live').toLowerCase();
        const isLive = status === 'live' || status === 'active';

        return `
            <div class="ad-item-card" id="ad-card-${ad.id}">
                <div class="ad-item-main">
                    <div class="ad-thumb-box" onclick="previewAdImage('${escapeHtml(imageSrc)}')">
                        <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(client)}" onerror="this.src='${window.location.pathname.includes('/admin') && !window.location.pathname.endsWith('admin.html') ? '../AD1.jpeg' : 'AD1.jpeg'}';">
                    </div>
                    <div class="ad-info">
                        <div class="ad-header-row">
                            <span class="ad-slot-badge">${escapeHtml(slot)}</span>
                            <span class="ad-status-pill ${isLive ? 'live' : 'paused'}">
                                ${isLive ? '● Live' : '○ Paused'}
                            </span>
                        </div>
                        <div class="ad-client-title">${escapeHtml(client)}</div>
                        ${link && link !== '#' ? `
                            <a href="${escapeHtml(link)}" target="_blank" rel="noopener" class="ad-link-text">
                                🔗 ${escapeHtml(link)}
                            </a>
                        ` : `<span class="ad-link-text" style="color: var(--text-muted);">No external link</span>`}
                    </div>
                </div>
                <div class="ad-actions-footer">
                    <button type="button" class="btn-ad-edit" onclick="openEditAdModal('${ad.id}')">
                        ✏️ Edit Ad
                    </button>
                    <button type="button" class="btn-ad-delete" onclick="openDeleteAdModal('${ad.id}')">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function previewAdImage(src) {
    window.open(src, '_blank');
}

// ── Create New Advertisement ──
async function handleCreateAd(event) {
    if (event && event.preventDefault) event.preventDefault();

    const slotSelect = document.getElementById('newAdSlot');
    const customSlotInput = document.getElementById('newAdCustomSlot');
    const slot = (slotSelect.value === 'custom' ? customSlotInput.value.trim() : slotSelect.value) || 'Sidebar Ad – Top (300×250)';

    const client = document.getElementById('newAdClient').value.trim();
    const link = document.getElementById('newAdLink').value.trim();
    const status = document.getElementById('newAdStatus').value;
    const imageUrl = document.getElementById('newAdImageUrl').value.trim();
    const submitBtn = document.getElementById('createAdBtn');

    if (!client) {
        showToast('⚠️ Please enter advertiser name');
        document.getElementById('newAdClient').focus();
        return;
    }

    if (!imageUrl) {
        showToast('⚠️ Please select or upload an ad image');
        return;
    }

    const advertiserString = link ? `${client} | ${link}` : client;
    const payload = {
        slot_name: slot,
        size: imageUrl, // stores image URL, preset path, or compressed data URI
        advertiser: advertiserString,
        status: status,
        ctr: 0.0
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="spinner"></div> Publishing...`;

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const { data, error } = await supabaseClient
            .from('ads')
            .insert([payload])
            .select();

        if (error) throw error;

        showToast('🎉 Advertisement created successfully!');

        // Reset form & close
        document.getElementById('newAdForm').reset();
        clearAdImagePreview('new');
        toggleNewAdForm();

        // Reload list
        await loadAds();
    } catch (err) {
        console.error('Error creating ad:', err);
        showToast('❌ Failed to create ad: ' + (err.message || 'Error'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Publish Advertisement</span> <span>📢</span>`;
    }
}

// ── Edit Advertisement ──
function openEditAdModal(adId) {
    const ad = allAds.find(a => String(a.id) === String(adId));
    if (!ad) return;

    document.getElementById('editAdId').value = ad.id;

    // Slot
    const slotVal = ad.slot_name || ad.slot || 'Sidebar Ad – Top (300×250)';
    const slotSelect = document.getElementById('editAdSlot');
    const customWrap = document.getElementById('editAdCustomSlotWrap');
    const customInput = document.getElementById('editAdCustomSlot');

    let foundOption = false;
    for (let opt of slotSelect.options) {
        if (opt.value === slotVal) {
            slotSelect.value = slotVal;
            foundOption = true;
            break;
        }
    }
    if (!foundOption) {
        slotSelect.value = 'custom';
        customWrap.style.display = 'flex';
        customInput.value = slotVal;
    } else {
        customWrap.style.display = 'none';
        customInput.value = '';
    }

    // Client & Link
    let client = ad.client || '';
    let link = ad.link || '';
    if (ad.advertiser) {
        if (ad.advertiser.includes('|')) {
            const parts = ad.advertiser.split('|');
            client = client || parts[0].trim();
            link = link || parts[1].trim();
        } else {
            client = client || ad.advertiser;
        }
    }
    document.getElementById('editAdClient').value = client;
    document.getElementById('editAdLink').value = link;

    // Status
    const statusSelect = document.getElementById('editAdStatus');
    const curStatus = (ad.status || 'Live').toLowerCase() === 'paused' ? 'Paused' : 'Live';
    statusSelect.value = curStatus;

    // Image
    const currentImg = ad.image_url || ad.image || ad.size || 'AD1.jpeg';
    setAdImageValue(currentImg, 'edit');

    // Show modal
    const modal = document.getElementById('editAdModal');
    if (modal) modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeEditAdModal() {
    const modal = document.getElementById('editAdModal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
}

async function handleUpdateAd(event) {
    if (event && event.preventDefault) event.preventDefault();

    const adId = document.getElementById('editAdId').value;
    const slotSelect = document.getElementById('editAdSlot');
    const customSlotInput = document.getElementById('editAdCustomSlot');
    const slot = (slotSelect.value === 'custom' ? customSlotInput.value.trim() : slotSelect.value) || 'Sidebar Ad – Top (300×250)';

    const client = document.getElementById('editAdClient').value.trim();
    const link = document.getElementById('editAdLink').value.trim();
    const status = document.getElementById('editAdStatus').value;
    const imageUrl = document.getElementById('editAdImageUrl').value.trim();
    const submitBtn = document.getElementById('updateAdBtn');

    if (!client) {
        showToast('⚠️ Please enter advertiser name');
        return;
    }
    if (!imageUrl) {
        showToast('⚠️ Please provide an ad image');
        return;
    }

    const advertiserString = link ? `${client} | ${link}` : client;
    const payload = {
        slot_name: slot,
        size: imageUrl,
        advertiser: advertiserString,
        status: status
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="spinner"></div> Saving...`;

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const { error } = await supabaseClient
            .from('ads')
            .update(payload)
            .eq('id', adId);

        if (error) throw error;

        showToast('✓ Advertisement updated successfully!');
        closeEditAdModal();
        await loadAds();
    } catch (err) {
        console.error('Error updating ad:', err);
        showToast('❌ Failed to update: ' + (err.message || 'Error'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Save Changes</span> <span>💾</span>`;
    }
}

// ── Delete Advertisement ──
function openDeleteAdModal(adId) {
    pendingDeleteAdId = adId;
    const ad = allAds.find(a => String(a.id) === String(adId));
    const modal = document.getElementById('deleteAdModal');
    const msg = document.getElementById('deleteAdModalMsg');
    const clientName = ad ? (ad.client || ad.advertiser || 'this advertisement') : 'this advertisement';
    const slotName = ad ? (ad.slot_name || ad.slot || '') : '';

    if (msg) {
        msg.innerHTML = `Are you sure you want to permanently delete: <br><strong>"${escapeHtml(clientName)}"</strong> ${slotName ? `<br><small style="color:var(--text-muted);">Slot: ${escapeHtml(slotName)}</small>` : ''}?`;
    }
    if (modal) modal.classList.add('open');
}

function closeDeleteAdModal() {
    pendingDeleteAdId = null;
    const modal = document.getElementById('deleteAdModal');
    if (modal) modal.classList.remove('open');
}

async function confirmDeleteAd() {
    if (!pendingDeleteAdId) return;
    const adId = pendingDeleteAdId;
    closeDeleteAdModal();

    showToast('Deleting advertisement...');

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const { error } = await supabaseClient
            .from('ads')
            .delete()
            .eq('id', adId);

        if (error) throw error;

        // Smooth remove
        const card = document.getElementById(`ad-card-${adId}`);
        if (card) {
            card.style.transition = 'all 0.2s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => card.remove(), 200);
        }

        allAds = allAds.filter(a => String(a.id) !== String(adId));
        const countDisplay = document.getElementById('adsCountDisplay');
        const navBadge = document.getElementById('adsNavBadge');
        if (countDisplay) countDisplay.textContent = `${allAds.length} Ads Total`;
        if (navBadge) navBadge.textContent = allAds.length;

        showToast('✓ Advertisement deleted successfully');
    } catch (err) {
        console.error('Error deleting ad:', err);
        showToast('❌ Failed to delete ad: ' + (err.message || 'Error'));
    }
}


// ==========================================================================
// ── DAILY PANCHANG MANAGEMENT LOGIC ──
// ==========================================================================

function getISTDateString() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + istOffset);
    
    const year = istTime.getFullYear();
    const month = String(istTime.getMonth() + 1).padStart(2, '0');
    const day = String(istTime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function initPanchangDefaults() {
    const todayStr = getISTDateString();
    const dateInput = document.getElementById('panchangDate');
    const titleInput = document.getElementById('panchangTitle');

    if (dateInput && !dateInput.value) {
        dateInput.value = todayStr;
    }
    if (titleInput && !titleInput.value) {
        titleInput.value = `आज का पंचांग - ${formatDateReadable(todayStr)}`;
    }
}

function formatDateReadable(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            return date.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        }
    } catch (e) {}
    return dateStr;
}

function handlePanchangDateChange(dateStr) {
    const titleInput = document.getElementById('panchangTitle');
    if (titleInput && (!editingPanchangId || titleInput.value.startsWith('आज का पंचांग'))) {
        titleInput.value = `आज का पंचांग - ${formatDateReadable(dateStr)}`;
    }

    // Check if entry already exists for this date in memory
    const existing = allPanchangs.find(p => (p.slug === dateStr || p.date === dateStr));
    if (existing && !editingPanchangId) {
        showToast(`ℹ️ Found existing Panchang for ${dateStr}. Loaded for edit.`);
        loadPanchangIntoForm(existing);
    }
}

function insertPanchangTemplate() {
    const dateVal = document.getElementById('panchangDate').value || getISTDateString();
    const parts = dateVal.split('-');
    const year = parts[0] || '2026';
    const day = parts[2] || '12';

    const template = `🙏🙏जय श्री गंगा जी की 🙏🙏
🙏🙏आज का पंचांग 🙏🙏 
दिनांक - ${day} अक्टूबर ${year}
दिन - सोमवार 
विक्रम संवत् - 2083
अयन - दक्षिणायन 
ऋतु - शरद 
मास - कार्तिक 
पक्ष - शुक्ल पक्ष 
तिथि - द्वितीया 14:20 तक तदुपरांत तृतीया 
नक्षत्र - स्वाति 18:45 तक तदुपरांत विशाखा 
योग - विष्कुम्भ 15:10 तक तदुपरांत प्रीति 
दिशाशूल - पूर्व 
सूर्योदय - 06:21
सूर्यास्त - 17:52
राहुकाल - 07:47 से 09:14
आज का विचार - कर्म ही जीवन की सच्ची पहचान है, वाणी ही इंसान का असली आईना है।
              स्व: पं धनीराम जी झा 
           पं मनोज झा उपाध्यक्ष श्रीगंगा सभा हरिद्वार 
                  Mob: 9837191534
                               8126356107
                               7417623106`;

    const textarea = document.getElementById('panchangContent');
    const briefInput = document.getElementById('panchangBrief');
    if (textarea) {
        textarea.value = template;
        textarea.focus();
    }
    if (briefInput && !briefInput.value) {
        briefInput.value = `कार्तिक शुक्ल पक्ष द्वितीया • नक्षत्र: स्वाति • राहुकाल: 07:47 से 09:14`;
    }
    updatePanchangLivePreview();
    showToast('✨ Sacred Panchang template inserted!');
}

function togglePanchangPreview() {
    const wrap = document.getElementById('panchangLivePreviewWrap');
    if (!wrap) return;
    const isHidden = wrap.style.display === 'none' || !wrap.style.display;
    wrap.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
        updatePanchangLivePreview();
    }
}

function updatePanchangLivePreview() {
    const content = (document.getElementById('panchangContent').value || '').trim();
    const display = document.getElementById('panchangLivePreviewDisplay');
    if (!display) return;

    if (!content) {
        display.innerHTML = '<span style="color:var(--text-muted);">Enter sacred text to see preview</span>';
        return;
    }

    const lines = content.split('\n');
    let formatted = lines.map(line => {
        let l = escapeHtml(line);
        l = l.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        if (l.includes('आज का विचार')) {
            return `<div style="background:rgba(255,107,0,0.1); border:1px solid #FFedd5; padding:8px 12px; border-radius:10px; margin:10px 0; font-weight:700; color:#c2410c;">✨ ${l}</div>`;
        }
        return `<div>${l}</div>`;
    }).join('');

    display.innerHTML = formatted;
}

// ── Load Panchang Entries ──
async function loadPanchangEntries() {
    const listContainer = document.getElementById('panchangEntriesList');
    if (listContainer) {
        listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:12px;">Loading Panchang records...</div>';
    }

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        let records = [];

        // Try dedicated panchang table first
        try {
            const { data: pData, error: pErr } = await supabaseClient
                .from('panchang')
                .select('*')
                .order('date', { ascending: false });

            if (!pErr && pData) {
                panchangDbTable = 'panchang';
                records = pData;
            }
        } catch (e) {}

        // Fallback to articles where tag = 'Panchang'
        if (records.length === 0) {
            const { data: artData, error: artErr } = await supabaseClient
                .from('articles')
                .select('*')
                .eq('tag', 'Panchang')
                .order('created_at', { ascending: false });

            if (!artErr && artData) {
                panchangDbTable = 'articles';
                records = artData;
            }
        }

        allPanchangs = records;
        renderPanchangEntries(allPanchangs);

    } catch (err) {
        console.error('Error fetching panchang:', err);
        if (listContainer) {
            listContainer.innerHTML = '<div style="text-align:center; padding:20px; color:var(--danger); font-size:12px;">Failed to load panchang records.</div>';
        }
    }
}

function renderPanchangEntries(entries) {
    const listContainer = document.getElementById('panchangEntriesList');
    if (!listContainer) return;

    if (!entries || entries.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 30px 20px; color: var(--text-muted); background: white; border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
                <div style="font-size: 32px; margin-bottom: 6px;">🕉️</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No Panchang Added Yet</div>
                <div style="font-size: 12px;">Use the form above to post today's panchang text.</div>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = entries.map(item => {
        const dateStr = item.date || item.slug || (item.created_at ? item.created_at.substring(0, 10) : 'Date');
        const title = item.title || `Panchang for ${dateStr}`;
        const author = item.author || 'पं मनोज झा';
        const snippet = item.brief || (item.content ? item.content.split('\n').slice(0, 3).join(' • ') : '');

        return `
            <div class="panchang-history-card" id="panchang-card-${item.id}">
                <div class="panchang-history-header">
                    <span class="panchang-date-badge">📅 ${escapeHtml(dateStr)}</span>
                    <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">By ${escapeHtml(author)}</span>
                </div>
                <div style="font-size: 14px; font-weight: 800; color: var(--text-primary);">
                    ${escapeHtml(title)}
                </div>
                <div class="panchang-history-snippet">
                    ${escapeHtml(snippet)}
                </div>
                <div class="ad-actions-footer">
                    <a href="${window.location.pathname.includes('/admin') && !window.location.pathname.endsWith('admin.html') ? '../panchaang.html' : 'panchaang.html'}?date=${encodeURIComponent(dateStr)}" target="_blank" class="link-external" style="margin-right: auto;">
                        View Page ↗
                    </a>
                    <button type="button" class="btn-ad-edit" onclick="openEditPanchang('${item.id}')">
                        ✏️ Edit Text
                    </button>
                    <button type="button" class="btn-ad-delete" onclick="openDeletePanchangModal('${item.id}')">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function loadPanchangIntoForm(item) {
    editingPanchangId = item.id;
    document.getElementById('editingPanchangId').value = item.id;
    document.getElementById('panchangFormTitle').textContent = `✏️ Edit Panchang (${item.date || item.slug || 'Date'})`;
    document.getElementById('panchangDate').value = item.date || item.slug || getISTDateString();
    document.getElementById('panchangTitle').value = item.title || '';
    document.getElementById('panchangAuthor').value = item.author || 'पं मनोज झा';
    document.getElementById('panchangBrief').value = item.brief || '';
    document.getElementById('panchangContent').value = item.content || '';
    document.getElementById('resetPanchangBtn').style.display = 'block';

    const saveBtn = document.getElementById('savePanchangBtn');
    if (saveBtn) {
        saveBtn.innerHTML = `<span>Update Panchang</span> <span>💾</span>`;
    }

    updatePanchangLivePreview();
    document.getElementById('panchangForm').scrollIntoView({ behavior: 'smooth' });
}

function resetPanchangForm() {
    editingPanchangId = null;
    document.getElementById('editingPanchangId').value = '';
    document.getElementById('panchangForm').reset();
    document.getElementById('panchangFormTitle').textContent = "Post Today's Panchang";
    document.getElementById('resetPanchangBtn').style.display = 'none';

    const saveBtn = document.getElementById('savePanchangBtn');
    if (saveBtn) {
        saveBtn.innerHTML = `<span>Save & Sync Panchang</span> <span>🕉️</span>`;
    }

    initPanchangDefaults();
    updatePanchangLivePreview();
}

function openEditPanchang(id) {
    const item = allPanchangs.find(p => String(p.id) === String(id));
    if (!item) return;
    loadPanchangIntoForm(item);
}

// ── Save / Update Panchang ──
async function handleSavePanchang(event) {
    if (event && event.preventDefault) event.preventDefault();

    const dateStr = document.getElementById('panchangDate').value;
    const title = document.getElementById('panchangTitle').value.trim();
    const author = document.getElementById('panchangAuthor').value.trim() || 'पं मनोज झा';
    let brief = document.getElementById('panchangBrief').value.trim();
    const content = document.getElementById('panchangContent').value.trim();
    const submitBtn = document.getElementById('savePanchangBtn');

    if (!dateStr) {
        showToast('⚠️ Please choose a date');
        return;
    }
    if (!content) {
        showToast('⚠️ Please write the panchang text');
        document.getElementById('panchangContent').focus();
        return;
    }

    if (!brief) {
        const lines = content.split('\n').filter(l => l.includes('तिथि') || l.includes('नक्षत्र') || l.includes('राहुकाल'));
        brief = lines.join(' • ') || `${formatDateReadable(dateStr)} Auspicious Panchang`;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="spinner"></div> Syncing...`;

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        if (panchangDbTable === 'panchang') {
            const payload = {
                date: dateStr,
                title: title,
                brief: brief,
                content: content,
                author: author
            };

            if (editingPanchangId) {
                const { error } = await supabaseClient
                    .from('panchang')
                    .update(payload)
                    .eq('id', editingPanchangId);
                if (error) throw error;
            } else {
                const { error } = await supabaseClient
                    .from('panchang')
                    .upsert([payload], { onConflict: 'date' });
                if (error) throw error;
            }
        } else {
            // Store in articles with tag = 'Panchang' and slug = dateStr
            const payload = {
                title: title,
                slug: dateStr,
                brief: brief,
                content: content,
                tag: 'Panchang',
                author: author,
                is_published: true
            };

            if (editingPanchangId) {
                const { error } = await supabaseClient
                    .from('articles')
                    .update(payload)
                    .eq('id', editingPanchangId);
                if (error) throw error;
            } else {
                const existing = allPanchangs.find(p => p.slug === dateStr);
                if (existing) {
                    const { error } = await supabaseClient
                        .from('articles')
                        .update(payload)
                        .eq('id', existing.id);
                    if (error) throw error;
                } else {
                    const { error } = await supabaseClient
                        .from('articles')
                        .insert([payload]);
                    if (error) throw error;
                }
            }
        }

        showToast('🕉️ Panchang saved & synced with live website!');
        resetPanchangForm();
        await loadPanchangEntries();

    } catch (err) {
        console.error('Error saving panchang:', err);
        showToast('❌ Failed to save Panchang: ' + (err.message || 'Error'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Save & Sync Panchang</span> <span>🕉️</span>`;
    }
}

// ── Delete Panchang ──
function openDeletePanchangModal(id) {
    pendingDeletePanchangId = id;
    const item = allPanchangs.find(p => String(p.id) === String(id));
    const modal = document.getElementById('deletePanchangModal');
    const msg = document.getElementById('deletePanchangModalMsg');
    const dateStr = item ? (item.date || item.slug || 'this date') : 'this date';

    if (msg) {
        msg.innerHTML = `Are you sure you want to permanently delete Panchang for: <br><strong>"${escapeHtml(dateStr)}"</strong>?`;
    }
    if (modal) modal.classList.add('open');
}

function closeDeletePanchangModal() {
    pendingDeletePanchangId = null;
    const modal = document.getElementById('deletePanchangModal');
    if (modal) modal.classList.remove('open');
}

async function confirmDeletePanchang() {
    if (!pendingDeletePanchangId) return;
    const id = pendingDeletePanchangId;
    closeDeletePanchangModal();

    showToast('Deleting Panchang...');

    try {
        if (typeof supabaseClient === 'undefined') {
            throw new Error('Supabase client not loaded');
        }

        const table = panchangDbTable === 'panchang' ? 'panchang' : 'articles';
        const { error } = await supabaseClient
            .from(table)
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Smooth remove
        const card = document.getElementById(`panchang-card-${id}`);
        if (card) {
            card.style.transition = 'all 0.2s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => card.remove(), 200);
        }

        allPanchangs = allPanchangs.filter(p => String(p.id) !== String(id));
        showToast('✓ Panchang entry deleted');
        if (editingPanchangId === id) {
            resetPanchangForm();
        }
    } catch (err) {
        console.error('Error deleting panchang:', err);
        showToast('❌ Failed to delete: ' + (err.message || 'Error'));
    }
}
