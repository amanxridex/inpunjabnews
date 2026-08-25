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

headline = "ਜਲੰਧਰ ਦੇ ਸਮੂਹ ਐਨ ਪੀ ਐਸ ਮੁਲਾਜ਼ਮ ਮੁੱਖ ਮੰਤਰੀ ਦੇ ਪਿੰਡ ਸਤੌਜ ਵੱਲ ਕਰਨਗੇ ਕੂਚ : ਵੇਦ ਰਾਜ, ਕੁਲਦੀਪ ਵਾਲੀਆ"
brief = "ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਬਹਾਲੀ ਸਾਂਝੇ ਮੰਚ ਦੇ ਬੈਨਰ ਹੇਠ 23 ਅਗਸਤ ਨੂੰ ਮੁੱਖ ਮੰਤਰੀ ਦੇ ਜੱਦੀ ਪਿੰਡ ਸਤੌਜ ਵੱਲ ਕੂਚ ਕਰਨ ਦਾ ਐਲਾਨ, ਜਲੰਧਰ ਦੀਆਂ ਮੁਲਾਜ਼ਮ ਜਥੇਬੰਦੀਆਂ ਲੈਣਗੀਆਂ ਵੱਡੀ ਗਿਣਤੀ 'ਚ ਹਿੱਸਾ।"

content = """<p><strong>ਜਲੰਧਰ 20 ਅਗਸਤ (ਜੀ ਐਸ ਸਿੱਧੂ, ਜੇ ਐਸ ਸੋਢੀ):</strong> ਐਨ ਪੀ ਐਸ ਦੇ ਖਿਲਾਫ ਲੜ ਰਹੀਆਂ ਮੁਲਾਜ਼ਮਾਂ ਦੀਆਂ ਤਿੰਨ ਪ੍ਰਮੁੱਖ ਜਥੇਬੰਦੀਆਂ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਬਹਾਲੀ ਸੰਘਰਸ਼ ਕਮੇਟੀ ਪੰਜਾਬ, ਸੀ ਪੀ ਐਫ ਕਰਮਚਾਰੀ ਯੂਨੀਅਨ ਪੰਜਾਬ ਅਤੇ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਪ੍ਰਾਪਤੀ ਮੋਰਚਾ ਵਲੋਂ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਬਹਾਲੀ ਸਾਂਝੇ ਮੰਚ ਦੇ ਬੈਨਰ ਹੇਠ 23 ਅਗਸਤ ਨੂੰ ਮੁੱਖ ਮੰਤਰੀ ਦੇ ਜੱਦੀ ਪਿੰਡ ਸਤੌਜ ਵੱਲ ਜ਼ਿਲ੍ਹਾ ਜਲੰਧਰ ਦੇ ਮੁਲਾਜ਼ਮ ਜਥੇਬੰਦੀਆਂ ਵੱਡੀ ਗਿਣਤੀ ਵਿਚ ਹਿੱਸਾ ਲੈਣਗੀਆਂ।</p>
<p>ਇਸ ਮੌਕੇ ਮੁਲਾਜ਼ਮ ਆਗੂ ਕੁਲਦੀਪ ਵਾਲੀਆ ਸਲਾਹਕਾਰ ਜਿਲਾ ਕਨਵੀਨਰ, ਵੇਦ ਰਾਜ ਜਿਲਾ ਕਨਵੀਨਰ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਬਹਾਲੀ ਸੰਘਰਸ਼ ਕਮੇਟੀ ਜਲੰਧਰ, ਕਰਨੈਲ ਸਿੰਘ ਫਿਲੌਰ, ਦਿਲਬਾਗ ਸਿੰਘ ਖਲੜਾ, ਸੰਦੀਪ ਰਾਜੋਵਾਲ, ਅਮਰਜੀਤ ਭਗਤ ਆਦਿ ਨੇ ਪੰਜਾਬ ਸਰਕਾਰ 'ਤੇ ਦੋਸ਼ ਲਗਾਇਆ ਕਿ 2022 ਦੀਆਂ ਪੰਜਾਬ ਵਿਧਾਨ ਸਭਾ ਦੀਆਂ ਚੋਣਾਂ ਤੋਂ ਪਹਿਲਾਂ ਆਮ ਆਦਮੀ ਪਾਰਟੀ ਵੱਲੋਂ ਮੁਲਾਜ਼ਮਾਂ ਨਾਲ ਵਾਅਦਾ ਕੀਤਾ ਗਿਆ ਸੀ ਕਿ ਉਨਾਂ ਦੀ ਸਰਕਾਰ ਬਣਨ ਤੋਂ ਬਾਅਦ ਪੰਜਾਬ ਦੇ ਸਾਰੇ ਮੁਲਾਜ਼ਮਾਂ ਉੱਤੇ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਸਕੀਮ ਲਾਗੂ ਕੀਤੀ ਜਾਵੇਗੀ।</p>
<p>ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਮੁਲਾਜ਼ਮ ਸੰਘਰਸ਼ਾਂ ਦੇ ਦਬਾਅ ਹੇਠ ਪੰਜਾਬ ਸਰਕਾਰ ਵੱਲੋਂ 18 ਨਵੰਬਰ 2022 ਨੂੰ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਸਕੀਮ ਲਾਗੂ ਕਰਨ ਸਬੰਧੀ ਇੱਕ ਕਾਗਜੀ ਨੋਟੀਫਿਕੇਸ਼ਨ ਜਾਰੀ ਕੀਤਾ ਸੀ, ਪਰ ਉਸ ਸਮੇਂ ਦੂਜੇ ਰਾਜਾਂ ਦੀਆਂ ਵੋਟਾਂ ਸਮੇਂ ਉਨਾਂ ਰਾਜਾਂ ਦੇ ਮੁਲਾਜ਼ਮ ਵੋਟਰਾਂ ਨੂੰ ਭਰਮਾਉਣ ਲਈ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਸਕੀਮ ਲਾਗੂ ਕਰਨ ਨੂੰ ਖੂਬ ਪ੍ਰਚਾਰਿਆ ਗਿਆ।</p>
<p>ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਆਮ ਆਦਮੀ ਪਾਰਟੀ ਦੀ ਸਰਕਾਰ ਵੱਲੋਂ ਆਪਣੇ ਸਾਢੇ ਚਾਰ ਸਾਲਾਂ ਦੇ ਰਾਜ ਭਾਗ ਦੇ ਬਾਵਜੂਦ ਪੰਜਾਬ ਸਰਕਾਰ ਵੱਲੋਂ ਪੁਰਾਣੀ ਪੈਨਸ਼ਨ ਸਕੀਮ ਲਾਗੂ ਨਹੀਂ ਕੀਤੀ ਤੇ ਇੱਕ ਵੀ ਮੁਲਾਜ਼ਮ ਦਾ ਜੀ ਪੀ ਐੱਫ ਖਾਤਾ ਨਹੀਂ ਖੋਲਿਆ। ਨਵੀਂ ਭਰਤੀ ਕਰ ਰਹੇ ਮੁਲਾਜ਼ਮਾਂ ਉੱਪਰ ਵੀ ਨਵੀਂ ਪੈਨਸ਼ਨ ਸਕੀਮ ਹੀ ਲਾਗੂ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ।</p>"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "ਜੀ ਐਸ ਸਿੱਧੂ, ਜੇ ਐਸ ਸੋਢੀ",
    "image_url": "main42.jpeg",
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
