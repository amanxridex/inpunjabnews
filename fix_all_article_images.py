# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error

url_base = 'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

updates = [
    {
        "id": "f5b4afe5-a2cb-4384-a4ce-7874bbd0aafb",
        "image_url": "main41.jpeg",
        "img_tag": '<p><img src="main41.jpeg" alt="Master Tara Singh Nagar News Image" style="max-width:100%;height:auto;margin-top:15px;border-radius:8px;"></p>'
    },
    {
        "id": "e851459a-0dd3-44cf-a2fd-e07cd499ffd8",
        "image_url": "main42.jpeg",
        "img_tag": '<p><img src="main42.jpeg" alt="Punjabi NPS Protest Image" style="max-width:100%;height:auto;margin-top:15px;border-radius:8px;"></p>'
    },
    {
        "id": "8a0d906a-1813-4767-99e3-db30c5c7d278",
        "image_url": "main43.jpeg",
        "img_tag": '<p><img src="main43.jpeg" alt="Rajeshwari Dham Sawan Ashtami Image" style="max-width:100%;height:auto;margin-top:15px;border-radius:8px;"></p>'
    },
    {
        "id": "d57315b7-91b8-469f-8feb-738657087743",
        "image_url": "main44.jpeg",
        "img_tag": '<p><img src="main44.jpeg" alt="DC Jalandhar Memorandum Image" style="max-width:100%;height:auto;margin-top:15px;border-radius:8px;"></p>'
    }
]

for item in updates:
    # 1. Fetch current content
    get_url = f"{url_base}?id=eq.{item['id']}&select=id,content"
    req_get = urllib.request.Request(get_url, headers=headers)
    try:
        with urllib.request.urlopen(req_get) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data:
                cur_content = data[0]['content']
                if item['image_url'] not in cur_content:
                    new_content = cur_content.strip() + "\n" + item['img_tag']
                else:
                    new_content = cur_content
                
                # 2. Patch article
                patch_url = f"{url_base}?id=eq.{item['id']}"
                patch_body = json.dumps({
                    "image_url": item['image_url'],
                    "content": new_content
                }, ensure_ascii=False).encode('utf-8')
                
                req_patch = urllib.request.Request(patch_url, data=patch_body, headers=headers, method='PATCH')
                with urllib.request.urlopen(req_patch) as patch_resp:
                    res = json.loads(patch_resp.read().decode('utf-8'))
                    print(f"Successfully updated {item['id']} with image {item['image_url']}")
    except Exception as e:
        print(f"Error updating {item['id']}: {e}")
