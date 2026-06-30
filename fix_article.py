import re

with open('article.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_search = '''<div class="nav-search" style="display: flex; align-items: center; padding: 0 16px;">
<input class="search-box" id="searchBox" placeholder="Search news, topics…" style="height: 32px; padding: 0 12px; border-radius: 16px; border: 1px solid var(--card-border); background: var(--card-bg); color: var(--text-primary);" type="text"/>
<button class="search-btn" onclick="doSearch()" style="background: none; border: none; cursor: pointer; margin-left: -30px;">??</button>
</div>'''

new_search = '''<div class="nav-search" style="display: flex; align-items: center; padding: 0 16px; position: relative;">
<input class="search-box" id="searchBox" placeholder="Search news, topics…" style="height: 32px; width: 200px; padding: 0 36px 0 16px; border-radius: 16px; border: 1px solid var(--card-border); background: var(--card-bg); color: var(--text-primary); outline: none;" type="text"/>
<button class="search-btn" onclick="doSearch()" style="background: none; border: none; cursor: pointer; position: absolute; right: 24px; top: 50%; transform: translateY(-50%);">??</button>
</div>'''

content = content.replace(old_search, new_search)

with open('article.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated article.html")
