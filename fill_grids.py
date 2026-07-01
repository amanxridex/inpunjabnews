import re

html_file = 'main/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

def generate_cards(category, count=4):
    cards = ''
    images = [
        'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=500&q=75',
        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&q=75',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=75',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=75'
    ]
    for i in range(count):
        cards += f'''
        <div class="news-card">
            <img src="{images[i % 4]}" class="news-card-img" alt="">
            <div class="news-card-body">
                <div class="news-card-cat">{category}</div>
                <div class="news-card-title">Latest Updates in {category} - Breaking News Story {i+1}</div>
                <div class="news-card-footer">
                    <span class="time">Just now</span>
                </div>
            </div>
        </div>
        '''
    return cards

# Replace politics
content = re.sub(r'<div class="card-grid-4 fade-up" id="dynamic-grid-politics-0"></div>', 
                 f'<div class="card-grid-4 fade-up" id="dynamic-grid-politics-0">{generate_cards("Politics", 4)}</div>', content)

# Replace sports
content = re.sub(r'<div class="sports-row fade-up" id="dynamic-grid-sports-0" style="margin-bottom:18px;"></div>', 
                 f'<div class="sports-row fade-up" id="dynamic-grid-sports-0" style="margin-bottom:18px;">{generate_cards("Sports", 2)}</div>', content)
                 
content = re.sub(r'<div class="card-grid-3 fade-up" id="dynamic-grid-sports-1"></div>', 
                 f'<div class="card-grid-3 fade-up" id="dynamic-grid-sports-1">{generate_cards("Sports", 3)}</div>', content)

# Replace entertainment
content = re.sub(r'<div class="card-grid-4 fade-up" id="dynamic-grid-entertainment-0"></div>', 
                 f'<div class="card-grid-4 fade-up" id="dynamic-grid-entertainment-0">{generate_cards("Entertainment", 4)}</div>', content)

# Replace business
content = re.sub(r'<div class="card-grid-3 fade-up" id="dynamic-grid-business-0"></div>', 
                 f'<div class="card-grid-3 fade-up" id="dynamic-grid-business-0">{generate_cards("Business", 3)}</div>', content)

# Replace regions
content = re.sub(r'<div class="card-grid-3 fade-up" id="dynamic-grid-regions-0"></div>', 
                 f'<div class="card-grid-3 fade-up" id="dynamic-grid-regions-0">{generate_cards("Regions", 3)}</div>', content)


with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)
