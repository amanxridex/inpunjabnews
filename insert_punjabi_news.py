# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error
import datetime

url = 'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

article = {
    "title": "ਵੇਖੀਏ, ਹੈ ਕਿਸੇ ਅਫ਼ਸਰ ਵਿੱਚ ਦਮ ਜੋ ਇਸ ਗੱਡੀ 'ਤੇ ਰੋਕ ਲਾ ਸਕੇ?",
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800",
    "brief": "ਵੇਖੀਏ, ਹੈ ਕਿਸੇ ਅਫ਼ਸਰ ਵਿੱਚ ਦਮ ਜੋ ਇਸ ਗੱਡੀ 'ਤੇ ਰੋਕ ਲਾ ਸਕੇ?—ਇਹ ਸਵਾਲ ਇਨ੍ਹਾਂ ਦਿਨਾਂ ਸੋਸ਼ਲ ਮੀਡੀਆ 'ਤੇ ਤੇਜ਼ੀ ਨਾਲ ਚਰਚਾ ਦਾ ਵਿਸ਼ਾ ਬਣਿਆ ਹੋਇਆ ਹੈ। ਇੱਕ ਵਾਹਨ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅਤੇ ਵੀਡੀਓਜ਼ ਵਾਇਰਲ ਹੋਣ ਤੋਂ ਬਾਅਦ ਲੋਕ ਪ੍ਰਸ਼ਾਸਨ ਦੀ ਕਾਰਵਾਈ ਨੂੰ ਲੈ ਕੇ ਸਵਾਲ ਉਠਾ ਰਹੇ ਹਨ।",
    "content": "<p><strong>ਵੇਖੀਏ, ਹੈ ਕਿਸੇ ਅਫ਼ਸਰ ਵਿੱਚ ਦਮ ਜੋ ਇਸ ਗੱਡੀ 'ਤੇ ਰੋਕ ਲਾ ਸਕੇ?—ਇਹ ਸਵਾਲ ਇਨ੍ਹਾਂ ਦਿਨਾਂ ਸੋਸ਼ਲ ਮੀਡੀਆ 'ਤੇ ਤੇਜ਼ੀ ਨਾਲ ਚਰਚਾ ਦਾ ਵਿਸ਼ਾ ਬਣਿਆ ਹੋਇਆ ਹੈ। ਇੱਕ ਵਾਹਨ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅਤੇ ਵੀਡੀਓਜ਼ ਵਾਇਰਲ ਹੋਣ ਤੋਂ ਬਾਅਦ ਲੋਕ ਪ੍ਰਸ਼ਾਸਨ ਦੀ ਕਾਰਵਾਈ ਨੂੰ ਲੈ ਕੇ ਸਵਾਲ ਉਠਾ ਰਹੇ ਹਨ।</strong></p><p>ਵਾਇਰਲ ਸਮੱਗਰੀ ਵਿੱਚ ਦਾਅਵਾ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ ਕਿ ਸੰਬੰਧਿਤ ਗੱਡੀ ਕਥਿਤ ਤੌਰ 'ਤੇ ਨਿਯਮਾਂ ਦੀ ਉਲੰਘਣਾ ਕਰਦੀ ਨਜ਼ਰ ਆ ਰਹੀ ਹੈ, ਪਰ ਇਸ ਦੇ ਬਾਵਜੂਦ ਇਸ ਵਿਰੁੱਧ ਕੋਈ ਕਾਰਵਾਈ ਨਹੀਂ ਹੋਈ। ਇਸ ਕਾਰਨ ਆਮ ਲੋਕਾਂ ਵਿੱਚ ਇਹ ਧਾਰਨਾ ਬਣ ਰਹੀ ਹੈ ਕਿ ਕੀ ਕਾਨੂੰਨ ਸਭ ਲਈ ਇੱਕੋ ਜਿਹਾ ਹੈ ਜਾਂ ਕੁਝ ਲੋਕਾਂ ਨੂੰ ਵਿਸ਼ੇਸ਼ ਛੋਟ ਮਿਲ ਰਹੀ ਹੈ।</p><p>ਨਾਗਰਿਕਾਂ ਦਾ ਕਹਿਣਾ ਹੈ ਕਿ ਜੇਕਰ ਕਿਸੇ ਵਾਹਨ ਵੱਲੋਂ ਟ੍ਰੈਫਿਕ ਜਾਂ ਹੋਰ ਕਾਨੂੰਨੀ ਨਿਯਮਾਂ ਦੀ ਉਲੰਘਣਾ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਉਸ ਵਿਰੁੱਧ ਕਾਨੂੰਨ ਅਨੁਸਾਰ ਕਾਰਵਾਈ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ, ਭਾਵੇਂ ਉਹ ਕਿਸੇ ਵੀ ਵਿਅਕਤੀ ਜਾਂ ਸੰਸਥਾ ਨਾਲ ਸਬੰਧਿਤ ਹੋਵੇ। ਲੋਕਾਂ ਦਾ ਮੰਨਣਾ ਹੈ ਕਿ ਕਾਨੂੰਨ ਦੀ ਇੱਕਸਾਰ ਲਾਗੂਅਤ ਹੀ ਪ੍ਰਸ਼ਾਸਨ ਦੀ ਭਰੋਸੇਯੋਗਤਾ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰਦੀ ਹੈ।</p><p>ਫਿਲਹਾਲ ਸੰਬੰਧਿਤ ਵਿਭਾਗ ਵੱਲੋਂ ਇਸ ਮਾਮਲੇ ਸਬੰਧੀ ਕੋਈ ਅਧਿਕਾਰਕ ਬਿਆਨ ਸਾਹਮਣੇ ਨਹੀਂ ਆਇਆ ਹੈ। ਜੇਕਰ ਵਾਇਰਲ ਦਾਅਵਿਆਂ ਵਿੱਚ ਤੱਥ ਹਨ, ਤਾਂ ਸੰਬੰਧਿਤ ਅਧਿਕਾਰੀਆਂ ਵੱਲੋਂ ਜਾਂਚ ਕਰਕੇ ਕਾਨੂੰਨ ਅਨੁਸਾਰ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਣੀ ਚਾਹੀਦੀ ਹੈ। ਉੱਧਰ, ਜੇ ਦਾਅਵੇ ਗਲਤ ਜਾਂ ਭ੍ਰਮਕ ਹਨ, ਤਾਂ ਪ੍ਰਸ਼ਾਸਨ ਨੂੰ ਸਥਿਤੀ ਸਪੱਸ਼ਟ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ ਤਾਂ ਜੋ ਅਫ਼ਵਾਹਾਂ ਨੂੰ ਰੋਕਿਆ ਜਾ ਸਕੇ।</p>",
    "is_published": True,
    "tag": "Breaking",
    "comment_count": 0,
    "view_count": 250
}

data = json.dumps(article, ensure_ascii=False).encode('utf-8')
req = urllib.request.Request(url, data=data, headers=headers, method='POST')

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("Successfully inserted:", result[0]['id'])
except urllib.error.HTTPError as e:
    print("Error:", e.read().decode('utf-8'))
