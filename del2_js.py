import re
with open('index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Use regex to delete everything from '// -- REGION DATA --' up to and including 'switchRegion('amritsar', document.querySelector('.region-tab'));'
new_content = re.sub(r'// -- REGION DATA --.*?switchRegion\(\'amritsar\', document\.querySelector\(\'\.region-tab\'\)\);', '', content, flags=re.DOTALL)

with open('index.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("regex replace executed")
