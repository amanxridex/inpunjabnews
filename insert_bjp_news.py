# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error
import base64

url = 'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

headline = base64.b64decode('4Kij4KiC4Kq54Kml4Kiw4KWIIOKkqOCoguKlgCA4IOKkpuKlgCDgpKzgpJzgpr7gpI8gMy00IOKkruCoguKkn+KlhyDgpKzgpL/gpJzgpLLgpYAgLCDgpK7gpr7gpKgg4KS44KiA4Ki64KiC4KiXIOKAmOCmv+KlhyDgpK3gpr7gpJzgpqrgpr4g4KSq4Ka+4KSgIOKkueCkruCksuCkvg==').decode('utf-8')
brief = base64.b64decode('MTQg4KSy4KWB4KSW4KWMIOKkn+Ckv+Ckr+CoguCkrOCktOCljOCksuCksuCkvuCggiDgqLrgpr7gpLLgqKPgqaXgqILgqKMxMOCoguCkr+CkvuCggiDgpK7gpL/gqLjgqILgqKPgpLjgpr7gpKAgOCDgqLAo4KS44KiC4KSv4Ka+4KSMIOKkpOCkvyDgpKzgpKrgpL/gqKPgpLvgpKAzLTQg4KSC4KSf4KSCIOKkrOCkv+CknOCksuClgCAsIOKkruCmv+CkqCDgpLjgqIDgqLrgqILgqJcg').decode('utf-8')
content = base64.b64decode('PHA+PHN0cm9uZz7gpKjgpYLgpYAgOCDgpKbgpYAg4KSs4KSc4KS+4KSPIDMtNCDgpLbgpILgpJ/gpYcg4KSs4KS/4KSc4KSy4KWAICwg4KSu4KS+4KSoIOCkuOCoOCouuCoguColyDigJjgpr/gpYcg4KSt4KS+4KSc4KSq4KS+IOCkpuCkvuCkoCDgpLngpK7gpLLgpL48L3N0cm9uZz48L3A+PHVsPjxsaT4xNCDgpLLgpYHgpJbgpY0g4KSf4KS/4KSv4KWC4KSs4KS14KWM4KSy4KSy4KS+4KSCIOCouuCkvuCksuCoo+CopeCoguCoozEw4KWC4KSv4KS+IOCkruCkv+CouOCoguCoo+CkuOCkvuCkoCA4IOCosCgpLjgqILgpK/gpL7gpIwg4KSk4KS/IOCkrOCkquCkv+Coo+Cku+CkoDMtNCDgpILgpJ/gpIIg4KSs4KS/4KSc4KSy4KWAICw8L2xpPjxsaT7gpKjgpYLgpYAgOCDgpKbgpYAg4KSs4KSc4KS+4KSPIDMtNCDgpLbgpILgpJ/gpYcg4KSs4KS/4KSc4KSy4KWAICwg4KSu4KS+4KSoIOCkuOCoOCouuCoguColyA8L2xpPjxsaT7gpKjgpYLgpYAgOCDgpKbgpYAg4KSs4KSc4KS+4KSPIDMtNCDgpLbgpILgpJ/gpYcg4KSs4KS/4KSc4KSy4KWAICwg4KSu4KS+4KSoIOCkuOCoOCouuCoguColyA8L2xpPjwvdWw+').decode('utf-8')

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "bjpnews.jpeg",
    "brief": brief,
    "content": content,
    "is_published": True,
    "tag": "Breaking",
    "comment_count": 0,
    "view_count": 150
}

data = json.dumps(article, ensure_ascii=False).encode('utf-8')
req = urllib.request.Request(url, data=data, headers=headers, method='POST')

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("Successfully inserted:", result[0]['id'])
except urllib.error.HTTPError as e:
    print("Error:", e.read().decode('utf-8'))
