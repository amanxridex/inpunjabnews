# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error

url = 'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

headline = "ਪੰਜਾਬ ਦੇ ਭਖ਼ਦੇ ਮਸਲਿਆਂ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ ਡੀਸੀ ਜਲੰਧਰ ਨੂੰ ਦਿੱਤਾ ਗਿਆ ਮੈਮੋਰੰਡਮ"
brief = "ਬਾਲ ਮੁਕੰਦ ਬਾਵਰਾ, ਕੇਵਲ ਬਤਰਾ, ਰਵੀ ਕੁਮਾਰ ਅਤੇ ਹੋਰਨਾਂ ਆਗੂਆਂ ਨੇ ਡੀਸੀ ਜਲੰਧਰ ਰਾਹੀਂ ਰਾਸ਼ਟਰਪਤੀ, ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਅਤੇ ਮੁੱਖ ਮੰਤਰੀ ਪੰਜਾਬ ਨੂੰ ਸੋਂਪਿਆ ਲਿਖ਼ਤੀ ਮੈਮੋਰੰਡਮ।"

content = """<p><strong>ਜਲੰਧਰ:</strong> ਪੰਜਾਬ ਦੇ ਭਖ਼ਦੇ ਮਸਲਿਆਂ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ ਡੀਸੀ ਜਲੰਧਰ ਰਾਹੀਂ ਭਾਰਤ ਦੇਸ਼ ਦੇ ਰਾਸ਼ਟਰਪਤੀ, ਪ੍ਰਧਾਨ ਮੰਤਰੀ, ਗ੍ਰਿਹ ਮੰਤਰੀ, ਪੰਜਾਬ ਦੇ ਰਾਜਪਾਲ ਅਤੇ ਮੁੱਖ ਮੰਤਰੀ ਪੰਜਾਬ ਨੂੰ ਲਿਖ਼ਤੀ ਮੈਮੋਰੰਡਮ ਦਿੱਤਾ ਗਿਆ।</p>
<p><strong>ਮੈਮੋਰੰਡਮ ਵਿੱਚ ਰੱਖੀਆਂ ਗਈਆਂ ਮੁੱਖ ਮੰਗਾਂ:</strong></p>
<ul>
  <li>ਵਿਦਿਆਰਥੀਆਂ ਉਤੇ ਕੀਤੇ ਪਰਚੇ ਰੱਦ ਕੀਤੇ ਜਾਣ।</li>
  <li>ਇੱਕ ਸਿਲੇਬਸ ਇੱਕ ਪੈਟਰਨ ਸਿੱਖਿਆ ਪ੍ਰਣਾਲੀ ਲਾਗੂ ਕੀਤੀ ਜਾਵੇ।</li>
  <li>ਰੁਜ਼ਗਾਰ ਪ੍ਰਾਪਤੀ ਲਈ ਜ਼ਰੂਰੀ ਕਾਨੂੰਨ ਬਣਾਇਆ ਜਾਵੇ।</li>
  <li>ਪੰਜਾਬ ਨੂੰ ਨਸ਼ਾ ਮੁਕਤ ਕੀਤਾ ਜਾਵੇ।</li>
  <li>ਧਾਰਮਿਕ ਅਦਾਰਿਆਂ ਦੀ ਵਾਧੂ ਆਮਦਨ ਨੂੰ ਦੇਸ਼ ਦੀ ਤਰੱਕੀ ਲਈ ਵਰਤਿਆ ਜਾਵੇ।</li>
  <li>ਸਿਹਤ, ਸਿੱਖਿਆ ਅਤੇ ਇਨਸਾਫ਼ ਸਸਤਾ ਕੀਤਾ ਜਾਵੇ।</li>
  <li>ਈਵੀਐਮ (EVM) ਦੀ ਵਰਤੋਂ ਬੰਦ ਕੀਤੀ ਜਾਵੇ।</li>
  <li>ਜ਼ਾਤੀ ਆਧਾਰਿਤ ਜਨਗਣਨਾ ਕਰਵਾਈ ਜਾਵੇ।</li>
  <li>ਵਸੋਂ ਦੇ ਮੁਤਾਬਕ ਜ਼ਮੀਨਾਂ ਵਿੱਚ ਬਣਦਾ ਹਿੱਸਾ ਦਿੱਤਾ ਜਾਵੇ।</li>
</ul>
<p>ਮੈਮੋਰੰਡਮ ਦਿੰਦੇ ਹੋਏ ਬਾਲ ਮੁਕੰਦ ਬਾਵਰਾ, ਕੇਵਲ ਬਤਰਾ, ਰਵੀ ਕੁਮਾਰ, ਡਾਕਟਰ ਥਾਪਰ, ਅਸ਼ੋਕ ਕੁਮਾਰ, ਬੰਟੀ ਵਰਿਆਣਾ ਅਤੇ ਬਹੁਤ ਸਾਰੇ ਹੋਰ ਸਾਥੀ ਸ਼ਾਮਲ ਸਨ।</p>"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "vicky suri",
    "image_url": "main44.jpeg",
    "brief": brief,
    "content": content,
    "is_published": True,
    "tag": "Punjab",
    "comment_count": 0,
    "view_count": 0
}

data = json.dumps(article, ensure_ascii=False).encode('utf-8')
req = urllib.request.Request(url, data=data, headers=headers, method='POST')

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("Successfully inserted article ID:", result[0]['id'])
except urllib.error.HTTPError as e:
    print("Error:", e.read().decode('utf-8'))
