from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Add Supabase CDN
head = soup.find('head')
if not soup.find(src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"):
    script = soup.new_tag('script', src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2")
    head.append(script)

# Add our supabaseClient.js script at the end of body before index.js
body = soup.find('body')
if not soup.find(src="supabaseClient.js"):
    sc_script = soup.new_tag('script', src="supabaseClient.js")
    body.insert(len(body.contents)-2, sc_script) # Insert near the end

# Clear hero grid
hero_grid = soup.select_one('.hero-grid')
if hero_grid:
    hero_grid.clear()
    hero_grid['id'] = 'dynamic-hero'

# Clear section grids
categories_to_clear = ['punjab', 'regions', 'national', 'politics', 'business', 'sports', 'entertainment']

for cat in categories_to_clear:
    section = soup.select_one(f'#{cat}')
    if section:
        # Find all grids inside the section
        grids = section.select('.card-grid-4, .card-grid-3, .sports-row')
        for idx, grid in enumerate(grids):
            grid.clear()
            grid['id'] = f'dynamic-grid-{cat}-{idx}'

# Save
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Modified index.html")
