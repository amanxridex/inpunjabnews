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

article = {
    "title": "ਭਗਵਾਨ ਵਾਲਮੀਕੀ ਸਮਾਜ ਦੀ ਏਕਤਾ ਨੂੰ ਮਿਲੇਗੀ ਨਵੀਂ ਮਜ਼ਬੂਤੀ: ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ",
    "region": "Punjab",
    "author": "vicky suri",
    "image_url": "WhatsApp Image 2026-08-13 at 10.24.21.jpeg",
    "brief": "ਵਿਪਨ ਸਭਰਵਾਲ ਦੀ ਜਿੱਤ 'ਤੇ ਭਾਜਪਾ ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਧਾਨ ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੇ ਦਿੱਤੀ ਵਧਾਈ, ਕਿਹਾ—ਸਮਾਜ ਨੂੰ ਅੱਗੇ ਲੈ ਕੇ ਜਾਣ ਲਈ ਮਿਲ ਕੇ ਕਰਾਂਗੇ ਕੰਮ",
    "content": "<p>ਜਲੰਧਰ, 9 ਅਗਸਤ ( ) ਭਗਵਾਨ ਵਾਲਮੀਕੀ ਆਸ਼ਰਮ, ਸ਼ਕਤੀ ਨਗਰ ਦੇ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ ਹਾਸਲ ਕਰਨ ਵਾਲੇ ਵਿਪਨ ਸਭਰਵਾਲ ਨੂੰ ਜਲੰਧਰ ਭਾਜਪਾ ਦੇ ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਧਾਨ ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੇ ਭਾਜਪਾ ਆਗੂ ਦੀਪਕ ਤੇਲੂ ਦੇ ਨਾਲ ਮਿਲ ਕੇ ਵਧਾਈਆਂ ਅਤੇ ਸ਼ੁਭਕਾਮਨਾਵਾਂ ਦਿੱਤੀਆਂ।</p><p>ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੇ ਕਿਹਾ ਕਿ ਵਿਪਨ ਸਭਰਵਾਲ ਦੀ ਜਿੱਤ ਸਮਾਜ ਦੇ ਵਿਸ਼ਵਾਸ ਅਤੇ ਏਕਤਾ ਦੀ ਜਿੱਤ ਹੈ। ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਭਗਵਾਨ ਵਾਲਮੀਕੀ ਜੀ ਦੇ ਆਦਰਸ਼ਾਂ ਅਤੇ ਉਪਦੇਸ਼ਾਂ ਨੂੰ ਅੱਗੇ ਵਧਾਉਂਦੇ ਹੋਏ ਸਮਾਜ ਨੂੰ ਮਜ਼ਬੂਤ, ਸੰਗਠਿਤ ਅਤੇ ਤਰੱਕੀਸ਼ੀਲ ਬਣਾਉਣ ਲਈ ਸਾਰਿਆਂ ਨੂੰ ਰਾਜਨੀਤਿਕ ਮਤਭੇਦਾਂ ਤੋਂ ਉੱਪਰ ਉੱਠ ਕੇ ਇਕੱਠੇ ਕੰਮ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।</p><p>ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਭਾਜਪਾ ਹਮੇਸ਼ਾ ਸਮਾਜ ਦੇ ਹਰ ਵਰਗ ਦੇ ਸਨਮਾਨ, ਅਧਿਕਾਰਾਂ ਅਤੇ ਵਿਕਾਸ ਲਈ ਖੜ੍ਹੀ ਰਹੀ ਹੈ। ਆਉਣ ਵਾਲੇ ਸਮੇਂ ਵਿੱਚ ਭਗਵਾਨ ਵਾਲਮੀਕੀ ਸਮਾਜ ਦੇ ਨੌਜਵਾਨਾਂ, ਮਹਿਲਾਵਾਂ ਅਤੇ ਲੋੜਵੰਦ ਪਰਿਵਾਰਾਂ ਨੂੰ ਨਾਲ ਲੈ ਕੇ ਸਮਾਜ ਨੂੰ ਅੱਗੇ ਵਧਾਉਣ ਲਈ ਹਰ ਸੰਭਵ ਸਹਿਯੋਗ ਦਿੱਤਾ ਜਾਵੇਗਾ।</p><p>ਅਸ਼ੋਕ ਸਰੀਨ ਨੇ ਵਿਪਨ ਸਭਰਵਾਲ ਨੂੰ ਭਰੋਸਾ ਦਿੰਦਿਆਂ ਕਿਹਾ ਕਿ ਉਨ੍ਹਾਂ ਦੀ ਨਵੀਂ ਜ਼ਿੰਮੇਵਾਰੀ ਸਮਾਜ ਸੇਵਾ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਮੌਕਾ ਹੈ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਉਮੀਦ ਹੈ ਕਿ ਉਹ ਸਾਰਿਆਂ ਨੂੰ ਨਾਲ ਲੈ ਕੇ ਆਸ਼ਰਮ ਅਤੇ ਸਮਾਜ ਦੀ ਭਲਾਈ ਲਈ ਕੰਮ ਕਰਨਗੇ।</p><p>ਇਸ ਮੌਕੇ ਭਾਜਪਾ ਆਗੂ ਦੀਪਕ ਤੇਲੂ, ਸੁਭਾਸ਼ ਸੋੰਧੀ, ਕੁਮਦ ਸ਼ਰਮਾ, ਦਿਨੇਸ਼ ਖੰਨਾ, ਅਨੁਜ ਸ਼ਾਰਦਾ, ਨਵ ਵਿਕਾਸ ਸ਼ਿਮਪੂ, ਮਨੀਸ਼ ਰਾਜਪੂਤ, ਮਨੀ ਆਬਾਦਪੁਰਾ, ਗੌਰਵ ਰਾਏ, ਰੋਜ਼, ਅਰਜੁਨ ਸਿੰਘ ਹੈਪੀ ਸਮੇਤ ਸਮਾਜ ਦੇ ਗਣਮਾਨਯ ਵਿਅਕਤੀ ਅਤੇ ਹੋਰ ਮੈਂਬਰ ਹਾਜ਼ਰ ਸਨ।</p><p>ਕੈਪਸ਼ਨ: ਭਗਵਾਨ ਵਾਲਮੀਕੀ ਆਸ਼ਰਮ ਸ਼ਕਤੀ ਨਗਰ ਦੇ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ ਹਾਸਲ ਕਰਨ 'ਤੇ ਵਿਪਨ ਸਭਰਵਾਲ ਨੂੰ ਵਧਾਈ ਦਿੰਦੇ ਹੋਏ ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ, ਦੀਪਕ ਤੇਲੂ, ਨਵ ਵਿਕਾਸ ਸ਼ਿਮਪੂ, ਸੁਭਾਸ਼ ਸੋੰਧੀ, ਦਿਨੇਸ਼ ਖੰਨਾ, ਅਨੁਜ ਸ਼ਾਰਦਾ ਅਤੇ ਹੋਰ।</p>",
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
        print("Successfully inserted:", result[0]['id'])
except urllib.error.HTTPError as e:
    print("Error:", e.read().decode('utf-8'))
