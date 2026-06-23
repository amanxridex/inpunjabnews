import re

with open('index.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the DOMContentLoaded block for shorts with our dynamic data fetcher
split_point = js.find('// --- SHORTS GENERATION LOGIC ---')

if split_point != -1:
    js = js[:split_point]

new_js = """// --- DYNAMIC DATA FETCHING (SUPABASE) ---
document.addEventListener('DOMContentLoaded', async function() {
    if (typeof supabase === 'undefined') return;

    try {
        const { data: articles, error } = await supabase
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

    let html = \
        <div class="hero-main">
            <img src="\" alt="\">
            <div class="hero-overlay">
                <span class="hero-category">Punjab • \</span>
                <div class="hero-title">\</div>
                <div class="hero-meta">
                    <span class="author">By InPunjab Desk</span>
                    <span>Just now</span>
                    <span>?? \ views</span>
                    <span>?? \ comments</span>
                </div>
            </div>
        </div>
        <div class="hero-side">
    \;

    for (let i = 1; i < heroArticles.length; i++) {
        const art = heroArticles[i];
        const artCat = art.categories ? art.categories.name : 'News';
        html += \
            <div class="side-card">
                <img src="\" alt="\">
                <div class="side-card-body">
                    <div class="side-cat">\</div>
                    <div class="side-title">\</div>
                    <div class="side-meta">Just now • \ views</div>
                </div>
            </div>
        \;
    }

    html += '</div>';
    heroContainer.innerHTML = html;
}

function renderGrids(articles) {
    // Distribute remaining articles across the empty grid containers
    const categoriesToPopulate = ['punjab', 'regions', 'national', 'politics', 'business', 'sports', 'entertainment'];
    
    // For simplicity, just chunk the articles and assign them to whatever containers exist
    let artIdx = 0;
    
    for (const cat of categoriesToPopulate) {
        // Find all grids for this category (e.g., dynamic-grid-punjab-0)
        let gridIdx = 0;
        while (true) {
            const gridContainer = document.getElementById(\dynamic-grid-\-\\);
            if (!gridContainer) break;

            let gridHtml = '';
            // We put up to 4 articles per grid
            for (let i = 0; i < 4; i++) {
                if (artIdx >= articles.length) artIdx = 0; // Wrap around if we run out of articles (for demo)
                const art = articles[artIdx];
                const artCat = art.categories ? art.categories.name : 'News';
                const pillClass = \cat-pill cat-\\;

                gridHtml += \
                    <div class="news-card">
                        <img class="news-card-img" src="\" alt="\">
                        <div class="news-card-body">
                            <span class="\">\</span>
                            <div class="news-card-title">\</div>
                            <div class="news-card-meta">Just now</div>
                        </div>
                    </div>
                \;
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
    
    // Generate shorts from articles
    for (let i = 0; i < articles.length; i++) {
        const art = articles[i];
        const artCat = art.categories ? art.categories.name : 'News';
        const views = art.view_count || Math.floor(Math.random() * 500) + 10;
        const comments = art.comment_count || Math.floor(Math.random() * 200) + 5;

        htmlContent += \
            <div class="short-slide">
                <div class="short-bg" style="background-image: url('\');"></div>
                <div class="short-content">
                    <div class="short-tag">\</div>
                    <h2 class="short-headline">\</h2>
                    <p class="short-brief">\</p>
                    <div class="short-meta">
                        <span>??? \K views</span>
                        <span>?? \ comments</span>
                    </div>
                </div>
            </div>
        \;
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
"""

with open('index.js', 'w', encoding='utf-8') as f:
    f.write(js + new_js)

print("Updated index.js")
