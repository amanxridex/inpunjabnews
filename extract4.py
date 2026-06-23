# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import re
import uuid

html = open('index.html', encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')

categories = {
    'Politics': str(uuid.uuid4()),
    'Sports': str(uuid.uuid4()),
    'Agriculture': str(uuid.uuid4()),
    'Business': str(uuid.uuid4()),
    'Culture': str(uuid.uuid4()),
    'Health': str(uuid.uuid4()),
    'Infrastructure': str(uuid.uuid4()),
    'Local News': str(uuid.uuid4())
}

articles = []
titles_seen = set()

for card in soup.select('.news-card') + soup.select('.side-card') + soup.select('.hero-text'):
    title_el = card.select_one('.news-title, .side-title, .hero-title')
    if not title_el: continue
    title = title_el.text.strip().replace("'", "''")
    if title in titles_seen: continue
    titles_seen.add(title)

    img_el = card.select_one('img') or card.select_one('.news-img img')
    img = img_el['src'] if img_el else 'https://picsum.photos/400/300'
    
    cat_el = card.select_one('.news-cat, .side-cat, .hero-tag')
    cat_raw = cat_el.text.strip() if cat_el else 'Local News'
    cat_name = cat_raw.split('•')[0].strip()
    if cat_name not in categories:
        categories[cat_name] = str(uuid.uuid4())
    
    cat_id = categories[cat_name]

    articles.append(f"('{str(uuid.uuid4())}', '{title}', '', '', '{img}', '{cat_id}', '{cat_name}', 100, 10, true)")

shorts_templates = [
        {"tag": 'Breaking', "headline": "Punjab's New Water Conservation Mission: 4,000 Villages Set to Receive Solar Tube-Wells", "brief": "The initiative aims to save up to 30% of groundwater resources while providing free, renewable energy to farmers across the state. Phase 1 begins next month."},
        {"tag": 'Politics', "headline": "State Assembly Passes Resolution on Education Reform Funding", "brief": "12,000 Crore allocated specifically for rural school infrastructure, digital classrooms, and teacher training programs starting this fiscal year."},
        {"tag": 'Sports', "headline": "Punjab FC Triumphs in ISL Semifinals with Stunning 90th-Minute Goal", "brief": "The local heroes secure their spot in the finals after a breathtaking finish against the defending champions in front of a sold-out home crowd."},
        {"tag": 'Agriculture', "headline": "Record Wheat Procurement Expected This Season Across Mandis", "brief": "State procurement agencies have geared up with enhanced logistics and digital payment gateways to ensure seamless transactions for farmers within 48 hours."},
        {"tag": 'Business', "headline": "Major Tech Hub Proposed for Mohali to Attract Global Investments", "brief": "The proposed IT city expansion is expected to generate over 50,000 direct jobs and solidify Punjab's position as a premier destination for tech enterprises."},
        {"tag": 'Culture', "headline": "Amritsar Heritage Walk Initiative Draws Record International Tourist Footfall", "brief": "The newly launched guided tours exploring the rich history and architecture of the walled city have been a massive hit among international travelers."},
        {"tag": 'Health', "headline": "New Super-Specialty Hospital Inaugurated in Bathinda", "brief": "The 500-bed facility brings advanced cardiac and oncology care to the Malwa region, significantly reducing the need for patients to travel to Chandigarh."},
        {"tag": 'Infrastructure', "headline": "Delhi-Amritsar-Katra Expressway Progress on Fast Track", "brief": "Construction of the vital economic corridor is ahead of schedule, promising to reduce travel time between major cities and boost regional trade."}
]

for s in shorts_templates:
    title = s['headline'].replace("'", "''")
    brief = s['brief'].replace("'", "''")
    tag = s['tag'].replace("'", "''")
    cat_name = tag.replace('Breaking', 'Breaking').strip()
    if cat_name not in categories:
        categories[cat_name] = str(uuid.uuid4())
    cat_id = categories[cat_name]
    articles.append(f"('{str(uuid.uuid4())}', '{title}', '{brief}', '', 'https://picsum.photos/400/800', '{cat_id}', '{tag}', 500, 50, true)")

with open('seed.sql', 'w', encoding='utf-8') as f:
    f.write('TRUNCATE public.articles, public.categories;\n')
    f.write('INSERT INTO public.categories (id, name, slug) VALUES\n')
    cat_vals = [f"('{id}', '{name}', '{name.lower().replace(' ', '-')}')" for name, id in categories.items()]
    f.write(',\n'.join(cat_vals) + ';\n\n')
    
    f.write('INSERT INTO public.articles (id, title, brief, content, image_url, category_id, tag, view_count, comment_count, is_published) VALUES\n')
    f.write(',\n'.join(articles) + ';\n')

print(f"Generated seed.sql with {len(categories)} categories and {len(articles)} articles.")
