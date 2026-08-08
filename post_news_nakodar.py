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
    "title": "जालंधर के नकोदर में खालिस्तान का झंडा फहराने का दावा निकला निराधार, पुलिस ने शुरू की जांच",
    "region": "Punjab",
    "author": "vicky siri",
    "image_url": "main32.jpeg",
    "brief": "गुरपतवंत सिंह पन्नू द्वारा सोशल मीडिया पर वायरल किए गए वीडियो की जांच में स्कूल परिसर में कोई झंडा नहीं मिला। पुलिस ने एफआईआर दर्ज कर कानूनी कार्रवाई शुरू कर दी है।",
    "content": "<p><strong>जालंधर, 07 अगस्त 2026:</strong></p><p>दिनांक 07 अगस्त 2026 को अमेरिका स्थित नामित आतंकवादी गुरपतवंत सिंह पन्नू द्वारा सोशल मीडिया पर एक वीडियो साझा किया गया, जिसमें दावा किया गया कि गांव कोटला हेरां स्थित सरकारी हाई स्कूल, जो थाना सदर नकोदर, जिला जालंधर ग्रामीण के अधिकार क्षेत्र में आता है, में खालिस्तान का झंडा फहराया गया है।</p><p>उक्त सूचना प्राप्त होते ही उप-मंडल नकोदर के डीएसपी ओंकार सिंह बराड़, थाना सदर नकोदर के प्रभारी तथा पुलिस टीमों द्वारा तत्काल स्कूल का दौरा कर पूरे परिसर का गहन निरीक्षण किया गया। निरीक्षण के दौरान स्कूल परिसर में कहीं भी ऐसा कोई झंडा नहीं पाया गया।</p><p>मौके पर की गई जांच के दौरान वीडियो में किया गया दावा निराधार एवं तथ्यों से परे पाया गया। मामले की सत्यता स्थापित करने तथा भ्रामक सूचना फैलाकर शरारत करने वाले व्यक्तियों की पहचान करने के लिए कानूनी कार्रवाई प्रारंभ कर दी गई है।</p><p>इस संबंध में एफआईआर दर्ज की जा रही है तथा मामले की विस्तृत जांच कानून के अनुसार की जाएगी। जांच के दौरान जो भी व्यक्ति दोषी पाए जाएंगे, उनके विरुद्ध नियमानुसार उचित कानूनी कार्रवाई की जाएगी।</p>",
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
