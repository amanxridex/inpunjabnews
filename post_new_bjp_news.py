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

headline = "17 जुलाई को प्रधानमंत्री नरेंद्र मोदी के जालंधर कैंट रेलवे स्टेशन आगमन को लेकर भाजपा की तैयारियां तेज, 15-16 जुलाई को चलेगा विशेष स्वच्छता अभियान"
brief = "जालंधर 13 जुलाई ()प्रधानमंत्री नरेंद्र मोदी के 17 जुलाई को जालंधर कैंट रेलवे स्टेशन पर प्रस्तावित आगमन कार्यक्रम को लेकर आज कैंट विधानसभा के गढ़ा,66 फीट रोड एवं मॉडल टाउन मंडलों के पदाधिकारियों की एक विशेष बैठक आयोजित की गई।"

content = """<p>जालंधर 13 जुलाई ( )प्रधानमंत्री नरेंद्र मोदी के 17 जुलाई को जालंधर कैंट रेलवे स्टेशन पर प्रस्तावित आगमन कार्यक्रम को लेकर आज कैंट विधानसभा के गढ़ा,66 फीट रोड एवं मॉडल टाउन मंडलों के पदाधिकारियों की एक विशेष बैठक जी.टी.बी. नगर स्थित जालंधर नगर निगम में भाजपा पार्षद दल के नेता एवं नेता प्रतिपक्ष पार्षद मंजीत सिंह टीटू के निवास स्थान पर आयोजित की गई।इस बैठक में 17 जुलाई के कार्यक्रम की तैयारियों की विस्तार से समीक्षा की गई। सभी मंडल अध्यक्षों एवं कार्यकर्ताओं ने विश्वास दिलाया कि प्रधानमंत्री के आगमन से पूर्व 15 एवं 16 जुलाई को अपने-अपने क्षेत्रों में व्यापक स्वच्छता अभियान चलाया जाएगा, ताकि जालंधर कैंट विधानसभा स्वच्छ, सुंदर एवं व्यवस्थित स्वरूप में प्रधानमंत्री का स्वागत कर सके। कार्यकर्ताओं से जनसंपर्क बढ़ाने तथा अधिक से अधिक नागरिकों की कार्यक्रम में भागीदारी सुनिश्चित करने का भी आह्वान किया गया।</p>
<p>वही बैठक में विशेष रूप से जालंधर कैंट विधानसभा प्रभारी एवं जिला भाजपा महामंत्री अशोक सरीन हिक्की तथा जिला महामंत्री अमरजीत सिंह गोल्डी उपस्थित रहे। उन्होंने कहा कि प्रधानमंत्री नरेंद्र मोदी के नेतृत्व में देश विकास, आधुनिक बुनियादी ढांचे और जनकल्याण के नए आयाम स्थापित कर रहा है। जालंधर कैंट रेलवे स्टेशन पर उनका आगमन पूरे क्षेत्र के लिए गौरव का विषय है। भाजपा कार्यकर्ता इस ऐतिहासिक अवसर को यादगार बनाने के लिए पूरी निष्ठा और उत्साह के साथ जुटे हुए हैं। इस मिटिंग में मंडल प्रधान राजन मल्हान, पार्षद कंवर सरताज, मंडल प्रधान दीपाली बागड़िया, ज्योति विरदी, वरिंदर करवल, इंद्रजीत सिंह बब्बर, समीर धवन, सुनील तजार सहित अनेक भाजपा पदाधिकारी एवं कार्यकर्ता उपस्थित रहे। आज बैठक के उपरांत भाजपा पार्षद दल के नेता एवं नेता प्रतिपक्ष मंजीत सिंह टीटू ने अपने नए निवास पर पहुंचे सभी भाजपा पदाधिकारियों एवं कार्यकर्ताओं का माता की पावन चुनरी भेंट कर सम्मान किया तथा सभी का आभार व्यक्त किया।</p>
<p><strong>कैप्शन-जालंधर भाजपा महामंत्री अशोक सरीन हिक्की, अमरजीत सिंह गोल्डी और कैंट विधानसभा के मंडल भाजपा प्रधान राजन मल्हण,कंवर सरताज, दीपाली बागड़िया को सम्मानित करते मंजीत सिंह टीटू ।</strong></p>
<p><img src="main8.jpeg" alt="BJP News" style="max-width:100%;height:auto;margin-top:10px;"><br>
<img src="main9.jpeg" alt="BJP News 2" style="max-width:100%;height:auto;margin-top:10px;"></p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "main8.jpeg",
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
