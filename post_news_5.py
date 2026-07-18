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

headline = "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਦੇ ਸਵਾਗਤ 'ਚ ਕੇਵਲ ਸਿੰਘ ਢਿੱਲੋਂ ਨੇ ਚਲਾਇਆ ਸਵੱਛਤਾ ਅਭਿਆਨ, ਪੰਜਾਬ ਭਰ 'ਚ ਭਾਜਪਾ ਵੱਲੋਂ ਸਫ਼ਾਈ ਮੁਹਿੰਮ"
brief = "ਜਲੰਧਰ, ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਦੀ ਭਲਕੇ 17 ਜੁਲਾਈ ਪੰਜਾਬ ਆਮਦ ਤੋਂ ਪਹਿਲਾਂ ਭਾਰਤੀ ਜਨਤਾ ਪਾਰਟੀ ਵੱਲੋਂ ਦੋ ਰੋਜ਼ਾ ਸਵੱਛਤਾ ਅਭਿਆਨ ਚਲਾਇਆ ਗਿਆ।"

content = """<p><strong>ਜਲੰਧਰ ਦੇ ਪਾਰਕ 'ਚ ਕੀਤੀ ਸਫ਼ਾਈ, ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਦੇ ਸਵਾਗਤ 'ਚ ਭਾਜਪਾ ਨੇ ਪੰਜਾਬ ਭਰ 'ਚ ਚਲਾਇਆ ਸਫ਼ਾਈ ਅਭਿਆਨ</strong></p>
<p><strong>ਮੋਦੀ ਜੀ ਦੇ ਸਵਾਗਤ ਲਈ ਪੰਜਾਬੀ ਪੱਬਾਂਭਾਰ, ਪਲਕਾਂ ਵਿਛਾ ਹੋ ਰਿਹਾ ਸ਼ਾਨਦਾਰ ਸਵਾਗਤ: ਕੇਵਲ ਸਿੰਘ ਢਿੱਲੋਂ</strong></p>
<p>ਜਲੰਧਰ, ਜੁਲਾਈ 16</p>
<p>ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਦੀ ਭਲਕੇ 17 ਜੁਲਾਈ ਪੰਜਾਬ ਆਮਦ ਤੋਂ ਪਹਿਲਾਂ ਭਾਰਤੀ ਜਨਤਾ ਪਾਰਟੀ ਵੱਲੋਂ ਦੋ ਰੋਜ਼ਾ ਸਵੱਛਤਾ ਅਭਿਆਨ ਚਲਾਇਆ ਗਿਆ। ਜਿਸ ਤਹਿਤ ਅੱਜ ਪੰਜਾਬ ਭਾਜਪਾ ਪ੍ਰਧਾਨ ਕੇਵਲ ਸਿੰਘ ਢਿੱਲੋਂ ਨੇ ਜਲੰਧਰ ਦੇ ਬਾਬਾ ਬੁੱਢਾ ਜੀ ਨਗਰ ਦੇ ਪਾਰਕ ਵਿੱਚ ਦਕੋਹਾ ਮੰਡਲ ਦੇ ਪ੍ਰਧਾਨ ਚੰਦਨ ਰਖੇਜਾ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਸਫ਼ਾਈ ਕੀਤੀ।</p>
<p>ਇਸ ਮੌਕੇ ਕੇਵਲ ਸਿੰਘ ਢਿੱਲੋਂ ਨੇ ਕਿਹਾ ਕਿ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਜੀ ਦਾ ਪੰਜਾਬ ਵਿੱਚ ਸਵਾਗਤ ਪੂਰੇ ਧੂਮਧਾਮ ਨਾਲ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ। ਇਸ ਲਈ ਪੰਜਾਬ ਭਾਜਪਾ ਦੇ ਨਾਲ ਨਾਲ ਸਮੁੱਚੇ ਪੰਜਾਬੀ ਪੱਬਾਂ ਭਾਰ ਹਨ ਅਤੇ ਪਲਕਾਂ ਵਿਛਾ ਕੇ ਉਹਨਾਂ ਦਾ ਸਵਾਗਤ ਕਰਨਗੇ।</p>
<p>ਉਹਨਾਂ ਕਿਹਾ ਕਿ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਜੀ ਦੀ ਆਮਦ ਵਿੱਚ ਭਾਰਤੀ ਜਨਤਾ ਪਾਰਟੀ ਪੰਜਾਬ ਵੱਲੋਂ ਪੂਰੇ ਪੰਜਾਬ ਵਿੱਚ ਸਵੱਛਤਾ ਅਭਿਆਨ ਚਲਾਇਆ ਗਿਆ ਹੈ। ਜਿਸ ਤਹਿਤ ਭਾਜਪਾ ਦੇ 620 ਮੰਡਲਾਂ ਵਿੱਚ ਕੁੱਲ 3100 ਤੋਂ ਵੱਧ ਥਾਵਾਂ 'ਤੇ ਸਫ਼ਾਈ ਮੁਹਿੰਮ ਚਲਾਈ ਗਈ। ਇਸ ਤਹਿਤ ਜਨਤਕ ਥਾਵਾਂ, ਪਾਰਕਾਂ, ਹਸਪਤਾਲਾਂ, ਮੰਦਰਾਂ ਆਦਿ ਵਿੱਚ ਸਫ਼ਾਈ ਕੀਤੀ ਗਈ ਹੈ। ਉਹਨਾਂ ਕਿਹਾ ਕਿ ਜਿਸ ਤਰ੍ਹਾਂ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਜੀ ਨੇ ਦੇਸ਼ ਭਰ ਵਿੱਚ ਸਵੱਛਤਾ ਦਾ ਅਭਿਆਨ ਚਲਾਇਆ, ਉਸ ਤੋਂ ਪ੍ਰੇਰਣਾ ਲੈ ਕੇ ਇਹ ਸਫ਼ਾਈ ਮੁਹਿੰਮ ਚਲਾਈ ਗਈ ਹੈ। ਸਾਡਾ ਮਕਸਦ ਪੂਰੇ ਦੇਸ਼ ਨੂੰ ਸਵੱਛ, ਸਾਫ਼ ਰੱਖਣਾ ਹੈ। ਇਸ ਲਈ ਆਪਣੇ ਆਲੇ ਦੁਆਲੇ, ਪਿੰਡ, ਸ਼ਹਿਰ ਨੂੰ ਸਾਫ਼ ਰੱਖਣ ਦੀ ਜਿੰਮੇਵਾਰੀ ਸਾਡੀ ਹੈ।</p>
<p>ਇਸ ਦੇ ਨਾਲ ਹੀ ਪ੍ਰਧਾਨ ਕੇਵਲ ਸਿੰਘ ਢਿੱਲੋਂ ਨੇ ਕਿਹਾ ਕਿ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਜੀ ਪੰਜਾਬ ਨੂੰ ਵੱਡੇ ਵਿਕਾਸ ਪ੍ਰੋਜੈਕਟ ਦੇਣ ਆ ਰਹੇ ਹਨ। ਜਿਸ ਤਹਿਤ ਜਿੱਥੇ ਰੇਲਵੇ ਸਟੇਸ਼ਨਾਂ ਨੂੰ ਵਿਸ਼ਵ ਪੱਧਰ ਦਾ ਬਣਾ ਕੇ ਵੱਡੀਆਂ ਸਹੂਲਤਾਂ ਦਿੱਤੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ, ਉੱਥੇ ਵੱਡੇ ਹਾਈਵੇਜ਼, ਪੀਜੀਆਈ ਵਿੱਚ ਸਿਹਤ ਸਹੂਲਤਾਂ ਦੇ ਉਦਘਾਟਨ ਵੀ ਕੀਤੇ ਜਾਣਗੇ। ਉਹਨਾਂ ਕਿਹਾ ਕਿ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਨਰਿੰਦਰ ਮੋਦੀ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਪੂਰਾ ਦੇਸ਼ ਵਿਕਾਸ ਦੀ ਨਵੀਂ ਮੰਜ਼ਿਲ ਛੋਹ ਚੁੱਕਾ ਹੈ ਅਤੇ ਜਲਦ ਦੁਨੀਆਂ ਦਾ ਇੱਕ ਨੰਬਰ ਵਿਕਸਿਤ ਦੇਸ਼ ਬਣੇਗਾ। ਇਸ ਮੌਕੇ ਉਹਨਾਂ ਨਾਲ ਭਾਜਪਾ ਆਗੂ ਤੇ ਵਰਕਰ ਵੀ ਹਾਜ਼ਰ ਸਨ।</p>
<p><img src="main15.jpeg" alt="BJP Punjab Swachh Bharat" style="max-width:100%;height:auto;margin-top:10px;"></p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "main15.jpeg",
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
