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

headline = "BJP Jalandhar Urban Organization Will Gain New Energy Under the Leadership of Ashok Sareen Hicky – Rakesh Rathore"
brief = "Ashok Sareen Hicky Will Successfully Strengthen the Organization and Raise Public Issues Effectively – Sheetal Angural"

content = """<p><strong>BJP Jalandhar Urban Organization Will Gain New Energy Under the Leadership of Ashok Sareen Hicky – Rakesh Rathore</strong></p>
<p><strong>Ashok Sareen Hicky Will Successfully Strengthen the Organization and Raise Public Issues Effectively – Sheetal Angural</strong></p>
<p>Jalandhar, July 18: Bharatiya Janata Party (BJP) Jalandhar Urban's newly appointed District President Ashok Sareen Hicky was congratulated and extended best wishes by BJP Punjab General Secretary Rakesh Rathore, former MLA Sheetal Angural, and former District President Sushil Sharma, who celebrated the occasion by offering sweets.</p>
<p>On this occasion, all the leaders expressed confidence that under the leadership of Ashok Sareen Hicky, the BJP Jalandhar Urban unit would gain renewed strength and would be able to take the party’s policies and programmes more effectively to the people.</p>
<p>BJP Punjab General Secretary Rakesh Rathore said that Ashok Sareen Hicky has been actively associated with the party organization for a long time and enjoys a strong connect with grassroots workers. He stated that under Hicky’s leadership, the BJP Jalandhar Urban organization would become even stronger and would effectively face future political challenges. Rathore added that the party leadership has entrusted this important responsibility to a dedicated, hardworking, and experienced party worker.</p>
<p>Former MLA Sheetal Angural said that Ashok Sareen Hicky is a hardworking, approachable, and determined leader. He expressed confidence that under Hicky’s leadership, better coordination would be established between the organization and party workers, and the BJP’s ideology and public welfare policies would reach every household with renewed momentum. He further stated that all party workers would work together to further strengthen the BJP in Jalandhar Urban.</p>
<p>On this occasion, former BJP Jalandhar Urban District President Sushil Sharma expressed his heartfelt gratitude to all party office-bearers, Mandal Presidents, Morcha office-bearers, senior leaders, and dedicated workers who supported him during his tenure. He said that it was because of the cooperation, commitment, and tireless efforts of party workers that the organization continued to grow stronger and various programmes were successfully organized. Sushil Sharma added that he would continue to serve the party as an ordinary worker and would extend every possible support to the newly appointed District President Ashok Sareen Hicky.</p>
<p>Among those present on the occasion were former BJP Jalandhar District President Raman Pabbi,Gen sec Rajesh kapoor former BJYM Punjab President Sunny Sharma, District Vice President Manish Vij, District Secretary Amit Bhatia, along with several other BJP leaders and party workers.</p>
<p><em>Caption: BJP Jalandhar Urban Organization Will Gain New Energy Under the Leadership of Ashok Sareen Hicky – Rakesh Rathore</em></p>
<p><img src="main20.jpeg" alt="Ashok Sareen Hicky" style="max-width:100%;height:auto;margin-top:10px;"></p>
"""

article = {
    "title": headline,
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "main20.jpeg",
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
