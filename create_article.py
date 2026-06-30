from bs4 import BeautifulSoup
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Remove splash screen
splash = soup.find(id='splash-screen')
if splash:
    splash.decompose()

# Remove the hero section, breaking news ticker, and all grids.
# We'll just replace everything inside the main container or body with our new content.
# Wait, index.html has a <div class="container"> that wraps the main layout (sidebar, etc).
# Let's find the main container.
container = soup.find('div', class_='container')
if container:
    # We want to clear its contents and add an article structure
    container.clear()
    
    article_html = """
    <div class="article-content" id="article-container" style="padding: 40px 0; max-width: 800px; margin: 0 auto; min-height: 60vh;">
        <div style="text-align: center; padding: 50px;">
            <div class="loading-spinner" style="display:inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid var(--saffron); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p>Loading article...</p>
        </div>
    </div>
    <style>
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .article-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; margin-bottom: 20px; line-height: 1.2; color: var(--text-primary); }
        .article-meta { display: flex; gap: 15px; color: var(--text-muted); font-size: 14px; margin-bottom: 30px; align-items: center; }
        .article-cat { background: var(--saffron); color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 12px; }
        .article-img { width: 100%; max-height: 500px; object-fit: cover; border-radius: 8px; margin-bottom: 30px; }
        .article-body { font-size: 18px; line-height: 1.8; color: var(--text-secondary); }
        .article-body p { margin-bottom: 20px; }
        .article-body h2, .article-body h3 { color: var(--text-primary); margin-top: 30px; margin-bottom: 15px; }
        .error-msg { text-align: center; color: var(--red-accent); padding: 50px; font-size: 18px; }
        .back-link { display: inline-block; margin-bottom: 20px; color: var(--saffron); text-decoration: none; font-weight: bold; }
        .back-link:hover { text-decoration: underline; }
    </style>
    """
    container.append(BeautifulSoup(article_html, 'html.parser'))

# Remove ticker bar
ticker = soup.find('div', class_='ticker-bar')
if ticker:
    ticker.decompose()

# Update script tags
# Find and remove index.js
for script in soup.find_all('script'):
    if script.get('src') == 'index.js':
        script.decompose()

# Append article.js
body = soup.find('body')
new_script = soup.new_tag('script', src='article.js')
body.append(new_script)

with open('article.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Created article.html")
