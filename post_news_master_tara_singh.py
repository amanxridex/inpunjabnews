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

headline = "मास्टर तारा सिंह नगर में सरकारी जमीन पर कब्जे के आरोप, निगम की कार्यप्रणाली पर उठे सवाल"
brief = "जालंधर के मास्टर तारा सिंह नगर में नेता जी पार्क के सामने सरकारी जमीन पर कथित कब्जे का मामला सामने आया है। स्थानीय लोगों ने मौके की पैमाइश और निष्पक्ष जांच की मांग की है।"

content = """<p><strong>जालंधर।</strong> मास्टर तारा सिंह नगर स्थित नेता जी पार्क के सामने एक भवन के आसपास हुए निर्माण को लेकर सरकारी जमीन पर कथित कब्जे के आरोप सामने आए हैं। स्थानीय लोगों के अनुसार सड़क/सार्वजनिक हिस्से की ओर दोनों तरफ करीब चार-चार फुट तक जगह घेरकर निर्माण किया गया है, जिससे सार्वजनिक रास्ते और सरकारी जमीन के इस्तेमाल को लेकर सवाल खड़े हो रहे हैं।</p>
<p>मौके की तस्वीरों में ईंटों से बनाए गए बड़े चबूतरेनुमा निर्माण स्पष्ट रूप से दिखाई दे रहे हैं। आरोप है कि निर्माण के जरिए सार्वजनिक स्थान की ओर काफी हिस्सा घेर लिया गया है। यदि यह जमीन वास्तव में नगर निगम अथवा सरकारी रिकॉर्ड में सार्वजनिक उपयोग के लिए दर्ज है, तो इसकी पैमाइश और मौके की स्थिति की जांच जरूरी है।</p>
<p>सबसे बड़ा सवाल यह है कि क्या नगर निगम के संबंधित विभाग की अनुमति से यह निर्माण हुआ है? अगर अनुमति नहीं दी गई, तो निर्माण होने के दौरान संबंधित अधिकारियों की नजर इस पर क्यों नहीं पड़ी? और यदि अनुमति दी गई है, तो किस नियम और किस आधार पर सार्वजनिक जगह के उपयोग की अनुमति दी गई?</p>
<p>स्थानीय लोगों का कहना है कि छोटे दुकानदारों और गरीब लोगों द्वारा सड़क किनारे मामूली खोखा या रेहड़ी लगाने पर कार्रवाई की जाती है, जबकि बड़े निर्माणों में सार्वजनिक जगह घेरने के आरोपों पर कार्रवाई क्यों नहीं होती, यह जांच का विषय है।</p>
<p>लोगों ने नगर निगम प्रशासन और संबंधित विभाग से मांग की है कि मौके की सरकारी रिकॉर्ड के अनुसार पैमाइश, निर्माण की अनुमति और नक्शे की जांच कराई जाए। यदि सार्वजनिक जमीन पर अवैध कब्जा पाया जाता है तो नियमानुसार कार्रवाई की जाए और कब्जे वाली जगह को खाली करवाया जाए।</p>
<p>अब देखना यह है कि नगर निगम प्रशासन इस मामले में जांच करवाता है या नहीं। साथ ही देखना होगा कि अवैध निर्माण पर कार्रवाई की जाती है या मामला ठंडे बस्ते में डाल दिया जाएगा।</p>"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "विक्रांत जोशी",
    "image_url": "main41.jpeg",
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
