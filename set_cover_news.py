# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

url = 'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles?id=eq.f5b4afe5-a2cb-4384-a4ce-7874bbd0aafb'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

# Current ISO timestamp in UTC
now_str = datetime.now(timezone.utc).isoformat()

data = json.dumps({'created_at': now_str}, ensure_ascii=False).encode('utf-8')
req = urllib.request.Request(url, data=data, headers=headers, method='PATCH')

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("Successfully set article as cover news. ID:", result[0]['id'])
        print("New created_at:", result[0]['created_at'])
except urllib.error.HTTPError as e:
    print("Error:", e.read().decode('utf-8'))
