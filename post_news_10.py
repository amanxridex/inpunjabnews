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

headline = "जालंधर भाजपा में नए जिला अध्यक्ष को लेकर राजनीतिक चर्चाएं तेज"
brief = "जालंधर भाजपा में नए जिला अध्यक्ष की नियुक्ति के बाद संगठन के भीतर चर्चाओं का दौर तेज हो गया है।"

content = """<p><strong>दिनांक: 21 जुलाई 2026</strong></p>
<p><strong>— विक्रांत जोशी</strong></p>
<p><strong>जालंधर:</strong> जालंधर भाजपा में नए जिला अध्यक्ष की नियुक्ति के बाद संगठन के भीतर चर्चाओं का दौर तेज हो गया है। राजनीतिक हलकों और कुछ कार्यकर्ताओं के बीच यह टिप्पणी भी सुनने को मिल रही है कि <em>"पहले पार्टी आईसीयू में थी, अब वेंटिलेटर पर पहुंच गई है।"</em> यह एक राजनीतिक टिप्पणी है, जिसे आलोचक वर्तमान संगठनात्मक स्थिति के संदर्भ में व्यक्त कर रहे हैं。</p>
<p>चर्चा का एक प्रमुख विषय यह भी है कि अशोक सरीन पहले महासचिव के रूप में जिम्मेदारी निभा चुके हैं। आलोचकों का सवाल है कि यदि महासचिव के रूप में संगठन अपेक्षित परिणाम नहीं दे पाया, तो जिला अध्यक्ष बनने के बाद वे क्या बड़ा बदलाव ला पाएंगे।</p>
<p>कुछ कार्यकर्ताओं का यह भी कहना है कि संगठन के वरिष्ठ और जमीनी कार्यकर्ताओं को साथ लेकर चलना नए नेतृत्व के लिए सबसे बड़ी चुनौती होगी। क्या अशोक सरीन वरिष्ठ कार्यकर्ताओं का विश्वास जीत पाएंगे और संगठन को एकजुट कर पाएंगे, यह आने वाला समय ही बताएगा।</p>
<p>हालांकि, ये सभी बातें राजनीतिक चर्चाओं और आलोचकों के दावों पर आधारित हैं। इन दावों की स्वतंत्र रूप से पुष्टि नहीं हुई है और पार्टी की ओर से इस संबंध में कोई आधिकारिक प्रतिक्रिया सामने नहीं आई है।</p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "विक्रांत जोशी",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrf71pnqd2qNSxGhW3Dr63tAlTYL3yu63pFh0jFhMcLRMVtIiQUUo0a4&s=10",
    "brief": brief,
    "content": content,
    "is_published": True,
    "tag": "Politics",
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
