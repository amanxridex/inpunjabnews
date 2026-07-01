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
    "title": "Railway Overbridges and Underbridges Proposed for Kartarpur, Phillaur & Adampur",
    "region": "Punjab",
    "author": "Vicky Suri",
    "image_url": "faaatak.jpeg",
    "brief": "Modi Government Will Soon Provide Relief from Closed Railway Crossings to the People of Kartarpur, Phillaur, and Adampur – Avinash Chandra Kaler",
    "content": "<p><strong>Press Note</strong></p><p><strong>Modi Government Will Soon Provide Relief from Closed Railway Crossings to the People of Kartarpur, Phillaur, and Adampur – Avinash Chandra Kaler</strong></p><p><strong>I Will Ensure Early Commencement of Overbridge and Underbridge Projects at Railway Crossings in Kartarpur, Phillaur, and Adampur – Ravneet Singh Bittu</strong></p><p><strong>Jalandhar/New Delhi, June 30:</strong> Former MLA from Kartarpur and Phillaur constituencies and former Chief Parliamentary Secretary Avinash Chandra Kaler met Union Minister of State for Railways Ravneet Singh Bittu in New Delhi and submitted a detailed written memorandum seeking the construction of underbridges and overbridges at major railway crossings in the Phillaur, Kartarpur, and Adampur Assembly constituencies.</p><p>Kaler stated that due to railway crossings remaining closed for long durations in these constituencies, local residents face severe traffic congestion, loss of valuable time, and serious difficulties during emergency situations on a daily basis. He demanded that underbridges and overbridges be constructed on a priority basis at Vidhipur, Goraya, the railway crossing near Baba Sahib Ambedkar Chowk in Phillaur, the Phillaur-Bilga railway crossing, and other major railway crossings, including Khurd in the Adampur Assembly constituency.</p><p>Union Minister of State for Railways Ravneet Singh Bittu assured Kaler that the Modi Government, under the leadership of Prime Minister Narendra Modi, places the highest priority on public convenience and infrastructure development. He assured that the Ministry of Railways would seriously consider these demands and expedite the necessary procedures so that the people of Kartarpur, Phillaur, and Adampur can receive a permanent solution to the long-standing problem of railway crossings.</p><p>Expressing his gratitude to Union Minister of State for Railways Ravneet Singh Bittu, Avinash Chandra Kaler said that the Modi Government is continuously expanding modern railway infrastructure across Punjab and giving priority to projects that directly benefit the public. The proposed underbridges and overbridges will ensure smoother traffic movement, reduce accidents, and provide better daily commuting facilities to lakhs of residents in the region.</p><p><em>Caption: Avinash Chandra Kaler submitting a memorandum to Union Minister of State for Railways Ravneet Singh Bittu at the Ministry of Railways, seeking relief for the people of Phillaur, Kartarpur, and Adampur from the persistent problems caused by railway crossings.</em></p>",
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
