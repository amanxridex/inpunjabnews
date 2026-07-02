document.addEventListener('DOMContentLoaded', async function() {
    if (typeof supabaseClient === 'undefined') {
        showError("Database client not loaded.");
        return;
    }

    const container = document.getElementById('article-container');
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        showError("Article not found. <a href='index.html'>Return Home</a>");
        return;
    }

    try {
        const { data: article, error } = await supabaseClient
            .from('articles')
            .select('*, categories(name)')
            .eq('id', articleId)
            .single();

        if (error) throw error;
        if (!article) throw new Error("Article not found in database.");

        const catName = article.categories ? article.categories.name : 'News';
        const dateObj = new Date(article.created_at || new Date());
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const views = article.view_count || 100;
        
        // Convert plain text newlines to paragraphs if it's not already HTML
        let contentHtml = article.content;
        if (!contentHtml.includes('<p>')) {
            contentHtml = contentHtml.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
        }

        const html = `
            <a href="index.html" class="back-link">← Back to Home</a>
            <div class="article-meta">
                <span class="article-cat">${catName}</span>
                <span>📅 ${dateStr}</span>
                <span>✍️ ${article.author || 'InPunjab News'}</span>
            </div>
            
            <div class="lang-pills mobile-only">
                <button onclick="translatePage('en')">English</button>
                <button onclick="translatePage('pa')">Punjabi</button>
                <button onclick="translatePage('hi')">Hindi</button>
            </div>
            
            <h1 class="article-title">${article.title}</h1>
            
            <div class="article-actions" style="display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap;">
                <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid var(--card-border); padding: 8px 16px; border-radius: 24px; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 8px; font-size: 14px; backdrop-filter: blur(10px);">
                    👁️ ${views} Views
                </div>
                <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - Read more on InPunjab News! ' + window.location.href)}" target="_blank" class="whatsapp-share-btn" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
                    💬 Share on WhatsApp
                </a>
            </div>

            <img class="article-img" src="${article.image_url}" alt="${article.title}">
            <div class="article-body" style="text-align: justify;">
                ${contentHtml}
            </div>
            
            <div class="comments-section" style="margin-top: 64px; padding-top: 40px; border-top: 1px solid var(--card-border);">
                <h3 style="font-family: 'Inter', sans-serif; font-size: 26px; font-weight: 700; margin-bottom: 24px; color: var(--text-primary);">Comments</h3>
                <div id="comments-list" style="margin-bottom: 40px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="color: var(--text-muted); font-size: 15px;">Loading comments...</div>
                </div>
                
                <div class="comment-form" style="background: var(--card-bg); padding: 32px; border-radius: 16px; border: 1px solid var(--card-border); backdrop-filter: blur(20px);">
                    <h4 style="margin-bottom: 20px; font-size: 18px; font-weight: 700; color: var(--text-primary);">Post a Comment</h4>
                    <div style="margin-bottom: 16px;">
                        <input type="text" id="comment-author" placeholder="Your Name" style="width: 100%; padding: 16px; border-radius: 12px; border: 1px solid var(--card-border); background: var(--app-bg); color: var(--text-primary); outline: none; font-family: inherit; font-size: 15px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <textarea id="comment-content" placeholder="Type your comment here..." style="width: 100%; min-height: 120px; padding: 16px; border-radius: 12px; border: 1px solid var(--card-border); background: var(--app-bg); color: var(--text-primary); outline: none; resize: vertical; font-family: inherit; line-height: 1.6; font-size: 15px; box-sizing: border-box;"></textarea>
                    </div>
                    <button onclick="submitArticleComment('${article.id}', '${article.title.replace(/'/g, "\\'")}')" style="background: rgba(0, 122, 255, 0.1); color: var(--saffron); border: 1px solid rgba(0, 122, 255, 0.2); padding: 14px 28px; border-radius: 24px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;">Submit Comment</button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Dynamically increment view count in database using the RPC function
        try {
            await supabaseClient.rpc('increment_view_count', { article_id: articleId });
        } catch (vErr) {
            console.error("Failed to increment view count:", vErr.message);
        }

        // Load comments
        loadApprovedComments(articleId);

    } catch (err) {
        console.error("Error loading article:", err.message);
        showError("Failed to load article. <br><br> <a href='index.html'>Return Home</a>");
    }
});

function showError(msg) {
    const container = document.getElementById('article-container');
    if (container) {
        container.innerHTML = `<div class="error-msg">${msg}</div>`;
    }
}

// Load approved comments from Supabase
async function loadApprovedComments(articleId) {
    const listContainer = document.getElementById('comments-list');
    if (!listContainer) return;
    
    try {
        const { data: comments, error } = await supabaseClient
            .from('comments')
            .select('*')
            .eq('article_id', articleId)
            .eq('status', 'approved')
            .order('created_at', { ascending: true });
            
        if (error) throw error;
        
        if (!comments || comments.length === 0) {
            listContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 14px; padding: 10px 0;">No comments yet. Be the first to share your thoughts!</div>';
            return;
        }
        
        listContainer.innerHTML = comments.map(c => `
            <div style="background: var(--card-bg); padding: 20px; border-radius: 12px; border: 1px solid var(--card-border); text-align: left; backdrop-filter: blur(10px);">
                <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
                    <span style="font-weight: 700; color: var(--saffron);">${c.username}</span>
                    <span>${new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <div style="font-size: 15px; color: var(--text-secondary); line-height: 1.6;">${c.content}</div>
            </div>
        `).join('');
    } catch (err) {
        console.error("Error fetching comments:", err.message);
        listContainer.innerHTML = '<div style="color: var(--red-accent); font-size: 14px;">Failed to load comments.</div>';
    }
}

// Post a new comment
async function submitArticleComment(articleId, articleTitle) {
    const authorVal = document.getElementById('comment-author')?.value.trim();
    const contentVal = document.getElementById('comment-content')?.value.trim();
    
    if (!authorVal || !contentVal) {
        showArticleToast('⚠️ Fields Required', 'Please fill in both your name and comment.');
        return;
    }
    
    try {
        const { error } = await supabaseClient
            .from('comments')
            .insert([{
                article_id: articleId,
                article_title: articleTitle,
                username: authorVal,
                content: contentVal,
                status: 'pending' // requires admin moderation
            }]);
            
        if (error) throw error;
        
        showArticleToast('✅ Submitted', 'Your comment has been submitted and is pending moderation.');
        document.getElementById('comment-author').value = '';
        document.getElementById('comment-content').value = '';
    } catch (err) {
        console.error("Error submitting comment:", err.message);
        showArticleToast('❌ Failed', 'Failed to submit your comment. Please try again.');
    }
}

// Simple Toast Alert for article page
function showArticleToast(title, body) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    // Style as a simple visual box matching the design system
    toast.style.background = 'var(--card-bg)';
    toast.style.border = '1px solid var(--card-border)';
    toast.style.borderLeft = '4px solid var(--saffron)';
    toast.style.borderRadius = '10px';
    toast.style.padding = '12px 16px';
    toast.style.maxWidth = '300px';
    toast.style.fontSize = '12px';
    toast.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    
    toast.innerHTML = `<strong style="display:block;color:var(--text-primary);margin-bottom:2px;font-size:13px;">${title}</strong><span style="color:var(--text-muted);">${body}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}


// ???? FADE IN SCROLL ????
document.addEventListener('DOMContentLoaded', () => {
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
});

function translatePage(lang) {
    var selectField = document.querySelector('#google_translate_element select');
    if (selectField) {
        for(var i=0; i < selectField.children.length; i++){
            var option = selectField.children[i];
            // Google Translate options are like 'en', 'hi', 'pa'
            if(option.value == lang){
                selectField.selectedIndex = i;
                selectField.dispatchEvent(new Event('change'));
                break;
            }
        }
    }
}

// --- MOBILE MENU ---
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if(nav) {
        nav.classList.toggle('show-menu');
    }
}

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
