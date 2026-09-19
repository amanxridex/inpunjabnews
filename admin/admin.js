// ==========================================================================
// InPunjab News - Mobile Admin Application Logic
// Author: Vicky Suri
// ==========================================================================

let uploadedImages = []; // Array of base64 data URIs
let allArticles = [];
let pendingDeleteId = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initImageUploader();
    initTags();
    initForm();
    loadArticles();
});

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
                <button type="button" class="news-delete-btn" title="Delete News" onclick="event.stopPropagation(); promptDelete('${item.id}', '${escapeHtml(item.title).replace(/'/g, "\\'")}')">
                    🗑️
                </button>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

// ── Open News Article Preview Modal ──
function openArticleModal(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;

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
