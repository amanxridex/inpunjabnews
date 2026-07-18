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

headline = "प्रधानमंत्री नरेंद्र मोदी की जालंधर रैली को ऐतिहासिक बनाने में जुटी भाजपा, प्रदेश संगठन महामंत्री श्रीनिवासुलू ने तैयारियों का लिया जायजा"
brief = "जालंधर, 14 जुलाई। प्रधानमंत्री श्री नरेंद्र मोदी के 17 जुलाई को नए बने जालंधर कैंट रेलवे के उद्घाटन समारोह की तैयारीयो को लेकर भारतीय जनता पार्टी ने तैयारियां तेज कर दी हैं।"

content = """<p><strong>रैली की सफलता के लिए कार्यकर्ताओं को सौंपी गई जिम्मेदारियां, प्रदेश महामंत्री राकेश राठौर भी रहे उपस्थित</strong></p>
<p>जालंधर, 14 जुलाई। प्रधानमंत्री श्री नरेंद्र मोदी के 17 जुलाई को नए बने जालंधर कैंट रेलवे के उद्घाटन समारोह की तैयारीयो को लेकर भारतीय जनता पार्टी ने तैयारियां तेज कर दी हैं। इसी क्रम में भाजपा के प्रदेश संगठन महामंत्री श्री मंत्री श्रीनिवासुलू एवं रैली के इंचार्ज प्रदेश महामंत्री राकेश राठौर ने आज भाजपा जिला जालंधर के अध्यक्ष सुशील शर्मा की अध्यक्षता में स्थानीय भाजपा कार्यालय, सर्कुलर रोड, निकट शीतला माता मंदिर में एक महत्वपूर्ण बैठक की।</p>
<p>बैठक में प्रधानमंत्री नरेंद्र मोदी की प्रस्तावित रैली को लेकर विस्तृत चर्चा की गई तथा कार्यक्रम की सफलता सुनिश्चित करने के लिए संगठनात्मक तैयारियों की समीक्षा की गई। इस दौरान विभिन्न व्यवस्थाओं के लिए कार्यकर्ताओं एवं पदाधिकारियों की जिम्मेदारियां निर्धारित की गईं। संगठन महामंत्री श्री मंत्री श्रीनिवासुलू ने कहा कि प्रधानमंत्री नरेंद्र मोदी का जालंधर आगमन पंजाब के लिए एक ऐतिहासिक अवसर है और भाजपा कार्यकर्ता इस रैली को अभूतपूर्व एवं सफल बनाने के लिए पूरी निष्ठा से कार्य कर रहे हैं।</p>
<p>बैठक के उपरांत प्रदेश महामंत्री राकेश राठौर तथा अन्य वरिष्ठ नेताओं ने रैली स्थल का दौरा कर तैयारियों का जायजा लिया तथा आवश्यक दिशा-निर्देश दिए। उन्होंने संबंधित टीमों को समयबद्ध एवं व्यवस्थित ढंग से सभी प्रबंध पूरे करने के निर्देश दिए।</p>
<p>इस अवसर पर पूर्व सांसद सुशील कुमार रिंकू, पूर्व कैबिनेट मंत्री मनोरंजन कालिया, प्रदेश उपाध्यक्ष एवं पूर्व संसदीय सचिव कृष्ण देव भंडारी, पूर्व विधायक शीतल अंगुराल, अविनाश चंद्र, सरबजीत सिंह मक्कड़, जगबीर सिंह बराड़, कर्मजीत कौर चौधरी, जिला महामंत्री अशोक सरीन हिक्की, राजेश कपूर, पूर्व जिला अध्यक्ष रमन पब्बी, रवि महेंद्रू, सुभाष सूद, रमेश शर्मा, अमरजीत सिंह अमरी भारतीय जनता युवा मोर्चा के पूर्व प्रदेश अध्यक्ष सनी शर्मा तथा अनिल सच्चर विशेष रूप से उपस्थित रहे।</p>
<p>बैठक में जिला उपाध्यक्ष मनीष विज, अश्विनी भंडारी, देविंदर भारद्वाज, दर्शन भगत, भूपेंद्र कुमार, देविंदर कालिया, जिला सचिव अमित भाटिया, अश्विनी अटवाल, गौरव महे,मीनू शर्मा, शालू कुमारी, योगेश मल्होत्रा, गोपाल कृष्ण सोनी, बृजेश शर्मा, हिमांशु शर्मा, डिंपी लुबाना, दिनेश मल्होत्रा, भगवंत प्रभाकर, राजीव ढींगरा, अजय जोशी, मनजीत सिंह सरोया, मनोज अग्रवाल सहित बड़ी संख्या में भाजपा पदाधिकारी एवं कार्यकर्ता उपस्थित रहे।</p>
<p><strong>कैप्शन- भाजपा के प्रदेश संगठन महामंत्री श्रीनिवासुलू, प्रदेश महामंत्री राकेश राठौर और अन्य वरिष्ठ नेता Jalandhar rally की तैयारियों की समीक्षा करते हुए।</strong></p>
<p><img src="main11.jpeg" alt="BJP News Rally Prep 1" style="max-width:100%;height:auto;margin-top:10px;"><br>
<img src="main12.jpeg" alt="BJP News Rally Prep 2" style="max-width:100%;height:auto;margin-top:10px;"></p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "main11.jpeg",
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
