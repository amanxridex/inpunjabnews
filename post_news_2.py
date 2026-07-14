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

headline = "प्रधानमंत्री नरेंद्र मोदी के जालंधर आगमन को लेकर शीतल अंगुराल ने बनाई रणनीति, 15-16 जुलाई को वेस्ट विधानसभा में चलेगा विशेष स्वच्छता अभियान"
brief = "प्रधानमंत्री श्री नरेंद्र मोदी के 17 जुलाई को जालंधर आगमन को लेकर भाजपा के वेस्ट विधानसभा हल्का इंचार्ज शीतल अंगुराल ने अपने कार्यालय में वेस्ट विधानसभा क्षेत्र के मंडल प्रधानों के साथ एक महत्वपूर्ण बैठक की।"

content = """<p>जालंधर, 13 जुलाई ( )प्रधानमंत्री श्री नरेंद्र मोदी के 17 जुलाई को जालंधर आगमन को लेकर भाजपा के वेस्ट विधानसभा हल्का इंचार्ज शीतल अंगुराल ने अपने कार्यालय में वेस्ट विधानसभा क्षेत्र के मंडल प्रधानों के साथ एक महत्वपूर्ण बैठक की। इस बैठक में मंडल प्रधान ऋषि बहल, मनीष बल, सोनू चौहान,अजय ठाकुर एवं सुनील चोपड़ा उपस्थित रहे। बैठक के दौरान 15 एवं 16 जुलाई को वेस्ट विधानसभा के सभी मंडलों में विशेष स्वच्छता अभियान चलाने की विस्तृत योजना बनाई गई।</p>
<p>शीतल अंगुराल ने कहा कि प्रधानमंत्री नरेंद्र मोदी द्वारा देशभर में शुरू किए गए 'स्वच्छ भारत अभियान' को जन-जन का अभियान बनाने के लिए भाजपा कार्यकर्ता निरंतर कार्य कर रहे हैं। उन्होंने सभी मंडल प्रधानों को निर्देश दिए कि अपने-अपने क्षेत्रों में कार्यकर्ताओं के साथ मिलकर सार्वजनिक स्थलों, बाजारों, पार्कों, धार्मिक स्थलों और प्रमुख मार्गों पर व्यापक स्वच्छता अभियान चलाया जाए तथा अधिक से अधिक नागरिकों को इससे जोड़ा जाए।</p>
<p>उन्होंने कहा कि प्रधानमंत्री नरेंद्र मोदी का जालंधर आगमन पूरे पंजाब के लिए गौरव का विषय है। भाजपा कार्यकर्ता इस अवसर को जनसेवा और स्वच्छता के संकल्प के साथ जोड़ते हुए पूरे उत्साह से अभियान को सफल बनाएंगे। इस बैठक में सभी मंडल प्रधानों ने विश्वास दिलाया कि 15 एवं 16 जुलाई को वेस्ट विधानसभा के प्रत्येक मंडल में व्यापक स्तर पर स्वच्छता अभियान चलाकर प्रधानमंत्री नरेंद्र मोदी के स्वागत की तैयारियों को जनभागीदारी के साथ सफल बनाया जाएगा。</p>
<p><strong>कैप्शन- पूर्व विधायक शीतल अंगूराल वेस्ट विधानसभा के मंडल प्रधान मनीष बल,सोनू चौहान, अजय ठाकुर, रिशी बहल के साथ बैठक करते हुए।</strong></p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "main10.jpeg",
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
