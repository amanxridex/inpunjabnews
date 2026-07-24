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

headline = "भाजपा की पंजाब सरकार में पंजाबियों को मिलेगा बेखौफ वातावरण, तेज़ तरक्की और रोजगार के नए अवसर: शीतल अंगूराल"
brief = "जालंधर वेस्ट के पूर्व विधायक एवं भाजपा नेता शीतल अंगूराल ने प्रधानमंत्री नरेंद्र मोदी के जालंधर आगमन पर आयोजित ऐतिहासिक जनसभा को सफल बनाने के लिए पंजाब की जनता, भाजपा कार्यकर्ताओं समर्थकों एवं सभी पदाधिकारियों का हृदय से धन्यवाद व्यक्त किया।"

content = """<p><strong>प्रेस नोट</strong></p>
<p><strong>नरेंद्र मोदी के स्वागत मे कार्यक्रम को सफल बनाने के लिए जनता और भाजपा कार्यकर्ताओं समर्थकों का धन्यवाद</strong></p>
<p>जालंधर 18 जुलाई ( ) जालंधर वेस्ट के पूर्व विधायक एवं भाजपा नेता शीतल अंगूराल ने प्रधानमंत्री नरेंद्र मोदी के जालंधर आगमन पर आयोजित ऐतिहासिक जनसभा को सफल बनाने के लिए पंजाब की जनता, भाजपा कार्यकर्ताओं समर्थकों एवं सभी पदाधिकारियों का हृदय से धन्यवाद व्यक्त किया।</p>
<p>शीतल अंगूराल ने कहा कि "भाजपा की पंजाब सरकार बनने पर पंजाबियों को बेखौफ वातावरण, तेज़ तरक्की और युवाओं के लिए रोजगार के नए अवसर मिलेंगे।" उन्होंने कहा कि प्रधानमंत्री नरेंद्र मोदी के नेतृत्व में देश जिस गति से विकास कर रहा है, उसी प्रकार पंजाब भी विकास, निवेश, उद्योग, बेहतर कानून-व्यवस्था और रोजगार के क्षेत्र में नई बुलंदियों को छू सकता है।</p>
<p>उन्होंने कहा कि जालंधर की जनसभा में उमड़ा जनसैलाब इस बात का स्पष्ट संकेत है कि पंजाब की जनता अब विकास, सुशासन और स्थिर नेतृत्व के पक्ष में अपना विश्वास जता रही है। पंजाब के लोग अपराध, नशे, भ्रष्टाचार और भय के माहौल से मुक्ति चाहते हैं तथा विकास और रोजगार आधारित राजनीति का समर्थन कर रहे हैं।</p>
<p>शीतल अंगूराल ने कहा कि प्रधानमंत्री नरेंद्र मोदी ने जालंधर आकर पंजाब को अनेक विकास परियोजनाओं की सौगात दी है, जिससे प्रदेश के विकास को नई गति मिलेगी। उन्होंने कहा कि भाजपा की प्राथमिकता पंजाब में ऐसा माहौल बनाना है जहाँ उद्योग स्थापित हों, युवाओं को रोजगार मिले, व्यापार फले-फूले और हर नागरिक सुरक्षित महसूस करे।</p>
<p>उन्होंने जालंधर सहित पूरे पंजाब से बड़ी संख्या में पहुंचे भाजपा कार्यकर्ताओं, महिलाओं, युवाओं एवं आम जनता का विशेष धन्यवाद करते हुए कहा कि सभी के सहयोग और उत्साह ने इस कार्यक्रम को ऐतिहासिक बना दिया। उन्होंने विश्वास व्यक्त किया कि इसी जनसमर्थन के बल पर भाजपा भविष्य में पंजाब में मजबूत सरकार बनाकर विकास, सुरक्षा और समृद्धि का नया अध्याय लिखेगी।</p>
<p><em>कैप्शन-प्रधानमंत्री नरेंद्र मोदी से मिलते जालंधर वेस्ट से पूर्व विधायक शीतल अंगूराल</em></p>
<p><img src="main18.jpeg" alt="Sheetal Angural 1" style="max-width:100%;height:auto;margin-top:10px;"><br>
<img src="main19.jpeg" alt="Sheetal Angural 2" style="max-width:100%;height:auto;margin-top:10px;"></p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "main18.jpeg",
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
