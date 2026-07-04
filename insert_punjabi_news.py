# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error
import datetime

url = 'https://wyfodwmgosbubyonajjv.supabase.co/rest/v1/articles'
headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Zm9kd21nb3NidWJ5b25hamp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MTgsImV4cCI6MjA5Nzc3ODYxOH0.MNA9rvIKCjBM6RflP303p6_8Tn8VIZXNE_xnX7OxqHc',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

article = {
    "title": "जालंधर: शराब के नशे में कार दौड़ाने वाला ट्रैफिक पुलिस का ASI सस्पेंड, वीडियो वायरल होने पर कमिश्नरेट की बड़ी कार्रवाई",
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "insnews.mp4",
    "brief": "जालंधर शहर के वर्कशॉप चौक में कथित रूप से शराब के नशे में कार चला रहे ट्रैफिक पुलिस के एक एएसआई का वीडियो सोशल मीडिया पर वायरल होने के बाद पुलिस कमिश्नरेट ने तत्काल कार्रवाई करते हुए उसे सस्पेंड कर दिया।",
    "content": "<p><strong>जालंधर:</strong> शहर के वर्कशॉप चौक में कथित रूप से शराब के नशे में कार चला रहे ट्रैफिक पुलिस के एक एएसआई का वीडियो सोशल मीडिया पर वायरल होने के बाद पुलिस कमिश्नरेट ने तत्काल कार्रवाई करते हुए उसे सस्पेंड कर लाइन हाजिर कर दिया। मामले की विभागीय जांच शुरू कर दी गई है। पुलिस अधिकारियों का कहना है कि जांच रिपोर्ट के आधार पर नियमानुसार आगे की सख्त कार्रवाई की जाएगी।</p><p>मिली जानकारी के अनुसार वर्कशॉप चौक के पास लोगों ने एक कार चालक को कथित रूप से नशे की हालत में वाहन चलाते देखा। आरोप है कि वह लापरवाही से कार चला रहा था, जिससे राहगीरों और अन्य वाहन चालकों की जान खतरे में पड़ गई। लोगों ने उसे रोकने का प्रयास किया, लेकिन वह कार लेकर आगे निकल गया। इसके बाद लोगों ने उसका पीछा कर उसे रोक लिया और वीडियो बनाकर संबंधित थाना पुलिस के हवाले कर दिया। इसी दौरान मानवाधिकार परिषद भारत की राष्ट्रीय अध्यक्ष आरती राजपूत भी मीटिंग के बाद अपने घर लौट रही थीं।</p><p>उनका आरोप है कि उक्त कार चालक ने उनकी कार को भी टक्कर मारने का प्रयास किया, लेकिन उनके चालक की सूझबूझ से हादसा टल गया। इसके बाद उन्होंने भी कार का पीछा किया और राहगीरों की मदद से उसे रुकवाया। वीडियो वायरल होने के बाद एडीसीपी ट्रैफिक गुरबाज सिंह ने मामले का तुरंत संज्ञान लिया। मामले की गंभीरता को देखते हुए संबंधित एएसआई को तत्काल सस्पेंड कर लाइन हाजिर किया गया और विभागीय जांच शुरू कर दी गई। जांच के आधार पर संबंधित कर्मचारी के खिलाफ विभागीय नियमों के अनुसार सख्त कार्रवाई की गई है।</p><p>एडीसीपी ट्रैफिक गुरबाज सिंह ने कहा कि पुलिस विभाग में किसी भी प्रकार की लापरवाही, अनुशासनहीनता या दुराचार को बर्दाश्त नहीं किया जाएगा।</p>",
    "is_published": True,
    "tag": "Punjab",
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
