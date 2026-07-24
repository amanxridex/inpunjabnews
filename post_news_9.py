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

headline = "ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੂੰ ਵਧਾਈ ਦੇਣ ਵਾਲਿਆਂ ਦਾ ਲੱਗਾ ਤਾਂਤਾ, ਸੀਨੀਅਰ ਭਾਜਪਾ ਆਗੂਆਂ ਤੋਂ ਲਿਆ ਆਸ਼ੀਰਵਾਦ"
brief = "ਨਵ-ਨਿਯੁਕਤ ਪ੍ਰਧਾਨ ਸਰੀਨ ਨੂੰ ਮਨੋਰੰਜਨ ਕਾਲੀਆ ਅਤੇ ਸਰਬਜੀਤ ਮੱਕੜ ਨੇ ਮੂੰਹ ਮਿੱਠਾ ਕਰਵਾ ਕੇ ਦਿੱਤੀਆਂ ਸ਼ੁਭਕਾਮਨਾਵਾਂ"

content = """<p><strong>2027 ਵਿੱਚ ਜਲੰਧਰ ਦੀਆਂ ਚਾਰੋਂ ਵਿਧਾਨ ਸਭਾ ਸੀਟਾਂ 'ਤੇ ਕਮਲ ਖਿਲਾਉਣਾ ਸਾਡਾ ਟੀਚਾ, ਹਰ ਵਰਕਰ ਨੂੰ ਮਿਲੇਗਾ ਪੂਰਾ ਮਾਣ-ਸਨਮਾਨ – ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ</strong></p>
<p>ਜਲੰਧਰ, 19 ਜੁਲਾਈ ( ) ਭਾਜਪਾ ਜਲੰਧਰ ਸ਼ਹਿਰੀ ਦੇ ਨਵ-ਨਿਯੁਕਤ ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਧਾਨ ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੂੰ ਵਧਾਈ ਦੇਣ ਵਾਲਿਆਂ ਦਾ ਸਿਲਸਿਲਾ ਲਗਾਤਾਰ ਜਾਰੀ ਹੈ। ਕੈਂਟ, ਸੈਂਟਰਲ, ਨਾਰਥ ਅਤੇ ਵੈਸਟ ਵਿਧਾਨ ਸਭਾ ਹਲਕਿਆਂ ਤੋਂ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਭਾਜਪਾ ਵਰਕਰ, ਅਹੁਦੇਦਾਰ ਅਤੇ ਸਮਰਥਕ ਉਨ੍ਹਾਂ ਦੇ ਨਿਵਾਸ ਸਥਾਨ 'ਤੇ ਪਹੁੰਚ ਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸ਼ੁਭਕਾਮਨਾਵਾਂ ਦੇ ਰਹੇ ਹਨ। ਇਸ ਦੌਰਾਨ ਵਰਕਰਾਂ ਵਿੱਚ ਭਾਰੀ ਉਤਸ਼ਾਹ ਦੇਖਣ ਨੂੰ ਮਿਲਿਆ ਅਤੇ ਸਾਰਿਆਂ ਨੇ ਸੰਗਠਨ ਨੂੰ ਹੋਰ ਮਜ਼ਬੂਤ ਬਣਾਉਣ ਦਾ ਸੰਕਲਪ ਦੁਹਰਾਇਆ।</p>
<p>ਨਵ-ਨਿਯੁਕਤ ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਧਾਨ ਬਣਨ ਤੋਂ ਬਾਅਦ ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੇ ਭਾਜਪਾ ਦੇ ਸੀਨੀਅਰ ਆਗੂ ਅਤੇ ਸਾਬਕਾ ਕੈਬਿਨੇਟ ਮੰਤਰੀ ਮਨੋਰੰਜਨ ਕਾਲੀਆ ਅਤੇ ਸਾਬਕਾ ਵਿਧਾਇਕ ਸਰਬਜੀਤ ਸਿੰਘ ਮੱਕੜ ਦੇ ਨਿਵਾਸ ਸਥਾਨ 'ਤੇ ਪਹੁੰਚ ਕੇ ਉਨ੍ਹਾਂ ਦਾ ਆਸ਼ੀਰਵਾਦ ਪ੍ਰਾਪਤ ਕੀਤਾ। ਇਸ ਮੌਕੇ ਦੋਵਾਂ ਸੀਨੀਅਰ ਆਗੂਆਂ ਨੇ ਉਨ੍ਹਾਂ ਦਾ ਮੂੰਹ ਮਿੱਠਾ ਕਰਵਾ ਕੇ ਸ਼ੁਭਕਾਮਨਾਵਾਂ ਦਿੱਤੀਆਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਫਲ ਕਾਰਜਕਾਲ ਦੀ ਕਾਮਨਾ ਕੀਤੀ।</p>
<p>ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੇ ਕਿਹਾ ਕਿ ਪਾਰਟੀ ਲੀਡਰਸ਼ਿਪ ਨੇ ਉਨ੍ਹਾਂ 'ਤੇ ਜੋ ਭਰੋਸਾ ਪ੍ਰਗਟਾਇਆ ਹੈ, ਉਸ 'ਤੇ ਖਰਾ ਉਤਰਣ ਲਈ ਉਹ ਪੂਰੀ ਨਿਸ਼ਠਾ ਅਤੇ ਸਮਰਪਣ ਨਾਲ ਕੰਮ ਕਰਨਗੇ। ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਭਾਜਪਾ ਜਲੰਧਰ ਸ਼ਹਿਰੀ ਦੇ ਹਰ ਵਰਕਰ ਨੂੰ ਸੰਗਠਨ ਵਿੱਚ ਪੂਰਾ ਮਾਣ-ਸਨਮਾਨ ਦਿੱਤਾ ਜਾਵੇਗਾ ਅਤੇ ਕਿਸੇ ਵੀ ਵਰਕਰ ਦੀ ਅਣਦੇਖੀ ਨਹੀਂ ਹੋਣ ਦਿੱਤੀ ਜਾਵੇਗੀ। ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਭਾਜਪਾ ਇੱਕ ਵਰਕਰ ਅਧਾਰਿਤ ਪਾਰਟੀ ਹੈ ਅਤੇ ਵਰਕਰਾਂ ਦੀ ਮਿਹਨਤ ਹੀ ਇਸ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਤਾਕਤ ਹੈ।</p>
<p>ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੇ ਕਿਹਾ ਕਿ ਸਾਲ 2027 ਦੀਆਂ ਵਿਧਾਨ ਸਭਾ ਚੋਣਾਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖਦਿਆਂ ਹੁਣ ਤੋਂ ਹੀ ਸੰਗਠਨ ਨੂੰ ਬੂਥ ਪੱਧਰ ਤੱਕ ਮਜ਼ਬੂਤ ਕਰਨ ਦੀ ਲੋੜ ਹੈ। ਉਨ੍ਹਾਂ ਕਿਹਾ ਕਿ ਸਾਰੇ ਅਹੁਦੇਦਾਰਾਂ, ਮੰਡਲ ਟੀਮਾਂ, ਮੋਰਚਿਆਂ ਅਤੇ ਸੀਨੀਅਰ ਆਗੂਆਂ ਨਾਲ ਬਿਹਤਰ ਤਾਲਮੇਲ ਬਣਾ ਕੇ ਜਲੰਧਰ ਦੀਆਂ ਚਾਰੋਂ ਵਿਧਾਨ ਸਭਾ ਸੀਟਾਂ 'ਤੇ ਭਾਜਪਾ ਦੀ ਜਿੱਤ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਦਿਨ-ਰਾਤ ਮਿਹਨਤ ਕੀਤੀ ਜਾਵੇਗੀ। ਉਨ੍ਹਾਂ ਵਿਸ਼ਵਾਸ ਜਤਾਇਆ ਕਿ ਵਰਕਰਾਂ ਦੀ ਏਕਤਾ ਅਤੇ ਸੰਗਠਨ ਦੀ ਤਾਕਤ ਦੇ ਬਲ 'ਤੇ ਭਾਜਪਾ 2027 ਵਿੱਚ ਨਵਾਂ ਇਤਿਹਾਸ ਰਚੇਗੀ।</p>
<p><em>ਫੋਟੋ ਕੈਪਸ਼ਨ:</em></p>
<p><em>ਭਾਜਪਾ ਜਲੰਧਰ ਸ਼ਹਿਰੀ ਦੇ ਨਵ-ਨਿਯੁਕਤ ਜ਼ਿਲ੍ਹਾ ਪ੍ਰਧਾਨ ਅਸ਼ੋਕ ਸਰੀਨ ਹਿੱਕੀ ਨੂੰ ਆਸ਼ੀਰਵਾਦ ਅਤੇ ਸ਼ੁਭਕਾਮਨਾਵਾਂ ਦਿੰਦੇ ਹੋਏ ਸਾਬਕਾ ਕੈਬਿਨੇਟ ਮੰਤਰੀ ਮਨੋਰੰਜਨ ਕਾਲੀਆ ਅਤੇ ਸਾਬਕਾ ਵਿਧਾਇਕ ਸਰਬਜੀਤ ਸਿੰਘ ਮੱਕੜ।</em></p>
<p><img src="main21.jpeg" alt="Ashok Sareen Hicky Image 1" style="max-width:100%;height:auto;margin-top:10px;"><br>
<img src="main22.jpeg" alt="Ashok Sareen Hicky Image 2" style="max-width:100%;height:auto;margin-top:10px;"><br>
<img src="main23.jpeg" alt="Ashok Sareen Hicky Image 3" style="max-width:100%;height:auto;margin-top:10px;"></p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "main21.jpeg",
    "brief": brief,
    "content": content,
    "is_published": True,
    "tag": "Breaking",
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
