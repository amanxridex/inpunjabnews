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
                <span>👁️ ${views} Views</span>
            </div>
            <h1 class="article-title">${article.title}</h1>
            <img class="article-img" src="${article.image_url}" alt="${article.title}">
            <div class="article-body">
                ${contentHtml}
            </div>
        `;

        container.innerHTML = html;

        // Optionally record a view by calling an RPC or updating view_count
        // For now, we'll just read it.

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
