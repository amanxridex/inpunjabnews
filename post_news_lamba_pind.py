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
    "title": "लम्बा पिंड चौक से जंडू सिंघा रोड के बदहाल हालातों को लेकर भाजपा का रोष प्रदर्शन",
    "region": "Punjab",
    "author": "vicky suri",
    "image_url": "main31.jpeg",
    "brief": "व्यापारियों और स्थानीय लोगों की समस्याओं का जल्द समाधान करे प्रशासन : कृष्ण देव भंडारी",
    "content": "<p>जालंधर, 6 अगस्त। जालंधर के प्रमुख व्यावसायिक क्षेत्र लम्बा पिंड चौक से जंडू सिंघा रोड तक की जर्जर सड़कों, जगह-जगह खड़े बारिश के पानी तथा बदहाल बुनियादी सुविधाओं को लेकर स्थानीय व्यापारियों और क्षेत्रवासियों में भारी रोष देखने को मिला। इसी के मद्देनज़र पूर्व विधायक एवं वरिष्ठ भाजपा नेता कृष्ण देव भंडारी के नेतृत्व में भाजपा कार्यकर्ताओं, व्यापारियों और स्थानीय निवासियों ने धरना-प्रदर्शन कर प्रशासन के खिलाफ अपना विरोध दर्ज करवाया।</p><p>इस अवसर पर कृष्ण देव भंडारी ने कहा कि लम्बा पिंड चौक से जंडू सिंघा रोड तक की सड़क की हालत अत्यंत दयनीय हो चुकी है। सड़क पर बड़े-बड़े गड्ढे बने हुए हैं तथा बारिश के बाद जगह-जगह पानी जमा होने से राहगीरों, वाहन चालकों और दुकानदारों को भारी परेशानियों का सामना करना पड़ रहा है। उन्होंने कहा कि इस मार्ग से प्रतिदिन हजारों लोग गुजरते हैं, लेकिन प्रशासन और पंजाब सरकार की उदासीनता के कारण क्षेत्र की समस्याएं लगातार बढ़ती जा रही हैं।</p><p>भंडारी ने कहा कि सड़क की खस्ता हालत का सीधा असर स्थानीय व्यापार पर पड़ रहा है। ग्राहक बाजार तक आने से कतरा रहे हैं, जिससे दुकानदारों के कारोबार पर प्रतिकूल प्रभाव पड़ रहा है। उन्होंने प्रशासन से मांग की कि सड़क की तत्काल मरम्मत करवाई जाए, जल निकासी की समुचित व्यवस्था की जाए तथा क्षेत्रवासियों को राहत प्रदान की जाए।</p><p>पूर्व भाजपा उपाध्यक्ष मनीष विज ने कहा कि आम आदमी पार्टी की सरकार विकास के बड़े-बड़े दावे करती है, लेकिन जमीनी स्तर पर हालात इसके बिल्कुल विपरीत हैं। उन्होंने कहा कि यदि जल्द ही क्षेत्र की समस्याओं का समाधान नहीं किया गया तो भाजपा स्थानीय लोगों के साथ मिलकर अपना संघर्ष और तेज करेगी।</p><p>धरना-प्रदर्शन में भाजपा मंडल नंबर 3 के अध्यक्ष गुरप्रीत सिंह विक्की, श्याम शर्मा, सुरेश कालिया, मिंदी, डॉ. पवन विशिष्ट, जोगिंदर शर्मा, योगराज शर्मा, साबी सहित बड़ी संख्या में भाजपा कार्यकर्ता, व्यापारी और स्थानीय निवासी उपस्थित रहे।</p><p>प्रदर्शनकारियों ने प्रशासन से मांग की कि लम्बा पिंड चौक से जंडू सिंघा रोड तक सड़क के पुनर्निर्माण और जल निकासी की समस्या का स्थायी समाधान प्राथमिकता के आधार पर किया जाए, ताकि स्थानीय लोगों को राहत मिल सके और क्षेत्र का व्यापारिक वातावरण पुनः सुचारु रूप से संचालित हो सके।</p>",
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
