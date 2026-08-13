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
    "title": "ਪੰਜਾਬ ਭਾਜਪਾ ਐੱਸ.ਸੀ. ਮੋਰਚਾ ਪ੍ਰਧਾਨ ਅਤੇ ਸਾਬਕਾ ਵਿਧਾਇਕ ਸ਼ੀਤਲ ਅੰਗੂਰਾਲ ਨੇ ਸੈਂਕੜਿਆਂ ਸਾਥੀਆਂ ਨਾਲ ਕੱਢੀ ਵਿਸ਼ਾਲ ਤਿਰੰਗਾ ਯਾਤਰਾ",
    "region": "Punjab",
    "author": "vicky suri",
    "image_url": "main35.jpeg",
    "brief": "ਤਿਰੰਗਾ ਸਿਰਫ਼ ਦੇਸ਼ ਦਾ ਝੰਡਾ ਨਹੀਂ, ਸਗੋਂ ਭਾਰਤ ਦੀ ਆਨ, ਬਾਨ ਅਤੇ ਸ਼ਾਨ ਦਾ ਪ੍ਰਤੀਕ ਹੈ : ਸ਼ੀਤਲ ਅੰਗੂਰਾਲ",
    "content": "<p>ਜਲੰਧਰ, 12 ਅਗਸਤ ( ) ਭਾਰਤੀ ਜਨਤਾ ਪਾਰਟੀ ਜਲੰਧਰ ਸ਼ਹਿਰੀ ਦੇ ਬਸਤੀ ਦਾਨਿਸ਼ਮੰਦਾ ਮੰਡਲ ਵਿੱਚ ਪੰਜਾਬ ਭਾਜਪਾ ਐੱਸ.ਸੀ. ਮੋਰਚਾ ਦੇ ਪ੍ਰਧਾਨ ਅਤੇ ਸਾਬਕਾ ਵਿਧਾਇਕ ਸ਼ੀਤਲ ਅੰਗੂਰਾਲ ਦੀ ਅਗਵਾਈ ਹੇਠ ਸੈਂਕੜਿਆਂ ਭਾਜਪਾ ਕਾਰਕੁਨਾਂ ਅਤੇ ਸਮਰਥਕਾਂ ਦੀ ਮੌਜੂਦਗੀ ਵਿੱਚ ਵਿਸ਼ਾਲ ਤਿਰੰਗਾ ਯਾਤਰਾ ਉਨ੍ਹਾਂ ਦੇ ਬਸਤੀ ਦਾਨਿਸ਼ਮੰਦਾ ਸਥਿਤ ਦਫ਼ਤਰ ਤੋਂ ਕੱਢੀ ਗਈ। ਯਾਤਰਾ ਦੌਰਾਨ ਕਾਰਕੁਨਾਂ ਨੇ ਹੱਥਾਂ ਵਿੱਚ ਤਿਰੰਗਾ ਫੜ ਕੇ ਦੇਸ਼ਭਗਤੀ ਦੇ ਨਾਅਰਿਆਂ ਨਾਲ ਰਾਸ਼ਟਰ ਪ੍ਰੇਮ ਅਤੇ ਏਕਤਾ ਦਾ ਸੰਦੇਸ਼ ਦਿੱਤਾ।</p><p>ਇਸ ਮੌਕੇ ਸਾਬਕਾ ਵਿਧਾਇਕ ਸ਼ੀਤਲ ਅੰਗੂਰਾਲ ਨੇ ਕਿਹਾ ਕਿ ਤਿਰੰਗਾ ਸਿਰਫ਼ ਦੇਸ਼ ਦਾ ਝੰਡਾ ਨਹੀਂ, ਸਗੋਂ ਭਾਰਤ ਦੀ ਆਨ, ਬਾਨ ਅਤੇ ਸ਼ਾਨ ਦਾ ਪ੍ਰਤੀਕ ਹੈ। ਦੇਸ਼ ਲਈ ਆਪਣਾ ਸਭ ਕੁਝ ਨਿਛਾਵਰ ਕਰਨ ਵਾਲੇ ਵੀਰ ਜਵਾਨਾਂ ਅਤੇ ਆਜ਼ਾਦੀ ਦੇ ਸੂਰਮਿਆਂ ਦੀਆਂ ਕੁਰਬਾਨੀਆਂ ਨੂੰ ਨਮਨ ਕਰਦਿਆਂ ਹਰ ਭਾਰਤੀ ਨੂੰ ਰਾਸ਼ਟਰ ਹਿਤ ਨੂੰ ਸਰਵੋਪਰਿ ਰੱਖਣ ਦਾ ਸੰਕਲਪ ਲੈਣਾ ਚਾਹੀਦਾ ਹੈ।</p><p>ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਦੀ ਅਗਵਾਈ ਹੇਠ ਅੱਜ ਭਾਰਤ ਵਿਸ਼ਵ ਪੱਧਰ ’ਤੇ ਲਗਾਤਾਰ ਮਜ਼ਬੂਤ ਹੋ ਰਿਹਾ ਹੈ। ਦੇਸ਼ ਦੀ ਏਕਤਾ, ਅਖੰਡਤਾ ਅਤੇ ਵਿਕਾਸ ਲਈ ਭਾਜਪਾ ਦਾ ਹਰ ਕਾਰਕੁਨ ਪੂਰੀ ਨਿਸ਼ਠਾ ਨਾਲ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ। ਤਿਰੰਗਾ ਯਾਤਰਾ ਦਾ ਉਦੇਸ਼ ਸਮਾਜ ਦੇ ਹਰ ਵਰਗ ਵਿੱਚ ਦੇਸ਼ਭਗਤੀ ਦੀ ਭਾਵਨਾ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰਨਾ ਅਤੇ ਨੌਜਵਾਨ ਪੀੜ੍ਹੀ ਨੂੰ ਰਾਸ਼ਟਰ ਸੇਵਾ ਲਈ ਪ੍ਰੇਰਿਤ ਕਰਨਾ ਹੈ।</p><p>ਤਿਰੰਗਾ ਯਾਤਰਾ ਦੀ ਪ੍ਰਧਾਨਗੀ ਬਸਤੀ ਦਾਨਿਸ਼ਮੰਦਾ ਮੰਡਲ ਪ੍ਰਧਾਨ ਮਨੀਸ਼ ਬਾਲ ਨੇ ਕੀਤੀ, ਜਦਕਿ ਮੰਡਲ ਪ੍ਰਭਾਰੀ ਕੁਣਾਲ ਸ਼ਰਮਾ ਨੇ ਪ੍ਰੋਗਰਾਮ ਦੀਆਂ ਸਾਰੀਆਂ ਵਿਵਸਥਾਵਾਂ ਨੂੰ ਸੁਚੱਜੇ ਢੰਗ ਨਾਲ ਸੰਭਾਲਿਆ। ਯਾਤਰਾ ਵਿੱਚ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਭਾਜਪਾ ਕਾਰਕੁਨਾਂ, ਨੌਜਵਾਨ ਸਾਥੀਆਂ ਅਤੇ ਸਥਾਨਕ ਨਿਵਾਸੀਆਂ ਨੇ ਉਤਸ਼ਾਹ ਨਾਲ ਭਾਗ ਲਿਆ।</p><p>ਸ਼ੀਤਲ ਅੰਗੂਰਾਲ ਨੇ ਯਾਤਰਾ ਨੂੰ ਸਫਲ ਬਣਾਉਣ ਲਈ ਸਾਰੇ ਭਾਜਪਾ ਕਾਰਕੁਨਾਂ ਅਤੇ ਇਲਾਕਾ ਵਾਸੀਆਂ ਦਾ ਧੰਨਵਾਦ ਕਰਦਿਆਂ ਕਿਹਾ ਕਿ ਦੇਸ਼ ਦੇ ਸਨਮਾਨ ਅਤੇ ਤਿਰੰਗੇ ਦੀ ਸ਼ਾਨ ਲਈ ਭਾਜਪਾ ਦਾ ਹਰ ਕਾਰਕੁਨ ਹਮੇਸ਼ਾ ਪੂਰੀ ਮਜ਼ਬੂਤੀ ਨਾਲ ਖੜ੍ਹਾ ਰਹੇਗਾ।</p><p>ਇਸ ਮੌਕੇ ਰਾਜਨ ਅੰਗੂਰਾਲ, ਸਚਿਨਜੀਤ ਅਰੋੜਾ, ਪਾਰਸ਼ਦ ਕ੍ਰਿਸ਼ਨਾ ਮਿਨੀਆ, ਵਰੁਣ ਤਨੇਜਾ, ਸ਼ਿਵ ਸ਼ਰਮਾ, ਦਲੇਰ ਸਿੰਘ, ਅਜੈ ਭਗਤ, ਸੌਰਵ ਪਲਟਾ, ਮੰਦੀਪ ਸਿੰਘ, ਵਿਜੈ ਬਾਲਾ, ਵਿਜੈ ਬਾਬਾ, ਸੁਨੀਲ ਮੋਂਟੂ, ਪੰਕਜ ਸਾਰੰਗਲ, ਮੰਜੀਤ ਸ਼ੇਰਾ ਆਦਿ ਸਮੇਤ ਸੈਂਕੜਿਆਂ ਦੀ ਗਿਣਤੀ ਵਿੱਚ ਲੋਕ ਹਾਜ਼ਰ ਸਨ।</p><p>ਕੈਪਸ਼ਨ : ਸੈਂਕੜਿਆਂ ਸਾਥੀਆਂ ਨਾਲ ਤਿਰੰਗਾ ਯਾਤਰਾ ਦੀ ਅਗਵਾਈ ਕਰਦੇ ਸਾਬਕਾ ਵਿਧਾਇਕ ਸ਼ੀਤਲ ਅੰਗੂਰਾਲ, ਉਨ੍ਹਾਂ ਦੇ ਨਾਲ ਮਨੀਸ਼ ਬਾਲ, ਕੁਣਾਲ ਸ਼ਰਮਾ, ਕ੍ਰਿਸ਼ਨਾ ਮਿਨੀਆ ਅਤੇ ਹੋਰ।</p>",
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
