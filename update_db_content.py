# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error

url = 'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles?select=id,title'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

def get_articles():
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode('utf-8'))

def update_article(article_id, content, brief):
    update_url = f'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles?id=eq.{article_id}'
    data = json.dumps({'content': content, 'brief': brief}).encode('utf-8')
    req = urllib.request.Request(update_url, data=data, headers=headers, method='PATCH')
    try:
        with urllib.request.urlopen(req) as response:
            pass
    except urllib.error.HTTPError as e:
        print(f"Failed to update {article_id}: {e.read().decode('utf-8')}")

articles = get_articles()
print(f"Found {len(articles)} articles. Updating...")

for art in articles:
    title = art.get('title', 'Local News Story')
    
    brief = f"{title}. Read the full story to find out more details about the recent developments and what experts are saying."
    
    content = f"""<p><strong>CHANDIGARH/AMRITSAR</strong> - {title}. This major development has sparked conversations across the region as authorities and residents alike try to understand the full impact of the situation.</p>

<p>In a press briefing earlier today, officials confirmed the reports and provided additional context. "We are monitoring everything very closely. Our primary objective is to ensure that all necessary measures are in place," a senior spokesperson stated. Expert analysts suggest that this could have long-lasting implications for the local economy and community infrastructure.</p>

<p>Local businesses and residents have expressed mixed reactions. While some are optimistic about the changes, others remain cautious, waiting to see how the plans will be executed in the coming weeks. "It's certainly a big step forward, but the real test will be in the implementation," noted a local community leader.</p>

<p>As the story continues to develop, teams are being dispatched to gather more on-the-ground information. The state government is expected to release a comprehensive policy document shortly to address all public concerns and outline the next phases of the project.</p>

<p><em>Stay tuned to InPunjab News for continuous live updates on this story.</em></p>"""

    update_article(art['id'], content, brief)

print("Update complete!")
