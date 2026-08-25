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

headline = "सावन की अष्टमी पर राजेश्वरी धाम में भव्य आयोजन, श्रद्धालुओं ने मां के दरबार में टेका माथा"
brief = "जालंधर के बस्ती शेख रोड स्थित राजेश्वरी धाम देवी राजरानी वैष्णो मंदिर में सावन की अष्टमी पर भव्य धार्मिक कार्यक्रम का आयोजन किया गया।"

content = """<p><strong>जालंधर:</strong> बस्ती शेख रोड स्थित राजेश्वरी धाम देवी राजरानी वैष्णो मंदिर में आज सावन की अष्टमी के पावन अवसर पर धार्मिक कार्यक्रम का आयोजन श्रद्धा एवं उत्साह के साथ किया गया। इस दौरान बड़ी संख्या में संगत ने मंदिर परिसर में पहुंचकर मां देवी राजरानी के दरबार में माथा टेका और आशीर्वाद प्राप्त किया।</p>
<p>कार्यक्रम के दौरान पंकज ठाकुर एंड पार्टी तथा महंत अशोक शीतल को सम्मानित किया गया। यह सम्मान ज्योति बब्बर, जतिन बब्बर और ऋषि देव जी द्वारा प्रदान किया गया। आयोजन में श्रद्धालुओं ने भक्ति भाव से मां की पूजा-अर्चना की और अपनी मनोकामनाओं की पूर्ति के लिए प्रार्थना की।</p>
<p>इस अवसर पर श्रद्धालुओं के लिए लंगर का भी विशेष आयोजन किया गया, जिसमें संगत ने प्रसाद ग्रहण किया। पूरे मंदिर परिसर में भक्तिमय वातावरण बना रहा और श्रद्धालुओं ने सावन की अष्टमी के पावन पर्व को श्रद्धा के साथ मनाया।</p>
<p>राजेश्वरी धाम वेलफेयर सोसाइटी, देवी राजरानी वैष्णो मंदिर, बस्ती शेख रोड, जालंधर की ओर से सभी श्रद्धालुओं को धार्मिक आयोजनों में बढ़-चढ़कर भाग लेने और मां का आशीर्वाद प्राप्त करने का संदेश दिया गया।</p>
<p><em>किसी भी जानकारी के लिए संपर्क करें:</em><br>📞 98882-14040, 📞 98882-20529</p>"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "vicky suri",
    "image_url": "main43.jpeg",
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
