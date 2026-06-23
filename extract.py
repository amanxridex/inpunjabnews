from bs4 import BeautifulSoup
import re
import uuid

html = open('index.html', encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')

articles = []

# Find Hero News
hero = soup.select_one('.hero-content')
if hero:
    title = hero.select_one('.hero-title').text.strip()
    tag = hero.select_one('.hero-tag').text.strip()
    meta = hero.select_one('.hero-meta').text.strip()
    articles.append({'title': title, 'tag': tag, 'meta': meta, 'type': 'hero'})

# Find Side Cards
for card in soup.select('.side-card'):
    title = card.select_one('.side-title').text.strip()
    img = card.select_one('img')['src']
    cat = card.select_one('.side-cat').text.strip()
    meta = card.select_one('.side-meta').text.strip()
    articles.append({'title': title, 'image': img, 'category': cat, 'meta': meta, 'type': 'side'})

# Find Category Section Grid News
for item in soup.select('.news-item'):
    title = item.select_one('.news-title').text.strip()
    img_element = item.select_one('img')
    img = img_element['src'] if img_element else ''
    meta_element = item.select_one('.news-meta')
    meta = meta_element.text.strip() if meta_element else ''
    articles.append({'title': title, 'image': img, 'meta': meta, 'type': 'grid'})

print(f"Found {len(articles)} articles in HTML.")
