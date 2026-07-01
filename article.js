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
            
            <div class="article-actions" style="display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap;">
                <div style="background: var(--card-border); padding: 8px 16px; border-radius: 20px; font-weight: bold; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                    👁️ ${views} Views
                </div>
                <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - Read more on InPunjab News! ' + window.location.href)}" target="_blank" style="background: #25D366; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; text-decoration: none; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);">
                    💬 Share on WhatsApp
                </a>
            </div>

            <img class="article-img" src="${article.image_url}" alt="${article.title}">
            <div class="article-body">
                ${contentHtml}
            </div>
            
            <div class="comments-section" style="margin-top: 50px; border-top: 1px solid var(--card-border); padding-top: 30px;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px; color: var(--text-primary);">Comments</h3>
                <div id="comments-list" style="margin-bottom: 30px; display: flex; flex-direction: column; gap: 15px;">
                    <div style="color: var(--text-muted); font-size: 14px;">Loading comments...</div>
                </div>
                
                <div class="comment-form" style="background: var(--card-bg); padding: 25px; border-radius: 8px; border: 1px solid var(--card-border);">
                    <h4 style="margin-bottom: 15px; font-size: 16px; font-weight: 600; color: var(--text-primary);">Post a Comment</h4>
                    <div style="margin-bottom: 15px;">
                        <input type="text" id="comment-author" placeholder="Your Name" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--card-border); background: var(--deep-navy); color: var(--text-primary); outline: none; font-family: inherit;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <textarea id="comment-content" placeholder="Type your comment here..." style="width: 100%; min-height: 100px; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--card-border); background: var(--deep-navy); color: var(--text-primary); outline: none; resize: vertical; font-family: inherit; line-height: 1.5;"></textarea>
                    </div>
                    <button onclick="submitArticleComment('${article.id}', '${article.title.replace(/'/g, "\\'")}')" style="background: var(--saffron); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background 0.2s;">Submit Comment</button>
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
            <div style="background: var(--card-bg); padding: 16px; border-radius: 8px; border: 1px solid rgba(30, 42, 69, 0.5); text-align: left;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">
                    <span style="font-weight: bold; color: var(--saffron);">${c.username}</span>
                    <span>${new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <div style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${c.content}</div>
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
