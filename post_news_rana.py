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
    "title": "ਰਣਜੀਤ ਸਿੰਘ ਰਾਣਾ ਨੂੰ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦਾ ਮੀਤ ਪ੍ਰਧਾਨ ਬਣਾਏ ਜਾਣ 'ਤੇ ਭਰਵਾਂ ਸਵਾਗਤ",
    "region": "Punjab",
    "author": "vicky suri",
    "image_url": "WhatsApp Image 2026-08-11 at 07.56.55.jpeg",
    "brief": "ਜਲੰਧਰ 11 ਅਗਸਤ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦੇ ਪ੍ਰਧਾਨ ਸੁਖਬੀਰ ਸਿੰਘ ਬਾਦਲ ਵੱਲੋਂ ਪਿਛਲੇ ਕਾਫੀ ਲੰਮੇ ਸਮੇਂ ਤੋਂ ਮਿਹਨਤ ਅਤੇ ਲਗਨ ਨਾਲ ਪਾਰਟੀ ਦਾ ਕੰਮ ਕਰਨ ਵਾਲੇ ਨਿਧੜਕ ਟਕਸਾਲੀ ਅਕਾਲੀ ਆਗੂ ਰਣਜੀਤ ਸਿੰਘ ਰਾਣਾ ਨੂੰ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦਾ ਮੀਤ ਪ੍ਰਧਾਨ ਬਣਾਏ ਜਾਣ ਤੇ ਹਰ ਪਾਸੇ ਤੋਂ ਭਰਮਾ ਸਵਾਗਤ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ।",
    "content": "<p>ਜਲੰਧਰ 11 ਅਗਸਤ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦੇ ਪ੍ਰਧਾਨ ਸੁਖਬੀਰ ਸਿੰਘ ਬਾਦਲ ਵੱਲੋਂ ਪਿਛਲੇ ਕਾਫੀ ਲੰਮੇ ਸਮੇਂ ਤੋਂ ਮਿਹਨਤ ਅਤੇ ਲਗਨ ਨਾਲ ਪਾਰਟੀ ਦਾ ਕੰਮ ਕਰਨ ਵਾਲੇ ਨਿਧੜਕ ਟਕਸਾਲੀ ਅਕਾਲੀ ਆਗੂ ਰਣਜੀਤ ਸਿੰਘ ਰਾਣਾ ਨੂੰ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦਾ ਮੀਤ ਪ੍ਰਧਾਨ ਬਣਾਏ ਜਾਣ ਤੇ ਹਰ ਪਾਸੇ ਤੋਂ ਭਰਮਾ ਸਵਾਗਤ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ</p><p>ਇਹ ਸਾਨੂੰ ਜੁਗਤੀ ਤੇ ਰਣਜੀਤ ਸਿੰਘ ਰਾਣਾ ਨੇ ਕਿਹਾ ਕਿ ਮੈਂ ਹਮੇਸ਼ਾ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦਾ ਵਫਾਦਾਰ ਤੇ ਨੀਤੀਆਂ ਦਾ ਮਦਈ ਰਿਹਾ ਹਾਂ ਪਾਰਟੀ ਨੇ ਜੋ ਵਿਸ਼ਵਾਸ ਕਰਕੇ ਮੈਨੂੰ ਮਾਨ ਤੇ ਸਨਮਾਨ ਦਿੱਤਾ ਹੈ ਉਸ ਲਈ ਮੈਂ ਸਮੁੱਚੀ ਹਾਈ ਕਮਾਂਡ ਦਾ ਤਹਿ ਦਿਲੋਂ ਧੰਨਵਾਦ ਕਰਦਾ ਹਾਂ</p><p>ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਪੰਜਾਬ ਦੀ ਇੱਕੋ ਇੱਕ ਖੇਤਰੀ ਪਾਰਟੀ ਆ ਜਿਸ ਨੇ ਹਮੇਸ਼ਾ ਪੰਜਾਬ ਦੇ ਹਿੱਤਾਂ ਦੀ ਪੰਜਾਬ ਤੇ ਪੰਜਾਬੀਅਤ ਦੀ ਸੋਚ ਤੇ ਪਹਿਰਾ ਦੇ ਕੇ ਪੰਜਾਬ ਦਾ ਸਰਬ ਪੱਖੀ ਵਿਕਾਸ ਖੁਸ਼ਹਾਲੀ ਅਮਨ ਸ਼ਾਂਤੀ ਲਈ ਮੋਹਰੀ ਹੋ ਕੇ ਰੋਲ ਨਿਭਾਇਆ ਹੈ</p><p>ਰਾਣਾ ਨੇ ਕਿਹਾ ਮੈਂ ਸਮੁੱਚੀ ਹਾਈ ਕਮਾਂਡ ਸਰਦਾਰ ਹਰਜਿੰਦਰ ਸਿੰਘ ਧਾਮੀ ਪ੍ਰਧਾਨ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਸਰਦਾਰ ਬਲਵਿੰਦਰ ਸਿੰਘ ਭੂੰਦੜ ਸਕੱਤਰ ਜਨਰਲ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦਲਜੀਤ ਸਿੰਘ ਚੀਮਾ ਸੀਨੀਅਰ ਮੀਤ ਪ੍ਰਧਾਨ ਸਰਦਾਰ ਕੁਲਵੰਤ ਸਿੰਘ ਮੰਨਣ ਮੁੱਖ ਸਕੱਤਰ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਹਰਿੰਦਰ ਸਿੰਘ ਢੀਂਡਸਾ ਹਲਕਾ ਚਾਰਜ ਉੱਤਰੀ ਜਲੰਧਰ ਅਵਤਾਰ ਸਿੰਘ ਘੁੰਮਣ ਜਤਿੰਦਰ ਸਿੰਘ ਲਾਲੀ ਵਾਜਵਾ ਸਮੇਤ ਸਾਰੀ ਸੀਨੀਅਰ ਲੀਡਰਸ਼ਿਪ ਦਾ ਧੰਨਵਾਦ ਕਰਦੇ ਆਂ</p><p>ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦੀ ਮਜਬੂਤੀ ਅਤੇ ਚੜ੍ਹਦੀ ਕਲਾ ਲਈ ਹਮੇਸ਼ਾ ਕੰਮ ਕਰਦਾ ਰਹਾਂਗਾ ਇੱਥੇ ਵਰਨ ਯੋਗ ਹੈ ਕਿ ਰਣਜੀਤ ਸਿੰਘ ਰਾਣਾ ਪਿਛਲੇ 40 45 ਸਾਲ ਤੋਂ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦੀਆਂ ਸਫਾਂ ਵਿੱਚ ਜਿਲਾ ਪੱਧਰ ਤੋਂ ਲੈ ਕੇ ਹਾਈ ਕਮਾਂਡ ਤੱਕ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਦੇ ਹਰ ਪ੍ਰੋਗਰਾਮ ਤੇ ਨੀਤੀਆਂ ਵਿੱਚ ਵੱਡੇ ਪੱਧਰ ਤੇ ਅਹਿਮ ਭੂਮਿਕਾ ਨਿਭਾਉਂਦਾ ਰਿਹਾ ਹੈ ਜਿਹਦਾ ਨਾਂ ਦੁਆਬੇ ਵਿੱਚ ਮਿਹਨਤੀ ਵਰਕਰਾਂ ਤੇ ਆਮ ਘਰਾਂ ਦੇ ਵਿੱਚ ਸਤਿਕਾਰ ਨਾਲ ਲਿਆ ਜਾਂਦਾ</p>",
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
