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

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as response:
    articles = json.loads(response.read().decode('utf-8'))

for art in articles:
    title = art.get('title', '')
    if 'Gulab Devi' in title:
        print(f"Found article: {title} (ID: {art['id']})")
        update_url = f"https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles?id=eq.{art['id']}"
        data = json.dumps({'image_url': 'main7.mp4'}).encode('utf-8')
        patch_req = urllib.request.Request(update_url, data=data, headers=headers, method='PATCH')
        try:
            with urllib.request.urlopen(patch_req) as patch_res:
                print("Successfully updated image_url to main7.mp4")
        except urllib.error.HTTPError as e:
            print(f"Failed to update: {e.read().decode('utf-8')}")
