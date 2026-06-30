with open('index.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if '// -- REGION DATA --' in line:
        skip = True
    if '// -- POLL --' in line:
        skip = False
    
    if not skip:
        new_lines.append(line)

with open('index.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Lines deleted.")
