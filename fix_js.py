import re

with open('index.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace 'await supabase' with 'await supabaseClient'
js = js.replace('await supabase\n', 'await supabaseClient\n')
js = js.replace('if (typeof supabase ===', 'if (typeof supabaseClient ===')

# Delete regionData and switchRegion
# Find '// -- REGION DATA --'
start_idx = js.find('// -- REGION DATA --')
# Find '// -- POLL --'
end_idx = js.find('// -- POLL --')

if start_idx != -1 and end_idx != -1:
    js = js[:start_idx] + js[end_idx:]

with open('index.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated index.js to remove region logic and fix supabase client reference")
